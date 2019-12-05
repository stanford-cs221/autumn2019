G = sfig.serverSide ? global : this;
G.prez = presentation();

////////////////////////////////////////////////////////////

add(titleSlide('Lecture 19: Conclusion',
  nil(),
  parentCenter(image('images/curtains.jpg').width(300)),
_));

var index = 0;
var SUMMARY = index++;
var NEXT = index++;
var HISTORY = index++;
var FINAL = index++;
function roadmap(i) {
  add(outlineSlide('Roadmap', i, [
    ['summary', 'Summary of CS221'],
    ['next', 'Next courses'],
    ['history', 'History of AI'],
    ['final', 'Food for thought'],
  ]));
}

////////////////////////////////////////////////////////////
roadmap(SUMMARY);

add(slide('Paradigm',
  parentCenter(paradigm()),
_));

evolutionOfModels(9, 'none');

add(slide('Machine learning',
  stmt('Objective', 'loss minimization'),
  parentCenter('$\\displaystyle \\min_\\w \\sum_{(x,y) \\in \\Train} \\Loss(x, y, \\w)$'),
  pause(),
  stmt('Algorithm', 'stochastic gradient descent'),
  parentCenter('$\\w \\to \\w - \\eta_t \\underbrace{\\nabla \\Loss(x, y, \\w)}_{\\green{\\text{prediction}} - \\red{\\text{target}}}$'),
  pause(),
  parentCenter(modulebox('Applies to wide range of models!')),
_));

add(slide('Reflex-based models',
  parentCenter(image('images/deep-nn.png').width(450)),
  stmt('Models: linear models, neural networks, nearest neighbors'),
  stmt('Inference: feedforward'),
  stmt('Learning: SGD, alternating minimization'),
_));

var graph = {
  edges: 'S B 1 | B C 1 | S C 5 | S D 7 | C D 5 | D E 2 | E F 8 | F C 8 | C G 3 | F G 9'.split(' | '),
  initRandom: 1, numIters: 1000, numTrials: 20,
  targetEdgeDist: 150, maxHeight: 100,
  labelDist: 10, labelScale: 0.8, labelColor: 'red',
  directed: true
};
add(slide('State-based models',
  parentCenter(stagger(
    nodeEdgeGraph(graph),
  _)),
  keyIdea('state',
    'A <b>state</b> is a summary of all the past actions sufficient to choose future actions <b>optimally</b>.',
  _),
  stmt('Models: search problems, MDPs, games'),
  stmt('Inference: UCS/A*, DP, value iteration, minimax'),
  stmt('Learning: structured Perceptron, Q-learning, TD learning'),
_));

add(slide('Variable-based models',
  parentCenter(
    australia({colors: {WA: 'red', NT: 'green', Q: 'red', SA: 'blue', NSW: 'green', V: 'red', T: 'green'}}),
  _).scale(0.6),
  keyIdea('factor graphs',
    'Graph structure captures conditional independence.',
  _),
  stmt('Models: CSPs, Bayesian networks'),
  stmt('Inference: backtracking, forward-backward, beam search, Gibbs sampling'),
  stmt('Learning: maximum likelihood (closed form, EM)'),
_));

add(slide('Logic-based models',
  logicSchema().scale(0.5),
  keyIdea('logic',
    'Formulas enable more powerful models (infinite).',
  _),
  stmt('Models: propositional logic, first-order logic'),
  stmt('Inference: model checking, modus ponens, resolution'),
  stmt('Learning: ???'),
_));

add(slide('Tools',
  bulletedText('CS221 provides a set of tools'),
  parentCenter(image('images/toolbox.jpg')),
  pause(),
  bulletedText('Start with the problem, and figure out what tool to use'),
  bulletedText('Keep it simple!'),
_));

////////////////////////////////////////////////////////////
roadmap(NEXT);

