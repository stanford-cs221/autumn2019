G = sfig.serverSide ? global : this;
G.prez = presentation();

if (sfig_.urlParams.auth) {
  prez.addSlide(slide(null,
    nil(),
    'Fill out a poll here:',
    parentCenter(text(greenbold('cs221.stanford.edu/q')).scale(2.7)),
    ytable(
      'Loop:',
      indent('If the seat next to you towards the center is free:'),
      indent(indent('Move there.')),
    _),
  _).showIndex(false));
}

add(titleSlide('Lecture 1: Overview',
  nil(),
  parentCenter(image('images/galaxies.jpg').width(300)),
_));

/*
./tab firstName,lastName var/cas.jsonl
*/
var items = [
  'Dorsa Sadigh (Professor)',
  'Reid Pryzant (head CA)',
  'Susanna Maria Baby',
  'Di Bai',
  'Hancheng Cao',
  'Will Deaderick',
  'Cindy Jiang',
  'Chuma Kabaghe',
  'Dhruv Kedia',
  'Marcus Palsson',
  'Chuanbo Pan',
  'Chen (Jerry) Qu',
  'Andrew Tan',
  'Sharman Tan',
  'Christopher Waites',
  'Jon Kotker',
  'Zach Barnes',
  'Haoshen Hong',
  'Richard Diehl Martinez',
  'Horace Ting Cheong Chu',
];

var rows = [];
var m = 3;
for (var i = 0; i < items.length; i += m) {
  var row = [];
  for (var j = 0; j < m; j++)
    row.push(items[i + j] || nil());
  rows.push(row);
}

add(slide('Teaching staff',
  parentCenter(ytable(
    'Percy Liang'.bold(),
    new Table(rows).margin(50, 5).scale(0.8),
  _).margin(20).center()).scale(0.9),
_).id('staff'));

function roadmap(i) {
  add(outlineSlide('Roadmap', i, [
    ['why', 'What is AI?'],
    ['what', 'Course overview'],
    ['how', 'Course logistics'],
    ['optimization', 'Optimization'],
  ]));
}

////////////////////////////////////////////////////////////

roadmap(0);

add(slide(null,
  parentCenter(overlay(
    pause(),
    image('images/ibm-watson.jpg'),
    pause(),
    parentCenter(image('images/alpha-go.jpg')).shiftBy(350, 20),
    pause(),
    image('images/google-car.jpeg').width(300).shiftBy(0, 200),
    pause(),
    // https://blogs.microsoft.com/ai/microsoft-creates-ai-can-read-document-answer-questions-well-person/
    image('images/news-microsoft-squad.png').width(500).shiftBy(200, 100),
    pause(),
    // https://www.microsoft.com/en-us/research/blog/microsoft-researchers-achieve-new-conversational-speech-recognition-milestone/
    image('images/news-microsoft-speech.png').width(500).shiftBy(100, 180),
    pause(),
    // https://research.fb.com/publications/deepface-closing-the-gap-to-human-level-performance-in-face-verification/
    image('images/news-deepface.png').width(500).shiftBy(0, 260),
    pause(),
    // https://www.radiologybusiness.com/topics/artificial-intelligence/if-you-think-ai-will-never-replace-radiologists-you-may-want-think
    image('images/news-radiology.png').width(500).shiftBy(200, 220),
  _)),
_));

prose(
  'It is hard these days to escape hearing about AI &mdash; in the news, on social media, in cafe conversations.',
  'We see both reports triumphs of superhuman performance in games such as Jeopardy! (IBM Watson, 2011) and Go (DeepMind\'s AlphaGo, 2016),',
  'as well as on benchmark tasks such as reading comprehension, speech recognition, face recognition, and medical imaging',
  '(though it is important to realize that these are about performance on one benchmark, which is a far cry from the general problem).',
_);

add(slide(null,
  parentCenter(overlay(
    image('images/the-atlantic-article.png').width(400),
    pause(),
    image('images/second-machine-age.jpg').width(250).shiftBy(50, 50),
    pause(),
    image('images/superintelligence.jpg').width(250).shiftBy(250, 150),
    pause(),
    image('images/elon-musk-ai.png').width(450).shiftBy(150, 150),
    pause(),
    image('images/stephen-hawking-ai.png').width(350).shiftBy(250, 50),
  _)),
_).id('media'));

prose(
  'We also see speculation about the future: that it will bring about sweeping societal change due to automation,',
  'resulting in massive job loss, not unlike the industrial revolution,',
  'or that AI could even surpass human-level intelligence and seek to take control.',
_);

add(slide('Companies',
  table(
    [image('images/google.jpg').width(100), text('"An important shift from a mobile first world to an AI first world" [CEO Sundar Pichai @ Google I/O 2017]').width(650)], 
    [image('images/microsoft.png').width(100), text('Created AI and Research group as 4th engineering division, now 8K people [2016]').width(650)],
    [image('images/facebook.png').width(100), text('Created Facebook AI Research, Mark Zuckerberg very optimistic and invested').width(650)],
  _).margin(10, 50).yjustify('c'),
  stmt('Others: IBM, Amazon, Apple, Uber, Salesforce, Baidu, Tencent, etc.'),
_));

add(slide('Governments',
  table(
    [image('images/flag-usa.png').width(100), text('"AI holds the potential to be a major driver of economic growth and social progress" [White House report, 2016]').width(650)], 
    [image('images/flag-china.png').width(100), text('Released domestic strategic plan to become world leader in AI by 2030 [2017]').width(650)],
    [image('images/flag-russia.png').width(100), text('"Whoever becomes the leader in this sphere [AI] will become the ruler of the world" [Putin, 2017]').width(650)],
  _).margin(10, 70).yjustify('c'),
_));

