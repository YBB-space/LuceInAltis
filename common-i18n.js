(() => {
  if (window.ALTIS_I18N_READY) return;
  window.ALTIS_I18N_READY = true;

  const STORAGE_KEY = "altis_lang";
  const path = decodeURIComponent(location.pathname.split("/").pop() || "index.html");

  const common = {
    "Address: 진주대로 501 | Founded Date: March 2021": "Address: 501 Jinju-daero, Jinju | Founded: March 2021",
    "비상을 함께한 분들": "Partners Behind Our Flight",
    "함께하는 스폰서": "Our Sponsors",
    "다음 발사를 함께 만들고 싶으신가요? 파트너로 참여해 주세요.": "Want to help build our next launch? Become an ALTIS partner."
  };

  const pages = {
    "team.html": {
      "설계에서 발사까지, 서로 다른 분야의 판단을 하나의 비행으로 연결하는": "From design to launch, we bring decisions across disciplines together into one flight.",
      "ALTIS 제7대 운영진입니다.": "Meet the 7th ALTIS leadership team.",
      "제7대 운영진": "7th Leadership Team",
      "회장단과 각 기술 팀장이 프로젝트 운영, 시스템 개발 및 시험 활동을 함께 이끌고 있습니다.": "The executive officers and technical team leads jointly guide project operations, system development, and testing.",
      "회장": "President",
      "부회장": "Vice President",
      "25학번": "Class of 2025",
      "24학번": "Class of 2024",
      "23학번": "Class of 2023",
      "학부생": "Undergraduate",
      "제7대 회장": "7th President",
      "제7대 부회장": "7th Vice President",
      "기술 팀장": "Technical Team Leads",
      "전자·미션·동체·추진 네 개 분야의 개발과 시험을 각 팀장이 책임집니다.": "Each lead is responsible for development and testing across avionics, mission, airframe, and propulsion.",
      "전자팀장": "Avionics Lead",
      "미션팀장": "Mission Lead",
      "동체팀장": "Airframe Lead",
      "추진팀장": "Propulsion Lead",
      "Leadership 페이지를 점검하고 있습니다.": "The Leadership page is currently under maintenance.",
      "곧 다시 공개하겠습니다.": "It will be available again soon.",
      "홈으로 돌아가기": "Back to Home"
    },

    "history.html": {
      "설계하고, 만들고, 시험하며 쌓아온 ALTIS의 시간입니다. 하나의 발사를 향한 도전은 매년 새로운 기록으로 이어집니다.": "This is the story ALTIS has built through design, fabrication, and testing. Each challenge toward flight becomes a new milestone.",
      "연혁 및 수상 이력": "Timeline & Awards",
      "ALTIS 창립": "ALTIS Founded",
      "2021년 3월, 경상국립대학교 항공우주공학부 학생 로켓 동아리 ALTIS가 첫걸음을 시작했습니다.": "In March 2021, ALTIS began as a student rocketry team in the Department of Aerospace Engineering at Gyeongsang National University.",
      "NURA 전국대학교 로켓발사대회": "NURA National University Rocket Launch Competition",
      "한국항공우주연구원 원장상": "Korea Aerospace Research Institute President's Award",
      "전국 대학 로켓팀이 함께한 NURA 로켓발사대회에서 한국항공우주연구원 원장상을 수상하며 ALTIS의 설계·제작·발사 역량을 입증했습니다.": "ALTIS received the Korea Aerospace Research Institute President's Award at the NURA competition, demonstrating its design, fabrication, and launch capabilities.",
      "NURA 로켓학술대회 현장": "NURA Rocket Symposium",
      "프로젝트 결과와 기술 경험을 공유하며 다음 발사를 위한 설계와 시험 기록을 이어갔습니다.": "We shared project results and engineering experience while carrying our design and test records into the next launch.",
      "제7대 운영진 출범": "7th Leadership Team Launched",
      "전자·미션·동체·추진 네 기술 분야를 중심으로 새로운 운영진이 ALTIS의 다음 비행을 준비합니다.": "A new leadership team prepares ALTIS for its next flight across avionics, mission, airframe, and propulsion.",
      "CSA 동아리 평가 A등급": "Grade A in the GNU CSA Club Evaluation",
      "경상국립대학교 CSA 동아리 평가에서 A등급을 받았습니다.": "ALTIS received Grade A in Gyeongsang National University's CSA club evaluation.",
      "항공우주 부트캠프": "Aerospace Bootcamp",
      "ALTIS는 고등학생들과 함께 항공우주 분야를 알아가는 교육 활동도 진행합니다. 수업을 통해 로켓의 기본 원리와 구조를 배우고, 참가 학생들이 직접 모델 로켓을 제작해 실제 발사까지 경험할 수 있도록 부트캠프를 운영합니다. 설계와 제작, 발사로 이어지는 과정을 통해 항공우주공학을 더 가까이 알리는 활동입니다.": "ALTIS also runs an educational bootcamp that introduces high school students to aerospace engineering. Participants learn the fundamentals and structure of rockets, build model rockets themselves, and experience an actual launch. The program brings aerospace engineering closer through the complete journey from design and fabrication to flight."
    },

    "join.html": {
      "로켓을 직접 설계하고 제작하며 시험하는 팀에 합류하세요. ALTIS는 배우는 사람보다": "Join a team that designs, builds, and tests rockets firsthand. ALTIS is looking for people who",
      "끝까지 만들어보는 사람을 기다립니다.": "see what they build through to the end.",
      "지원하기": "Apply",
      "모집 분야 보기": "View Open Tracks",
      "이런 사람을 기다립니다": "Who We Need",
      "전공 지식보다 중요한 것은 실제로 손을 움직여 문제를 해결하려는 태도입니다. 처음이어도 괜찮습니다.": "More than prior expertise, we value the drive to work hands-on and solve problems. Beginners are welcome.",
      "아이디어를 도면과 부품, 시험 장비로 바꾸는 제작 중심의 활동에 참여합니다.": "Turn ideas into drawings, components, and test hardware through hands-on engineering.",
      "실패 데이터를 기록하고 원인을 분석하며 다음 설계에 반영하는 과정을 경험합니다.": "Record failed tests, identify causes, and carry the findings into the next design.",
      "발사 준비, 현장 운영, 안전 점검까지 하나의 프로젝트를 끝까지 함께 완성합니다.": "Complete an entire project together, from launch preparation to field operations and safety checks.",
      "모집 분야": "Open Tracks",
      "관심 분야를 기준으로 시작하되, 실제 프로젝트에서는 팀 간 협업을 통해 발사체 전체 시스템을 함께 이해합니다.": "Start in your area of interest, then collaborate across teams to understand the complete launch vehicle system.",
      "추진": "Propulsion",
      "고체 로켓 모터 설계, 제작, 추력 시험과 추진 시스템 검증": "Solid rocket motor design and fabrication, thrust testing, and propulsion system validation",
      "전자": "Avionics",
      "센서, DAQ, 점화 제어, 통신 모듈과 비행 데이터 계측": "Sensors, DAQ, ignition control, communications, and flight data acquisition",
      "동체": "Airframe",
      "구조 설계, 하우징 제작, 조립 공정과 탑재체 보호 구조": "Structural design, housing fabrication, assembly, and payload protection",
      "미션": "Mission",
      "비행 시퀀스, 시험 계획, 현장 운영과 프로젝트 관리": "Flight sequencing, test planning, field operations, and project management",
      "지원 흐름": "How to Join",
      "구글폼 연결 전까지는 버튼만 준비해두었습니다. 모집이 열리면 같은 위치에 지원 폼 링크를 연결할 수 있습니다.": "The application button is ready and will link to the application form when recruitment opens.",
      "문의하기": "Contact Us",
      "지원서 제출": "Submit Application",
      "관심 분야, 가능한 활동 시간, 만들고 싶은 프로젝트를 간단히 작성합니다.": "Tell us briefly about your interests, availability, and what you hope to build.",
      "팀 미팅": "Team Meeting",
      "지원 동기와 관심 분야를 확인하고, 현재 진행 중인 프로젝트를 소개합니다.": "We discuss your motivation and interests and introduce our current projects.",
      "프로젝트 합류": "Join a Project",
      "기초 안전 교육과 온보딩을 거친 뒤 실제 제작·시험 업무에 참여합니다.": "After safety training and onboarding, you take part in real fabrication and testing.",
      "궁금한 점이 있다면": "Have Questions?",
      "모집 일정, 활동 방식, 팀별 업무가 궁금하다면 아래 연락처로 문의해 주세요.": "Contact us below with questions about recruitment, activities, or team responsibilities.",
      "모집 준비 중": "Recruitment Coming Soon",
      "지금은 동아리원을 모집하고 있지 않습니다. 다음 모집이 열리면 이 페이지에서 바로 지원할 수 있게 안내하겠습니다.": "ALTIS is not recruiting at the moment. When the next round opens, application details will be posted here.",
      "홈으로": "Back to Home",
      "소식 보기": "View Updates"
    },

    "sponsors.html": {
      "ALTIS는 경상국립대학교 항공우주공학부 학생들이 로켓을 처음부터 끝까지 직접 설계하고 제작하며 시험하는 팀입니다.": "ALTIS is a student rocketry team at Gyeongsang National University that designs, builds, and tests rockets from start to finish.",
      "다음 발사를 함께 완성할 스폰서와 협업 파트너를 찾고 있습니다.": "We are looking for sponsors and collaborators to help complete our next launch.",
      "제안서 보기": "View Proposal",
      "문의하기": "Contact Us",
      "ALTIS와 함께하는 가치": "Why Partner with ALTIS",
      "ALTIS는 설계, 제작, 시험, 발사 운영까지 직접 수행하며 실전형 우주공학 역량을 쌓아가는 학생 로켓 팀입니다.": "ALTIS is a student rocketry team building practical aerospace engineering capability through design, fabrication, testing, and launch operations.",
      "파트너의 지원은 하나의 발사를 넘어 다음 세대 엔지니어와 기술 생태계로 이어집니다.": "A partner's support extends beyond one launch to the next generation of engineers and the broader technology ecosystem.",
      "아이디어를 도면과 부품, 시험 데이터로 검증하며 문제를 끝까지 해결하는 실전형 개발 경험을 만듭니다.": "We create hands-on engineering experience by validating ideas through drawings, hardware, and test data.",
      "반복적인 제작과 시험, 발사 준비 과정을 통해 데이터를 축적하고 매 시즌 더 안정적인 발사체로 발전합니다.": "Repeated fabrication, testing, and launch preparation build data that makes each season's vehicle more reliable.",
      "항공우주 분야의 예비 엔지니어들이 함께 성장하는 팀으로, 파트너는 젊은 기술 인재와 직접 연결됩니다.": "Partners connect directly with emerging aerospace engineers growing together as a team.",
      "협업 제안서는 ALTIS의 활동 방향, 지원 필요 영역, 파트너십 방식과 연락 정보를 한 번에 확인할 수 있도록 정리했습니다.": "Our partnership proposal summarizes ALTIS activities, support needs, partnership options, and contact details.",
      "새 창에서 열기": "Open in New Tab",
      "다운로드": "Download",
      "파트너십 문의": "Partnership Contact",
      "후원, 제작 협업, 장비 지원, 기술 자문 등 어떤 형태의 연결도 환영합니다.": "We welcome sponsorship, fabrication collaboration, equipment support, technical advice, and other forms of partnership."
    },

    "avionics.html": {
      "센서에서 지상국까지. ALTIS는 비행 데이터를 계측하고 기록하며,": "From sensors to the ground station, ALTIS measures and records flight data while",
      "통신·점화·전원 제어와 운영 소프트웨어를 하나의 시스템으로 직접 설계합니다.": "designing communications, ignition, power control, and operations software as one integrated system.",
      "비행의 모든 신호를": "Every Signal in Flight,",
      "하나의 흐름으로": "One Unified Flow",
      "ALTIS의 에비오닉스는 보드 한 장으로 끝나지 않습니다. 센서 계측, 실시간 상태 판단,": "ALTIS avionics extends beyond a single board. Sensor acquisition, real-time state estimation,",
      "비행 기록, 무선 통신, 지상국 시각화가 하나의 데이터 규격으로 이어집니다.": "flight logging, wireless communications, and ground-station visualization share one data standard.",
      "하드웨어와 소프트웨어를 함께 설계해 지연과 변환 손실을 줄이고, 비행 전 과정의 데이터를 일관되게 유지합니다.": "We co-design hardware and software to reduce latency and conversion loss while keeping data consistent throughout the flight.",
      "IMU, 기압·고도, 위치와 전원 상태를 비행 중 연속 계측합니다.": "Continuously measures IMU, pressure, altitude, position, and power status during flight.",
      "상태 판단, 이벤트 시퀀스, 파이로·서보 제어와 비행 기록을 수행합니다.": "Performs state estimation, event sequencing, pyro and servo control, and flight logging.",
      "기체 간 중계와 지상국 링크를 관리하고 텔레메트리와 명령을 전달합니다.": "Manages vehicle relays and ground links while carrying telemetry and commands.",
      "HUD, 자세·궤적, 지도, 이벤트와 저장 기록을 하나의 화면에서 운영합니다.": "Operates HUD, attitude, trajectory, maps, events, and stored logs in one interface.",
      "같이 설계하고,": "Designed Together,",
      "같이 검증합니다": "Validated Together",
      "펌웨어와 운영 소프트웨어는 동일한 이벤트·텔레메트리 정의를 공유합니다.": "Firmware and operations software share the same event and telemetry definitions.",
      "보드에서 생성된 데이터가 화면과 보고서까지 같은 의미로 유지되도록 인터페이스를 설계합니다.": "Interfaces preserve the meaning of board-generated data from the display through final reports.",
      "비행 센서, 통신, 저장장치와 안전 출력부를 통합한 ALTIS의 비행 컴퓨터입니다.": "ALTIS's flight computer integrates flight sensors, communications, storage, and safety outputs.",
      "실시간 루프를 방해하지 않도록 계측·기록·통신 작업을 분리하고, 비행 이벤트를 결정론적으로 처리합니다.": "Acquisition, logging, and communications are separated to protect the real-time loop and process flight events deterministically.",
      "IMU·기압·고도·위치·전원 텔레메트리 계측": "IMU, pressure, altitude, position, and power telemetry",
      "파이로 채널, 서보, 안전 모드와 비행 시퀀스 관리": "Pyro channels, servos, safety modes, and flight sequence management",
      "온보드 SPI Flash 비행 기록 및 지상국 다운로드": "Onboard SPI flash logging and ground-station download",
      "통신과 기록이 센서 루프를 막지 않는 비동기 처리 구조": "Asynchronous architecture that keeps communications and logging from blocking the sensor loop",
      "발사 전 점검부터 비행 중 모니터링, 회수 후 데이터 분석까지 이어지는 지상국 소프트웨어입니다.": "Ground-station software spanning pre-launch checks, in-flight monitoring, and post-recovery analysis.",
      "실시간 표시와 제어 명령을 분리해 반응성을 확보하고, 저장 기록과 보고서를 같은 비행 데이터로 생성합니다.": "Separating real-time display from control commands preserves responsiveness while logs and reports share the same flight data.",
      "고도·속도·가속도 차트와 단계별 상태 모니터링": "Altitude, velocity, and acceleration charts with phase monitoring",
      "IMU 기반 3D 자세 프리뷰, 궤적과 지도 시각화": "IMU-based 3D attitude preview, trajectory, and map visualization",
      "ARM, 안전 모드, 점화·서보 제어와 이벤트 알림": "ARM, safety modes, ignition and servo control, and event alerts",
      "비행 기록 다운로드, 재생, 차트와 보고서 내보내기": "Flight log download, replay, charts, and report export",
      "비행 단계와 링크 상태에 따라 데이터를 전달하는 ALTIS의 통신 계층입니다.": "ALTIS's communications layer routes data according to flight phase and link status.",
      "2단은 1단 중계를 우선 사용하고, 중계가 끊기면 지상국 직통 경로로 전환할 수 있도록 설계합니다.": "The second stage prioritizes a first-stage relay and can switch to a direct ground link if the relay is lost.",
      "지상국은 어느 경로로 들어온 데이터든 같은 텔레메트리로 처리합니다.": "The ground station processes data as the same telemetry regardless of its path.",
      "발사 전부터": "From Pre-Launch",
      "비행 후까지": "Through Post-Flight",
      "단순한 실시간 화면을 넘어, 준비·비행·회수·분석의 전 과정을 하나의 시스템에서 연결합니다.": "Beyond a live display, one system connects preparation, flight, recovery, and analysis.",
      "상태 점검": "System Check",
      "센서, 저장공간, 통신률, 전원과 안전 상태를 발사 전에 한 화면에서 확인합니다.": "Check sensors, storage, link rate, power, and safety status on one screen before launch.",
      "비행 텔레메트리": "Flight Telemetry",
      "단계별 고도·속도·가속도와 자세, 이벤트를 지연을 줄인 실시간 스트림으로 표시합니다.": "Display phase-by-phase altitude, velocity, acceleration, attitude, and events in a low-latency stream.",
      "안전 제어": "Safety Control",
      "ARM과 안전 모드, 점화·서보 명령을 상태 확인과 함께 수행해 오동작 가능성을 낮춥니다.": "Pair ARM, safety mode, ignition, and servo commands with status checks to reduce unintended operation.",
      "온보드 기록": "Onboard Logging",
      "무선 링크와 별개로 비행 데이터를 플래시에 보존하여 통신 음영 구간의 데이터도 남깁니다.": "Store flight data in flash independently of the radio link, preserving data through communication gaps.",
      "비행 재생": "Flight Replay",
      "기록된 센서·이벤트를 시간축에 맞춰 다시 재생해 비행 상태와 시퀀스를 검토합니다.": "Replay recorded sensor data and events on a synchronized timeline to review flight state and sequencing.",
      "데이터 분석": "Data Analysis",
      "고도·가속도·궤적 차트와 주요 이벤트를 보고서 형식으로 정리해 다음 설계에 반영합니다.": "Compile altitude, acceleration, trajectory, and key events into reports for the next design iteration.",
      "비행 컴퓨터 하우징과 전자 시스템 배치를 3D 목업으로 확인합니다.": "Review flight-computer housing and electronics placement in a 3D mockup.",
      "회로와 고정 구조, 커넥터 접근성, 조립성을 함께 검토하며 실제 비행 환경에 맞춰 반복 개선합니다.": "Iterate for real flight conditions by reviewing circuitry, mounting, connector access, and assembly together."
    },

    "motor.html": {
      "ALTIS는 고체 로켓 모터를 직접 설계·제작하고, 반복 시험으로 신뢰도를 쌓아갑니다.": "ALTIS designs and fabricates solid rocket motors in-house, building reliability through repeated testing."
    },

    "structure.html": {
      "구조 파트는 ALTIS 로켓의 몸체를 책임집니다. 발사부터 회수까지 공력 하중과 관성 하중을 견디면서도 가볍고 신뢰성 높은 기체를 직접 설계하고 제작합니다.": "The Structures Team is responsible for the body of every ALTIS rocket. We design and build lightweight, reliable airframes that withstand aerodynamic and inertial loads from launch through recovery.",
      "설계하고, 만들고, 시험하며": "We design, build, and test,",
      "비행으로 검증합니다.": "then validate through flight.",
      "기체 설계와 재료 선정부터 복합재 성형, 구조 해석, 물성 시험, 시험발사 피드백까지 하나의 반복 설계 과정으로 연결합니다.": "Airframe design, material selection, composite molding, structural analysis, material testing, and flight feedback form one continuous iterative design process.",
      "복합재 동체 제작": "Composite Body Tube Fabrication",
      "Hand wet lay-up, 전 공정 자체 수행": "Every stage of hand wet lay-up performed in-house",
      "3D 프린팅 기반 저비용 몰드 설계와 제작, 이형제 처리, 섬유 적층, 수지 함침까지 팀 내에서 직접 수행합니다. 다양한 치수의 CFRP 동체관과 복잡한 형상의 CFRP 핀을 자체 제작하며, 2027년부터는 VARTM 공정을 도입해 함침 균일도와 경량화를 발전시킬 계획입니다.": "We handle the entire process in-house, from low-cost 3D-printed mold design and fabrication to release treatment, fiber layup, and resin impregnation. We produce CFRP body tubes in multiple sizes and complex CFRP fins, with plans to introduce VARTM from 2027 for more uniform impregnation and further weight reduction.",
      "CFRP 핀 구조": "CFRP Fin Structure",
      "핀부터 성형 몰드와 지그까지 직접": "Fins, compression molds, and jigs made in-house",
      "로켓의 자세 안정성을 좌우하는 핀과 하단 동체의 결합 구조를 압축 성형 몰드 방식으로 제작합니다. 분절형과 일체형 구조의 하중 전달 특성을 비교하고, CFRP 핀과 핀 지그까지 직접 제작해 형상과 정렬의 재현성을 확보합니다.": "We fabricate the interface between the stabilizing fins and lower airframe using compression molds. We compare load transfer in segmented and integrated structures and make both CFRP fins and fin jigs in-house for repeatable geometry and alignment.",
      "구조 해석 및 연동 설계": "Structural Analysis and Coupled Design",
      "ANSYS Fluent 외부 공력 해석 결과를 Static Structural로 연계하는 One-way FSI 해석을 수행합니다. 안전계수와 극한하중 기준을 적용해 실제 비행 하중에서 구조 건전성을 정량적으로 검증합니다.": "We conduct one-way FSI by transferring external aerodynamic results from ANSYS Fluent into Static Structural. Safety-factor and limit-load criteria quantitatively verify structural integrity under actual flight loads.",
      "재료 물성 시험": "Material Property Testing",
      "자체 제작한 CFRP 시편의 인장·압축·전단 시험으로 실제 적층 물성치를 확보합니다. ASTM D3039, D3410, D3518 규격의 시험 결과를 ANSYS ACP 복합재 파손 해석에 반영합니다.": "Tensile, compression, and shear tests on in-house CFRP specimens establish measured laminate properties. Results from ASTM D3039, D3410, and D3518 testing feed into composite failure analysis in ANSYS ACP.",
      "측정값을 설계값으로": "Turning Measurements into Design Data",
      "교내 복합재 구조 연구실 및 외부 시험기관과 협력해 신뢰도 높은 재료 데이터베이스를 구축하고, Tsai-Wu와 Puck 파손 기준을 활용한 해석 정밀도를 높입니다.": "We collaborate with the university's composite structures laboratory and external test institutes to build a reliable materials database and improve analyses using the Tsai-Wu and Puck failure criteria.",
      "시험발사 기반 피드백": "Flight-Test-Based Feedback",
      "에비오닉스 기록과 영상 분석을 바탕으로 구조적 결함과 개선점을 찾습니다. 단분리 신뢰성, 낙하산 전개, 기체 자세 안정성을 다음 기체 설계에 즉시 반영하는 반복 검증 사이클을 운영합니다.": "Avionics logs and video analysis reveal structural issues and opportunities for improvement. Stage-separation reliability, parachute deployment, and vehicle stability feed directly into the next design through an iterative validation cycle.",
      "보유 기술": "Core Capabilities",
      "CFRP 복합재 성형 공정 설계 및 실습": "CFRP composite molding process design and fabrication",
      "Fusion 360 기반 몰드·조립체 3D 설계": "Fusion 360-based 3D mold and assembly design",
      "ANSYS Fluent 외부 공력 CFD 해석": "External aerodynamic CFD analysis in ANSYS Fluent",
      "ANSYS Workbench 기반 One-way FSI 해석": "One-way FSI analysis in ANSYS Workbench",
      "ANSYS ACP 복합재 적층 설계 및 파손 해석": "Composite layup design and failure analysis in ANSYS ACP",
      "ASTM 규격 기반 복합재 물성 시험 및 데이터 처리": "ASTM-based composite property testing and data processing",
      "시험발사 데이터 기반 구조 설계 보정": "Structural design refinement using flight-test data",
      "동체부터 핀과 핀 지그까지.": "From body tubes to fins and fin jigs.",
      "ALTIS가 만듭니다.": "Built by ALTIS."
    },

    "ejection system.html": {
      "EJECTION SYSTEM 페이지를 준비 중입니다.": "The EJECTION SYSTEM page is under construction.",
      "곧 업데이트됩니다.": "Coming soon."
    }
  };

  const normalize = (value) => value.replace(/\s+/g, " ").trim();
  const dictionary = Object.assign({}, common, pages[path] || {});
  const records = [];

  const collectTextNodes = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest("script, style, noscript")) return NodeFilter.FILTER_REJECT;
        return dictionary[normalize(node.nodeValue || "")] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    let node;
    while ((node = walker.nextNode())) {
      const original = node.nodeValue;
      const key = normalize(original);
      records.push({ node, ko: original, en: dictionary[key] });
    }
  };

  const preserveSpacing = (original, translated) => {
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    return `${leading}${translated}${trailing}`;
  };

  const renderToggle = (button, lang) => {
    button.innerHTML = `<span class="${lang === "ko" ? "is-active" : ""}">KR</span><span class="lang-divider">/</span><span class="${lang === "en" ? "is-active" : ""}">EN</span>`;
    button.setAttribute("aria-label", lang === "ko" ? "Switch to English" : "한국어로 전환");
  };

  const applyLanguage = (lang) => {
    const next = lang === "en" ? "en" : "ko";
    records.forEach((record) => {
      record.node.nodeValue = next === "en" ? preserveSpacing(record.ko, record.en) : record.ko;
    });
    document.documentElement.lang = next;
    localStorage.setItem(STORAGE_KEY, next);
    document.querySelectorAll(".altis-lang-toggle").forEach((button) => renderToggle(button, next));
  };

  const init = () => {
    const style = document.createElement("style");
    style.textContent = ".altis-lang-toggle{min-width:76px;justify-content:center;gap:5px;color:rgba(255,255,255,.5);font-family:var(--font-mono,monospace);font-size:11px;letter-spacing:.08em;cursor:pointer}.altis-lang-toggle .is-active{color:#fff}.altis-lang-toggle .lang-divider{color:rgba(255,255,255,.25)}";
    document.head.appendChild(style);
    collectTextNodes();
    const actions = document.querySelector(".nav-actions");
    if (actions) {
      const button = document.createElement("button");
      button.className = "nav-cta altis-lang-toggle";
      button.type = "button";
      button.addEventListener("click", () => applyLanguage(document.documentElement.lang === "en" ? "ko" : "en"));
      actions.prepend(button);
    }
    applyLanguage(localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ko");
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
