G = sfig.serverSide ? global : this;
G.prez = presentation();

add(titleSlide('Lecture 1: Overview',
  nil(),
  parentCenter(image('images/galaxies.jpg').width(300)),
_));

add(slide(null,
  parentCenter(ytable(
    image('images/percy-dorsa.png').width(220),
    pause(),
    image('images/cas-autumn2019.png').width(650),
  _).center().margin(20)),
_).id('staff'));

function roadmap(i) {
  add(outlineSlide('Roadmap', i, [
    ['history', 'A brief history'],
    ['goals', 'Two views'],
    ['what', 'Course overview'],
    ['how', 'Course logistics'],
    ['optimization', 'Optimization'],
  ]));
}

////////////////////////////////////////////////////////////

add(slide(null,
  parentCenter(overlay(
    pause(),
    image('images/ibm-watson.jpg'),
    pause(),
    parentCenter(image('images/alpha-go.jpg')).shiftBy(350, 20),
    pause(),
    // https://openai.com/five/
    image('images/openai-dota2.jpg').width(300).shiftBy(0, 200),
    pause(),
    // https://medium.com/syncedreview/an-absolute-monster-bluffer-facebook-cmu-ai-bot-beats-poker-pros-714e7b989954
    image('images/cmu-facebook-poker.png').width(300).shiftBy(400, 200),
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
  'A lot of the triumphs of superhuman performance as been in <b>games</b>,',
  'such as Jeopardy! (IBM Watson, 2011), Go (DeepMind\'s AlphaGo, 2016), Dota 2 (OpenAI, 2019), Poker (CMU and Facebook, 2019).',
  _,
  'On non-game tasks, we have also have systems that achieve or surpass human-level performance on',
  'reading comprehension, speech recognition, face recognition, and medical imaging <b>benchmarks</b>.',
  _,
  'Unlike games, however, where the game is the full problem,',
  'good performance on a benchmark does not necessarily translate to good performance on the actual task in the wild.',
  'Just because you ace an exam doesn\'t necessarily mean you have perfect understanding or know how to apply that knowledge to real problems.',
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
  _,
  'While AI is likely to be transformational,',
  'what kind of transformation the future will hold, no one knows.',
_);

add(dividerSlide(parentCenter('1956'.italics())));

add(slide('Birth of AI',
  stmt('1956', 'Workshop at Dartmouth College; attendees: John McCarthy, Marvin Minsky, Claude Shannon, etc.'),
  parentCenter(image('images/dartmouth.jpg').width(150)),
  'Aim for '+redbold('general principles')+':',
  parentCenter(text('<i>Every aspect of learning or any other feature of intelligence can be so precisely described that a machine can be made to simulate it.</i>').scale(0.9)),
_));

prose(
  'How did we get here?',
  'The name <b>artifical intelligence</b> goes back to a summer in 1956.',
  'John McCarthy, who was then at MIT but later founded the Stanford AI lab,',
  'organized a workshop at Dartmouth College with the leading thinkers of the time,',
  'and set out a very bold proposal...to build a system that could do it <b>all</b>.',
_);

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

prose(
  'While they did not solve it all, there were a lot of <b>interesting programs</b> that were created:',
  'programs that could play checkers at a strong amateur level, programs that could prove theorems.',
  _,
  'For one theorem Newell and Simon\'s Logical Theorist actually found a proof that was more elegant than what a human came up with.',
  'They actually tried to publish a paper on it but it got rejected because it was not a new theorem;',
  'perhaps they failed to realize that the third author was a computer program.',
  _,
  'From the beginning, people like John McCarthy sought <b>generality</b>, thinking of how commonsense reasoning could be encoded in logic.',
  'Newell and Simon\'s General Problem Solver promised to could solve any problem (which could be suitably encoded in logic).',
_);

function quote(quote, who) {
  return italics(quote) + ' &mdash;'+who;
}
add(slide('Overwhelming optimism...',
  quote('Machines will be capable, within twenty years, of doing any work a man can do.', 'Herbert Simon'),
  quote('Within 10 years the problems of artificial intelligence will be substantially solved.', 'Marvin Minsky'),
  quote('I visualize a time when we will be to robots what dogs are to humans, and I\'m rooting for the machines.', 'Claude Shannon'),
_));

prose(
  'It was a time of high optimism, with all the leaders of the field, all impressive thinkers,',
  'predicting that AI would be "solved" in a matter of years.',
_);

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
  '1966: ALPAC report cut off government funding for MT, first AI winter',
_));

prose(
  'Despite some successes, certain tasks such as machine translation were complete failures, which lead to the cutting of funding and the first AI winter.',
_);

add(slide('Implications of early era',
  headerList('Problems',
    cat(redbold('Limited computation'), ': search space grew exponentially, outpacing hardware ($100! \\approx 10^{157} > 10^{80}$)'),
    cat(redbold('Limited information'), ': complexity of AI problems (number of words, objects, concepts in the world)'),
  _),
  pause(),
  headerList('Contributions',
    'Lisp, garbage collection, time-sharing (John McCarthy)',  // Revolutionary
    stmt('Key paradigm', 'separate '+greenbold('modeling')+' and '+greenbold('inference')),
  _),
_));

prose(
  'What went wrong?',
  'It turns out that the real world is very complex and most AI problems require a lot of <b>compute</b> and <b>data</b>.',
  _,
  'The hardware at the time was simply too limited both compared to both the human brain and computers available now.',
  'Also, casting problems as general logical reasoning meant that the approaches fell prey to the exponential search space,',
  'which no possible amount of compute could really fix.',
  _,
  'Even if you had infinite compute, AI would not be solved.',
  'There are simply too many words, objects, and concepts in the world,',
  'that this information has to be somehow encoded in the AI system.',
  _,
  'Though AI was not solved, a few generally useful technologies came out of the effort,',
  'such as Lisp (still the world\'s most advanced programming language in a sense).',
  _,
  'One particularly powerful paradigm is the separation between what you want to compute (modeling) and how to compute it (inference).',
_);

add(slide('Knowledge-based systems (70-80s)',
  parentCenter(image('images/knowledge-key.jpg')),
  stmt('Expert systems', 'elicit specific domain knowledge from experts in form of rules:'),
  parentCenter('<tt>if [premises] then [conclusion]</tt>'),
_));

prose(
  'In the seventies and eighties,',
  'AI researchers looked to knowledge as a way to combat both the limited computation and information problems.',
  'If we could only figure out a way to encode prior knowledge in these systems,',
  'then they will have the necessary information and also have to do less compute.',
_);

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

prose(
  'Instead of the solve-it-all optimism from the 1950s,',
  'researchers focused on building narrow practical systems in targeted domains.',
  'These became known as <b>expert systems</b>.',
_);

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
  '1987: Collapse of Lisp machines and second AI winter',
_));

