const S = (title, ...paragraphs) => ({ title, paragraphs });
const P = (id, category, title, summary, tools, sections, extra = {}) => ({ id, category, title, summary, tools, sections, ...extra });

export const projects = [
  P('huawei-rlhf', 'Huawei', 'LLM post-training & alignment',
    'Building the training loop from synthetic data and reward models to distributed fine-tuning and evaluation.',
    ['Python', 'PyTorch', 'DeepSpeed', 'SFT', 'PPO', 'RLHF', 'vLLM'], [
      S('The problem', 'Post-training connects a language model’s capabilities to the behaviour a task actually requires. The quality of the feedback, the reward signal and the evaluation process matters as much as the optimisation itself.'),
      S('My contribution', 'At Huawei, I developed RLHF post-training pipelines covering synthetic data generation, training-data quality controls, reward modelling and PPO. My work connects data preparation, model training and evaluation rather than treating these as separate experiments.'),
      S('Training workflow', 'The workflow includes supervised fine-tuning and reinforcement learning from feedback. I fine-tuned and post-trained language models in multi-GPU environments using DeepSpeed and mixed precision, and used vLLM for inference.', 'Quality checks on training examples and evaluation of generated outputs support iteration on the data and reward signal. This makes it possible to inspect where a change helps and where it introduces a new failure mode.'),
      S('What this work demonstrates', 'Hands-on experience across the post-training cycle: preparing training data, implementing learning pipelines, running distributed experiments and evaluating the resulting behaviour.')
    ], { role: 'Staff ML Engineer', period: '2025–present', featured: true, visual: 'training' }),
  P('huawei-on-device', 'Huawei', 'On-device VESO embeddings for HarmonyOS',
    'Porting embedding models to an ArkTS app with MindSpore Lite, reaching MRR 0.80 on device versus 0.81 in Python.',
    ['HarmonyOS', 'OpenHarmony', 'MindSpore Lite', 'ArkTS', 'Rust', 'C FFI', 'NAPI', 'ByteLevel BPE'], [
      S('The problem', 'Running an embedding model on a device requires more than exporting its weights. Tokenisation, pooling, numerical precision and the application runtime must reproduce the behaviour of the Python reference closely enough to preserve retrieval quality.'),
      S('My contribution', 'In the tokenveso project, I brought VESO embedding models into an ArkTS application using MindSpore Lite. I implemented the runtime integration and investigated discrepancies between the on-device pipeline and the Python implementation.'),
      S('Two tokenisation paths', 'I cross-compiled the Hugging Face Rust tokenizers library for OpenHarmony on aarch64 and connected it to the application through C FFI and NAPI.', 'I also implemented a ByteLevel BPE tokenizer directly in ArkTS and designed a binary vocabulary format. This work covered both the native library bridge and an application-language implementation of tokenisation.'),
      S('Debugging the full pipeline', 'I traced differences in the embeddings to several distinct causes: pooling applied automatically by the model converter, a cosine-similarity deviation of roughly 0.03 with FP16, and a vocabulary-loading issue that exposed only 9 tokens instead of 51,416.', 'Checking intermediate outputs helped distinguish errors in tokenisation and model conversion from numerical differences at inference time.'),
      S('Result', 'On the project’s retrieval evaluation, the on-device pipeline achieved MRR 0.80 compared with 0.81 for the Python reference: a 0.01 absolute gap, or about 1.2% relative. These measurements describe the comparison in this project.', 'The result demonstrates a complete path from a research embedding model to an application running on a device, including model conversion, native integration, tokenisation and retrieval-quality checks.')
    ], { role: 'Staff ML Engineer', period: '2025–present', links: [['Related: VESO-4 training', 'huawei-veso-training.html']] }),
  P('huawei-veso-training', 'Huawei', 'VESO-4: training a code retriever',
    'Training a CodeBERT dual encoder on approximately 1.9 million code–text pairs across six languages, using eight GPUs.',
    ['PyTorch DDP', 'CodeBERT', 'CodeAwarePooling', 'InfoNCE', 'Contrastive learning', 'CodeSearchNet', 'MTEB', 'NCCL'], [
      S('The problem', 'Code search needs a retriever that maps natural-language queries and code into a useful shared representation. This project focused on training the retrieval model itself, building on the broader work on corpus quality and reranking.'),
      S('Model and training objective', 'VESO-4 uses a CodeBERT-based dual encoder with CodeAwarePooling. The training objective combines InfoNCE, Hierarchical Window Contrastive Loss and geometric distillation.', 'I worked with CodeSearchNet data covering six programming languages and approximately 1.9 million pairs, running distributed training on eight GPUs with PyTorch DDP.'),
      S('Repairing the training pipeline', 'I corrected five critical issues in the initial pipeline: a placeholder forward pass, incorrect loss targets, duplicate optimiser setup, a toy-data configuration and missing retrieval metrics.', 'These fixes established a usable training and evaluation path: the intended model computation, objective, data and retrieval measurements were all connected in the same workflow.'),
      S('Distributed execution and evaluation', 'I resolved NCCL communication issues, DDP race conditions and NFS-related problems that affected distributed runs. Evaluation used MTEB to assess the retriever beyond the training loss.'),
      S('Delivery', 'The work produced a repaired distributed training pipeline, retrieval evaluation, merge requests and documentation in Confluence. It brings together model design, training correctness, multi-GPU infrastructure and reproducible evaluation.')
    ], { role: 'Staff ML Engineer', period: '2025–present', links: [['Corpus & reranking work', 'huawei-code-search.html'], ['On-device deployment', 'huawei-on-device.html']] }),
  P('huawei-evaluation', 'Huawei', 'LLM evaluation workflows',
    'Evaluation frameworks for generated outputs and agents, including RAG-based assessment and LoCoBench-Agent.',
    ['Python', 'LLM evaluation', 'Agent evaluation', 'LoCoBench-Agent', 'RAG', 'Benchmark design'], [
      S('The problem', 'Model changes need repeatable assessment. A useful benchmark must make its task, reference information and grading criteria explicit so that a score can be traced back to the outputs being evaluated.'),
      S('My contribution', 'I designed evaluation frameworks and metrics for grading model outputs. I also worked on a RAG-based evaluation system to improve how relevant context is retrieved and used during assessment.'),
      S('Approach', 'The work links evaluation examples, reference context, generated answers and grading criteria in a reusable workflow. Retrieval supplies task-relevant material; the evaluation layer assesses the output against the defined task.', 'Benchmark design and data validation are treated together: ambiguous examples, incomplete context and inconsistent grading can obscure whether the model itself has improved.'),
      S('Agent evaluation with LoCoBench-Agent', 'I ran models, including VESO, through LoCoBench-Agent and investigated failures in the agent evaluation pipeline. In one run, the reported success rate was 0% because the agent crashed before its first turn.', 'Tracing the execution failure established why the benchmark could not yet measure the model’s task performance. This work added agent-level execution diagnostics to the evaluation of generated answers.'),
      S('Outcome', 'Reusable evaluation workflows for model development, with explicit attention to assessment quality, agent execution and the computational cost of running evaluations. This project complements the post-training pipeline by providing a way to inspect its results.')
    ], { role: 'Staff ML Engineer', period: '2025–present' }),
  P('huawei-code-search', 'Huawei', 'Semantic search for code',
    'Improving code retrieval through corpus cleaning, augmentation and a custom reranker.',
    ['Python', 'Embeddings', 'Reranking', 'Data validation'], [
      S('The problem', 'Finding code by meaning is different from matching keywords. Noisy examples, inconsistent query–code pairs and superficially similar candidates can all reduce the usefulness of the retrieved results.'),
      S('My contribution', 'I worked on semantic code search through systematic data cleaning, augmentation and a custom reranker. A central part of the work was identifying subtle inconsistencies and edge cases in the corpus.'),
      S('Approach', 'The pipeline combines preparation of the retrieval data with model-based ranking. Cleaning and augmentation improve the examples available to the system; reranking refines the candidate ordering for a particular query.', 'These components address different sources of error. Improving the data does not replace retrieval evaluation, and a stronger reranker cannot fully compensate for missing or misleading examples.'),
      S('Outcome', 'A retrieval workflow that combines data quality work with relevance modelling. The project shows my experience with the complete retrieval process, from corpus preparation to the quality of the final ranking.')
    ], { role: 'Staff ML Engineer', period: '2025–present' }),
  P('huawei-graph-search', 'Huawei', 'Graph-augmented LLM search',
    'Connecting entity linking, graph representations and language-model context for multi-hop retrieval.',
    ['Knowledge graphs', 'Cross-encoders', 'GraphSAGE', 'GAT', 'LLMs'], [
      S('The problem', 'Some questions require relationships between several entities. A flat list of text passages can miss the structure needed to connect those entities and retrieve the relevant evidence.'),
      S('My contribution', 'I designed a knowledge-graph semantic search approach for multi-hop reasoning. The work combined cross-encoder entity linking, graph-based subgraph representations and conversion of graph facts into language-model context.'),
      S('Approach', 'Entity linking maps a question to candidate entities in the graph. Relevant subgraphs provide relational context, with GraphSAGE and GAT considered for encoding that structure.', 'Triple-based linearisation represents selected relationships as text that can be supplied to an LLM. This connects structured relational information to a text-based generation interface.'),
      S('Outcome', 'A research and engineering approach to connecting graph retrieval with LLMs. The focus is the interface between entity resolution, relational context and generation, rather than a claim that a language model can infer missing evidence reliably.')
    ], { role: 'Staff ML Engineer', period: '2025–present' }),
  P('huawei-long-context', 'Huawei', 'Long-context model optimisation',
    'Work on positional representations and attention efficiency for longer language-model contexts.',
    ['Transformers', 'RoPE', 'Sliding-window attention', 'PyTorch'], [
      S('The problem', 'Longer contexts increase the computational and memory demands of Transformer models. Changes to positional representations and attention need to balance useful context with the available compute.'),
      S('My contribution', 'I worked on integrating rotary positional embeddings (RoPE) and sliding-window attention into model optimisation experiments, with attention to long-range dependencies and computational efficiency.'),
      S('Technical focus', 'RoPE provides a positional representation within attention. Sliding-window attention limits the local attention region to control its cost. Their roles are different, so improvements need to be assessed against the context requirements of the task.', 'This work sits alongside distributed training and inference optimisation: architecture choices, numerical precision and execution settings all affect the practical behaviour of a model.'),
      S('Outcome', 'Experience with Transformer architecture changes and the trade-offs involved in supporting longer inputs, connecting model design to the constraints of training and inference.')
    ], { role: 'Staff ML Engineer', period: '2025–present' }),

  P('sber-geo', 'Sber', 'Multimodal geospatial intelligence',
    'Combining event sequences, geographic context and language-model embeddings for location-level prediction.',
    ['PyTorch-LifeStream', 'CoLES', 'GigaChat', 'H3', 'PCA', 'Hadoop'], [
      S('The problem', 'Location-level forecasts need to account for both what happens in an area and what makes that area distinctive. Transaction sequences, points of interest, location types and text descriptions contain complementary information that is lost in simple tabular aggregates.'),
      S('My contribution', 'I developed the event-embedding and language-model feature pipeline and worked with data engineers, deployment engineers and business stakeholders to connect it to forecasting tasks. My responsibilities included translating the business question into a model workflow and discussing how to evaluate its usefulness.'),
      S('Approach', 'I used PyTorch-LifeStream to learn representations of event sequences, exploring CoLES and sequence-order objectives. H3 cells supported spatial aggregation, while PCA reduced representation size before combining features.', 'Text features added a semantic view of locations. The project explored GigaChat and open language models alongside event embeddings. The combined representations were used as features in downstream prediction, including purchasing activity and commercial property prices.'),
      S('Implementation and evaluation', 'The workflow moved from event-only representations to multimodal features, followed by downstream evaluation and integration into data pipelines. Embeddings were stored for reuse and periodic updates.', 'The important comparison is between a defined baseline and the same task with additional modalities. Forecast quality, inference cost and data-update requirements need to be considered together; improvements on different prediction targets should not be combined into one headline number.'),
      S('Outcome', 'A reusable approach to representing locations through their observed activity and semantic context. I presented this work at DataFest 2024 and, with Maxim Kalashnikov, at AI Journey 2024.')
    ], { role: 'Tech Lead, Machine Learning', period: '2024–2025', note: 'sber-1', featured: true, visual: 'geo', links: [['DataFest talk', 'conference-1.html'], ['AI Journey talk', 'aij.html']] }),
  P('sber-inference', 'Sber', 'BERT inference optimisation',
    'Reducing inference cost and latency through model conversion, calibration and GPU execution optimisation.',
    ['PyTorch', 'ONNX', 'TensorRT', 'NVIDIA A100', 'INT8 / FP16'], [
      S('The problem', 'A production NLP service needed faster responses under load. The baseline model left room for improvement in GPU utilisation and inference latency, making serving efficiency an engineering priority.'),
      S('My contribution', 'I prepared the model conversion and calibration workflow, worked on the TensorRT inference path, and coordinated with deployment and QA engineers on integration and quality checks.'),
      S('Approach', 'The optimisation path converted the PyTorch model through ONNX into a TensorRT engine. Reduced-precision execution and representative calibration data were used to explore the trade-off between speed and predictive quality.', 'Batching and the execution configuration were part of the investigation. Latency and throughput describe different properties: request-level response times must be distinguished from the number of examples processed in a batch.'),
      S('Validation and delivery', 'The delivery process included conversion checks, load testing, comparison against the original model and staged deployment. Task-appropriate prediction metrics belong alongside latency, throughput and memory use.', 'Quantisation reduces numerical precision; it does not imply a fixed end-to-end speedup. Performance depends on supported operations, shapes, batch sizes and the serving workload.'),
      S('Outcome', 'An optimised GPU inference workflow and practical experience with the path from a research model to a production serving engine. Earlier benchmark details are retained in the original notes below.')
    ], { role: 'Tech Lead / ML engineering', period: '2024–2025', note: 'sber-2' }),
  P('sber-logs', 'Sber', 'NLP log analysis & process mining',
    'Turning technical logs into actionable error categories and a clearer picture of the customer journey.',
    ['Python', 'NLP', 'Classification', 'Process mining', 'SQL'], [
      S('The problem', 'Technical logs contain evidence of application errors and inefficient user journeys, but manual inspection does not scale. Errors also need to be connected to the step of a business process where they affect employees and customers.'),
      S('My contribution', 'I developed an NLP pipeline for log analysis that combined rule-based extraction and model-assisted classification. I connected the analysis to process-mining work so that error patterns could be interpreted in the context of the user journey.'),
      S('Approach', 'The workflow collected and filtered logs, extracted structured information from messages and grouped related events. Classification identified sessions with errors; process discovery and performance analysis located repetitive steps and delays.', 'Rules and entity extraction helped organise identifiers and error descriptions. Session-level analysis made it possible to distinguish an isolated message from an error that disrupted completion of a task.'),
      S('From analysis to action', 'The results supported dashboards, prioritisation of recurring problems and discussion with application owners. Follow-up analysis tracked whether changes reduced the friction observed in the original process.', 'Detection quality and operational outcomes are separate measures: finding more errors is useful when the categories support investigation and the fixes improve the journey.'),
      S('Outcome', 'A more systematic workflow for identifying and investigating application errors, with less reliance on manual log inspection. The related Process Mining 2024 presentation explains the connection between ML classification and process analysis.')
    ], { role: 'Tech Lead / ML engineering', period: '2024–2025', note: 'sber-3', links: [['Process Mining presentation', 'process_mining.html']] }),
  P('sber-recommendations', 'Sber', 'Recommendations from user feedback',
    'Grouping noisy feedback and using an LLM to generate more relevant improvement recommendations.',
    ['GigaChat', 'HDBSCAN', 'E5 embeddings', 'Python', 'Prompt design'], [
      S('The problem', 'User feedback mixed useful observations with spelling errors, spam and duplicated themes. Recommendations generated from this input needed to remain relevant to the underlying problem.'),
      S('My contribution', 'I worked on a pipeline connecting feedback cleaning, thematic clustering, LLM generation and relevance assessment. The design used clustering to provide more coherent input to the generation step.'),
      S('Approach', 'Preprocessing normalised text and filtered obvious noise. HDBSCAN grouped related feedback while allowing outliers to remain outside the main clusters. GigaChat generated recommendations from the resulting context.', 'Embedding similarity supported relevance checks, while expert assessment provided a closer view of whether a recommendation addressed the issue. A similarity threshold is a screening signal, not a substitute for semantic evaluation.'),
      S('Decisions and outcome', 'The project explored prompting and model inference as a practical alternative to a more expensive fine-tuning workflow. The resulting system linked each generated recommendation to a cleaner, more focused feedback context.', 'Earlier expert-assessment figures and implementation notes are preserved below. The current summary emphasises the workflow and its evaluation rather than presenting an unqualified aggregate score.')
    ], { role: 'Tech Lead / ML engineering', period: '2024–2025', note: 'sber-4' }),
  P('sber-branches', 'Sber', 'Branch placement modelling',
    'Using location features and CatBoost to support decisions about branch placement and regional coverage.',
    ['CatBoost', 'Python', 'SQL', 'Geospatial features', 'SHAP'], [
      S('The problem', 'Opening, moving or retaining a branch requires a consistent assessment of location potential. Manual analysis and an ageing model made it difficult to compare alternatives on the same basis.'),
      S('My contribution', 'I developed a modelling approach for branch placement using customer, geographic and area-level data. The work connected feature engineering and predictive modelling to a decision process used by business stakeholders.'),
      S('Data and modelling', 'Inputs included historical customer interactions, population and infrastructure indicators, competitors and accessibility. Feature engineering organised these sources into location-level representations.', 'CatBoost was used to model branch potential, with regression and classification formulations considered for the underlying business questions. SHAP supported discussion of which location characteristics influenced a prediction.'),
      S('Evaluation and use', 'The model’s predictive quality needed to be assessed separately from the downstream decision to open or relocate a branch. The workflow therefore linked model evaluation to interpretable outputs for analysts.', 'This case focuses on the placement decision and model development. The regional-expansion case covers subsequent engineering concerns around maintaining a location-scoring system.'),
      S('Outcome', 'A more consistent data-driven basis for comparing branch locations, with interpretable model outputs available to the decision process.')
    ], { role: 'Tech Lead / ML engineering', period: '2024–2025', note: 'sber-5', links: [['Related: regional expansion', 'sber-location-production.html']] }),
  P('sber-mentoring', 'Sber', 'Technical leadership & mentoring',
    'Helping a multidisciplinary team turn research methods into practical ML work.',
    ['Technical leadership', 'Mentoring', 'ML reviews', 'Process mining'], [
      S('The need', 'A team working across classical ML, NLP, LLMs and research needs shared technical practices as well as individual expertise. New methods become useful when colleagues can connect them to their own data and business questions.'),
      S('My contribution', 'As a technical lead, I supported project scoping, technical decisions, communication with stakeholders and development of team members. I organised learning activities around multimodal embeddings and process mining.'),
      S('Practical learning', 'Sessions covered event representations, dimensionality reduction, language-model features and inference trade-offs. Process-mining work connected event logs to discovery of business-process bottlenecks.', 'The learning format combined an explanation of the method with application to a concrete problem. This gave colleagues a way to discuss assumptions, implementation choices and evaluation rather than memorising a tool list.'),
      S('Outcome', 'A shared technical vocabulary and practical support for moving projects from investigation toward implementation. The work combined technical mentoring with the day-to-day decisions needed to deliver applied ML projects.')
    ], { role: 'Tech Lead, Machine Learning', period: '2024–2025', note: 'sber-6' }),
  P('sber-goals', 'Sber', 'LLM-assisted goal setting',
    'A system for checking business goals, improving their wording and surfacing duplication or conflicting objectives.',
    ['GigaChat', 'Retrieval', 'Chroma', 'Classification', 'LLM evaluation'], [
      S('The problem', 'In a large organisation, goals are written at several levels using different terminology and formats. Manual review makes it difficult to spot missing measures, duplicated work and objectives that do not align across teams.'),
      S('My contribution', 'I led development of an LLM-assisted system for goal formulation and verification. My responsibilities included shaping the architecture, organising the work with the team, collecting feedback from stakeholders and defining how to assess useful recommendations.'),
      S('Solution design', 'The system combined a goal-quality classifier, a recommendation component and a representation of relationships between goals. Retrieval supplied examples and organisational context, while the language model suggested more precise formulations.', 'Checks addressed SMART criteria and internal methodology. The system also looked for duplication and contradictions between objectives, helping reviewers focus their attention on issues that crossed team boundaries.'),
      S('Implementation', 'The work involved structuring methodology documents, glossaries, strategic materials and historical goals. Expert-labelled examples of well-formed and problematic goals supported development and assessment.', 'GigaChat was the primary language-model option described in the project. Chroma supported retrieval of relevant examples. The modular design allowed quality checks, retrieval and recommendations to be developed and assessed separately.'),
      S('Outcome', 'A workflow that supported goal authors and reviewers with contextual feedback and structured checks. It brought together hands-on AI architecture, team leadership and communication with business users.')
    ], { role: 'Technical lead', period: '2024–2025', note: 'sber-7', featured: true, visual: 'goals' }),
  P('sber-location-production', 'Sber', 'Location scoring in production',
    'Taking a model for regional expansion from an analytical codebase to a maintainable prediction workflow.',
    ['CatBoost', 'GeoPandas', 'H3', 'Docker', 'Airflow', 'MLflow', 'pytest'], [
      S('The problem', 'A location-potential model needed a reliable implementation for evaluating expansion into new regions. Beyond prediction quality, the system needed consistent inputs, repeatable feature computation and a practical update process.'),
      S('My contribution', 'I refactored the processing code and feature-engineering workflow, improved spatial-data handling and supported production deployment. The work also included model evaluation, interpretability and experiment tracking.'),
      S('Engineering approach', 'Processing improvements included vectorised operations, parallel computation and caching. A unified interface for geospatial data used GeoPandas and H3, while input checks caught inconsistencies earlier in the workflow.', 'Model work included time-based validation, additional embedding features, CatBoost hyperparameter tuning and metrics aligned with the business task. SHAP supported interpretation of location scores.'),
      S('Production workflow', 'The implementation brought together automated tests, containerised deployment, scheduled data processing and tracking of model versions and experiments. Monitoring and prediction logs supported investigation of changes in data and model behaviour.', 'MLflow provided experiment and artefact tracking; additional checks and reporting supported monitoring. These responsibilities are distinct and are not attributed to one tool alone.'),
      S('Outcome', 'A more maintainable scoring workflow for regional analysis, with a clearer route from data updates to model outputs and explanations. This case preserves the engineering work separately from the branch-placement modelling case.')
    ], { role: 'Tech Lead / ML engineering', period: '2024–2025', note: 'sber-8' }),

  P('vk-ltv', 'VK / MY.GAMES', 'Player lifetime value modelling',
    'Linking player behaviour, segmentation and predictive modelling to product and marketing decisions.',
    ['Python', 'SQL', 'LightGBM', 'Clustering', 'Spark', 'Airflow'], [
      S('The problem', 'Players differ in activity, payment patterns and retention. Product and marketing teams needed a more useful view of long-term value than a single average across the audience.'),
      S('My contribution', 'I developed lifetime-value and retention models and worked on the analytical pipelines needed to use their outputs. I translated behavioural and payment data into features and discussed the results with product and marketing stakeholders.'),
      S('Approach', 'The work combined data preparation, player segmentation and LTV prediction. Clustering represented distinct payment and activity patterns, while LightGBM supported prediction from tabular behavioural features.', 'The original analysis considered frequent small payers, infrequent high-value payers, new users, returning players and active non-paying users. These groups helped connect predictive outputs to practical product questions.'),
      S('Operational use', 'SQL and automated processing supported repeatable feature calculation and reporting. The purpose of the predictions was to inform targeting, retention and planning; model scores and the causal effect of a marketing action were treated as different questions.'),
      S('Outcome', 'Predictive player-value analysis integrated with product work and reusable analytical pipelines. The complete original segmentation and modelling notes remain available below.')
    ], { role: 'Senior Data Analyst', period: '2021–2023', note: 'vk-1' }),
  P('vk-promotions', 'VK / MY.GAMES', 'Promotion strategy & experimentation',
    'Analysing which offers work for different player segments and how they affect engagement and payment behaviour.',
    ['Python', 'SQL', 'RFM', 'A/B testing', 'CatBoost', 'SciPy'], [
      S('The problem', 'A promotion can attract participation without improving retention or long-term value. Different player groups also respond differently to discounts, rewards and personalised offers.'),
      S('My contribution', 'I worked on audience analysis, promotion strategies and assessment of product experiments. The analysis connected payment history, activity and segmentation to the design of offers.'),
      S('Approach', 'RFM features and clustering described player segments. The project compared promotion mechanics such as first-payment discounts, participation rewards and personalised bonuses.', 'Evaluation considered payment conversion, retention and activity. The original work also explored purchase-propensity modelling as an input to offer selection.'),
      S('Decisions and outcome', 'The analysis gave product and marketing colleagues a structured way to compare promotion mechanics and understand segment-level responses. Experiment design, observed behaviour and predictive scoring each contributed a different kind of evidence.', 'The original notes preserve the campaign variants and historical measurements for a more detailed review.')
    ], { role: 'Senior Data Analyst', period: '2021–2023', note: 'vk-2' }),
  P('vk-multi-account', 'VK / MY.GAMES', 'Multi-account player behaviour',
    'Understanding how alternate accounts affect audience, retention and monetisation metrics.',
    ['Python', 'SQL', 'Pandas', 'Airflow', 'Power BI'], [
      S('The problem', 'Account-level metrics can give a misleading picture of a game’s audience when one player uses several accounts. New, returning and established alternate accounts can also have different payment and retention patterns.'),
      S('My contribution', 'I analysed multi-account behaviour using session, payment and registration data together with available device identifiers. The aim was to explain how alternate accounts contributed to the observed audience and revenue.'),
      S('Approach', 'The analysis distinguished new, existing and reactivated accounts and compared their payment and retention patterns. It also examined whether new and returning activity compensated for losses in the core audience.', 'SQL aggregations and Python analysis supported account grouping and cohort comparisons. Reporting made the effect of account definitions visible to stakeholders.'),
      S('Outcome', 'A clearer interpretation of account growth, churn and monetisation. The case is useful when discussing metric definitions: an account is an observed unit in the data, and it is not automatically equivalent to a unique player.')
    ], { role: 'Senior Data Analyst', period: '2021–2023', note: 'vk-3' }),
  P('vk-top-gun', 'VK / MY.GAMES', 'Top Gun event analysis',
    'Evaluating event participation, progression, reward use and the behaviour of new players.',
    ['SQL', 'Python', 'Cohort analysis', 'Funnels', 'Matplotlib'], [
      S('The problem', 'An in-game event needs to be evaluated beyond participation totals. The team needed to understand which players joined, how they progressed and whether the event supported monetisation and retention.'),
      S('My contribution', 'I analysed the Top Gun event through task, session, payment and registration logs. The analysis compared regional audiences and separated new players from existing and alternate accounts.'),
      S('Approach', 'Funnel analysis followed participation through tasks and reward redemption. Cohort analysis examined first payments and retention among newcomers, while activity metrics described the intensity and duration of participation.', 'A specific focus was the gap between earning event tokens and redeeming rewards. This helped connect the data to the design of thresholds and incentives.'),
      S('Outcome', 'A structured account of the event’s audience and progression, giving the product team evidence for reviewing mechanics and rewards. Historical participation and redemption figures are retained in the original notes.')
    ], { role: 'Senior Data Analyst', period: '2021–2023', note: 'vk-4' }),
  P('vk-pricing', 'VK / MY.GAMES', 'Pricing & monetisation analysis',
    'Studying price sensitivity and segment-specific offers in an in-game economy.',
    ['Python', 'SQL', 'Statsmodels', 'RFM', 'Regression'], [
      S('The problem', 'Uniform pricing and promotion rules can overlook differences between established payers and newcomers. The challenge was to understand purchasing behaviour without losing sight of retention and player experience.'),
      S('My contribution', 'I analysed payment patterns, audience segments and price sensitivity to support decisions about in-game offers. The work connected behavioural data with monetisation questions posed by the product team.'),
      S('Approach', 'RFM features and clustering organised the audience into groups with different purchase histories. Regression analysis explored relationships between price and observed demand.', 'The project considered segment-specific offer rules, including different combinations of discounts and non-price rewards. Observational price relationships require care because the audience and the offer exposure may change at the same time.'),
      S('Outcome', 'An analytical framework for discussing pricing and offers alongside retention and long-term value. The original project notes preserve the proposed rules, evaluation figures and implementation context.')
    ], { role: 'Senior Data Analyst', period: '2021–2023', note: 'vk-5' }),
  P('vk-churn', 'VK / MY.GAMES', 'Churn prediction & retention',
    'Identifying players at risk of leaving and explaining the signals behind the prediction.',
    ['XGBoost', 'SHAP', 'Python', 'SQL', 'Classification'], [
      S('The problem', 'A useful retention workflow needs to identify risk before a player has fully disengaged. General campaigns can waste effort when they ignore the differences between player behaviour patterns.'),
      S('My contribution', 'I worked on churn prediction using activity, payment, progression and social features. The analysis connected classification outputs to player segments and potential retention actions.'),
      S('Approach', 'The original task defined churn through a period of inactivity and used a gradient-boosted model. Recent sessions, playtime, payment history and progress supplied the predictive features.', 'Evaluation considered ranking and classification metrics, while SHAP supported inspection of the factors associated with a prediction. Declining activity, reduced progress and changes in payment behaviour were examined in context.'),
      S('Evaluation and outcome', 'The model supported prioritisation of retention work. Predicting who will leave and estimating who will benefit from an intervention are separate tasks, so campaign outcomes need their own evaluation.', 'The original notes retain the historical model and campaign measurements for reference.')
    ], { role: 'Senior Data Analyst', period: '2021–2023', note: 'vk-6' }),
  P('vk-attribution', 'VK / MY.GAMES', 'Marketing attribution & channel value',
    'Connecting acquisition journeys, player value and campaign economics to budget decisions.',
    ['Python', 'SQL', 'Attribution', 'LTV / CAC', 'Segmentation'], [
      S('The problem', 'Acquisition volume alone does not show whether a channel brings players who stay and pay. The marketing team needed a more useful comparison of channel cost and the value of the acquired audience.'),
      S('My contribution', 'I analysed acquisition journeys and channel economics, combining marketing information with player behaviour and payments. The work supported discussion of budget allocation and audience quality.'),
      S('Approach', 'The analysis compared acquisition cost with predicted or observed player value and examined differences between segments. It also explored multi-touch attribution to move beyond a purely last-click view.', 'The original notes discuss Shapley-style attribution. The short illustrative code in those notes is a heuristic, not an exact implementation of the Shapley value; attribution estimates should also not be interpreted as causal effects without additional identification assumptions.'),
      S('Outcome', 'A more explicit connection between channel spend, audience composition and long-term value. This provided a basis for reviewing inefficient channels and testing changes in allocation.')
    ], { role: 'Senior Data Analyst', period: '2021–2023', note: 'vk-7' }),

  P('research-oversight', 'Research', 'Game-theoretic models of human oversight',
    'Modelling the incentives behind human verification, delegation and AI assistance.',
    ['Game theory', 'Nash equilibria', 'QRE', 'Replicator dynamics', 'Python'], [
      S('Research question', 'Whether a person verifies an AI output depends on incentives as well as capability. Formal games provide a way to state those incentives explicitly and examine the resulting behaviour.'),
      S('My contribution', 'I modelled evaluator–LLM interaction as a 5×5 strategic-form game and investigated a 2×2 role game in which a human chooses delegation or verification and the AI takes a generator or assistant role.'),
      S('Methods', 'The work includes mixed-strategy Nash equilibria computed by support enumeration, best-response analysis and replicator dynamics. The role model also uses logit quantal response equilibrium to represent noisy responses.', 'Sensitivity analysis covered 2,772 variants of the role game. Algebraic analysis and parameter-recovery simulations investigated whether payoff weights could be identified from the available behaviour.'),
      S('What the analysis establishes', 'The work makes assumptions and their consequences explicit. It also examines limits: an equilibrium calculation is conditional on the specified payoffs, and a model that fits behaviour does not necessarily identify the underlying preferences.'),
      S('Related presentation', 'The role-based human–AI interaction work was presented at the XI International Conference on Cognitive Science in August 2026.')
    ], { role: 'ML researcher', period: 'Current research', featured: true, visual: 'research', links: [['Cognitive Science 2026 talk', 'cogsci-2026.html']] }),
  P('research-cognitive-critic', 'Research', 'Cognitively informed AI feedback',
    'Integrating a cognitive critic into reinforcement learning from AI feedback for code generation.',
    ['RLAIF', 'Reward modelling', 'SFT', 'Contrastive learning', 'Markov chains'], [
      S('Research question', 'Feedback for a code-generating agent can reflect more than a single aggregate score. This work investigates how a cognitive critic can contribute to learning and adaptation in human–AI interaction.'),
      S('My contribution', 'I coauthored work on integrating a cognitive critic into reinforcement learning from AI feedback. The study connects feedback modelling with the behaviour of agents used for code generation.'),
      S('Approach', 'The work compares supervised fine-tuning, contrastive learning and reward models. It also considers Markov-chain reward aggregation as part of the feedback framework.'),
      S('Status', 'Article in press: “Adaptation of Artificial Intelligence Agents to Individual Operators’s Cognitive States Using Reinforcement Learning”, with S. V. Kovalchuk, D. V. Fedrushkov and A. T. S. Ireddy. Publication venue and a final article link will be added when available.')
    ], { role: 'Coauthor / ML researcher', period: 'Current research' }),
  P('science-1', 'Research', 'Thermal behaviour of NTE metamaterials',
    'Finite-element analysis of effective thermal expansion and stability in architected materials.',
    ['Finite elements', 'Thermoelasticity', 'CAE Fidesys', 'Numerical methods'], [
      S('Research question', 'Negative-thermal-expansion metamaterials derive unusual behaviour from their geometry. The study examines how the unit-cell design changes effective expansion and stability under thermal loading.'),
      S('My contribution', 'I coauthored numerical research on the effective thermal properties of these materials, combining boundary-value modelling with analysis of the response of a periodic cell.'),
      S('Method', 'Thermoelastic boundary-value problems were solved with the finite element method. Effective expansion was obtained by averaging the cell response, and stability was examined as the temperature changed.', 'The study explores how geometric changes can produce zero or negative effective expansion, while keeping stability as a separate design constraint.'),
      S('Publication', 'M. Ya. Yakovlev, P. S. Tanasevich, A. V. Vershinin and V. A. Levin. AIP Conference Proceedings 2509, 020210 (2022). Earlier publications use my former surname, Tanasevich.')
    ], { role: 'Research coauthor', period: 'Published 2022', note: 'science-1', links: [['Read the publication', 'https://doi.org/10.1063/5.0084835']], media: 'assets/jpeg/nte_start.jpg', video: 'assets/jpeg/nte_logo.mp4' }),
  P('tomsk_2023', 'Research', 'Inverse design of auxetic metamaterials',
    'Learning the relationship between target mechanical properties and unit-cell geometry.',
    ['Machine learning', 'Inverse problems', 'Finite elements', 'CAE Fidesys'], [
      S('Research question', 'The forward problem predicts material properties from geometry. The inverse-design problem starts with desired properties and asks which cell geometry could produce them.'),
      S('My contribution', 'I worked on an ML-based method for estimating the geometric parameters of auxetic metamaterials from effective mechanical properties. This connects numerical simulation with data-driven inverse modelling.'),
      S('Approach', 'The study considered butterfly and square-mesh structures. Forward simulations in CAE Fidesys generated examples relating geometry to effective Young’s moduli and Poisson ratios.', 'The original study description reports more than 25,000 forward solutions and an average SMAPE of approximately 5% for the learned inverse prediction. These figures refer to that study and its evaluation setting, not to arbitrary material geometries.'),
      S('Outcome', 'An approach to assisting material design with a model trained on simulation data. The work was presented in 2023, including at the XIII All-Russian Congress on Theoretical and Applied Mechanics.')
    ], { role: 'Research coauthor', period: '2023', note: 'tomsk_2023', links: [['Research abstract', 'https://drive.google.com/file/d/16lWFfBLddV6Emf8Jnwe5timFBT2beXvo/view?usp=sharing'], ['Congress presentation', 'conf_spb.html']] }),
  P('patent-1', 'Research', 'Effective elastic properties under preloading',
    'Registered software for estimating the properties of a preloaded heterogeneous material in three dimensions.',
    ['C++', 'Finite elements', 'Computational mechanics', 'CAE Fidesys'], [
      S('The problem', 'A heterogeneous material’s effective elastic response depends on its microstructure and its preloaded state. Numerical homogenisation makes it possible to estimate a macroscopic constitutive description from a representative volume.'),
      S('My contribution', 'I am a coauthor of registered software RU 2020665248, developed in the context of computational mechanics and the CAE Fidesys environment.'),
      S('Method', 'The program solves elasticity boundary-value problems on a representative volume. Preliminary loading includes geometric nonlinearity and can involve finite deformation.', 'The effective incremental elastic characteristics are expressed through a generalised Hooke’s law for an anisotropic material. The boundary-value problems use the CAE Fidesys finite-element calculation kernel.'),
      S('Result', 'A registered computer program, RU 2020665248 (2020). It is described here as software registration, consistent with the bibliographic record.')
    ], { role: 'Software coauthor', period: '2020', note: 'patent-1', links: [['Registration document', 'https://drive.google.com/file/d/1a35a2d3kLwlg61ajTobskszPQ3aFf8J5/view?usp=sharing']] }),
  P('patent-2', 'Research', 'Effective elastoplastic properties on GPU',
    'Registered software for numerical estimation of two-dimensional heterogeneous material properties.',
    ['C++', 'CUDA', 'Finite differences', 'Numerical modelling'], [
      S('The problem', 'Effective elastoplastic behaviour changes with the imposed deformation. Estimating it requires solving local boundary-value problems and averaging the resulting response over a representative material area.'),
      S('My contribution', 'I am a coauthor of registered software RU 2020667788 for numerical estimation of effective elastoplastic characteristics in two dimensions.'),
      S('Method', 'The implementation uses finite differences on a regular grid and an explicit time scheme. A dynamic relaxation process is used to approach a static solution.', 'The stress tensor is averaged over the representative area to obtain effective bulk and shear moduli at different deformation levels. CUDA supports parallel computation on the GPU.'),
      S('Result', 'A registered computer program, RU 2020667788 (2020), connecting numerical methods, computational mechanics and parallel implementation.')
    ], { role: 'Software coauthor', period: '2020', note: 'patent-2', links: [['Registration document', 'https://drive.google.com/file/d/1jKumDoWiJH3ZNtrd1HH0td-H5eBQf-8J/view?usp=sharing']] }),
  P('megagrant', 'Research', 'Collaborative computational research',
    'Research participation in the megagrant programme supporting scientific work led by leading researchers.',
    ['Numerical modelling', 'Scientific computing', 'Research collaboration'], [
      S('Research context', 'I participated as a research contributor in grant 075-15-2019-1890 during December 2019–December 2021. The programme supported collaborative scientific research in Russian research and higher-education institutions.'),
      S('Connection to my work', 'This period forms part of my early research background in numerical modelling and computational mechanics. The related material-property and metamaterial case studies describe specific methods and outputs.'),
      S('Role', 'As a research contributor, I worked within a collaborative scientific programme. The related case studies show the numerical methods and material-modelling work from this part of my career.')
    ], { role: 'Research contributor', period: '2019–2021', links: [['Research profile', 'https://istina.msu.ru/workers/251795028/']] }),
  P('materials-startup', 'Independent', 'Materials-analysis SaaS prototype',
    'Bringing numerical material characterisation into a software-service concept for a startup competition.',
    ['Team leadership', 'Prototyping', 'Computational mechanics', 'Product scoping'], [
      S('The idea', 'The project explored a software-as-a-service model for materials characterisation, connecting a scientific computing problem with a potential product workflow.'),
      S('My contribution', 'I assembled and led a team for a startup competition. Together, we developed a functional prototype and a business model for the proposed materials-analysis service.'),
      S('Project development', 'The work required coordinating technical development with a clear explanation of the intended use. The prototype and business model formed a joint demonstration of the software concept and its potential application.'),
      S('Outcome', 'The project reached the competition finals. It was an early experience of organising a multidisciplinary team and translating scientific software work into a product proposition.')
    ], { role: 'Team lead', period: 'Early research', note: 'materials-startup' }),
  P('project-1', 'Independent', 'LLM travel agent',
    'An exploratory conversational assistant for destination recommendations and itinerary planning.',
    ['Python', 'Hugging Face', 'LLM agents', 'Prompt design'], [
      S('Project context', 'A personal learning project exploring how a language model can support conversational travel planning. It is presented as an agent prototype.'),
      S('Approach', 'The agent uses a language-model interface to interpret travel preferences, suggest destinations, draft itineraries and answer follow-up questions. Hugging Face models and APIs provide the language-model component.'),
      S('What I explored', 'The project focuses on shaping a task-oriented conversation and organising generated recommendations into a useful plan. Access to live weather, pricing or availability depends on explicit external integrations and is not assumed.'),
      S('Project material', 'The linked repository contains my LLM-agent work. This case remains in the full catalogue alongside professional projects so that the earlier experiments are easy to revisit.')
    ], { role: 'Personal / learning project', period: 'Independent work', note: 'project-1', links: [['View agent repository', 'https://github.com/kliuchnikovaps/llm_agents']] }),
  P('project-2', 'Independent', 'Article retrieval & summarisation agent',
    'An agent prototype that finds relevant articles and turns them into a concise topic digest.',
    ['Python', 'Hugging Face', 'Retrieval', 'Summarisation'], [
      S('Project context', 'A personal learning project for retrieving and summarising a small set of articles on a user-selected topic.'),
      S('Approach', 'The workflow separates finding candidate articles, ranking their relevance and generating summaries. A simple input-and-results interface connects the user’s topic to a digest of five selected articles.'),
      S('What I explored', 'The project links information retrieval to language-model summarisation. Relevance selection and summary quality are separate concerns: a fluent summary is only useful if it represents a relevant source accurately.'),
      S('Project material', 'The linked repository contains my LLM-agent experiments. The original project description is also preserved below for reference.')
    ], { role: 'Personal / learning project', period: 'Independent work', note: 'project-2', links: [['View agent repository', 'https://github.com/kliuchnikovaps/llm_agents']] })
];
