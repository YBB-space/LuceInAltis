(() => {
  if (window.ALTIS_I18N_READY) return;
  window.ALTIS_I18N_READY = true;

  const STORAGE_KEY = "altis_lang";
  const path = decodeURIComponent(location.pathname.split("/").pop() || "index.html");

  const common = {
    "Address: 진주대로 501 | Founded Date: 2019": "Address: 501 Jinju-daero, Jinju | Founded: 2019",
    "비상을 함께한 분들": "Partners Behind Our Flight",
    "함께하는 스폰서": "Our Sponsors",
    "다음 발사를 함께 만들고 싶으신가요? 파트너로 참여해 주세요.": "Want to help build our next launch? Become an ALTIS partner."
  };

  const pages = {
    "pioneer.html": {
      "동체": "Airframe",
      "PIONEER-I의 동체와 핀은 CFRP로 제작했습니다. 동체 내경은 98 mm이며, 1단 동체 길이는 883 mm, 2단은 780 mm입니다. 복합재 구조로 기체의 질량과 강성을 함께 고려했습니다.": "PIONEER-I uses CFRP body tubes and fins. The airframe has a 98 mm inner diameter, with body lengths of 883 mm for stage 1 and 780 mm for stage 2. The composite structure balances vehicle mass and stiffness.",
      "추진부·에비오닉스·단분리 및 회수 장치의 배치에 맞춰 내부 체결 구조를 설계했습니다. 동체와 핀의 결합, 장치 간 간섭을 확인하고 각 단을 조립해 발사시험 기체에 통합했습니다.": "Internal mounts accommodate the propulsion, avionics, separation, and recovery systems. Airframe-to-fin joints and component clearances were checked before both stages were assembled into the flight-test vehicle.",
      "동체 기술": "Airframe Technology",

      "설계 개요": "Design Overview",
      "CFRP 동체와 핀으로 구조 질량을 줄이고, 각 단에 추진·전자·회수장치를 독립적으로 배치했습니다. 서보모터로 결합을 해제한 뒤 홀 센서로 분리 상태를 확인합니다.": "The CFRP airframe and fins reduce structural mass, with propulsion, avionics, and recovery systems arranged independently in each stage. Servo-driven couplers release the stages, and a Hall sensor confirms separation.",
      "1단 동체 길이": "Stage 1 airframe length",
      "2단 동체 길이": "Stage 2 airframe length",
      "동체 내경": "Airframe inner diameter",
      "동체·핀 재질": "Airframe and fin material",
      "기계식 단분리와 내부 점화, 단별 독립 회수로 이어지는 PIONEER-I의 운용 개념입니다.": "PIONEER-I’s mission concept links mechanical stage separation, onboard ignition, and independent recovery of both stages.",
      "Figure 26 CONOPS · PIONEER-I 비행 시퀀스 개념도": "Figure 26 CONOPS · PIONEER-I nominal mission sequence",
      "기체 구조": "Vehicle Assembly",
      "우리의 기술": "Our Technology",
      "기계식 2단 분리 로켓": "Mechanically Separated Two-Stage Rocket",
      "PIONEER-I는 기계식 단분리와 2단 내부 점화, 각 단의 독립 회수를 적용한 2단 고체로켓입니다. 단분리부터 점화·회수까지 이어지는 과정을 직접 설계하고, 지상 시험과 발사시험으로 확인했습니다.": "PIONEER-I is a two-stage solid rocket with mechanical stage separation, onboard second-stage ignition, and independent recovery for each stage. We designed the separation, ignition, and recovery sequence and evaluated it through ground and flight tests.",
      "1단 추진": "First-stage boost",
      "단 분리": "Stage separation",
      "2단 점화": "Second-stage ignition",
      "추진 시스템": "Propulsion",
      "OpenMotor로 1·2단 모터의 내탄도 성능을 해석하고, 지상 연소시험에서 추력·연소 시간·연소실 압력을 계측했습니다. 실측 추력 곡선과 총 충격량을 해석값과 비교해 추진 성능을 평가했습니다.": "We modeled the internal ballistics of both motors in OpenMotor and measured thrust, burn time, and chamber pressure during ground firing tests. Measured thrust curves and total impulse were compared with predictions to assess propulsion performance.",
      "지상 시험 최대 압력은 1단 1.73 MPa, 2단 1.89 MPa로 설계 제한 2.0 MPa 이내였습니다. 총 충격량은 해석값 대비 각각 90.8%, 95.5%로 측정됐습니다.": "Peak chamber pressures measured in ground tests were 1.73 MPa for stage 1 and 1.89 MPa for stage 2, both below the 2.0 MPa design limit. Measured total impulse reached 90.8% and 95.5% of the respective predictions.",
      "기계식 단분리/사출": "Mechanical Separation / Ejection",
      "상·하단 커플러가 결합 상태에서 추력과 축·횡방향 하중을 지지하고, 서보모터 구동으로 구속을 해제하는 기계식 단분리 구조입니다. 홀 센서와 자석의 상대 위치 변화로 분리 완료를 검출하며, 분리 확인 신호를 2단 점화 허가 조건과 연동했습니다.": "Mating couplers carry thrust and axial and lateral loads while the stages are joined; a servo-driven mechanism releases the restraint. A Hall sensor detects separation through the changing position of a magnet, and separation confirmation is linked to second-stage ignition authorization.",
      "분리가 확인되지 않으면 점화를 차단하고 회수 모드로 전환하는 Fail-safe를 적용했습니다. 1단은 단분리 후, 2단은 최고점 판단 후 낙하산을 전개하도록 설계했으며, CFRP 동체에 장착한 상태에서 분리와 사출 작동을 확인했습니다.": "A fail-safe blocks ignition and switches to recovery mode if separation is not confirmed. The recovery design deploys the first-stage parachute after separation and the second-stage parachute after apogee detection. Separation and ejection were tested with the devices installed in the CFRP airframe.",
      "에비오닉스": "Avionics",
      "IMU의 수직 가속도와 기압계 고도를 1차원 칼만필터로 융합해 고도와 수직 속도를 추정합니다. ESP32-S3와 FreeRTOS 기반 듀얼코어 구조에서 센서 수집·상태 추정과 비행 시퀀스·로그 저장 태스크를 분리했습니다. 유한 상태 기계(FSM)로 비행 단계를 판단하고 점화·사출 출력을 제어합니다.": "A one-dimensional Kalman filter fuses vertical IMU acceleration with barometric altitude to estimate altitude and vertical velocity. On an ESP32-S3 running FreeRTOS, sensor acquisition and state estimation are separated from flight sequencing and logging across two cores. A finite-state machine determines flight phase and controls ignition and deployment outputs.",
      "1단은 데이터 저장과 FLASH6 지상국 통신을, 2단은 자율 비행 시퀀스를 담당합니다. 100 m 거리에서 60초간 수행한 지상 통신 시험에서는 평균 수신 주파수 49.68 Hz, 패킷 손실률 0%를 기록했습니다.": "First-stage avionics handle logging and communication with the FLASH6 ground station; second-stage avionics execute the autonomous flight sequence. A 60-second ground link test at 100 m recorded an average reception rate of 49.68 Hz with 0% packet loss.",
      "지상 시험": "Ground Testing",
      "단품 기능시험에서 에비오닉스 연동·동체 통합시험으로 검증 범위를 확장했습니다. OpenRocket의 시간·고도·속도 데이터를 입력한 비행 시퀀스 모사시험으로 단분리·점화·사출 명령의 출력 순서와 상태 전이를 확인했습니다.": "Verification progressed from component tests to avionics integration and assembled-airframe tests. Simulated flight sequences using OpenRocket time, altitude, and velocity data checked state transitions and the order of separation, ignition, and deployment commands.",
      "발사시험의 최고 고도는 133.349 m로, OpenRocket 예측값 555.573 m와 차이를 보였습니다. 비행 데이터에서 단분리 후 점화 지연에 따른 자세 변화를 분석하고, 그 결과를 반영해 점화 시퀀스를 수정했습니다.": "Flight testing recorded an apogee of 133.349 m, compared with the OpenRocket prediction of 555.573 m. Flight-data analysis identified attitude changes associated with the delay between separation and ignition, and informed revisions to the ignition sequence.",
      "단분리·사출 기술": "Separation & Ejection",
      "추진 기술": "Propulsion",
      "에비오닉스 기술": "Avionics"
},
    "vehicles.html": {
      "ALTIS의 로켓 프로젝트": "ALTIS Rocket Projects",
      "기계식 2단 분리 로켓": "Mechanically Separated Two-Stage Rocket"
},
    "team.html": {
      "로켓을 설계하고 만들며 시험하는 제7대 운영진을 소개합니다.": "Meet the 7th ALTIS leadership team, which works on rocket design, fabrication, and testing.",
      "제7대 운영진": "7th Leadership Team",
      "회장단과 네 기술 팀장이 팀 운영과 제작·시험 일정을 맡고 있습니다.": "The executive officers and four technical leads coordinate team activities, fabrication, and testing.",
      "회장": "President",
      "부회장": "Vice President",
      "25학번": "Entered 2025",
      "24학번": "Entered 2024",
      "23학번": "Entered 2023",
      "학부생": "Undergraduate",
      "제7대 회장": "7th President",
      "제7대 부회장": "7th Vice President",
      "기술 팀장": "Technical Team Leads",
      "전자·미션·동체·추진 팀의 제작과 시험을 각 팀장이 맡고 있습니다.": "Each lead coordinates fabrication and testing for avionics, mission, airframe, or propulsion.",
      "전자팀장": "Avionics Lead",
      "미션팀장": "Mission Lead",
      "동체팀장": "Airframe Lead",
      "추진팀장": "Propulsion Lead",
      "Leadership 페이지를 점검하고 있습니다.": "The Leadership page is currently under maintenance.",
      "곧 다시 공개하겠습니다.": "It will be available again soon.",
      "홈으로 돌아가기": "Back to Home"
    },

    "history.html": {
      "NURA 로켓학술대회에서 ALTIS의 프로젝트를 발표하고 다른 대학 팀과 이야기를 나눴습니다.": "ALTIS presented its project at the NURA Rocket Symposium and exchanged ideas with other university teams.",
      "학술대회": "Symposium",
      "경상국립대학교 로켓동아리 · 2019년 창립": "Gyeongsang National University Rocketry Team · Founded 2019",
      "2019년 창립한 ALTIS는 로켓을 직접 설계하고 제작합니다. 시험과 대회에서 얻은 결과를 다음 프로젝트에 반영합니다.": "Founded in 2019, ALTIS designs and builds rockets. Results from tests and competitions guide the next project.",
      "연혁 · 2019—2026": "Timeline · 2019–2026",
      "2019년, 로켓 동아리 ALTIS가 창립되었습니다.": "The ALTIS rocketry team was founded in 2019.",
      "ALTIS의 활동과 기록": "ALTIS Activities and Records",
      "2019년 창립 후 ALTIS가 진행한 프로젝트와 대회 기록을 모았습니다.": "A record of ALTIS projects and competitions since the team was founded in 2019.",
      "설계하고, 만들고, 시험하며 쌓아온 ALTIS의 시간입니다. 하나의 발사를 향한 도전은 매년 새로운 기록으로 이어집니다.": "This is the record ALTIS has built through design, fabrication, and testing. Each launch adds a new chapter.",
      "설계와 제작, 시험과 발표를 거치며 남긴 주요 기록입니다.": "Key milestones from our design, fabrication, testing, and presentations.",
      "한국항공우주연구원 원장상 수상": "Korea Aerospace Research Institute President's Award",
      "NURA 로켓학술대회에서 프로젝트 결과를 발표하고 다른 대학 팀들과 경험을 나눴습니다.": "ALTIS presented its project at the NURA Rocket Symposium and shared experiences with other university teams.",
      "NURA 전국대학생 로켓학술대회 장려상 수상": "Encouragement Award at the NURA National University Rocket Symposium",
      "NURA 전국대학생로켓학술대회": "NURA National University Rocket Symposium",
      "장려상 수상": "Encouragement Award",
      "NURA 전국대학생로켓학술대회에서 장려상을 수상했습니다.": "ALTIS received an Encouragement Award at the NURA National University Rocket Symposium.",
      "학술대회 수상": "Symposium Award",
      "교내 평가": "University Evaluation",
      "파트너십": "Partnerships",
      "스폰서십 체결": "Sponsorship Agreements",
      "INNOSPACE, JLCPCB, EasyEDA, Ansys와 스폰서십을 체결했습니다.": "ALTIS entered into sponsorship agreements with INNOSPACE, JLCPCB, EasyEDA, and Ansys.",
      "전국 대학 로켓 팀이 참여한 학술대회에서 장려상을 수상했습니다.": "ALTIS received an encouragement award at the symposium for university rocketry teams nationwide.",
      "경상국립대학교 CSA 동아리 평가 A등급": "Grade A in Gyeongsang National University's CSA club evaluation",
      "지역사회 봉사": "COMMUNITY SERVICE",
      "02 / 지역사회 봉사": "02 / COMMUNITY SERVICE",
      "연혁 및 수상 이력": "Timeline & Awards",
      "ALTIS 창립": "ALTIS Founded",
      "2019년, 경상국립대학교 항공우주공학부 학생들이 로켓 동아리 ALTIS를 만들었습니다.": "In 2019, aerospace engineering students at Gyeongsang National University formed the rocketry club ALTIS.",
      "NURA 전국대학교 로켓발사대회": "NURA National University Rocket Launch Competition",
      "금상 수상": "Gold Award",
      "NURA 전국대학교 로켓발사대회에서 금상을 수상했습니다.": "ALTIS received the Gold Award at the NURA National University Rocket Launch Competition.",
      "대회 수상": "Competition Award",
      "한국항공우주연구원 원장상": "Korea Aerospace Research Institute President's Award",
      "NURA 전국대학교 로켓발사대회에서 한국항공우주연구원 원장상을 받았습니다.": "ALTIS received the Korea Aerospace Research Institute President's Award at the NURA National University Rocket Launch Competition.",
      "NURA 로켓학술대회 현장": "NURA Rocket Symposium",
      "대회에 참가해 프로젝트 결과를 발표하고 다른 대학 팀들과 경험을 나눴습니다.": "ALTIS presented its project and shared experiences with other university teams at the competition.",
      "제7대 운영진 출범": "7th Leadership Team Launched",
      "전자·미션·동체·추진 네 기술 분야를 중심으로 새로운 운영진이 ALTIS의 다음 비행을 준비합니다.": "A new leadership team prepares ALTIS for its next flight across avionics, mission, airframe, and propulsion.",
      "CSA 동아리 평가 A등급": "Grade A in the GNU CSA Club Evaluation",
      "경상국립대학교 CSA 동아리 평가에서 A등급을 받았습니다.": "ALTIS received Grade A in Gyeongsang National University's CSA club evaluation.",
      "항공우주 부트캠프": "Aerospace Bootcamp",
      "부트캠프에서 고등학생들과 로켓의 기본 원리와 구조를 살펴보고, 모델 로켓을 함께 만들어 발사합니다.": "At the bootcamp, ALTIS introduces high school students to rocket basics and helps them build and launch model rockets."
    },

    "join.html": {
      "로켓을 설계하고 부품을 만들어 시험하는 활동에 참여할 팀원을 찾습니다. 전공이나 관련 경험이 없어도 지원할 수 있습니다.": "We are looking for students to help design, build, and test rockets. You can apply without prior experience in the field.",
      "로켓을 설계하고 부품을 만들어 시험하는 활동에 참여할 팀원을 찾습니다.": "We are looking for students to help design, build, and test rockets.",
      "전공이나 관련 경험이 없어도 지원할 수 있습니다.": "You can apply without prior experience in the field.",
      "지원하기": "Apply",
      "모집 분야 보기": "View Open Tracks",
      "이런 사람을 기다립니다": "Who We Need",
      "관심 있는 분야를 함께 배우고, 직접 만들어보고 싶은 분을 기다립니다.": "If you want to learn about a field and build things yourself, we would like to hear from you.",
      "설계한 부품을 만들고 시험 장비를 준비합니다.": "Build designed parts and prepare test equipment.",
      "시험 결과를 기록하고 원인을 찾아 다음 설계에 반영합니다.": "Record test results, find the cause of problems, and apply what we learn to the next design.",
      "발사 전 점검부터 현장 운영까지 맡은 일을 함께 합니다.": "Work together on assigned tasks, from pre-launch checks to field operations.",
      "모집 분야": "Open Tracks",
      "희망 분야를 선택해 주세요. 프로젝트를 진행하면서 다른 팀과도 함께 일합니다.": "Choose an area that interests you. You will also work with other teams as projects progress.",
      "지원 절차": "Application Process",
      "추진": "Propulsion",
      "추진 - 0명": "Propulsion — 0 Openings",
      "고체 로켓 모터 설계, 제작, 추력 시험과 추진 시스템 검증": "Solid rocket motor design and fabrication, thrust testing, and propulsion system validation",
      "전자": "Avionics",
      "전자 - 5명": "Avionics — 5 Openings",
      "에비오닉스 설계, 제작": "Avionics system design and fabrication",
      "동체": "Airframe",
      "동체 - 5명": "Airframe — 5 Openings",
      "구조 설계, 해석 CFRP동체 제작": "Structural design and analysis, and CFRP airframe fabrication",
      "미션": "Mission",
      "미션 - 6명": "Mission — 6 Openings",
      "사출 및 미션 장치 설계, 제작": "Ejection and mission system design and fabrication",
      "지원 흐름": "How to Join",
      "지원하기 버튼을 눌러 네이버 폼을 작성하면 지원서가 제출됩니다.": "Select Apply and complete the Naver form to submit your application.",
      "문의하기": "Contact Us",
      "지원서 제출": "Submit Application",
      "관심 분야, 가능한 활동 시간, 만들고 싶은 프로젝트를 간단히 작성합니다.": "Tell us briefly about your interests, availability, and what you hope to build.",
      "면접": "Interview",
      "지원 동기와 관심 분야를 확인하고, ALTIS의 활동과 지원 분야에 관해 이야기합니다.": "We discuss your motivation, interests, ALTIS activities, and the team you are applying to.",
      "팀 합류": "Join the Team",
      "기초 안전 교육과 온보딩을 거친 뒤 실제 제작·시험 업무에 참여합니다.": "After safety training and onboarding, you take part in real fabrication and testing.",
      "궁금한 점이 있다면": "Have Questions?",
      "모집 일정, 활동 방식, 팀별 업무가 궁금하다면 아래 연락처로 문의해 주세요.": "Contact us below with questions about recruitment, activities, or team responsibilities.",
      "모집 준비 중": "Recruitment Coming Soon",
      "지금은 동아리원을 모집하고 있지 않습니다. 다음 모집이 열리면 이 페이지에서 바로 지원할 수 있게 안내하겠습니다.": "ALTIS is not recruiting at the moment. When the next round opens, application details will be posted here.",
      "홈으로": "Back to Home",
      "소식 보기": "View Updates"
    },

    "sponsors.html": {
      "ALTIS 프로젝트": "ALTIS Projects",
      "ALTIS는 경상국립대학교 항공우주공학부 학생들이 로켓을 설계하고 제작하는 팀입니다. 부품 제작과 시험, 발사 준비를 함께할 후원사와 협력사를 찾고 있습니다.": "ALTIS is a student rocketry team at Gyeongsang National University. We design and build rockets, and are looking for partners to support fabrication, testing, and launch preparation.",
      "팀원들이 모터와 동체, 전자 장치를 만들고 지상 시험과 발사 준비를 합니다. 파트너의 지원은 부품 제작과 시험, 발사 운영에 사용됩니다.": "Team members build motors, airframes, and electronics, then run ground tests and prepare for launch. Partner support goes toward parts, testing, and launch operations.",
      "ALTIS는 경상국립대학교 항공우주공학부 학생들이 로켓을 설계하고 제작하는 팀입니다.": "ALTIS is a student rocketry team at Gyeongsang National University. We design and build rockets.",
      "부품 제작과 시험, 발사 준비를 함께할 후원사와 협력사를 찾고 있습니다.": "We are looking for sponsors and partners to support fabrication, testing, and launch preparation.",
      "제안서 보기": "View Proposal",
      "문의하기": "Contact Us",
      "로켓을 설계하고 시험합니다": "We design and test rockets",
      "팀원들이 모터와 동체, 전자 장치를 만들고 지상 시험과 발사 준비를 합니다.": "Team members build motors, airframes, and electronics, then run ground tests and prepare for launch.",
      "파트너의 지원은 부품 제작과 시험, 발사 운영에 사용됩니다.": "Partner support goes toward parts, testing, and launch operations.",
      "직접 설계하고 만듭니다": "Designed and built by the team",
      "설계한 부품을 제작하고 시험해 실제로 작동하는지 확인합니다.": "We build parts from our designs and test that they work as intended.",
      "시험 결과를 다음 설계에 씁니다": "Test results guide the next design",
      "시험마다 측정값과 문제를 기록하고 다음 모터와 기체에 반영합니다.": "We record measurements and problems from each test and use them in the next motor and airframe design.",
      "학생들이 팀으로 배웁니다": "Students work and learn together",
      "추진, 동체, 전자, 미션 팀이 나눠 맡은 일을 맞추며 프로젝트를 진행합니다.": "Propulsion, airframe, avionics, and mission teams coordinate their work as the project progresses.",
      "제안서에서 ALTIS의 활동과 협업 방식, 지원이 필요한 분야를 확인할 수 있습니다.": "The proposal outlines ALTIS activities, ways to collaborate, and areas where support is needed.",
      "새 창에서 열기": "Open in New Tab",
      "다운로드": "Download",
      "파트너십 문의": "Partnership Contact",
      "후원이나 제작·기술 협업에 관심 있으시면 연락해 주세요.": "Contact us if you are interested in sponsorship or technical and fabrication partnerships."
    },

    "avionics.html": {
      "비행 컴퓨터와 지상국을 직접 만들고, 비행 데이터를 수집해 필요한 장치를 제어합니다.": "We build flight computers and ground-station software, collect flight data, and control onboard systems.",
      "전자팀은 비행 컴퓨터와 지상국 프로그램을 직접 설계하고 제작합니다. 기체의 상태를 기록하고 지상으로 보내며, 필요한 비행 장치를 제어합니다.": "The avionics team designs and builds the flight computer and ground-station software. We record the vehicle's status, send it to the ground, and control the required flight devices.",
      "기체에서 지상국까지": "From Vehicle to Ground Station",
      "센서에서 읽은 값은 비행 컴퓨터에 저장되고 무선 통신으로 지상국에 전달됩니다. 전자팀은 이 과정에 필요한 회로, 펌웨어, 통신, 지상국 화면을 함께 만듭니다.": "Sensor readings are stored on the flight computer and sent to the ground station by radio. The avionics team builds the circuits, firmware, communications, and ground-station interface used throughout this process.",
      "IMU와 기압 센서 등에서 기체의 상태를 읽습니다.": "Reads the vehicle's status from the IMU, pressure sensor, and other sensors.",
      "센서 값을 기록하고 사출 장치와 점화 회로를 제어합니다.": "Records sensor data and controls the ejection system and ignition circuits.",
      "기체의 데이터를 무선으로 지상국에 전달합니다.": "Sends vehicle data to the ground station by radio.",
      "발사 전 상태와 비행 데이터를 한 화면에서 확인합니다.": "Shows pre-launch status and flight data on one screen.",
      "AI3와 FLASH6": "AI3 and FLASH6",
      "AI3는 로켓에 탑재되는 비행 컴퓨터이고, FLASH6는 지상에서 비행 상태를 확인하는 프로그램입니다.": "AI3 is the flight computer installed in the rocket. FLASH6 is the ground program used to monitor the flight.",
      "AI3는 센서 계측, 데이터 저장, 무선 통신과 사출 장치 제어를 담당합니다. 회로 설계부터 PCB 조립과 펌웨어 시험까지 전자팀에서 진행합니다.": "AI3 handles sensor measurement, data storage, radio communications, and ejection-system control. The avionics team works from circuit design through PCB assembly and firmware testing.",
      "IMU와 기압 센서 데이터 수집": "Collect IMU and pressure-sensor data",
      "점화·사출 채널과 서보 제어": "Control ignition, ejection channels, and servos",
      "비행 데이터 자체 저장": "Store flight data onboard",
      "지상국 텔레메트리 송수신": "Exchange telemetry with the ground station",
      "FLASH6는 발사 전에 연결 상태를 확인하고 비행 중에는 고도, 속도, 위치와 기체 상태를 표시합니다. 비행이 끝난 뒤에는 저장된 기록을 다시 확인할 수 있습니다.": "FLASH6 checks connections before launch and shows altitude, speed, position, and vehicle status during flight. It also lets the team review saved records after the flight.",
      "센서, 통신, 저장 공간 상태 확인": "Check sensors, communications, and storage",
      "고도·속도·위치와 이벤트 표시": "Show altitude, speed, position, and events",
      "안전 상태 확인과 제어 명령 전송": "Check safety status and send control commands",
      "저장 데이터 확인과 비행 기록 검토": "Review stored data and flight records",
      "전자팀이 하는 일": "What the Avionics Team Does",
      "회로 설계부터 비행 후 데이터 정리까지 전자 시스템에 필요한 작업을 팀 안에서 직접 진행합니다.": "The team handles the work required for the electronics system, from circuit design to organizing data after the flight.",
      "회로 설계": "Circuit Design",
      "전원, 센서, 통신과 제어 회로를 설계하고 PCB를 제작합니다.": "Design power, sensor, communications, and control circuits, then build the PCBs.",
      "펌웨어": "Firmware",
      "센서 값을 읽고 저장하며 비행 장치를 제어하는 코드를 작성합니다.": "Write code that reads and stores sensor data and controls flight devices.",
      "통신": "Communications",
      "기체와 지상국 사이에서 데이터를 안정적으로 주고받도록 시험합니다.": "Test reliable data exchange between the vehicle and ground station.",
      "지상국": "Ground Station",
      "발사 전 점검, 실시간 표시와 비행 기록 확인에 필요한 화면을 만듭니다.": "Build the screens used for pre-launch checks, live display, and flight-record review.",
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
      "고체 로켓 모터를 설계하고 제작합니다. 지상 연소 시험에서 추력과 연소 시간을 측정하고 설계를 고칩니다.": "We design and build solid rocket motors. Static-fire tests measure thrust and burn time, and the results guide design changes.",
      "1단 모터": "First-Stage Motor",
      "2단 모터": "Second-Stage Motor",
      "설계하고, 만들고, 시험합니다": "Design, Build, and Test",
      "추진팀은 목표 추력과 연소 시간에 맞춰 고체 로켓 모터를 설계합니다. 추진제 제작, 부품 가공과 조립, 지상 연소 시험까지 팀에서 직접 진행합니다.": "The propulsion team designs solid rocket motors for the required thrust and burn time. We handle propellant production, part fabrication, assembly, and static-fire testing within the team.",
      "성능 설계": "Performance Design",
      "로켓의 질량과 비행 목표를 바탕으로 필요한 추력, 연소 시간과 추진제 형상을 정합니다.": "Set the required thrust, burn time, and propellant geometry from the rocket's mass and flight goals.",
      "내탄도 해석": "Internal Ballistics",
      "연소 중 챔버 압력과 추력 변화를 계산하고 노즐과 연소관의 설계 조건을 확인합니다.": "Calculate chamber pressure and thrust during the burn, then check the design conditions for the nozzle and motor case.",
      "제작과 조립": "Fabrication and Assembly",
      "KNSB 추진제를 정해진 공정으로 만들고 그레인, 노즐, 연소관을 조립합니다.": "Produce KNSB propellant through a defined process and assemble the grain, nozzle, and motor case.",
      "지상 연소 시험": "Static-Fire Test",
      "시험대에서 추력과 연소 시간을 측정하고 결과를 다음 설계와 제작 공정에 반영합니다.": "Measure thrust and burn time on the test stand and apply the results to the next design and build process.",
      "1단 모터는 KNSB 추진제를 사용합니다. 현재 제원은 설계값과 지상 연소 시험 결과를 기준으로 정리했습니다.": "The first-stage motor uses KNSB propellant. Its current specifications are based on design values and static-fire test results.",
      "2단 모터는 2단 비행 조건에 맞춰 개발하고 있습니다. 확정되지 않은 제원은 설계와 시험이 끝난 뒤 반영합니다.": "The second-stage motor is being developed for second-stage flight conditions. Unconfirmed specifications will be added after design and testing are complete.",
      "연소 시험으로 확인합니다": "Verified by Static-Fire Testing",
      "지상 연소 시험에서 계산한 성능이 나오는지 확인합니다. 추력 데이터를 살펴보고, 영상으로 연소 상태와 부품 손상 여부를 점검합니다.": "Static-fire tests show whether the motor meets its design targets. We review thrust data and video for combustion issues or damaged parts.",
      "1단 모터 지상 연소 시험": "First-stage motor static-fire test",
      "시험 준비": "Test Preparation",
      "시험체와 점화 회로, 시험대 고정 상태와 안전 거리를 확인합니다.": "Check the test article, ignition circuit, test-stand mounting, and safety distance.",
      "계측": "Measurement",
      "로드셀로 추력을 측정하고 영상과 시간 기록을 함께 남깁니다.": "Measure thrust with a load cell and record synchronized video and timing data.",
      "결과 검토": "Result Review",
      "최대 추력, 평균 추력과 연소 시간을 설계값과 비교합니다.": "Compare peak thrust, average thrust, and burn time with the design values."
    },

    "structure.html": {
      "로켓 동체와 핀을 설계·제작하고, 해석과 시험으로 구조를 확인합니다.": "We design and build rocket airframes and fins, then verify their structural performance through analysis and testing.",
      "몰드·조립체 3D 설계": "3D Mold and Assembly Design",
      "구조팀은 로켓 동체와 핀을 설계하고 만듭니다. 무게와 강도를 고려해 구조를 정하고, 해석과 시험으로 확인합니다.": "The structures team designs and builds the rocket body and fins. We consider weight and strength, then check the design through analysis and testing.",
      "동체와 핀을 직접 만들고": "We build the body and fins",
      "시험으로 구조를 확인합니다.": "and check the structure through testing.",
      "기체 설계와 재료 선정, CFRP 성형, 구조 해석과 재료 시험을 진행합니다. 발사 결과도 다음 기체 설계에 반영합니다.": "We design the airframe, select materials, mold CFRP parts, and run structural and material tests. Flight results inform the next airframe design.",
      "복합재 동체 제작": "Composite Body Tube Fabrication",
      "Hand wet lay-up": "Hand wet lay-up",
      "3D 프린팅 몰드를 설계·제작한 뒤 이형제 처리, 섬유 적층, 수지 함침까지 팀에서 합니다. 여러 크기의 CFRP 동체관과 복잡한 형태의 핀을 만들고 있습니다. 2027년부터 VARTM 공정을 도입해 수지 함침을 더 균일하게 할 계획입니다.": "We design and print the molds, then handle release treatment, fiber layup, and resin impregnation. The team makes CFRP body tubes in several sizes and fins with complex shapes. We plan to introduce VARTM in 2027 for more even resin impregnation.",
      "CFRP 핀 구조": "CFRP Fin Structure",
      "핀과 성형 몰드, 지그 제작": "Fin, mold, and jig fabrication",
      "압축 성형 몰드로 핀과 하단 동체 연결부를 제작합니다. 분절형과 일체형 구조를 비교하고, 핀과 제작용 지그도 직접 만듭니다.": "We use compression molds to make the fins and their lower-airframe joints. The team compares segmented and one-piece designs and makes the fins and their jigs in-house.",
      "구조 해석 및 연동 설계": "Structural Analysis and Coupled Design",
      "ANSYS Fluent 외부 공력 해석 결과를 Static Structural로 연계하는 One-way FSI 해석을 수행합니다. 안전계수와 극한하중 기준을 적용해 실제 비행 하중에서 구조 건전성을 정량적으로 검증합니다.": "We conduct one-way FSI by transferring external aerodynamic results from ANSYS Fluent into Static Structural. Safety-factor and ultimate-load criteria quantitatively verify structural integrity under actual flight loads.",
      "재료 물성 시험": "Material Property Testing",
      "자체 제작한 CFRP 시편의 인장·압축·전단 시험으로 실제 적층 물성치를 확보합니다. ASTM D3039, D3410, D3518 규격의 시험 결과를 ANSYS ACP 복합재 파손 해석에 반영합니다.": "Tensile, compression, and shear tests on in-house CFRP specimens establish measured laminate properties. Results from ASTM D3039, D3410, and D3518 testing feed into composite failure analysis in ANSYS ACP.",
      "CFRP 시편 시험 결과": "CFRP Specimen Test Results",
      "교내 복합재 구조 연구실과 외부 시험기관의 측정 결과를 모아 재료 데이터를 정리합니다. 결과는 Tsai-Wu와 Puck 파손 기준을 활용한 해석에 사용합니다.": "We compile material measurements from the university's composite structures lab and external testing institutes. The data is used in analyses with the Tsai-Wu and Puck failure criteria.",
      "시험발사 후 설계 수정": "Design Changes After Flight Tests",
      "발사 후 비행 컴퓨터 기록과 영상을 확인해 구조 문제를 찾습니다. 분리 장치, 낙하산 전개, 비행 자세 결과를 다음 설계에 반영합니다.": "After launch, we review flight-computer logs and video for structural issues. Stage separation, parachute deployment, and flight attitude results inform the next design.",
      "보유 기술": "Core Capabilities",
      "CFRP 복합재 성형 공정 설계 및 실습": "CFRP composite molding process design and fabrication",
      "Fusion 360 기반 몰드·조립체 3D 설계": "Fusion 360-based 3D mold and assembly design",
      "ANSYS Fluent 외부 공력 CFD 해석": "External aerodynamic CFD analysis in ANSYS Fluent",
      "ANSYS Workbench 기반 One-way FSI 해석": "One-way FSI analysis in ANSYS Workbench",
      "ANSYS ACP 복합재 적층 설계 및 파손 해석": "Composite layup design and failure analysis in ANSYS ACP",
      "ASTM 규격 기반 복합재 물성 시험 및 데이터 처리": "ASTM-based composite property testing and data processing",
      "시험발사 데이터 기반 구조 설계 보정": "Structural design refinement using flight-test data",
      "동체와 핀, 몰드까지": "Bodies, fins, and molds",
      "직접 만듭니다.": "Made by the team."
    },

    "ejection system.html": {
      "비행 임무 장치와 회수 시스템을 설계하고 실제 작동을 시험합니다.": "We design mission hardware and recovery systems, then test their operation.",
      "분리부 하우징을 단순화해 사출 모듈을 구성합니다.": "We simplify the separation housing to form the ejection module.",
      "가이드 구조를 통해 모듈의 조립과 점검을 쉽게 합니다.": "Guide structures make the module easier to assemble and inspect.",
      "EJECTION SYSTEM 페이지를 준비 중입니다.": "The EJECTION SYSTEM page is under construction.",
      "곧 업데이트됩니다.": "Coming soon."
    }
  };

  const normalize = (value) => value.replace(/\s+/g, " ").trim();
  const dictionary = Object.assign({}, common, pages[path] || {});
  const records = [];

  // Translate descriptions as well as visible copy. Gallery controls manage their
  // own labels so their original Korean captions remain intact on return visits.
  const translateDescriptions = () => {
    const descriptions = {
      "ALTIS 홈으로 이동": "Go to ALTIS Home",
      "ALTIS 로고": "ALTIS logo",
      "ALTIS 현장 항공 촬영 이미지": "Aerial view of an ALTIS field test",
      "고등학생들이 모델 로켓을 제작하는 ALTIS 항공우주 부트캠프 수업": "High school students build model rockets at the ALTIS Aerospace Bootcamp",
      "모델 로켓과 낙하산을 조립하는 항공우주 부트캠프 참가 학생들": "Aerospace Bootcamp students assemble model rockets and parachutes",
      "PIONEER-I 비행 시퀀스 도식": "PIONEER-I mission sequence diagram",
      "발사 준비, 1단 점화와 연소 종료, 기계식 단분리, 1단 낙하산 회수, 2단 점화와 연소 종료, 최고점 도달, 2단 낙하산 회수와 데이터 회수로 이어지는 PIONEER-I 운용 개념도": "PIONEER-I mission sequence: launch preparation, first-stage ignition and burnout, mechanical separation, first-stage parachute recovery, second-stage ignition and burnout, apogee, second-stage parachute recovery, and data retrieval",
      "PIONEER-I 로켓 조립 모델": "PIONEER-I rocket assembly model",
      "추진 시스템 지상 연소시험 영상": "Propulsion system static-fire test video",
      "뉴 스페이스 시대의 우주항공산업 | YTN 사이언스": "Aerospace in the New Space Era | YTN Science",
      "ALTIS 연혁": "ALTIS History",
      "ALTIS 창립 초기 활동 모습": "ALTIS activities in the team's founding years",
      "ALTIS 비행 컴퓨터 PCB 설계": "ALTIS flight computer PCB design",
      "ALTIS AI3 비행 컴퓨터 PCB": "ALTIS AI3 flight computer PCB",
      "FLASH6 지상국 프로그램 비행 화면": "FLASH6 ground-station flight display",
      "ALTIS 고체 로켓 모터 지상 연소 시험": "ALTIS solid rocket motor static-fire test",
      "ALTIS 1단 고체 로켓 모터 지상 연소 시험": "ALTIS first-stage solid rocket motor static-fire test",
      "ALTIS 동체 구조": "ALTIS airframe structure",
      "CFRP 동체를 Hand wet lay-up 방식으로 제작하는 과정": "CFRP body tube fabrication using hand wet layup",
      "압축 성형 몰드로 CFRP 핀을 제작하는 과정": "CFRP fin fabrication using compression molds",
      "CFRP 시편 인장시험": "CFRP specimen tensile test",
      "CFRP 시편 인장시험 하중 변위 결과": "CFRP tensile-test load-displacement results",
      "시험발사 기체 설계와 안정성 검토 화면": "Flight-test vehicle design and stability analysis",
      "ALTIS 미션 시스템": "ALTIS mission system",
      "경상국립대학교 로켓동아리 ALTIS의 연혁과 주요 기록": "History and milestones of ALTIS, the Gyeongsang National University rocketry team",
      "경상국립대학교 로켓동아리 ALTIS 제7대 운영진 소개": "Meet the seventh leadership team of ALTIS at Gyeongsang National University",
      "ALTIS가 직접 설계하고 제작하는 CFRP 동체, 핀, 핀 지그를 소개합니다.": "Explore CFRP body tubes, fins, and fin jigs designed and built by ALTIS."
    };
    const attributes = [];
    document.querySelectorAll('[alt], [aria-label], [title], meta[name="description"]').forEach((element) => {
      if (element.closest('[data-stacked-gallery], [data-photo-gallery]')) return;
      ['alt', 'aria-label', 'title', 'content'].forEach((name) => {
        const ko = element.getAttribute(name);
        if (!ko) return;
        const profile = name === 'alt' && element.closest('.person');
        const en = descriptions[ko] || (profile && `${profile.querySelector('.person-name-roman')?.textContent.trim()} profile`);
        if (en) attributes.push({ element, name, ko, en });
      });
    });
    const render = () => {
      const english = document.documentElement.lang === 'en';
      attributes.forEach(({ element, name, ko, en }) => element.setAttribute(name, english ? en : ko));
    };
    render();
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  };

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
    button.setAttribute("aria-pressed", String(lang === "en"));
  };

  const applyLanguage = (lang) => {
    const next = lang === "en" ? "en" : "ko";
    records.forEach((record) => {
      record.node.nodeValue = next === "en" ? preserveSpacing(record.ko, record.en) : record.ko;
    });
    document.documentElement.lang = next;
    localStorage.setItem(STORAGE_KEY, next);
    document.querySelectorAll(".altis-lang-toggle").forEach((button) => renderToggle(button, next));
    document.dispatchEvent(new CustomEvent("altis-lang-change", { detail: { lang: next } }));
  };

  const init = () => {
    translateDescriptions();
    // The home page has a keyed dictionary and its own language control.
    if (document.querySelector('.lang-toggle')) return;
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
    applyLanguage(localStorage.getItem(STORAGE_KEY) === "ko" ? "ko" : "en");
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