add(slide('Other AI-related courses',
  parentCenter(text(redbold('http://ai.stanford.edu/courses/')).linkToUrl('http://ai.stanford.edu/courses/')),
  headerList('Foundations',
    'CS228: Probabilistic Graphical Models',
    'CS229: Machine Learning',
    'CS229T: Statistical Learning Theory',
    'CS230: Deep Learning',
    'CS334A: Convex Optimization',
    'CS238: Decision Making Under Uncertainty',
    'CS257: Logic and Artificial Intelligence',
    'CS246: Mining Massive Data Sets',
  _),
_));

add(slide('Other AI-related courses',
  parentCenter(text(redbold('http://ai.stanford.edu/courses/')).linkToUrl('http://ai.stanford.edu/courses/')),
  headerList('Applications',
    'CS224N: Natural Language Processing (with Deep Learning)',
    'CS224U: Natural Language Understanding',
    'CS231A: From 3D Reconstruction to Recognition',
    'CS231N: Convolutional Neural Networks for Visual Recognition',
    'CS223A: Introduction to Robotics',
    'CS237A-B: Robot Autonomy',
    'CS227B: General Game Playing',
  _),
_));

add(slide('Probabilistic graphical models (CS228)',
  parentCenter(twoLayerBayesNet({n1:3, n2: 6, undirected: true, label: true}).scale(0.4)),
  bulletedText('Forward-backward, variable elimination $\\Rightarrow$ belief propagation, variational inference'),
  bulletedText('Gibbs sampling $\\Rightarrow$ Markov Chain Monte Carlo (MCMC)'),
  bulletedText('Learning the structure'),
_));

add(slide('Machine learning (CS229)',
  parentCenter(image('images/overfitting-regression.jpg').width(150)),
  bulletedText('Discrete $\\Rightarrow$ continuous'),
  bulletedText('Linear models $\\Rightarrow$ kernel methods, decision trees'),
  bulletedText('Boosting, bagging, feature selection'),
  bulletedText('K-means $\\Rightarrow$ mixture of Gaussians, PCA, ICA'),
_));

add(slide('Statistical learning theory (CS229T)',
  stmt('Question: what are the mathematical principles behind learning?'),
  stmt('Uniform convergence: with probability at least 0.95, your algorithm will return a predictor $h \\in \\mathcal H$ such that'),
  parentCenter('$\\text{TestError}(h) \\le \\text{TrainError}(h) + \\sqrt{\\frac{\\text{Complexity}(\\mathcal H)}{n}}$'),
_));

add(slide('Vision (CS231A, CS231N)',
  parentCenter(image('images/what-is-cv.png').width(600)),
  bulletedText(stmt('Challenges: variation in viewpoint, illumination, intra-class variation')),
  bulletedText(stmt('Tasks: object recognition/detection/segmentation, pose estimation, 3D reconstruction, image captioning, visual question answering, activity recognition')),
_).leftHeader('[figure credit: Fei-Fei Li]'));

add(slide('Robotics (CS223A, CS225A)',
  bulletedText(stmt('Tasks: manipulation, grasping, navigation')),
  parentCenter(xtable(
    image('images/robot-fetch.png').width(200),
    image('images/google-car.jpeg').width(250),
  _).center().margin(100)),
  bulletedText(stmt('Applications: self-driving cars, medical robotics')),
  bulletedText(stmt('Physical models: kinematics, control')),
  // Hardware, vision
_));

add(slide('Robotics (CS237A, CS237B)',
  bulletedText(stmt('Tasks: interaction, robot learning, autonomy')),
  parentCenter(xtable(
    image('images/class-robot.png').width(150),
    image('images/autonomy.png').width(250),
  _).center().margin(100)),
  bulletedText(stmt('Applications: mobile manipulation')),
  bulletedText(stmt('Term: Winter 2020, (Marco Pavone, Jeannette Bohg, Dorsa Sadigh)')),
  // Hardware, vision
_));