prose(
  'While media hype is real, it is true that both companies and governments are heavily investing in AI.',
  'Both see AI as an integral part of their competitive strategy.',
_);

add(slide('AI index: number of published AI papers',
  nil(),
  parentCenter(image('images/ai-index-papers.png').width(700)),
_));

add(slide('AI index: number of AI startups',
  nil(),
  parentCenter(image('images/ai-index-startups.png').width(700)),
_));

add(slide('AI index: AI conference attendance',
  nil(),
  parentCenter(overlay(
    image('images/ai-index-conferences.png').width(700),
    pause(),
    overlay(
      image('images/nips2018-sold-out-tweet.png').width(400),
      image('images/nips2018-sold-out-tweet2.png').width(400).shiftBy(300, 80),
    _),
  _).center()),
_));

prose(
  'The AI Index is an effort to track the progress of AI over time.',
  'In 2017, the AI Index published a report,',
  'showing essentially that all curves go up and to the right.',
  'Here are a few representative samples.',
_);

add(slide('CS221 enrollments',
  parentCenter(barGraph([
    [2012, 182], [2013, 217], [2014, 370], [2015, 549],
    [2016, 660], [2017, 775], [2018, 730],
  ]).xrange(2011, 2018).yrange(0, 800).xlength(500)),
  pause(),
  xtable('Slowing down?', pause(), 'Probably due to the CS221 spring offering...').margin(5),
_));

prose(
  'The reality is that there is a lot of uncertainty over what will happen,',
  'and there is a lot of nuance that\'s missing from these stories about what AI is truly capable of.',
  'The goal of this class is to help you understand these nuances, so that you can form your own opinion.',
_)

add(dividerSlide(parentCenter('Ok, really, what is AI?'.italics())));

function agentView() { return image('images/robot-wave.jpg').width(100); }
function toolView() { return image('images/computer.png'); }

add(slide('Two views of AI',
  parentCenter(table(
    [agentView(), stmt('AI agents: how can we re-create intelligence?')],
    [toolView(), stmt('AI tools: how can we benefit society?')],
  _).justify('cl', 'c').margin(50, 100)),
_));

prose(
  'There are two ways to look at AI philosophicaly.',
  _,
  'The first is what one would normally associate with the AI: the science and engineering of building "intelligent" agents.',
  'The inspiration of what constitutes intelligence comes from the types of capabilities that humans possess:',
  'the ability to perceive a very complex world and make enough sense of it to be able to manipulate it.',
  _,
  'The second views AI as a set of tools.',
  'We are simply trying to solve problems in the world, and AI techniques happen to be quite useful for that.',
  _,
  'However, both views boil down to many of the same day-to-day activities (e.g., collecting data and optimizing a training objective),',
  'the philosophical differences do change the way AI researchers approach and talk about their work.',
  'And moreover, the conflation of these two can generate a lot of confusion.',
_);

add(dividerSlide(parentCenter(xtable(agentView(), italics('AI agents...')).center().margin(10))));

add(slide('An intelligent agent',
  parentCenter(table(
    pause(),
    ['Perception', pause(), 'Robotics', pause(), 'Language'], pause(),
    [nil(), image('images/brain-gears.jpg').showLevel(0), nil()],
    ['Knowledge', pause(), 'Reasoning', pause(), 'Learning'],
  _).center().margin(50, 80)),
_));

prose(
  'The starting point for the agent-based view is ourselves.',
  _,
  'As humans, we have to be able to perceive the world (computer vision),',
  'perform actions in it (robotics), and communicate with other agents.',
  _,
  'We also have knowledge about the world (from how to ride a bike to knowing the capital of France),',
  'and using this knowledge we can draw inferences and make decisions.',
  _,
  'Finally, we learn and adapt over time.',
  'Indeed machine learning has become the primary driver of many of the AI applications we see today.',
_);

add(slide('Pre-AI developments',
  side(
    stmt('Philosophy', redbold('intelligence')+' can be achieved via mechanical computation (e.g., Aristotle)'),
    'images/aristotle.jpg',
  _),
  pause(),
  side(
    stmt('Church-Turing thesis (1930s)', 'any computable function is '+redbold('computable')+' by a Turing machine'),
    'images/turingmachine.png',
  _),
  pause(),
  side(
    stmt('Real computers (1940s)', 'actual '+redbold('hardware')+' to do it: Heath Robinson, Z-3, ABC/ENIAC'),
    'images/robinson.jpg',
  _),
_));

prose(
  'Why might one even think that it is even possible to capture this rich behavior?',
  _,
  'While AI is a relatively young field, one can trace back some of its roots back to Aristotle,',
  'who formulated a system of syllogisms that capture the reasoning process: how one can mechanically apply syllogisms to derive new conclusions.',
  _,
  'Alan Turing, who laid the conceptual foundations of computer science, developed the Turing machine,',
  'an abstract model of computation, which, based on the Church-Turing thesis, can implement any computable function.',
  _,
  'In the 1940s, devices that could actually carry out these computations started emerging.',
  _,
  'So perhaps one might be able to capture intelligent behavior via a computer.',
  'But how do we define success?',
_);

add(slide('The Turing Test (1950)',
  parentRight('[Turing, 1950. Computing Machinery and Intelligence]').scale(0.8),
  nil(),
  parentCenter(xtable(
    ytable(
      '"Can machines think?"',
      image('images/alan-turing.jpg').width(100),
    _).center(),
    pause(),
    image('images/turing-test.jpg'),
  _).margin(100).center()),
  pause(),
  parentCenter(ytable(
    nowrapText('Q: Please write me a sonnet on the subject of the Forth Bridge.'),
    nowrapText('A: Count me out on this one. I never could write poetry.'),
    nowrapText('Q: Add 34957 to 70764.'),
    nowrapText('A: (Pause about 30 seconds and then give as answer) 105621.'),
  _)).scale(0.8),
  pause(),
  parentCenter(redbold('Tests behavior &mdash; simple and objective')),
_));

