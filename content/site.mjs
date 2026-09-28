export const profile = {
  name: 'Polina Kliuchnikova',
  title: 'Staff ML Engineer & Researcher',
  email: 'pskliuchnikova@outlook.com',
  description: 'Staff ML Engineer at Huawei and PhD student at ITMO. LLM post-training, evaluation, human–AI interaction and production machine learning.',
  base: 'https://kliuchnikovaps.github.io/tapelich/',
  updated: '2026-09-28',
  cv: 'assets/documents/Polina_Kliuchnikova_CV.pdf',
  portrait: { src: 'assets/png/profile3-cutout.png', width: 1137, height: 1383 },
  socials: [
    ['LinkedIn', 'https://www.linkedin.com/in/kliuchnikova-ps/'],
    ['GitHub', 'https://github.com/kliuchnikovaps'],
    ['Google Scholar', 'https://scholar.google.com/citations?user=6XguSygAAAAJ'],
    ['ISTINA', 'https://istina.msu.ru/workers/251795028/']
  ]
};

export const experience = [
  { company: 'Huawei', role: 'Staff ML Engineer', dates: 'Sep 2025 — present', file: 'job_huawei.html', category: 'Huawei', intro: 'Language models, retrieval and on-device ML.', description: 'I develop LLM post-training and evaluation pipelines, train code-retrieval models on multiple GPUs, and bring embedding models to HarmonyOS devices.', highlights: ['RLHF, reward modelling and training-data quality controls.', 'VESO-4 retriever training with DDP; code search and graph-based retrieval.', 'On-device VESO embeddings with MindSpore Lite, ArkTS and Rust.', 'Model and agent evaluation, including LoCoBench-Agent.'] },
  { company: 'Sber', role: 'Tech Lead, Machine Learning', dates: 'Feb 2024 — Aug 2025', file: 'job_sber.html', category: 'Sber', intro: 'Applied ML from research to business use.', description: 'I led work across geospatial prediction, NLP log analysis and LLM-assisted business workflows, combining hands-on engineering with technical leadership.', highlights: ['Multimodal location representations and predictive models.', 'LLM-assisted goal verification and recommendations.', 'GPU inference optimisation, production workflows and mentoring.'] },
  { company: 'VK / MY.GAMES', role: 'Senior Data Analyst', dates: 'Oct 2021 — Sep 2023', file: 'job_vk.html', category: 'VK / MY.GAMES', intro: 'Player behaviour, product experiments and predictive analytics.', description: 'I developed LTV and retention models, analysed promotions and in-game events, and automated analytical workflows with Python, SQL, Spark and Airflow.', highlights: ['Player value, churn, segmentation and multi-account behaviour.', 'Promotion analysis, pricing and marketing attribution.', 'Recurring data pipelines and communication with product teams.'] },
  { company: 'CAE Fidesys', role: 'C++ Core Developer', dates: 'Sep 2020 — Aug 2021', file: 'job_2.html', intro: 'Numerical algorithms for computational mechanics.', description: 'I implemented core numerical methods for effective material properties and contributed to two registered software programs.', highlights: ['Finite-element and finite-difference methods.', 'Effective elastic and elastoplastic material properties.', 'C++ implementation and GPU computation.'] },
  { company: 'Lomonosov MSU', role: 'Researcher', dates: 'Dec 2019 — Aug 2021', file: 'job_msu.html', intro: 'Applied mathematics and scientific computing.', description: 'I studied heterogeneous materials, thermoelasticity and metamaterial stability using numerical modelling. This work forms the mathematical foundation of my later ML research.', highlights: ['Representative-volume modelling and homogenisation.', 'Research publications and collaborative scientific work.', 'A materials-analysis SaaS prototype developed for a startup competition.'] },
  { company: 'Teaching', role: 'Mathematics tutor & instructor', dates: '2018–2019; additional teaching in 2022', file: 'job_1.html', intro: 'Explaining mathematical ideas through individual and group teaching.', description: 'I prepared students for mathematics examinations and taught advanced topics in MSU-associated educational settings, including the Kolmogorov school.', highlights: ['Individual learning plans and problem-solving practice.', 'Connecting formal reasoning to understandable examples.', 'Mentoring students and adapting explanations to their needs.'] }
];