add(slide('Language (CS224N, CS224U)',
  bulletedText('Designed by humans for communication'),
  bulletedText('World: continuous, words: discrete, meanings: continuous'),
  //bulletedText('Linguistic levels: morphology, syntax, semantics, pragmatics'),
  bulletedText(stmt('Properties: compositionality, grounding')),
  parentCenter(image('images/kids-talking.jpg')),
  pause(),
  bulletedText(stmt('Tasks: syntactic parsing, semantic parsing, information extraction, coreference resolution, machine translation, question answering, summarization, dialogue')),
_));

add(slide('Cognitive science',
  parentCenter(image('images/brain-gears.jpg').width(150)),
  stmt('Question: How does the human mind work?'),
  bulletedText('Cognitive science and AI grew up together'),
  bulletedText('Humans can learn from few examples on many tasks'),
  stmt('Computation and cognitive science (PSYCH204, CS428)'),
  bulletedText('Cognition as Bayesian modeling &mdash; probabilistic program [Tenenbaum, Goodman, Griffiths]'),
_));

add(slide('Neuroscience',
  parentCenter(image('images/learning.png').width(250)),
  bulletedText('Neuroscience: hardware; cognitive science: software'),
  bulletedText('Artificial neural network as computational models of the brain'),
  bulletedText('Modern neural networks (GPUs + backpropagation) not biologically plausible'),
  bulletedText('Analogy: birds versus airplanes; what are principles of intelligence?'),
_));

////////////////////////////////////////////////////////////
roadmap(HISTORY);

/*add(slide('Pre-AI developments',
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
_));*/

add(slide('Birth of AI',
  stmt('1956', 'Workshop at Dartmouth College; attendees: John McCarthy, Marvin Minsky, Claude Shannon, etc.'),
  parentCenter(image('images/dartmouth.jpg').width(150)),
  'Aim for '+redbold('general principles')+':',
  parentCenter(text('<i>Every aspect of learning or any other feature of intelligence can be so precisely described that a machine can be made to simulate it.</i>').scale(0.9)),
_));

add(slide('Birth of AI, early successes',
  side(
    stmt('Checkers (1952)', 'Samuel\'s program learned weights and played at strong amateur level'),
    'images/checkers.jpg',
  _),
  pause(),
  side( // Paper rejected, didn't realize third author was a computer program
    stmt('Problem solving (1955)', 'Newell &amp; Simon\'s Logic Theorist: prove theorems in Principia Mathematica using search + heuristics; later, General Problem Solver (GPS)'), // Mimic problem solving
    'images/isosceles.jpg',
  _),
_));

function quote(quote, who) {
  return italics(quote) + ' &mdash;'+who;
}
add(slide('Overwhelming optimism...',
  quote('Machines will be capable, within twenty years, of doing any work a man can do.', 'Herbert Simon'),
  quote('Within 10 years the problems of artificial intelligence will be substantially solved.', 'Marvin Minsky'),
  quote('I visualize a time when we will be to robots what dogs are to humans, and I\'m rooting for the machines.', 'Claude Shannon'),
_));

add(slide('...underwhelming results',
  stmt('Example: machine translation'),
  parentCenter(yseq(
    'The spirit is willing but the flesh is weak.'.italics().fontcolor('green'),
    downArrow(30).strokeWidth(2),
    '(Russian)', pause(),
    downArrow(30).strokeWidth(2),
    'The vodka is good but the meat is rotten.'.italics().fontcolor('red'),
  _).center()),
  pause(),
  '1966: ALPAC report cut off government funding for MT',
_));

add(slide('AI is overhyped...',
  quote('We tend to overestimate the effect of a technology in a short run and underestimate the effect in a long run.', 'Roy Amara (1925-2007)'),
  _));

add(slide('Implications of early era',
  headerList('Problems',
    cat(redbold('Limited computation'), ': search space grew exponentially, outpacing hardware ($100! \\approx 10^{157} > 10^{80}$)'),
    cat(redbold('Limited information'), ': complexity of AI problems (number of words, objects, concepts in the world)'),
  _),
  pause(),
  headerList('Contributions',
    'Lisp, garbage collection, time-sharing (John McCarthy)',  // Revolutionary
    stmt('Key paradigm', 'separate '+greenbold('modeling')+' (declarative) and '+greenbold('inference')+' (procedural)'),
  _),
_));