prose(
  'Can machines think?  This is a question that has occupied philosophers since Descartes.',
  'But even the definitions of "thinking" and "machine" are not clear.',
  'Alan Turing, the renowned mathematician and code breaker who laid the foundations of computing,',
  'posed a simple test to sidestep these philosophical concerns.',
  _,
  'In the test, an interrogator converses with a man and a machine via a text-based channel.',
  'If the interrogator fails to guess which one is the machine, then the machine is said to have passed the Turing test.',
  '(This is a simplification but it suffices for our present purposes.)',
  _,
  'Although the Turing test is not without flaws (e.g., failure to capture visual and physical abilities, emphasis on deception),',
  'the beauty of the Turing test is its simplicity and objectivity.',
  'It is only a test of behavior, not of the internals of the machine.',
  'It doesn\'t care whether the machine is using logical methods or neural networks.',
  'This decoupling of what to solve from how to solve is an important theme in this class.',
_);

add(slide('Birth of AI (1956)',
  'Workshop at Dartmouth College; attendees: John McCarthy, Marvin Minsky, Claude Shannon, etc.',
  parentCenter(image('images/dartmouth.jpg').width(150)), pause(),
  'Aim for '+redbold('general principles')+':',
  parentCenter(text(italics('Every aspect of learning or any other feature of intelligence can be so precisely described that a machine can be made to simulate it.')).scale(0.9)),
_));

add(slide('A very brief history',
  //nil(),
  //parentCenter(youtube('aygSMgK3BEM', {cache: false, time: 109})),
  //pause(),
  bulletedText(green('1956: Dartmouth workshop, John McCarthy coined "AI"')),
  bulletedText(green('1960: checkers playing program, Logical Theorist')),
  pause(),
  bulletedText(red('1966: ALPAC report cuts off funding for translation')),
  bulletedText(red('1974: Lighthill report cuts off funding in UK')),
  pause(),
  bulletedText(green('1970-80s: expert systems (XCON, MYCIN) in industry')),
  bulletedText(green('1980s: Fifth-Generation Computer System (Japan); Strategic Computing Initative (DARPA)')),
  pause(),
  bulletedText(red('1987: collapse of Lisp market, government funding cut')),
  pause(),
  bulletedText(green('1990-: rise of machine learning')),
  bulletedText(green('2010s: heavy industry investment in deep learning')),
_).id('history'));

prose(
  'AI started out with a bang.  People were ambitious and tried to develop things like General Problem Solver that could solve anything.',
  'Despite some successes, certain tasks such as machine translation were complete failures, which lead to the cutting of funding and the first AI winter.',
  'It happened again in the 1980s, this time with expert systems, though the aims were scoped more towards industrial impact.',
  'But again, expectations exceeded reality, leading to another AI winter.',
  'During these AI winters, people eschewed the phrase "artificial intelligence"',
  'so as not to be labeled as a hype-driven lunatic.',
  _,
  'In the latest rebirth, we have new machine learning techniques,',
  'tons of data, and tons of computation.',
  'So each cycle, we are actually making progress.',
  'Will this time be different?',
  _,
  'We should be optimistic and inspired about the potential impact that advances in AI can bring.',
  'But at the same time, we need to be grounded and not be blown away by hype.',
  'This class is about providing that grounding,',
  'showing how AI problems can be treated rigorously and mathematically.',
  'After all, this class is called "Artificial Intelligence: Principles and Techniques".',
_);

/*
for x in *.gif; do echo $x; convert "$x[0]" $x.png; done
*/
function gif(x) {
  return sfig.serverSide ? x + '.png' : 'extra-' + x;
}

add(slide('2015 DARPA Robotics Challenge',
  parentCenter(image(gif('images/drc-fail2.gif'))).scale(0.8),
  /*parentCenter(table(
    [image(gif('images/drc-fail1.gif')), image(gif('images/drc-fail2.gif'))],
    [image(gif('images/drc-fail3.gif')), image(gif('images/drc-fail4.gif'))],
  _).margin(10).scale(0.4)),*/
_));

prose(
  'In the 2015 DARPA Robotics Challenge (DRC),',
  'robots were asked to perform a series of eight tasks motivated by a disaster relief scenario',
  '(e.g., getting out of a car and opening a door).',
  _,
  'While some teams did manage to successfully completely these tasks,',
  'many also failed spectacularly.',
  'One can certainly find videos of robots moving with considerably more grace,',
  'which is possible in controlled situations,',
  'but in unstructured environments, it is much harder.',
_);

add(slide('Open-domain dialogue',
  parentCenter(ytable(
    'A: How old are you?',
    'B: I’m 16. Why are you asking?',
    'A: I thought you were 12.',
    'B: What made you think so?',
    'A: I don’t know what you are talking about.',
    'B: You don’t know what you are saying.',
  _)),
_).rightHeader('[Li et al., 2016]'));

prose(
  'We still don\'t have computers that we can have a natural conversation with.',
  'While training deep neural networks on huge amounts of data has worked beautifully for speech recognition and machine translation,',
  'recent attempts in open-domain dialogue have not produced such sensible results.',
  'Models get confused by the sheer complexity of dialogue and often fall back to generic responses as shown here.',
_);

add(dividerSlide(parentCenter(xtable(toolView(), italics('AI tools...')).center().margin(10))));

prose(
  'The AI agents view is an inspiring quest to undercover the mysteries of intelligence and tackle the tasks that humans are good at.',
  'While there has been a lot of progress, we still have a long way to go along some dimensions:',
  'for example, the ability to learn quickly from few examples or the ability to perform commonsense reasoning.',
  _,
  'At the same time, the current level of technology is already being deployed widely in practice.',
  'These settings are often not particularly human-like',
  '(targeted advertising, news or product recommendation, web search, supply chain management, etc.)',
_);