prose(
  'This was the first time AI had a measurable impact on industry.',
  'However, the technology ran into limitations and failed to scale up to more complex problems.',
  'Due to plenty of overpromising and underdelivering, the field collapsed again.',
  _,
  'We know that this is not the end of the AI story,',
  'but actually it is not the beginning.',
  'There is another thread for which we need to go back to 1943.',
_);

add(dividerSlide(parentCenter('1943'.italics())));

add(slide('Artificial neural networks',
  side(
    '1943: introduced artificial neural networks, connect neural circuitry and logic (McCulloch/Pitts)',
    'images/mcculloch-pitts-circuit.png',
  _),
  side(
    '1969: Perceptrons book showed that linear models could not solve XOR, killed neural nets research (Minsky/Papert)',
    'images/perceptrons-book.jpeg',
  _),
_));

prose(
  'Much of AI\'s history was dominated by the logical tradition,',
  'but there was another smaller camp,',
  'grounded in neural networks inspired by the brain.',
  _,
  '(Artificial) neural networks were introduced by a famous paper by McCulloch and Pitts,',
  'who devised a simple mathematical model and showed how it could be be used to compute arbitrary logical functions.',
  _,
  'Much of the early work was on understanding the mathematical properties of these networks,',
  'since computers were too weak to do anything interesting.',
  _,
  'In 1969, a book was published that explored many mathematical properties of Perceptrons (linear models)',
  'and showed that they could not solve some simple problems such as XOR.',
  'Even though this result says nothing about the capabilities of deeper networks,',
  'the book is largely credited with the demise of neural networks research,',
  'and the continued rise of logical AI.',
);

add(slide('Training networks',
  side(
    '1986: popularization of backpropagation for training multi-layer networks (Rumelhardt, Hinton, Williams)',
    'images/rumelhardt-hinton-williams-network.png',
  _),
  side(
    '1989: applied convolutional neural networks to recognizing handwritten digits for USPS (LeCun)',
    'images/mnist-6x6.png',
  _),
_));

