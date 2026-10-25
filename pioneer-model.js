const viewers = document.querySelectorAll('[data-pioneer-model]');

viewers.forEach((viewer) => {
  const isSeparation = viewer.dataset.modelKind === 'separation';
  let started = false;
  let visible = false;
  let renderFrame = null;
  let renderer, scene, camera, model, assemblyModel;
  let lastFrameTime = 0;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const translate = () => {
    const english = document.documentElement.lang === 'en';
    renderer?.domElement.setAttribute('aria-label', isSeparation
      ? (english ? 'Mechanical stage separation assembly' : '기계식 단분리 장치 조립 모델')
      : (english ? 'PIONEER-I rocket model' : 'PIONEER-I 로켓 모델'));
  };
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  translate();

  const draw = (time = performance.now()) => {
    renderFrame = null;
    if (!visible || !renderer || !model) return;
    const delta = lastFrameTime ? Math.min(.05, (time - lastFrameTime) / 1000) : 0;
    lastFrameTime = time;
    if (!reduced.matches) assemblyModel.rotation.z += delta * .26;
    renderer.render(scene, camera);
    renderFrame = requestAnimationFrame(draw);
  };
  const resume = () => { if (renderFrame === null) draw(); };

  const init = async () => {
    if (started) return;
    started = true;
    try {
      const [THREE, { ThreeMFLoader }, { RoomEnvironment }] = await Promise.all([
        import('three'),
        import('three/addons/loaders/3MFLoader.js'), import('three/addons/environments/RoomEnvironment.js')
      ]);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(30, 1, .01, 100);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.tabIndex = -1;
      renderer.domElement.setAttribute('role', 'img');
      viewer.append(renderer.domElement);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environment = new RoomEnvironment(renderer);
      scene.environment = pmrem.fromScene(environment, .04).texture;
      environment.dispose?.();
      pmrem.dispose();
      scene.add(new THREE.HemisphereLight(0xffffff, 0x202733, .9));
      const key = new THREE.DirectionalLight(0xffffff, 2.5);
      key.position.set(3, 4, 5);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xe4ebf3, .8);
      fill.position.set(-4, 0, 3);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0xbacbdf, 1.6);
      rim.position.set(-3, 1, -2);
      scene.add(rim);
      const assembly = await new ThreeMFLoader().loadAsync(viewer.dataset.modelSrc);
      assemblyModel = assembly;
      // A 2/2 twill weave, with separate color, height, and roughness maps.
      const weaveMaps = ['color', 'height', 'roughness'].map(() => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 128;
        return { canvas, context: canvas.getContext('2d') };
      });
      weaveMaps.forEach(({ context }, mapIndex) => {
        const pixels = context.createImageData(128, 128);
        for (let y = 0; y < 128; y++) {
          for (let x = 0; x < 128; x++) {
            const warp = ((Math.floor(x / 32) - Math.floor(y / 32) + 4) % 4) < 2;
            const across = (warp ? x : y) % 32;
            const along = (warp ? y : x) % 32;
            const ridge = Math.pow(Math.sin((across + .5) / 32 * Math.PI), .7);
            const fiber = Math.cos(across * Math.PI) * 2 + Math.sin(along * .55) * .8;
            const value = mapIndex === 0 ? 25 + ridge * 5 + fiber * .15 + (warp ? .5 : 0) : mapIndex === 1 ? 120 + ridge * 16 + fiber * .1 : 238 - ridge * 8;
            const i = (y * 128 + x) * 4;
            pixels.data[i] = value;
            pixels.data[i + 1] = value + (mapIndex === 0 ? 1 : 0);
            pixels.data[i + 2] = value + (mapIndex === 0 ? 2 : 0);
            pixels.data[i + 3] = 255;
          }
        }
        context.putImageData(pixels, 0, 0);
      });
      const textures = weaveMaps.map(({ canvas }) => {
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        return texture;
      });
      textures[0].colorSpace = THREE.SRGBColorSpace;
      const carbon = new THREE.MeshStandardMaterial({
        color: 0xffffff, map: textures[0], bumpMap: textures[1], bumpScale: .00002,
        roughnessMap: textures[2], roughness: .95, metalness: .02,
        envMapIntensity: .55, side: THREE.DoubleSide
      });
      assembly.traverse((mesh) => {
        if (!mesh.isMesh) return;
        mesh.geometry.computeVertexNormals();
        mesh.geometry.computeBoundingBox();
        const bounds = mesh.geometry.boundingBox;
        const dimensions = bounds.getSize(new THREE.Vector3());
        const tube = (dimensions.z > 450 || (dimensions.z >= 180 && dimensions.z <= 220)) && dimensions.x > 90 && dimensions.x < 115 && dimensions.y > 90 && dimensions.y < 115;
        const fin = dimensions.z > 140 && ((dimensions.x < 8 && dimensions.y > 100) || (dimensions.y < 8 && dimensions.x > 100));
        if (!isSeparation && (tube || fin)) {
          mesh.geometry = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
          const positions = mesh.geometry.getAttribute('position');
          const uv = new Float32Array(positions.count * 2);
          const cx = (bounds.min.x + bounds.max.x) / 2;
          const cy = (bounds.min.y + bounds.max.y) / 2;
          const circumference = Math.PI * (dimensions.x + dimensions.y) / 2;
          for (let i = 0; i < positions.count; i++) {
            uv[i * 2] = tube ? (Math.atan2(positions.getY(i) - cy, positions.getX(i) - cx) / (2 * Math.PI) + .5) : (dimensions.x < dimensions.y ? positions.getY(i) : positions.getX(i)) / 10;
            uv[i * 2 + 1] = positions.getZ(i) / 10;
          }
          if (tube) {
            for (let i = 0; i < positions.count; i += 3) {
              const u = [uv[i * 2], uv[(i + 1) * 2], uv[(i + 2) * 2]];
              const crossesSeam = Math.max(...u) - Math.min(...u) > .5;
              for (let j = 0; j < 3; j++) uv[(i + j) * 2] = (u[j] + (crossesSeam && u[j] < .5 ? 1 : 0)) * circumference / 10;
            }
          }
          mesh.geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
          mesh.material = carbon;
          return;
        }
        const readableMaterial = (original) => {
          const color = original.color?.clone() || new THREE.Color(0x505860);
          color.lerp(new THREE.Color(0x8b949e), .24);
          if (isSeparation) color.setHex(0x686868);
          return new THREE.MeshStandardMaterial({
            color, metalness: isSeparation ? .08 : .06, roughness: isSeparation ? .86 : .82,
            side: THREE.DoubleSide,
            transparent: original.transparent,
            opacity: original.opacity ?? 1,
            map: original.map || null,
            vertexColors: original.vertexColors || false,
            envMapIntensity: .65
          });
        };
        mesh.material = Array.isArray(mesh.material) ? mesh.material.map(readableMaterial) : readableMaterial(mesh.material);
      });
      const box = new THREE.Box3().setFromObject(assembly);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      assembly.position.sub(center);
      model = new THREE.Group();
      model.add(assembly);
      model.scale.setScalar(2.6 / Math.max(size.x, size.y, size.z));
      model.rotation.set(-Math.PI / 2, 0, 0, 'ZYX');
      scene.add(model);
      const fittedBox = new THREE.Box3().setFromObject(model);
      const target = fittedBox.getCenter(new THREE.Vector3());
      const direction = (isSeparation ? new THREE.Vector3(.7, .4, 1) : new THREE.Vector3(.18, .12, 1)).normalize();
      const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), direction).normalize();
      const up = new THREE.Vector3().crossVectors(direction, right);
      const fit = () => {
        const width = viewer.clientWidth, height = viewer.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        const halfFov = camera.fov * Math.PI / 360;
        let distance = 0;
        for (const x of [fittedBox.min.x, fittedBox.max.x]) {
          for (const y of [fittedBox.min.y, fittedBox.max.y]) {
            for (const z of [fittedBox.min.z, fittedBox.max.z]) {
              const corner = new THREE.Vector3(x, y, z).sub(target);
              distance = Math.max(distance, Math.abs(corner.dot(right)) / (Math.tan(halfFov) * camera.aspect) + corner.dot(direction), Math.abs(corner.dot(up)) / Math.tan(halfFov) + corner.dot(direction));
            }
          }
        }
        camera.position.copy(target).addScaledVector(direction, distance * 1.16);
        camera.lookAt(target);
            renderer.setSize(width, height, false);
        renderer.render(scene, camera);
      };
      new ResizeObserver(fit).observe(viewer);
      reduced.addEventListener('change', () => { lastFrameTime = 0; });
      translate();
      fit();
      viewer.classList.add('is-ready');
      resume();
    } catch {
      renderer?.domElement.remove();
      renderer?.dispose();
    }
  };

  const observer = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) { init(); resume(); }
    else if (renderFrame !== null) { cancelAnimationFrame(renderFrame); renderFrame = null; lastFrameTime = 0; }
  }, { rootMargin: '160px' });
  observer.observe(viewer);
});