add(slide('Predicting poverty',
  nil(),
  parentCenter(overlay(
    image('images/poverty-input.png').width(450),
    pause(),
    image('images/poverty-output.jpg').width(500).shift(100, 50),
  _)),
_).rightHeader('[Jean et al. 2016]'));

prose(
  'The computer vision techniques, used to recognize objects, can also be used to tackle social problems.',
  'Poverty is a huge problem, and even identifying the areas of need is difficult due to the difficulty in getting reliable survey data.',
  'Recent work has shown that one can take satellite images (which are readily available) and predict various poverty indicators.',
_);

add(slide('Saving energy by cooling datacenters',
  parentCenter(image('images/google-cooling-datacenter.png').width(700)),
_).rightHeader('[DeepMind]'));

prose(
  'Machine learning can also be used to optimize the energy efficiency of datacenters,',
  'which given the hunger for compute these days makes a big difference.',
  'Some recent work from DeepMind shows how to significantly reduce Google\'s energy footprint',
  'by using machine learning to predict the power usage effectiveness from sensor measurements such as pump speeds,',
  'and using that to drive recommendations.',
_);

add(slide(null,
  parentCenter(overlay(
    image('images/self-driving-car-vision.jpg').width(500),
    image('images/apple-face-id.jpg').width(500).shiftBy(200, 250),
  _)),
_));

add(slide('Security',
  parentCenter(overlay(
    withCite(image('images/adversarial-stop-sign.png').width(450), '[Evtimov+ 2017]'),
    withCite(image('images/adversarial-glasses.png').width(450), '[Sharif+ 2016]').shiftBy(200, 200),
  _)),
_));

prose(
  'Other applications such as self-driving cars and authentication',
  'have high-stakes, where errors could be much more damaging than getting the wrong movie recommendation.',
  'These applications present a set of security concerns.',
  _,
  'One can generate so-called <b>adversarial examples</b>,',
  'where by putting stickers on a stop sign, one can trick a computer vision system to mis-classify it as a speed limit sign.',
  'You can also purchase special glasses that fool a system to thinking that you\'re a celebrity.',
  _,
  'Even more fundamentally, these examples shows that current methods clearly are not learning "the right thing" as defined by the human visual system.',
_);

add(slide('Bias in machine translation',
  // https://hackernoon.com/bias-sexist-or-this-is-the-way-it-should-be-ce1f7c8c683c
  parentCenter(image('images/bias-machine-translation.png').width(650)),
  pause(),
  modulebox('society $\\Rightarrow$ data $\\Rightarrow$ predictions'),
_));

add(slide('Fairness in criminal risk assessment',
  bulletedText(stmt('Northpointe: COMPAS predicts criminal risk score (1-10)')), pause(),
  bulletedText(stmt('ProPublica: given that an individual did not reoffend, blacks 2x likely to be (wrongly) classified 5 or above')), pause(),
  bulletedText(stmt('Northpointe: given a risk score of 7, 60% of whites reoffended, 60% of blacks reoffended')),
  pause(),
  parentCenter(image('images/news-california-bail.png').width(550)),
_));

prose(
  'A more subtle case is the issue of bias.',
  'One might naively think that since machine learning algorithms are based on mathematical principles,',
  'they are somehow objective.',
  'However, machine learning predictions come from the training data, and the training data comes from society,',
  'so any biases in society are reflected in the data and propagated to predictions.',
  'The issue of bias is a real concern when machine learning is used to decide whether an individual should receive a loan or get a job.',
  _,
  'Unfortunately, the problem of fairness and bias is as much of a philosophical one as it is a technical one.',
  'There is no obvious "right thing to do", and it has even been shown mathematically it is impossible for a classifier to satisfy three reasonable fairness criteria (Kleinberg et al., 2016).',
_);

add(quizSlide('overview-view',
  'What inspires you more?',
  'Building agents with human-level intelligence',
  'Developing tools that can benefit society',
_));

add(summarySlide('Summary so far',
  bulletedText('AI dream of achieving human-level intelligence is ongoing'),
  bulletedText('Still lots of open research questions'),
  pause(),
  bulletedText('AI is having huge societal impact'),
  bulletedText('Need to think carefully about real-world consequences'),
_));

////////////////////////////////////////////////////////////

roadmap(1);

add(slide('How do we solve AI tasks?',
  nil(),
  parentCenter(xtable(
    image('images/traffic-jam.jpg').width(200),
    pause(),
    image('images/source-code.png').width(150),
  _).margin(300).center()),
_));

prose(
  'How should we actually solve these AI tasks?',
  'The real world is complicated.',
  'At the end of the day, we need to write some code (and possibly build some hardware too).',
  'But there is a huge chasm.',
_);


add(slide('Paradigm',
  nil(),
  parentCenter(paradigm()),
_));

prose(
  'In this class, we will adopt the <b>modeling-inference-learning</b> paradigm to help us navigate the solution space.',
  'In reality, the lines are blurry, but this paradigm serves as an ideal and a useful guiding principle.',
_);

add(slide('Paradigm: modeling',
  parentCenter(yseq(
    frameBox(xtable(
      'Real world',
      image('images/traffic-jam.jpg').width(200),
    _).margin(10).center()).bg.round(10).end, pause(),
    labeledDownArrow(modeling()),
    frameBox(xtable(
      'Model',
      smallGraph({showWeights: true, showPath: false}),
    _).margin(10).center()).bg.round(10).end, pause(),
  _).center()),
_));