export const skillGroups = [
  { title: 'LLM training & alignment', description: 'From training examples to the optimisation loop.', skills: ['SFT', 'RLHF / RLAIF', 'PPO', 'Reward modelling', 'Synthetic data', 'Distributed training'], project: 'huawei-rlhf' },
  { title: 'Retrieval & evaluation', description: 'Finding relevant evidence and assessing model behaviour.', skills: ['RAG', 'Embeddings', 'Reranking', 'Knowledge graphs', 'Benchmark design', 'Data quality'], project: 'huawei-code-search' },
  { title: 'On-device ML', description: 'Taking embedding models from Python to a mobile runtime.', skills: ['HarmonyOS / OpenHarmony', 'MindSpore Lite', 'ArkTS', 'Rust', 'C FFI / NAPI', 'ByteLevel BPE'], project: 'huawei-on-device' },
  { title: 'Applied ML & analytics', description: 'Models and experiments tied to a product question.', skills: ['Forecasting', 'LTV / retention', 'A/B testing', 'Geospatial ML', 'Process mining', 'Feature engineering', 'SHAP'], project: 'sber-geo' },
  { title: 'Mathematics & research', description: 'Formal models, statistical evidence and their limits.', skills: ['Game theory', 'Nash / QRE', 'Bayesian methods', 'Monte Carlo', 'Permutation tests', 'Identifiability', 'Finite elements', 'Inverse problems'], project: 'research-oversight' },
  { title: 'Languages & ML libraries', description: 'The core of my modelling and engineering work.', skills: ['Python', 'C++', 'Rust', 'ArkTS', 'SQL', 'PyTorch / DDP', 'Hugging Face', 'DeepSpeed', 'scikit-learn', 'CatBoost', 'LightGBM', 'XGBoost', 'NumPy', 'Pandas'], project: 'huawei-veso-training' },
  { title: 'Serving, data & workflow', description: 'Tools used across deployment and analytical pipelines.', skills: ['vLLM', 'TensorRT', 'ONNX', 'CUDA', 'Docker', 'Linux', 'Git / GitLab', 'Spark', 'Airflow', 'MLflow', 'pytest', 'Hadoop', 'GeoPandas / H3'], project: 'sber-location-production' }
];

export const additionalTools = ['TensorFlow', 'JAX', 'LangChain', 'NLTK', 'Gensim', 'Natasha', 'Greenplum', 'Hive', 'R', 'Power BI', 'Zeppelin', 'SciPy', 'Statsmodels', 'Kubernetes', 'Chroma', 'Jupyter', 'Matplotlib / Seaborn'];

export const publications = [
  { status: 'In press', year: 'Forthcoming', title: 'Adaptation of Artificial Intelligence Agents to Individual Operators’s Cognitive States Using Reinforcement Learning', authors: 'S. V. Kovalchuk, D. V. Fedrushkov, P. S. Kliuchnikova & A. T. S. Ireddy', detail: 'Cognitive critics and reinforcement learning from AI feedback.', href: 'research-cognitive-critic.html' },
  { status: 'Published', year: '2022', title: 'Numerical analysis of the effective thermal properties and the stability for NTE metamaterials using CAE fidesys', authors: 'M. Ya. Yakovlev, P. S. Tanasevich, A. V. Vershinin & V. A. Levin', detail: 'AIP Conference Proceedings 2509, 020210. DOI: 10.1063/5.0084835.', href: 'science-1.html' },
  { status: 'Conference abstract', year: '2026', title: 'A role-based model of human–AI interaction in hybrid cognitive systems: a software development scenario', authors: 'P. I. Zaitsev, P. S. Kliuchnikova, D. V. Fedrushkov, O. V. Kubryak & S. V. Kovalchuk', detail: 'XI International Conference on Cognitive Science · MAKI / NEIMARK, pp. 232–234. Original in Russian.', href: 'https://disk.yandex.ru/i/PI8BHcjKApD3eA' }
];