add(slide('Knowledge-based systems (70-80s)',
  parentCenter(image('images/knowledge-key.jpg')),
  stmt('Expert systems', 'elicit specific domain knowledge from experts in form of rules:'),
  parentCenter('<tt>if [premises] then [conclusion]</tt>'),
_));

add(slide('Knowledge-based systems (70-80s)',
  side(
    'DENDRAL: infer molecular structure from mass spectrometry',
    'images/molecule.jpg',
  _),
  side(
    'MYCIN: diagnose blood infections, recommend antibiotics',
    'images/mycin.jpg',
  _),
  side(
    'XCON: convert customer orders into parts specification; save DEC $\\$40$ million a year by 1986',
    'images/xcon.jpg',
  _),
_));

add(slide('Knowledge-based systems',
  headerList('Contributions',
    'First '+greenbold('real application')+' that impacted industry',
    'Knowledge helped curb the exponential growth',
  _),
  pause(),
  headerList('Problems',
    'Knowledge is not deterministic rules, need to model <font color="red"><b>uncertainty</b></font>',
    'Requires considerable '+redbold('manual effort')+' to create rules, hard to maintain',
  _),
_));

add(slide('SHRDLU [Winograd 1971]',
  overlay(
    ytable(
      '<font color="red">Person</font>: Pick up a big red block.',
      '<font color="blue">Computer</font>: OK.',
      '<font color="red">Person</font>: Grasp the pyramid.',
      '<font color="blue">Computer</font>: I don\'t understand which pyramid you mean.',
      '<font color="red">Person</font> (changing their mind): Find a block which is taller than the one you are holding and put it into the box.',
      '<font color="blue">Computer</font>: By "it", I assume you mean the block which is taller than the one I am holding.',
      '<font color="blue">Computer</font>: OK.',
      '<font color="red">Person</font>: What does the box contain?',
      '<font color="blue">Computer</font>: The blue pyramid and the blue block.',
      '<font color="red">Person</font>: What is the pyramid supported by?',
      '<font color="blue">Computer</font>: The box.',
    _).scale(0.8),
    showLevel(0),
    image('images/BlocksWorld.jpg').width(300).shiftBy(450, 300),
  _),
_));

add(slide('The Complexity Barrier',
  // All rule-based in limited domain, interesting that software engineering was the issue
  'A number of people have suggested to me that large programs like the SHRDLU program for understanding natural language represent a kind of '+red('dead end')+' in AI programming.  '+red('Complex interactions')+' between its components give the program much of its power, but at the same time they present a formidable obstacle to understanding and extending it. In order to grasp any part, it is necessary to understand how it fits with other parts, presents a dense mass, with '+red('no easy footholds')+'.  Even having written the program, I find it near the limit of what I can keep in mind at once.',
  parentCenter('&mdash; Terry Winograd (1972)'),
_));

add(slide('Modern AI (90s-present)',
  bulletedText(redbold('Probability')+': Pearl (1988) promote Bayesian networks in AI to '+greenbold('model uncertainty')+' (based on Bayes rule from 1700s)'),
  indent(xtable(bluebold('model'), bigRightArrow(), 'predictions').center().margin(10).center(), 100),
  pause(),
  bulletedText(redbold('Machine learning')+': Vapnik (1995) invented support vector machines to '+greenbold('tune parameters')+' (based on statistical models in early 1900s)'),
  indent(xtable('data', bigRightArrow(), bluebold('model')).center().margin(10).center(), 100),
_));

// add(slide('Modern AI (90s-present)',
//   nil(),
//   parentCenter(table(
//     [image('images/sussmananomaly.png').width(250), pause(),
//     bigRightArrow(),
//      image('images/Road_Scene_understanding.jpg').width(250)],
//     pause(-1),
//     [redbold('reasoning'), pause(), nil(), bluebold('perception')],
//   _).margin(50, 10)).center(),
// _));