prose(
  'The first pillar is modeling.',
  'Modeling takes messy real world problems and packages them into neat formal mathematical objects called <b>models</b>,',
  'which can be subject to rigorous analysis but is more amenable to what computers can operate on.',
  'However, modeling is lossy: not all of the richness of the real world can be captured,',
  'and therefore there is an art of modeling: what does one keep versus what does one ignore?',
  '(An exception to this is games such as Chess or Go or Sodoku, where the real world is identical to the model.)',
  _,
  'As an example, suppose we\'re trying to have an AI that can navigate through a busy city.',
  'We might formulate this as a graph where nodes represent points in the city, edges represent the roads and cost of an edge represents traffic on that road.',
_);

add(slide('Paradigm: inference',
  parentCenter(yseq(
    frameBox(xtable(
      'Model',
      smallGraph({showWeights: true, showPath: false}),
    _).margin(10).center()).bg.round(10).end, pause(),
    labeledDownArrow(inference()),
    frameBox(xtable(
      'Predictions',
      smallGraph({showWeights: true, showPath: true}),
    _).margin(10).center()).bg.round(10).end, pause(),
  _).center()),
_));

prose(
  'The second pillar is inference.',
  'Given a model, the task of <b>inference</b> is to answer questions with respect to the model.',
  'For example, given the model of the city, one could ask questions such as: what is the shortest path? what is the cheapest path?',
  _,
  'For some models, computational complexity can be a concern (games such as Go),',
  'and usually approximations are needed.',
_);

add(slide('Paradigm: learning',
  parentCenter(yseq(
    frameBox(xtable(
      'Model without parameters',
      smallGraph({showWeights: false}),
    _).margin(10).center()).bg.round(10).end, pause(),
    '+data',
    labeledDownArrow(learning()),
    frameBox(xtable(
      'Model with parameters',
      smallGraph({showWeights: true}),
    _).margin(10).center()).bg.round(10).end, pause(),
  _).center()),
_));

prose(
  'But where does the model come from?',
  'Remember that the real world is rich, so if the model is to be faithful,',
  'the model has to be rich as well.',
  'But we can\'t possibly write down such a rich model manually.',
  _,
  'The idea behind (machine) <b>learning</b> is to instead get it from data.',
  'Instead of constructing a model,',
  'one constructs a skeleton of a model (more precisely, a model family), which is a model without parameters.',
  'And then if we have the right type of data,',
  'we can run a machine learning algorithm to tune the parameters of the model.',
_);

add(slide('Course plan',
  nil(),
  getEvolutionOfModels(0),
_), 'learning');

prose(
  'We now embark on our tour of the topics in this course.',
  'The topics correspond to types of models that we can use to represent real-world tasks.',
  'The topics will in a sense advance from low-level intelligence to high-level intelligence,',
  'evolving from models that simply make a reflex decision to models that are based on logical reasoning.',
_);

add(slide('Machine learning',
  parentCenter(xtable(frameBox('Data'), bigRightArrow(), frameBox('Model')).center().margin(20)), 
  bulletedText('The main driver of recent successes in AI'),
  bulletedText('Move from "code" to "data" to manage the information complexity'),
  bulletedText('Requires a leap of faith: <b>generalization</b>'),
_));

prose(
  'Supporting all of these models is <b>machine learning</b>,',
  'which has been arguably the most crucial ingredient powering recent successes in AI.',
  'Conceptually, machine learning allows us to shift the information complexity of the model from code to data,',
  'which is much easier to obtain (either naturally occurring or via crowdsourcing).',
  _,
  'The main conceptually magical part of learning is that if done properly,',
  'the trained model will be able to produce good predictions beyond the set of training examples.',
  'This leap of faith is called <b>generalization</b>, and is, explicitly or implicitly, at the heart of any machine learning algorithm.',
  'This can even be formalized using tools from probability and statistical learning theory.',
_);

evolutionOfModels(1);

add(slide('What is this animal?',
  pause(), nil(),
  parentCenter(stagger(image('images/zebra.jpg'), nil())),
_));

add(slide('Reflex-based models',
  bulletedText('Examples: linear classifiers, deep neural networks'),
  parentCenter(image('images/deepface-cnn.png').width(750)),
  bulletedText('Most common models in machine learning'),
  bulletedText('Fully feed-forward (no backtracking)'),
_).leftHeader(image('images/hotstove.jpg').width(150)), 'reflex');

prose(
  'A reflex-based model simply performs a fixed sequence of computations on a given input.',
  'Examples include most models found in machine learning from simple linear classifiers to deep neural networks.',
  'The main characteristic of reflex-based models is that their computations are feed-forward;',
  'one doesn\'t backtrack and consider alternative computations.',
  'Inference is trivial in these models because it is just running the fixed computations, which makes these models appealing.',
_);

add(slide('Course plan',
  nil(),
  getEvolutionOfModels(2),
_), 'state-based models');

add(slide('State-based models',
  parentCenter(image('images/chess-board.png').width(300)),
  parentCenter('White to move'),
_));

add(slide('State-based models',
  parentCenter(image('images/tree-search.png').width(400)),
  stmt('Applications'),
  bulletedText('Games: Chess, Go, Pac-Man, Starcraft, etc.'),
  bulletedText('Robotics: motion planning'),
  bulletedText('Natural language generation: machine translation, image captioning'),
_));

prose(
  'Reflex-based models are too simple for tasks that require more forethought (e.g., in playing chess or planning a big trip).',
  'State-based models overcome this limitation.',
  _,
  'The key idea is, at a high-level, to model the <b>state</b> of a world and transitions between states which are triggered by actions.',
  'Concretely, one can think of states as nodes in a graph and transitions as edges.',
  'This reduction is useful because we understand graphs well and have a lot of efficient algorithms for operating on graphs.',
_);