prose(
  'In the 1980s, there was a renewed interest in neural networks.',
  'Backpropagation was rediscovered and popularized as a way to actually train deep neural networks,',
  'and Yann LeCun built a system based on convolutional neural networks to recognize handwritten digits,',
  'one of first successful use of neural networks that became used by the USPS to recognize zip codes.',
_);

add(slide('Deep learning',
  side(
    'AlexNet (2012): huge gains in object recognition; transformed computer vision community overnight',
    'images/ilsvrc.png',
  _),
  side(
    'AlphaGo (2016): deep reinforcement learning, defeat world champion Lee Sedol',
    'images/alpha-go.jpg',
  _),
_));

prose(
  'The real break for neural networks came in the 2010s.',
  'With the rise of compute (notably GPUs) and large datasets such as ImageNet (2009),',
  'the time was ripe for the world to take note of neural networks.',
  _,
  'AlexNet was a pivotal system that showed the promise of deep convolutional networks on ImageNet,',
  'the benchmark created by the computer vision community who was at the time still skeptical of deep learning.',
  'Many other success stories in speech recognition and machine translation followed.',
_);

add(slide('Two intellectual traditions',
  parentCenter(xtable(
    image('images/aristotle.jpg').width(150),
    image('images/learning.png').width(250),
  _).center().margin(100)),
  bulletedText('AI has always swung back and forth between the two'),
  bulletedText('Deep philosphical differences, but deeper connections (McCulloch/Pitts, AlphaGo)?'),
_));

prose(
  'Reflecting back on the past of AI, there have been two intellectual traditions that have dominated the scene:',
  'one rooted in logic and one rooted in neuroscience (at least initially).',
  'This debate is paralleled in cognitive science with connectionism and computationalism.',
  _,
  'While there are deep philosophical differences,',
  'perhaps there are deeper connections.',
  _,
  'For example, McCulloch and Pitts work from 1943 can be viewed as the root of deep learning,',
  'but that paper is mostly about how to implement logical operations.',
  _,
  'The game of Go (and indeed, many games) can perfectly characterized by a set of simple logic rules.',
  'At the same time, the most successful systems (AlphaGo) do not tackle the problem directly using logic,',
  'but appeal to the fuzzier world of artificial neural networks.',
_);

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

prose(
  'Of course, any story is incomplete.',
  _,
  'In fact, for much of the 1990s and 2000s, neural networks were not popular in the machine learning community,',
  'and the field was dominated more by techniques such as Support Vector Machines (SVMs) inspired by statistical theory.',
  _,
  'The fuller picture that the modern world of AI is more like a New York City&mdash;it is a melting pot that',
  'has drawn from many different fields ranging from statistics, algorithms, economics, etc.',
  _,
  'And often it is the new connections between these fields that are made and their application to important real-world problems that makes working on AI so rewarding.',
_);

////////////////////////////////////////////////////////////
roadmap(1);

function agentView() { return image('images/robot-wave.jpg').width(100); }
function toolView() { return image('images/computer.png'); }