export const talks = [
  {
    id: 'cogsci-2026', event: 'Cognitive Science 2026', date: '26 August 2026', location: 'Nizhny Novgorod · XI International Conference on Cognitive Science',
    title: 'Roles, delegation and verification in human–AI collaboration',
    originalTitle: 'Ролевая модель взаимодействия человека и искусственного интеллекта в гибридных когнитивных системах на примере сценария разработки программного обеспечения',
    summary: 'A role-based model of human–AI interaction in software development: when a person delegates, when they verify and how the AI’s role shapes the collaboration.',
    paragraphs: [
      'I presented a role-based account of human–AI interaction in hybrid cognitive systems, using software development as the application scenario. The model makes the choices of the human and AI explicit so that their interaction can be analysed.',
      'The research connects delegation and verification to the roles of generator and assistant. Game-theoretic analysis provides a language for examining incentives, equilibria and the assumptions needed to interpret the observed behaviour.',
      'The presentation was part of the “Cognitive Modelling: Mathematical Approaches — 2” session. The programme lists P. I. Zaitsev, P. S. Kliuchnikova, D. V. Fedrushkov, O. V. Kubryak and S. V. Kovalchuk.'
    ],
    // Add a local path or an HTTPS URL to show each button. Empty fields stay hidden.
    video: '', slides: '',
    certificate: 'assets/documents/conferences/cogsci-2026-speaker-certificate.png',
    photo: 'assets/jpeg/conferences/cogsci-2026-speaking.jpg',
    photoAlt: 'Polina Kliuchnikova presenting her human–AI role model beside a slide on game-theoretic equilibria at the XI International Conference on Cognitive Science.',
    photoCaption: 'Presenting the role-based model of human–AI collaboration in Nizhny Novgorod, August 2026.',
    sources: [['Published abstract · pp. 232–234', 'https://disk.yandex.ru/i/PI8BHcjKApD3eA'], ['Conference website', 'https://cogsci.neimark-it.ru/'], ['Official programme', 'https://disk.yandex.ru/i/WxBNqiVYyOjlTA']],
    related: ['research-oversight'], label: 'Human–AI interaction · MAKI'
  },
  {
    id: 'aij', event: 'AI Journey 2024', date: '11–13 December 2024', location: 'Moscow · Science track',
    title: 'Multimodal embeddings for banking transactions and geodata',
    originalTitle: 'Мультимодальные эмбеддинги для банковских операций и геоданных: понимание нужд клиентов и анализ пространственных паттернов через последовательности событий',
    summary: 'A joint talk with Maxim Kalashnikov about learning from event sequences. My part combined CoLES and GigaChat embeddings for geospatial prediction.',
    paragraphs: [
      'Maxim Kalashnikov and I presented two applications of multimodal event representations. My part combined CoLES event embeddings with GigaChat representations for geospatial tasks, including prediction of purchasing activity and commercial property prices.',
      'Maxim introduced the Multimodal Banking Dataset (MBD). Together, the two parts connected transaction sequences, geographic information and language representations to the analysis of customer behaviour and spatial patterns.',
      'Sber AI Lab’s conference recap confirms the joint presentation and describes the contributions of both speakers. The recording and conference recap are available through the links above.'
    ],
    video: 'https://vkvideo.ru/video-22522055_456244721', slides: '',
    sources: [['Conference recording archive', 'https://aij.ru/archive?albumId=7&videoId=788'], ['Sber AI Lab recap', 'https://t.me/sb_ai_lab/58']],
    related: ['sber-geo'], label: 'Multimodal learning', image: 'assets/jpeg/aij.png'
  },
  {
    id: 'conference-1', event: 'DataFest 2024', date: '2024', location: 'DataFest', title: 'Multimodal geo-embeddings: methods, results and implementation',
    summary: 'Representing locations through event sequences and using their embeddings in spatial prediction workflows.',
    paragraphs: [
      'The presentation explores how event data can represent the characteristics of a location. It connects sequence representation learning to downstream tasks such as forecasting commercial rental prices.',
      'The workflow uses PyTorch-LifeStream, CoLES and sequence-order objectives, with H3-based spatial aggregation. The learned representations are used as model features and stored in Hadoop for periodic updates.',
      'The emphasis is on the complete path from raw events to reusable location representations: spatial aggregation, model comparison and integration with existing data workflows.'
    ],
    video: 'https://youtu.be/wTDzDgQ5Hfg', slides: 'https://drive.google.com/file/d/1K0Ri7ku4yXAQO5ww1IJv1afYurtOnHLl/view?usp=sharing',
    sources: [], related: ['sber-geo'], label: 'Geospatial ML', image: 'assets/jpeg/datafest_logo.png', note: 'conference-1'
  },
  {
    id: 'process_mining', event: 'Process Mining 2024', date: '2024', location: 'Process Mining', title: 'Finding application errors through ML and process mining',
    summary: 'Connecting technical log classification to the steps, delays and bottlenecks in a customer journey.',
    paragraphs: [
      'The talk describes how technical logs can reveal errors in employee–application interactions. A binary classification model identifies error sessions, while process mining provides the surrounding journey context.',
      'The workflow covers collecting and filtering logs, reconstructing event sequences, analysing errors, presenting findings and following up on improvements. Process discovery, performance analysis, clustering and anomaly detection support different parts of the investigation.',
      'The practical goal is to help teams prioritise recurring problems and evaluate whether a change makes the application journey simpler and more reliable.'
    ],
    video: '', slides: 'https://drive.google.com/file/d/1qJbcdfj6NMxQ3RVJfJ6nmjk1X36tvr04/view?usp=sharing',
    sources: [], related: ['sber-logs'], label: 'Applied ML', image: 'assets/jpeg/process_mining_start.png', note: 'process_mining'
  },
  {
    id: 'conf_spb', event: 'Mechanics Congress 2023', date: '21–25 August 2023', location: 'Saint Petersburg · XIII All-Russian Congress on Theoretical and Applied Mechanics',
    title: 'Inverse modelling of auxetic metamaterial properties with machine learning',
    summary: 'Combining numerical mechanics and ML to connect desired effective properties to a material’s microstructure.',
    paragraphs: [
      'This research presentation considers an inverse problem in metamaterial design. Numerical simulations connect unit-cell geometry to effective mechanical properties; machine learning supports the reverse mapping from target properties to geometry.',
      'The work draws on finite-element modelling and the CAE Fidesys environment. It illustrates the connection between my background in applied mathematics and later data-driven modelling work.',
      'The conference abstract is listed in the congress proceedings on pages 822–824, under P. S. Tanasevich, M. Ya. Yakovlev and A. V. Vershinin.'
    ],
    video: '', slides: '', sources: [['Research profile', 'https://istina.msu.ru/workers/251795028/']], related: ['tomsk_2023'], label: 'Applied mathematics'
  }
];