add(slide('State-based models',
  stmt('Search problems: you control everything'),
  parentCenter(overlay(
    xtable(a = node(), b = node(), c = node()).margin(50),
    arrow(a, b),
    arrow(b, c),
  _)),
  pause(),
  stmt('Markov decision processes: against nature (e.g., Blackjack)'),
  parentCenter(overlay(
    xtable(a = node(), b = node(), ytable(c1 = node(), c2 = node()).margin(20)).margin(50).center(),
    arrow(a, b),
    arrow(b, c1),
    arrow(b, c2),
    moveTopOf(image('images/dice.png').width(50), b),
  _)),
  pause(),
  stmt('Adversarial games: against opponent (e.g., chess)'),
  parentCenter(overlay(
    xtable(a = node(), b = node(), ytable(c1 = node(), c2 = node()).margin(20)).margin(50).center(),
    arrow(a, b),
    arrow(b, c1),
    arrow(b, c2),
    moveTopOf(image('images/devil.jpg').width(50), b),
  _)),
_));

prose(
  'Search problems are adequate models when you are operating in environment that has no uncertainty.',
  'However, in many realistic settings, there are other forces at play.',
  _,
  '<b>Markov decision processes</b> handle tasks with an element of chance (e.g., Blackjack), where the distribution of randomness is known (reinforcement learning can be employed if it is not).',
  _,
  '<b>Adversarial games</b>, as the name suggests, handle tasks where there is an opponent who is working against you (e.g., chess).',
_);

add(slide('Pac-Man',
  nil(),
  parentCenter(image('images/pacman_multi_agent.png')),
  parentCenter('[demo]'),
_));

add(quizSlide('overview-pacman',
  'What kind of model is appropriate for playing Pac-Man against ghosts that move into each valid adjacent square with equal probability?',
  'search problem',
  'Markov decision process',
  'adversarial game',
_));

evolutionOfModels(3);

add(slide('Sudoku',
  parentCenter(xtable(
    image('images/sudoku.png'),
    rightArrow(50).strokeWidth(5),
    image('images/sudoku-solution.png'),
  _).margin(20).center()),
  stmt('Goal', 'put digits in blank squares so each row, column, and 3x3 sub-block has digits 1&ndash;9'),
  pause(),
  stmt('Note: order of filling squares doesn\'t matter in the evaluation criteria!'),
_));

prose(
  'In state-based models, solutions are procedural: they specify step by step instructions on how to go from A to B.',
  'In many applications, the order in which things are done isn\'t important.',
_);

add(slide('Variable-based models',
  stmt('Constraint satisfaction problems: hard constraints (e.g., Sudoku, scheduling)'),
  parentCenter(cspGraph({})),
  pause(),
  stmt('Bayesian networks: soft dependencies (e.g., tracking cars from sensors)'),
  parentCenter(hmm({maxTime: 5})).scale(0.8),
_));

prose(
  '<b>Constraint satisfaction problems</b> are variable-based models where we only have hard constraints.',
  'For example, in scheduling, we can\'t have two people in the same place at the same time.',
  _,
  '<b>Bayesian networks</b> are variable-based models where variables are random variables which are dependent on each other.',
  'For example, the true location of an airplane $H_t$ and its radar reading $E_t$ are related, as are the location $H_t$ and the location at the last time step $H_{t-1}$.',
  'The exact dependency structure is given by the graph structure and it formally defines a joint probability distribution over all the variables.',
  'This topic is studied thoroughly in  probabilistic graphical models (CS228).',
_);

evolutionOfModels(4);

add(slide('Logic',
  bulletedText('Dominated AI from 1960s-1980s, still useful in programming systems'),
  bulletedText('Powerful representation of knowledge and reasoning'),
  bulletedText('Brittle if done naively'),
  bulletedText('Open question: how to combine with machine learning?'),
_));

prose(
  'Our last stop on the tour is <b>logic</b>.',
  'Even more so than variable-based models, logic provides a compact language for modeling, which gives us more expressivity.',
  _,
  'It is interesting that historically, logic was one of the first things that AI researchers started with in the 1950s.',
  'While logical approaches were in a way quite sophisticated, they did not work well on complex real-world tasks with noise and uncertainty.',
  'On the other hand, methods based on probability and machine learning naturally handle noise and uncertainty,',
  'which is why they presently dominate the AI landscape.',
  'However, they are yet to be applied successfully to tasks that require really sophisticated reasoning.',
  _,
  'In this course, we will appreciate the two as not contradictory, but simply tackling different aspects of AI &mdash;',
  'in fact, in our schema, logic is a class of models which can be supported by machine learning.',
  'An active area of research is to combine the richness of logic with the robustness and agility of machine learning.',
_);

add(slide('Motivation: virtual assistant',
  parentCenter(xtable(
    pause(),
    ytable( 
      '<b>Tell</b> information',
      bigRightArrow(200),
    _),
    pause(-1),
    image('images/brain-gears.jpg').height(180),
    pause(2),
    ytable( 
      '<b>Ask</b> questions',
      bigLeftArrow(200),
    _),
  _).center().margin(30)),
  pause(),
  parentCenter(redbold('Use natural language!')),
  parentCenter('[demo]'),
  pause(),
  headerList('Need to',
    'Digest <b>heterogenous</b> information',
    'Reason <b>deeply</b> with that information',
  _),
_));

prose(
  'One motivation for logic is a virtual assistant.',
  'At an abstract level, one fundamental thing a good personal assistant',
  'should be able to do is to take in information from people',
  'and be able to answer questions that require drawing inferences from these facts.',
  _,
  'In some sense, telling the system information is like machine learning,',
  'but it feels like a very different form of learning than seeing 10M images',
  'and their labels or 10M sentences and their translations.',
  'The type of information we get here is both more heterogenous, more abstract,',
  'and the expectation is that we process it more deeply',
  '(we don\'t want to tell our personal assistant 100 times that we prefer morning meetings).',
  _,
  'And how do we interact with our personal assistants?',
  'Let\'s use natural language, the very tool that was built for communication!',
_);