add(slide('Two views of AI',
  parentCenter(table(
    [agentView(), stmt('AI agents: how can we create intelligence?')],
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
  'We are simply trying to solve problems in the world, and techniques developed by the AI community happen to be useful for that,',
  'but these problems are not ones that humans necessarily do well on natively.',
  _,
  'However, both views boil down to many of the same day-to-day activities (e.g., collecting data and optimizing a training objective),',
  'the philosophical differences do change the way AI researchers approach and talk about their work.',
  'Moreover, the conflation of these two views can generate a lot of confusion.',
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
  'perform actions in it (robotics), and communicate with other agents (language).',
  _,
  'We also have knowledge about the world (from procedural knowledge like how to ride a bike to declarative knowledge like remembering the capital of France),',
  'and using this knowledge we can draw inferences and make decisions (reasoning).',
  _,
  'Finally, we learn and adapt over time.',
  'We are born with none of the skills that we possess as adults, but rather the capacity to acquire them.',
  'Indeed machine learning has become the primary driver of many of the AI applications we see today.',
_);

add(slide('Are we there yet?',
  parentCenter(xtable(
    image('images/datacenter.jpg'), pause(),
    image('images/kids-blocks.jpeg').width(150),
  _).center().margin(100)),
  pause(-1),
  stmt('Machines: narrow tasks, millions of examples'),
  pause(),
  stmt('Humans: diverse tasks, very few examples'),
_));

prose(
  'The AI agents view is an inspiring quest to undercover the mysteries of intelligence and tackle the tasks that humans are good at.',
  'While there has been a lot of progress, we still have a long way to go along some dimensions:',
  'for example, the ability to learn quickly from few examples or the ability to perform commonsense reasoning.',
  _,
  'There is still a huge gap between the regimes that humans and machines operate in.',
  'For example, AlphaGo learned from 19.6 million games, but can only do one thing: play Go.',
  'Humans on the other hand, learn from a much wider set of experiences, and can do many things.',
_);

add(dividerSlide(parentCenter(xtable(toolView(), italics('AI tools...')).center().margin(10))));

prose(
  'The other view of AI is less about re-creating the capabilities that humans have,',
  'and more about how to benefit humans.',
  _,
  'Even the current level of technology is already being deployed widely in practice,',
  'and many of these settings are often not particularly human-like',
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

add(summarySlide('Summary so far',
  bulletedText(stmt('AI agents: achieving human-level intelligence, still very far (e.g., generalize from few examples)')),
  parentCenter(agentView()),
  pause(),
  bulletedText(stmt('AI tools: need to think carefully about real-world consequences (e.g., security, biases)')),
  parentCenter(toolView()),
_));

////////////////////////////////////////////////////////////
roadmap(2);

add(slide('How do we solve AI tasks?',
  nil(),
  parentCenter(xtable(
    image('images/traffic-jam.jpg').width(200),
    pause(),
    image('images/source-code.png').width(150),
  _).margin(300).center()),
_));

prose(
  'How should we actually solve AI tasks?',
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
  'which can be subject to rigorous analysis and that computers can operate on.',
  'However, modeling is lossy: not all of the richness of the real world can be captured,',
  'and therefore there is an art of modeling: what does one keep versus what does one ignore?',
  '(An exception to this is games such as Chess or Go or Sodoku, where the real world is identical to the model.)',
  _,
  'As an example, suppose we\'re trying to have an AI that can navigate through a busy city.',
  'We might formulate this as a graph where nodes represent points in the city,',
  'and edges represent the roads and cost of an edge represents traffic on that road.',
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
  'The focus of inference is usually on efficient algorithms that can answer these questions.',
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
  _,
  'Note that learning here is not tied to a particular approach (e.g., neural networks),',
  'but more of a philosophy.',
  'This general paradigm will allow us to bridge the gap between logic-based AI and statistical AI.',
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
  'From an systems engineering perspective, machine learning allows us to shift the information complexity of the model from code to data,',
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
  'This topic is studied thoroughly in probabilistic graphical models (CS228).',
_);

evolutionOfModels(4);

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
  'in fact, in our course plan, logic is a class of models which can be supported by machine learning.',
  'An active area of research is to combine the richness of logic with the robustness and agility of machine learning.',
_);

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
roadmap(3);

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
  bulletedText('Pac-Man competition for extra credit'),
  bulletedText('When you submit, programming parts will be run on all test cases, but only get feedback on a subset'),
_));

add(slide('Exam',
  bulletedText('Goal: test your ability to use knowledge to solve new problems, not know facts'),
  bulletedText('All written problems (look at past exam problems for style)'),
  bulletedText('Closed book except one page of notes'),
  bulletedText('Covers all material up to and including preceding week'),
  //bulletedText('Tue Nov. 27 from 6pm to 9pm (3 hours)'),
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
roadmap(4);

add(slide('Optimization',
  stmt('Discrete optimization: find the best discrete object'),
  parentCenter('$\\min\\limits_{p \\in \\text{Paths}} \\text{Cost}(p)$'),
  indent(redbold('Algorithmic')+' tool: dynamic programming'),
  pause(),
  stmt('Continuous optimization: find the best vector of real numbers'),
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

add(summarySlide('Summary',
  bulletedText('Modeling [reflex, states, variables, logic] + inference + learning'),
  bulletedText('Section this Thursday: review of foundations'),
  bulletedText('Homework [foundations]: due next Tuesday 11pm'),
  bulletedText('AI has high societal impact, how to steer it positively?'),
_));

initializeLecture();