add(slide('A melting pot',
  bulletedText('Bayes rule (Bayes, 1763) from ' + greenbold('probability')),
  bulletedText('Least squares regression (Gauss, 1795) from ' + greenbold('astronomy')),
  bulletedText('First-order logic (Frege, 1893) from ' + greenbold('logic')),
  bulletedText('Maximum likelihood (Fisher, 1922) from ' + greenbold('statistics')),
  bulletedText('Artificial neural networks (McCulloch/Pitts, 1943) from ' + greenbold('neuroscience')),
  bulletedText('Minimax games (von Neumann, 1944) from ' + greenbold('economics')),
  bulletedText('Stochastic gradient descent (Robbins/Monro, 1951) from ' + greenbold('optimization')),
  bulletedText('Uniform cost search (Dijkstra, 1956) from ' + greenbold('algorithms')),
  bulletedText('Value iteration (Bellman, 1957) from ' + greenbold('control theory')),
_));

////////////////////////////////////////////////////////////
roadmap(FINAL);

add(slide('Outlook',
  stmt('AI is everywhere: consumer services, advertising, transportation, manufacturing, etc.'),
  parentCenter(image('images/machine-age.jpg').width(200)),
  pause(),
    stmt('AI being used to make decisions for: education, credit, employment, advertising, healthcare and policing'),
_));

add(slide('Google Machine Translation (2016)',
  parentCenter(image(sfig.serverSide ? 'images/gnmt-model.png' : 'images/gnmt-model.gif')),
_));

add(slide('Biases',
  parentCenter(image('images/google-translate-biases.png').width(700)),
_).rightHeader('[Prates+ 2018]'));

add(slide('Craziness',
  parentCenter(image('images/google-translate-prophet.png').width(700)),
_));

add(slide('Image classification',
  parentCenter(overlay(
    image('images/imagenet-performance.jpg').width(600), pause(),
  _)),
_).rightHeader('[figure credit: EFF]'));

// That object recognizer that really brought in the deep learning
add(slide('Adversaries',
  parentCenter('AlexNet predicts correctly on the left'),
  parentCenter(image('images/adversarial-examples.png').width(350)),
  pause(),
  parentCenter('AlexNet predicts '+redbold('ostrich')+' on the right'),
_).leftHeader('[Szegedy et al., 2013; Goodfellow et al., 2014]'));

add(slide('Adversaries',
  parentCenter('A Simple Explanation for Existence of Adversarial Examples with Small Hamming Distance'),
  parentCenter(image('images/hamming-adv.png').width(550)),
_).leftHeader('[Shamir et al., 2019]'));


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


var original = 'Individual Huguenots settled at the Cape of Good Hope from as early as 1671 with the arrival of Francois Villion (Viljoen). The first Huguenot to arrive at the Cape of Good Hope was however Maria de la Queillerie, wife of commander Jan van Riebeeck (and daughter of a Walloon church minister), who arrived on 6 April 1652 to establish a settlement at what is today Cape Town. The couple left for the Far East ten years later. On 31 December 1687 the first organised group of Huguenots set sail from the Netherlands to the Dutch East India Company post at the Cape of Good Hope. The largest portion of the Huguenots to settle in the Cape arrived between 1688 and 1689 in seven ships as part of the organised migration, but quite a few arrived as late as 1700; thereafter, the numbers declined and only small groups arrived at a time.';
var adv = 'The number of old Acadian colonists declined after the year 1675.';
var question = 'The number of new Huguenot colonists declined after what year?';
var trueAnswer = '1700';
var modelAnswer = '1675';

G.paragraph = function(x) {
  // For reading comprehension
  return frameBox(text(x).fontSize(20)).bg.fillColor('yellow').fillOpacity(0.1).strokeColor('gray').end;
}