evolutionOfModels(5);

////////////////////////////////////////////////////////////

roadmap(2);

add(slide('Course objectives',
  importantBox('Before you take the class, you should know...',
    bulletedText('Programming (CS 106A, CS 106B, CS 107)'),
    bulletedText('Discrete math, mathematical rigor (CS 103)'),
    bulletedText('Probability (CS 109)'),
  _),
  pause(),
  importantBox('At the end of this course, you should...',
    bulletedText('Be able to tackle real-world tasks with the appropriate techniques'),
    bulletedText('Be more proficient at math and programming'),
  _),
_));

add(slide('Coursework',
  bulletedText('Homeworks (60%)'),
  bulletedText('Exam (20%)'),
  bulletedText('Project (20%)'),
_).leftHeader(image('images/homework.jpg')));

add(slide('Homeworks',
  bulletedText('8 homeworks, mix of written and programming problems, each centers on an application'),
  parentCenter(table(
    ['Introduction'.bold(), 'foundations'],
    ['Machine learning'.bold(), 'sentiment classification'],
    ['Search'.bold(), 'text reconstruction'],
    ['MDPs'.bold(), 'blackjack'],
    ['Games'.bold(), 'Pac-Man'],
    ['CSPs'.bold(), 'course scheduling'],
    ['Bayesian networks'.bold(), 'car tracking'],
    ['Logic'.bold(), 'language and logic'],
  _).margin(80, 10).scale(0.6)),
  bulletedText('Some have competitions for extra credit'),
  bulletedText('When you submit, programming parts will be run on all test cases, but only get feedback on a subset'),
_));

add(slide('Exam',
  bulletedText('Goal: test your ability to use knowledge to solve new problems, not know facts'),
  bulletedText('All written problems (look at past exam problems for style)'),
  bulletedText('Closed book except one page of notes'),
  bulletedText('Covers all material up to and including preceding week'),
  bulletedText('Tue Nov. 27 from 6pm to 9pm (3 hours)'),
_));

add(slide('Project',
  bulletedText('Goal: choose any task you care about and apply techniques from class'),
  bulletedText('Work in groups of up to 3; find a group early, your responsibility to be in a good group'),
  bulletedText('Milestones: proposal, progress report, poster session, final report'),
  bulletedText('Task is completely open, but must follow well-defined steps: task definition, implement baselines/oracles, evaluate on dataset, literature review, error analysis (read website)'),
  bulletedText('Help: assigned a CA mentor, come to any office hours'),
_));

add(slide('Policies',
  stmt('Late days: 8 total late days, max two per assignment'),
  stmt('Regrades: come in person to the owner CA of the homework'),
  stmt('Piazza: ask questions on Piazza, don\'t email us directly'),
  stmt('Piazza: extra credit for students who help answer questions'),
  parentCenter(bold('All details are on the course website')),
_));

add(slide(null,
  parentCenter(image('images/honor-code.jpg')),
  bulletedText('Do collaborate and discuss together, but write up and code independently.'),
  bulletedText('Do not look at anyone else\'s writeup or code.'),
  bulletedText('Do not show anyone else your writeup or code or post it online (e.g., GitHub).'),
  bulletedText('When debugging, only look at input-output behavior.'),
  bulletedText('We will run MOSS periodically to detect plagarism.'),
_));

////////////////////////////////////////////////////////////

roadmap(3);

add(slide('Optimization',
  stmt('Discrete optimization: a discrete object'),
  parentCenter('$\\min\\limits_{p \\in \\text{Paths}} \\text{Distance}(p)$'),
  indent(redbold('Algorithmic')+' tool: dynamic programming'),
  pause(),
  stmt('Continuous optimization: a vector of real numbers'),
  parentCenter('$\\min\\limits_{\\mathbf w \\in \\R^d} \\text{TrainingError}(\\mathbf w)$'),
  indent(redbold('Algorithmic')+' tool: gradient descent'),
_));

prose(
  'We are now done with the high-level motivation for the class.',
  'Let us now dive into some technical details.',
  'Let us focus on the inference and the learning aspect of the <b>modeling-inference-learning</b> paradigm.',
  _,
  'We will approach inference and learning from an <b>optimization</b> perspective,',
  'which allows us to decouple the mathematical specification of <b>what</b> we want to compute',
  'from the algorithms for <b>how</b> to compute it.',
  _,
  'In total generality, optimization problems ask that you find the $x$ that lives in a constraint set $C$',
  'that makes the function $F(x)$ as small as possible.',
  _,
  'There are two types of optimization problems we\'ll consider: discrete optimization problems (mostly for inference) and continuous optimization problems (mostly for learning).',
  'Both are backed by a rich research field and are interesting topics in their own right.',
  'For this course, we will use the most basic tools from these topics: <b>dynamic programming</b> and <b>gradient descent</b>.',
  _,
  'Let us do two practice problems to illustrate each tool.',
  'For now, we are assuming that the model (optimization problem) is given and only focus on <b>algorithms</b>.',
_);

add(slide(null,
  problem('computing edit distance',
    stmt('Input: two strings, $s$ and $t$'),
    stmt('Output: minimum number of character insertions, deletions, and substitutions it takes to change $s$ into $t$'),
  _),
  stmt('Examples'),
  parentCenter(table(
    ['"cat", "cat"', '$\\Rightarrow$', 0],
    ['"cat", "dog"', '$\\Rightarrow$', 3],
    ['"cat", "at"', '$\\Rightarrow$', 1],
    ['"cat", "cats"', '$\\Rightarrow$', 1],
    ['"a cat!", "the cats!"', '$\\Rightarrow$', 4],
  _).xmargin(20).ycenter()),
  pause(),
  parentCenter('[live solution]'),
  // a cat! / the cats!
_), 'dynamic programming');

prose(
  'Let\'s consider the formal task of computing the edit distance (or more precisely the Levenshtein distance) between two strings.',
  'These measures of dissimilarity have applications in spelling correction, computational biology (applied to DNA sequences).',
  _,
  'As a first step, you should think of breaking down the problem into subproblems.',
  'Observation 1: inserting into $s$ is equivalent to deleting a letter from $t$ (ensures subproblems get smaller).',
  'Observation 2: perform edits at the end of strings (might as well start there).',
  _,
  'Consider the last letter of $s$ and $t$.',
  'If these are the same, then we don\'t need to edit these letters, and we can proceed to the second-to-last letters.',
  'If they are different, then we have three choices.',
  '(i) We can substitute the last letter of $s$ with the last letter of $t$.',
  '(ii) We can delete the last letter of $s$.',
  '(iii) We can insert the last letter of $t$ at the end of $s$.',
  _,
  'In each of those cases, we can reduce the problem into a smaller problem, but which one?',
  'We simply try all of them and take the one that yields the minimum cost!',
  _,
  'We can express this more formally with a mathematical recurrence.',
  'These types of recurrences will show up throughout the course, so it\'s a good idea to be comfortable with them.',
  'Before writing down the actual recurrence, the first step is to express the quantity that we wish to compute.',
  'In this case: let $d(m, n)$ be the edit distance between the first $m$ letters of $s$ and the first $n$ letters of $t$.',
  'Then we have $d(m, n) = \\begin{cases} m & \\text{if $n = 0$} \\\\ n & \\text{if $m = 0$} \\\\ d(m-1, n-1) & \\text{if $s_m = t_n$} \\\\ 1+\\min \\{ d(m-1, n-1), d(m-1, n), d(m, n-1) \\} & \\text{otherwise}. \\end{cases}$',
  _,
  'Once you have the recurrence, you can code it up.',
  'The straightforward implementation will take exponential time,',
  'but you can <b>memoize</b> the results to make it $O(n^2)$ time.',
  'The end result is the dynamic programming solution: recurrence + memoization.',
_);

add(slide(null,
  problem('finding the least squares line',
    stmt('Input: set of pairs $\\{(x_1,y_1), \\dots, (x_n,y_n)\\}$'),
    stmt('Output: $w \\in \\mathbb R$ that minimizes the squared error'),
    parentCenter('$F(w) = \\sum_{i=1}^n (x_i w - y_i)^2$'),
  _),
  pause(),
  stmt('Examples'),
  parentCenter(table(
    ['$\\{(2,4)\\}$', '$\\Rightarrow$', 2],
    ['$\\{(2,4), (4,2)\\}$', '$\\Rightarrow$', '?'],
  _).xmargin(20).ycenter()),
  pause(),
  parentCenter('[live solution]'),
_), ['linear regression', 'gradient descent']);

prose(
  'The formal task is this: given a set of $n$ two-dimensional points $(x_i,y_i)$ which defines $F(w)$,',
  'compute the $w$ that minimizes $F(w)$.',
  _,
  '<b>Linear regression</b> is an important problem in machine learning, which we will come to later.',
  'Here\'s a motivation for the problem: suppose you\'re trying to understand how your exam score ($y$) depends on the number of hours you study ($x$).',
  'Let\'s posit a linear relationship $y = w x$ (not exactly true in practice, but maybe good enough).',
  'Now we get a set of training examples, each of which is a $(x_i,y_i)$ pair.',
  'The goal is to find the slope $w$ that best fits the data.',
  _,
  'Back to algorithms for this formal task.',
  'We would like an algorithm for optimizing general types of $F(w)$.',
  'So let\'s <b>abstract away from the details</b>.',
  'Start at a guess of $w$ (say $w = 0$), and then iteratively update $w$ based on the derivative (gradient if $w$ is a vector) of $F(w)$.',
  'The algorithm we will use is called <b>gradient descent</b>.',
  _,
  'If the derivative $F\'(w) < 0$, then increase $w$; if $F\'(w) > 0$, decrease $w$; otherwise, keep $w$ still.',
  'This motivates the following update rule, which we perform over and over again:',
  '$\\displaystyle w \\leftarrow w - \\eta F\'(w)$, where $\\eta > 0$ is a <b>step size</b> that controls how aggressively we change $w$.',
  _,
  'If $\\eta$ is too big, then $w$ might bounce around and not converge.',
  'If $\\eta$ is too small, then $w$ might not move very far to the optimum.',
  'Choosing the right value of $\\eta$ can be rather tricky.',
  'Theory can give rough guidance, but this is outside the scope of this class.',
  'Empirically, we will just try a few values and see which one works best.',
  'This will help us develop some intuition in the process.',
  _,
  'Now to specialize to our function, we just need to compute the derivative,',
  'which is an elementary calculus exercise: $F\'(w) = \\sum_{i=1}^n 2 (x_i w - y_i) x_i$.',
_);

////////////////////////////////////////////////////////////

add(quizSlide('introduction-most-surprising',
  'What was the most surprising thing you learned today?',
_));

add(summarySlide('Summary',
  bulletedText('AI has high societal impact, our responsibility to steer it positively'),
  bulletedText('Modeling [reflex, states, variables, logic] + inference + learning'),
  bulletedText('Section this Friday: review of foundations'),
  bulletedText('Homework [foundations]: due next Tuesday 11pm'),
  bulletedText('Course will be fast-paced and exciting!'),
_));

initializeLecture();