add(slide('Reading comprehension',
  parentCenter(stagger(
    paragraph(original),
    pause(),
    paragraph(original + ' ' + red(adv)),
  _).scale(0.9)),
  pause(-2),
  parentCenter(ytable(
    text(question).fontSize(20),
    bigDownArrow(50),
    frameBox('BERT [Google]'),
    bigDownArrow(50),
    pause(),
    stagger(
      trueAnswer,
      '',
      red(modelAnswer),
    _).center(),
  _).center()),
_).leftHeader(image('images/devil.jpg').width(150).showLevel(2)).rightHeader('[with Robin Jia; EMNLP 2017]'));


// add(slide('Results on SQuAD models',
//   parentCenter(table(
//     ['Model', 'Original F1', 'Adversarial F1'].map(bold),
//     pause(),
//     ['Humans',          '92.6',        '89.2'],
//     pause(-1),
//     ['BERT',            '93.2',         '70.7'],
//     ['SLQA+',           '88.6',         '64.2'],
//     ['r-net+',          '88.5',         '63.4'],
//     ['ReasoNet-E',      '81.1',         '49.8'],
//     ['SEDT-E',          '80.1',         '46.5'],
//     ['BiDAF-E',         '80.0',         '46.9'],
//     ['Mnemonic-E',      '79.1',         '55.3'],
//     ['Ruminating',      '78.8',         '47.7'],
//     ['jNet',            '78.6',         '47.0'],
//     ['Mnemonic-S',      '78.5',         '56.0'],
//   _).margin(80, 0)),
// _));

// Can build it, should?
add(slide('Optimizing for clicks',
  parentCenter(image('images/facebook-news-feed.png').width(600)),
  parentCenter('Is this a good objective function for society?'),
_));

add(slide('How to model human objectives? ',
  parentCenter(image('images/reward.png').width(600)),
  parentCenter('Is this a good objective function for the human?'),
_));

add(slide('How to model human objectives? ',
  parentCenter(image('images/human_compatible.jpg').width(150)),
  parentCenter('Be aware of the mismatch between human preferences and what the robot thinks are the human preferences.'),
_));

add(slide('Generating fake content',
  parentCenter(image('images/deepfake.jpeg').width(500)),
  parentCenter('Can build it $\\neq$ should build it?'),
_));

add(slide('Fairness',
   parentCenter(image('images/majority-minority.png').width(500)),
   pause(),
   bulletedText('Most ML training objectives will produce model accurate for majority class, at the expense of the minority one.'),  
_).rightHeader('Figure from Moritz Hardt'));

add(slide('Fairness',
  stmt('Two classifiers with 5% error'),
  parentCenter(image('images/error-analysis.png').width(500)),
_).rightHeader('Figure from Moritz Hardt'));

add(slide('Fairness in criminal risk assessment',
  bulletedText(stmt('Northpointe: COMPAS predicts criminal risk score (1-10)')), pause(),
  bulletedText(stmt('ProPublica: given that an individual did not reoffend, blacks 2x likely to be (wrongly) classified 5 or above')), pause(),
  bulletedText(stmt('Northpointe: given a risk score of 7, 60% of whites reoffended, 60% of blacks reoffended')),
  pause(),
  parentCenter(image('images/news-california-bail.png').width(550)),
_));

add(slide('Are algorithms neutral?',
  nil(),
  parentCenter(xtable(
    ytable('$\\Train$').center().strokeColor('green'),
    thickRightArrow(50),
    frameBox(purplebold('Learner')).padding(20),
    pause(),
    thickRightArrow(),
    ytable(
      text('$x$').orphan(true),
      downArrow(50).strokeWidth(3).orphan(true),
      frameBox(ytable('$f$').center()),
      downArrow(50).strokeWidth(3).orphan(true),
      text('$y$').orphan(true),
    _).center().margin(5),
  _).center().margin(15)),
  pause(),
  stmt('By design: picks up patterns in training data, including biases'),
_));

add(slide('Feedback loops',
  parentCenter(image('images/bottou-feedback-loop.png').width(700)),
_).leftHeader('[Leon Bottou]'));

function hide(x) { return overlay(std(x).hideLevel(1), std(lightgray(x)).showLevel(1)); }
add(slide('Privacy',
  bulletedText('Not reveal sensitive information (income, health, communication)'),
  bulletedText('Compute average statistics (how many people have cancer?)'),
  parentCenter(table(
    [
      image('images/person.jpg').width(40),
      image('images/person.jpg').width(40),
      image('images/person.jpg').width(40),
      image('images/person.jpg').width(40),
      image('images/person.jpg').width(40),
    ], [
      hide('yes'),
      hide('no'),
      hide('yes'),
      hide('no'),
      hide('no'),
    ], pause(), [
      'no',
      'no',
      'yes',
      'no',
      'yes',
    ],
  _).margin(80, 10)),
_));

add(slide('Privacy: Randomized response',
  parentCenter('Do you have a sibling?'),
  pause(),
  parentCenter(image('images/person.jpg').width(40)),
  parentCenter(frameBox(ytable(
    stmt('Method'),
    bulletedText('Flip two coins.'),
    bulletedText('If both heads: answer yes/no randomly'),
    bulletedText('Otherwise: answer yes/no truthfully'),
  _)).bg.fillColor('#F3E8B6').end.padding(10)),
  pause(),
  stmt('Analysis'),
  parentCenter(stagger(
    '$\\text{observed-prob} = \\frac{3}{4} \\times \\text{true-prob} + \\frac{1}{4} \\times \\frac{1}{2}$',
    '$\\text{true-prob} = \\frac{4}{3} \\times (\\text{observed-prob} - \\frac{1}{8})$',
  _).center()),
_).leftHeader('[Warner, 1965]'));

add(slide('Causality',
  stmt('Goal: figure out the effect of a treatment on survival'),
  pause(),
  stmt('Data'),
  parentCenter(frameBox(ytable(
    'For untreated patients, 80\% survive',
    'For treated patients, 30\% survive',
  _)).bg.fillColor('#F3E8B6').end.padding(10)),
  pause(),
  parentCenter(darkredbold('Does the treatment help?')),
  pause(),
  'Who knows?  Sick people are more likely to undergo treatment...',
_));

add(slide('Interpretability versus accuracy',
  bulletedText('For air-traffic control, threshold level of safety: probability $10^{-9}$ for a catastrophic failure (e.g., collision) per flight hour'),
  bulletedText('Move from human designed rules to a numeric Q-value table?'),
  pause(),
  parentCenter('yes'),
_).leftHeader('[Mykel Kochdorfer]'));

add(slide(null,
  parentCenter(overlay(
    image('images/white-house-ai-report.png').width(400),
    pause(),
    image('images/white-house-ai-report-strategy.png').width(700),
  _).center()),
_));

add(slide(nil(),
  parentCenter(image('images/big-data.png').width(200)),
   italics('..big data analytics have the potential to eclipse longstanding civil rights protections in how personal information is used in housing, credit, employment, health, education and the marketplace. Americans relationship with data should expand, not diminish, their opportunities..'),
_));

add(slide(nil(),
  parentCenter(image('images/fatml-principles.png').width(500)),
  italics('There is always a human ultimately responsible for decisions made or informed by an algorithm. "The algorithm did it" is not an acceptable excuse if algorithmic systems make mistakes or have undesired consequences, including from machine-learning processes'),
_));

function agentView() { return image('images/robot-wave.jpg').width(100); }
function toolView() { return image('images/computer.png'); }

add(slide('Societal and industrial impact',
  //'Efficiency, communication, safety, health, environment',
  parentCenter(xtable(
    image('images/earth.jpg').width(300),
    image('images/companies.jpg').width(400),
  _).center().margin(20)),
  //greenbold('Self-driving cars, energy efficient, drug discovery, etc.'),
  modulebox('Enormous potential for positive impact, use responsibly!'),
_));

add(slide(nil(),
  getEvolutionOfModels(9, 'none'),
  parentCenter('Please fill out course evaluations on Axess.'),
  parentCenter('Thanks for an exciting quarter!'),
_));

sfig.initialize();

