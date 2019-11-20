G = sfig.serverSide ? global : this;
G.prez = presentation();

addTextLatexMacros('Encode Decode Corrupt'.split(' '));

G.vectorBox = function(label, numRows, numCols, color) { 
  if (!numRows) numRows = 6;
  if (!numCols) numCols = 1;
  if (!color) color = 'red';
  var dots = new Table(wholeNumbers(numRows).map(function() {
    return wholeNumbers(numCols).map(function() {
      return circle(10).fillColor(color).fillOpacity(0.5);
    });
  })).margin(5);
  var box = frameBox(dots).padding(1).bg.strokeWidth(2).end.scale(0.6);
  return ytable(
    label ?  std(label).orphan(true) : _,
    box,
  _).center().margin(5);
}

add(titleSlide('Lecture 18: Deep Learning',
  nil(),
  parentCenter(image('images/learning.png').width(300)),
_));

add(slide('A brief history',
  bulletedText('1943: neural networks $\\Leftrightarrow$ logical circuits (McCulloch/Pitts)'),
  bulletedText('1949: "cells that fire together wire together" learning rule (Hebb)'),
  bulletedText('1969: theoretical limitations of neural networks (Minsky/Papert)'),
  pause(),
  bulletedText('1974: backpropagation for training multi-layer networks (Werbos)'),
  bulletedText('1986: popularization of backpropagation (Rumelhardt, Hinton, Williams)'),
_));

add(slide('A brief history',
  bulletedText('1980: Neocognitron, a.k.a. convolutional neural networks (Fukushima)'),
  bulletedText('1989: backpropagation on convolutional neural networks (LeCun)'),
  pause(),
  bulletedText('1990: recurrent neural networks (Elman)'),
  bulletedText('1997: Long Short-Term Memory networks (Hochreiter/Schmidhuber)'),
  pause(),
  bulletedText('2006: unsupervised layerwise training of deep networks (Hinton et al.)'),
_));

add(slide('Google Trends',
  parentCenter('Query: deep learning'),
  parentCenter(image('images/deep-learning-google-trends.png').width(600)),
_));

add(slide('Speech recognition (2009-2011)',
  parentCenter(image('images/speech-results.png').width(550)),
  bulletedText('Steep drop in WER due to deep learning'),
  bulletedText('IBM, Google, Microsoft all switched over from GMM-HMM'),
_).leftHeader('[figure from Li Deng]'));

add(slide('Object recognition (2012)',
  parentCenter(image('images/imagenet-results.png').width(600)),
  bulletedText('Landslide win in ILSVRC object recognition competition'),
  bulletedText('Computer vision community switched to CNNs'),
  bulletedText('Simpler than hand-engineered features (SIFT)'),
_).leftHeader('[Krizhevsky et al., 2012, a.k.a. AlexNet]'));

add(slide('Go (2016)',
  parentCenter(xtable(
    image('images/alpha-go.jpg'),
    image('images/tree-search.png').width(400)).margin(30).center(),
  _),
  bulletedText('Defeated world champion Le Sedol 4-1'),
  bulletedText('Simple architecture (in contrast, DeepBlue was search + hand-crafted heuristics)'),
  bulletedText('2017: AlphaGoZero does not require human expert games as supervision'),
_).leftFooter('[Silver et al., 2016]'));

/*
https://research.googleblog.com/2016/09/a-neural-network-for-machine.html
*/
add(slide('Machine translation (2016)',
  parentCenter(xtable(
    image('images/google-translations.png').width(400),
    image('images/google-nmt.png').scale(0.5),
  _).margin(20).center()),
  bulletedText('Decisive wins have taken longer to achieve in NLP (words are meaningful in a way that pixels are not)'),
  bulletedText('Current state-of-the-art in machine translation'),
  bulletedText('Simpler architecture (throw out word alignment, phrases tables, language models)'),
_).leftFooter('[Sutskever et al. 2014; Wu et al, 2016]'));

add(slide('What is deep learning?',
  pause(),
  italics('A family of techniques for learning compositional vector representations of complex data.'),
  parentCenter(xtable(
    ytable(
      image('images/cat.jpg').width(100),
      image('images/document-scroll-icon.png').width(100),
      image('images/go.jpg').width(100),
    _).center().margin(30),
    bigRightArrow(100),
    xtable(
      vectorBox('', 6),
      pause(),
      vectorBox('', 6),
      vectorBox('', 6),
      vectorBox('', 6),
    _).margin(10),
  _).center().margin(50)),
_));

FEEDFORWARD = 0;
CONVOLUTIONAL = 1;
RECURRENT = 2;
UNSUPERVISED = 3;
CONSIDERATIONS = 4;

function roadmap(i) {
  add(outlineSlide('Roadmap', i, [
    ['feedforward', 'Feedforward neural networks'],
    ['convolutional', 'Convolutional neural networks'],
    ['recurrent', 'Recurrent neural networks'],
    ['unsupervised', 'Unsupervised learning'],
    ['considerations', 'Final remarks'],
  ]));
}

////////////////////////////////////////////////////////////
roadmap(FEEDFORWARD);

add(slide('Review: linear predictors',
  parentCenter(linearPredictor({rawx: true, out: '$f_\\theta(x)$'}), 40),
  stmt('Output'),
  parentCenter('$f_\\theta(x) = \\blue{\\w} \\cdot x$'),
  stmt('Parameters: $\\theta = \\w$'),
_));

add(slide('Review: neural networks',
  parentCenter(neuralNetwork(0, {rawx: true, out: '$f_\\theta(x)$'}), 40),
  pause(-1),
  stmt('Intermediate hidden units'),
  parentCenter(xtable(
    '$h_j(x) = \\red{\\sigma}(\\blue{\\v_j} \\cdot x)$',
    '$\\red{\\sigma}(z) = (1 + e^{-z})^{-1}$',
  _).center().margin(30)),
  pause(),
  stmt('Output'),
  parentCenter('$f_\\theta(x) = \\blue{\\w} \\cdot \\h(x)$'),
  stmt('Parameters: $\\theta = (\\V, \\w)$'),
_).leftHeader(image('images/logistic.png').height(150)));

add(slide('Deep neural networks',
  stmt('1-layer neural network'),
  parentCenter(xtable(
    '$\\text{score} =$',
    vectorBox('$\\w^\\top$', 1, 6, 'blue'),
    vectorBox('$x$', 6),
  _).center().margin(5)),
  pause(),
  stmt('2-layer neural network'),
  parentCenter(xtable(
    '$\\text{score} =$',
    vectorBox('$\\w^\\top$', 1, 3, 'blue'),
    '$\\sigma($',
    vectorBox('$\\V$', 3, 6, 'blue'),
    vectorBox('$x$', 6),
    '$)$',
  _).center().margin(5)),
  pause(),
  stmt('3-layer neural network'),
  parentCenter(xtable(
    '$\\text{score} =$',
    vectorBox('$\\w^\\top$', 1, 3, 'blue'),
    '$\\sigma($',
    vectorBox('$\\mathbf U$', 3, 4, 'blue'),
    '$\\sigma($',
    vectorBox('$\\V$', 4, 6, 'blue'),
    vectorBox('$x$', 6),
    '$)$',
    '$)$',
  _).center().margin(5)),
  parentCenter('...'),
_));

add(slide('Depth',
  parentCenter(xtable(
    vectorBox('$x$', 6), thickRightArrow(50),
    vectorBox('$h$', 4), thickRightArrow(50),
    vectorBox('$h\'$', 4), thickRightArrow(50),
    vectorBox('$h\'\'$', 4), thickRightArrow(50),
    vectorBox('$h\'\'\'$', 4), thickRightArrow(50),
    vectorBox('$f_\\theta(x)$', 1),
  _).center().margin(5)),
  pause(),
  stmt('Intuitions'),
  bulletedText('Hierarchical feature representations'),
  pause(),
  bulletedText('Can simulate a bounded computation logic circuit (original motivation from McCulloch/Pitts, 1943)'),
  bulletedText('Learn this computation (and potentially more because networks are real-valued)'),
  pause(),
  bulletedText('Depth $k+1$ logic circuits can represent more than depth $k$ (counting argument)'),
  bulletedText('Formal theory/understanding is still incomplete'),
_));


add(slide('What\'s learned?',
  //stmt('learn high-level abstractions automatically'),
  parentCenter(image('images/feature-hierarchy.png').width(300)),
_).leftHeader('[figure from Honglak Lee]'));

add(summarySlide('Summary',
  bulletedText('Deep networks learn hierarchical representations of data'),
  bulletedText('Train via SGD, use backpropagation to compute gradients'),
  bulletedText('Non-convex optimization, but works empirically given enough compute and data'),
_));

add(slide('Review: optimization',
  stmt('Regression'),
  parentCenter('$\\Loss(x, y, \\theta) = (f_\\theta(x) - y)^2$'),
  pause(),
  keyIdea('minimize training loss',
    parentCenter('$\\displaystyle \\TrainLoss(\\theta) = \\frac1{|\\Train|} \\sum_{(x,y) \\in \\Train} \\Loss(x, y, \\theta)$'),
    parentCenter('$\\displaystyle \\min_{\\theta \\in \\R^d} \\TrainLoss(\\theta)$'),
  _).content.margin(20).end.scale(0.8),
  pause(),
  algorithm('stochastic gradient descent',
    'For $t = 1, \\dots, T$:',
    indent('For $(x,y) \\in \\Train$:'),
    indent(indent('$\\theta \\leftarrow \\theta - \\eta_t \\blue{\\nabla_\\theta \\Loss(x, y, \\theta)}$')),
  _).scale(0.8),
_));

add(slide('Training',
  parentCenter(image('images/non-convex.jpeg')),
  bulletedText('Non-convex optimization'),
  bulletedText('No theoretical guarantees that it works'),
  bulletedText('Before 2000s, empirically very difficult to get working'),
_));

add(slide('What\'s different today',
  parentCenter(table(
    ['Computation (time/memory)', pause(), 'Information (data)'], pause(-1),
    [image('images/datacenter.jpg').dim(200), pause(), image('images/books.jpg').dim(200)],
  _).margin(50).center()),
_));

add(slide('How to make it work',
  parentCenter(image('images/deep-nn.png').width(350)),
  bulletedText('More hidden units (over-provisioning)'),
  bulletedText('Adaptive step sizes (AdaGrad, ADAM)'),
  pause(),
  bulletedText('Dropout to guard against overfitting'),
  bulletedText('Careful initialization (pre-training)'),
  bulletedText('Batch normalization'),
  pause(),
  lesson('Model and optimization are tightly coupled'),
_));


////////////////////////////////////////////////////////////
roadmap(CONVOLUTIONAL);

add(slide('Motivation',
  parentCenter(xtable(
    image('images/car.jpeg'),
    xtable(
      vectorBox('$W$', 10, 15, 'blue'),
      vectorBox('$x$', 15),
    _).center().margin(5),
  _).center().margin(100)),
  bulletedText(stmt('Observation: images are not arbitrary vectors')),
  bulletedText(stmt('Goal: leverage spatial structure of images (translation invariance)')),
_));

add(slide('Idea: Convolutions',
  parentCenter(image('images/convolutions.png').width(450)),
_));


add(slide('Prior knowledge',
  parentCenter(image('images/cnn-stride.jpeg').width(700)),
  bulletedText(stmt('Local connectivity: each hidden unit operates on a local image patch ($3$ instead of $7$ connections per hidden unit)')),
  pause(),
  bulletedText(stmt('Parameter sharing: processing of each image patch is same ($3$ parameters instead of $3 \\cdot 5$)')),
  pause(),
  bulletedText(stmt('Intuition: try to match a pattern in image')),
_).leftHeader('[figure from Andrej Karpathy]'));

add(slide('Convolutional layers',
  parentCenter(image('images/convolutional-layers.png').width(700)),
  bulletedText('Instead of vector to vector, we do volume to volume'),
  parentCenter('[Andrej Karpathy\'s demo]').linkToUrl('http://cs231n.github.io/assets/conv-demo/index.html'),
_));

add(slide('Max-pooling',
  parentCenter(image('images/cnn-maxpool.jpeg').width(600)),
  bulletedText('Intuition: test if there exists a pattern in neighborhood'),
  bulletedText('Reduce computation, prevent overfitting'),
_).leftHeader('[figure from Andrej Karpathy]'));

add(slide('Example of function evaluation',
  parentCenter(image('images/cnn-car.jpeg').width(700)),
  parentCenter('[Andrej Karpathy\'s demo]').linkToUrl('http://cs.stanford.edu/people/karpathy/convnetjs/demo/cifar10.html'),
_));

add(slide('AlexNet',
  parentCenter(image('images/alexnet2012.png').width(600)),
  bulletedText(stmt('Non-linearity: use RelU ($\\max(z,0)$) instead of logistic')),
  bulletedText(stmt('Data augmentation: translate, horizontal reflection, vary intensity, dropout (guard against overfitting)')),
  bulletedText(stmt('Computation: parallelize across two GPUs (6 days)')),
  bulletedText(stmt('Results on ImageNet: 16.4\% error (next best was 25.8\%)')),
_).leftHeader('[Krizhevsky et al., 2012]'));

add(slide('VGGNet',
  // https://www.pyimagesearch.com/2017/03/20/imagenet-vggnet-resnet-inception-xception-keras/
  // https://www.cs.toronto.edu/~frossard/post/vgg16/
  // https://medium.com/@sidereal/cnns-architectures-lenet-alexnet-vgg-googlenet-resnet-and-more-666091488df5
  parentCenter(image('images/vgg16.png').width(500)),
  bulletedText(stmt('Architecture: deeper but smaller filters; uniform')),
  bulletedText(stmt('Computation: 4 GPUs for 2-3 weeks')),
  bulletedText(stmt('Results on ImageNet: 7.3\% error (AlexNet: 16.4\%)')),
_).leftHeader('[Simoyan/Zisserman, 2014]').rightHeader('[image credit: Davi Frossard]'));

add(slide('Residual networks',
  parentCenter(xtable(
    ytable(
      stagger(
        '$x \\mapsto \\sigma(W x)$',
        '$x \\mapsto \\sigma(W x) + x$',
      _),
      pause(),
      image('images/resnet-building-block.png').width(300),
      ytable(
        bulletedText('Key idea: make it easy to learn the identity (good inductive bias)').width(500),
        pause(),
        bulletedText('Enables training 152 layer networks').width(500),
        bulletedText('Results on ImageNet: 3.6\% error').width(500),
      _),
    _).center().margin(30),
    image('images/resnet-full.png').scale(0.6).showLevel(3),
  _).margin(20)),
_).leftHeader('[He et al. 2015]'));

add(summarySlide('Summary',
  bulletedText('Key idea: locality of connections, capture spatial structure'),
  bulletedText('Filters have parameter sharing; most parameters in last fully connected layers'),
  bulletedText('Depth really matters'),
  bulletedText('Applications to text, Go, drug design, etc.'),
_));

////////////////////////////////////////////////////////////
roadmap(RECURRENT);

function mtExample() {
  return parentCenter(table(
    ['$x$:', 'nat&uuml;rlich hat John spass am spiel'.italics().fontcolor('green')],
    [nil(), thickDownArrow(40)],
    ['$y$:', 'of course John has fun with the game'.italics().fontcolor('red')],
  _).center().margin(20, 5));
}

G.encoderDecoder = function(source, target, opts) {
  if (!opts) opts = {};
  var outputs = [];
  var hidden = [];
  var inputs = [];
  var edges = [];
  source = source.split(/ /);
  //function vec() { return rect(20, 100).fillColor('red').fillOpacity(0.5); }
  function vec() { return vectorBox(null, opts.d || 6); }
  function mytext(x) { return text(greenitalics(x)).scale(0.8); }
  function mylf(x) { return text(blue(x)).scale(0.8); }
  for (var i = 0; i < source.length; i++) {
    outputs.push(nil());
    hidden.push(vec());
    //inputs.push(ytable(vec(), mytext(source[i])).center());
    inputs.push(mytext(source[i]));
  }
  target = target ? target.split(/ /) : [];
  for (var i = 0; i < target.length; i++) {
    if (target[i][0] == '_')
      outputs.push(mylf(target[i].slice(1)));
    else
      outputs.push(mytext(target[i]));
    hidden.push(vec());
    inputs.push(nil());
  }
  for (var i = 0; i < inputs.length; i++) {
    if (i > 0)
      edges.push(arrow(hidden[i-1], hidden[i]));
    if (i >= source.length)
      edges.push(arrow(hidden[i], outputs[i]));
    else
      edges.push(arrow(inputs[i], hidden[i]));
    if (i > 0 && i < source.length && opts.genSource)
      edges.push(arrow(hidden[i-1], inputs[i]));
    if (i > source.length && opts.genTarget)
      edges.push(arrow(outputs[i-1], hidden[i]));
    if (opts.hidden)
      edges.push((i >= source.length ? moveBottomOf : moveTopOf)(mytext('$h_{'+(i+1)+'}$'), hidden[i]));
  }

  return overlay(table(outputs, hidden, inputs).margin(40, 40).center(), new Overlay(edges));
}

var sentence = 'Paris Talks Set Stage for Action as Risks to the Climate Rise'.split(' ');

add(slide('Motivation: modeling sequences',
  stmt('Sentences'),
  parentCenter(table(
    wholeNumbers(sentence.length).map(function(i) { return '$x_{' + (i+1) + '}$'; }),
    sentence.map(greenitalics),
  _).margin(20)).scale(0.8),
  pause(),
  stmt('Time series'),
  parentCenter(image('images/time-series.png').width(300)),
_));

add(slide('Recurrent neural networks',
  parentCenter(image('images/rnn-intro.png').width(700)),
_));

add(slide('Recurrent neural networks',
  parentCenter(stagger(
    encoderDecoder('Paris Talks Set Stage', null, {genSource: true}).scale(0.75),
    encoderDecoder('$x_1$ $x_2$ $x_3$ $x_4$', null, {genSource: true, hidden: true}).scale(0.75),
  _).center()),
  pause(),
  parentCenter(xtable(
    ytable(
      '$h_1 = \\Encode(x_1)$', pause(),
      '$x_2 \\sim \\Decode(h_1)$', pause(),
      '$h_2 = \\Encode(h_1, x_2)$',
      '$x_3 \\sim \\Decode(h_2)$', pause(),
      '$h_3 = \\Encode(h_2, x_3)$',
      '$x_4 \\sim \\Decode(h_3)$',
      '$h_4 = \\Encode(h_3, x_4)$',
    _),
    pause(),
    ytable(
      ytable(
        stmt('Update context vector'),
        indent('$h_t = \\Encode(h_{t-1}, x_t)$'),
        stmt('Predict next character'),
        indent('$x_{t+1} = \\Decode(h_t)$'),
      _),
      pause(),
      frameBox('context $h_t$ compresses $x_1, \\dots x_t$').padding(5),
    _).center().margin(10),
  _).margin(5).center()),
_));

add(slide('Simple recurrent network',
  parentCenter(encoderDecoder('$x_1$ $x_2$ $x_3$ $x_4$', null, {genSource: true, hidden: true, d: d = 4}).scale(0.75)),
  nil(), nil(), nil(),
  pause(),
  parentCenter(xtable('$\\Encode(h_{t-1}, x_t) = \\sigma($', vectorBox('$V$', d, d, 'blue'), vectorBox('$h_{t-1}$', d), '$+$', vectorBox('$W$', d, nx = 8, 'blue'), vectorBox('$x_t$', nx), '$) =$', vectorBox('$h_t$', d)).center()),
  nil(), nil(), nil(),
  pause(),
  parentCenter(xtable('$\\Decode(h_t) \\sim \\text{softmax}($', vectorBox('$W\'$', nx, d, 'blue'), vectorBox('$h_t$', d), '$) =$', vectorBox('$p(x_{t+1})$', nx)).center()),
_).leftHeader('[Elman, 1990]'));

add(slide('Vanishing gradient problem',
  parentCenter(image('images/rnn-gradients-1.png').width(700)),
  bulletedText('RNNs can have long or short dependancies'),
  bulletedText('When there are long dependancies, gradients have trouble backpropagating through'),
_));

add(slide('Vanishing gradient problem',
  parentCenter(image('images/rnn-gradients-2.png').width(700)),
_));


// add(slide('Vanishing gradient problem',
//   //parentCenter(encoderDecoder('$x_1$ $x_2$ $x_3$ $x_4$ $x_5$ $x_6$ $x_7$ $x_8$ $x_9$ $x_{10}$ $x_{11}$ $x_{12}$ $x_{13}$ $x_{14}$', null, {genSource: true, hidden: true, d: d = 4}).scale(0.75)),
//   parentCenter(encoderDecoder('$x_1$ $x_2$ $x_3$ $x_4$ $x_5$', null, {genSource: true, hidden: true, d: d = 4}).scale(0.75)),
//   parentCenter('(set $x_1 = 1, x_2 = x_3 = \\cdots = 0, \\sigma = $ identity function)').scale(0.7),
//   pause(),
//   //parentCenter(xtable('$h_5 =$', '$\\sigma($', vectorBox('$V$', d, d, 'blue'), '$\\sigma($', vectorBox('$V$', d, d, 'blue'), '$\\sigma($', vectorBox('$V$', d, d, 'blue'), '$\\sigma($', vectorBox('$V$', d, d, 'blue'), vectorBox('$h_1$', d), '$))))$').center()),
//   nil(),
//   parentCenter(xtable('$h_5 =$', vectorBox('$V$', d, d, 'blue'), vectorBox('$V$', d, d, 'blue'), vectorBox('$V$', d, d, 'blue'), vectorBox('$V$', d, d, 'blue'), vectorBox('$W$', d, nx, 'blue'), vectorBox('$x_1$', nx)).center().margin(10)),
//   pause(),
//   'If $V = 0.1$, then',
//   bulletedText(stmt('Value: $h_t = \\brown{0.1^{t-1}} W$')),
//   bulletedText(stmt('Gradient: $\\frac{\\partial h_t}{\\partial W} = \\brown{0.1^{t-1}}$ (vanishes as length increases)')),
// _));

// add(slide('Additive combinations',
//   parentCenter(encoderDecoder('$x_1$ $x_2$ $x_3$ $x_4$ $x_5$', null, {genSource: true, hidden: true, d: d = 4}).scale(0.75)),
//   stmt('What if'),
//   parentCenter('$h_t = h_{t-1} + W x_t$'),
//   pause(),
//   stmt('Then'),
//   parentCenter('(set $x_1 = 1, x_2 = x_3 = \\cdots = 0, \\sigma = $ identity function)').scale(0.7),
//   bulletedText(stmt('Value: $h_t = W$')),
//   bulletedText(stmt('Gradient: $\\frac{\\partial h_t}{\\partial W} = 1$ for any $t$')),
// _));

add(slide('Long Short Term Memory (LSTM)',
  stmt('API'),
  parentCenter('$(h_t, c_t) = \\text{LSTM}(h_{t-1}, c_{t-1}, x_t)$'),
  pause(),
  ytable(
    stmt('Input gate'),
    indent('$i_t = \\sigma(W_i x_t + U_i h_{t-1} + V_i c_{t-1} + b_i)$'),
    stmt('Forget gate (initialize with $b_f$ large, so close to $1$)'),
    indent('$f_t = \\sigma(W_f x_t + U_f h_{t-1} + V_f c_{t-1} + b_f)$'),
    pause(),
    stmt('Cell: additive combination of '+red('RNN update')+' with '+blue('previous cell')),
    indent('$c_t = i_t \\odot \\red{\\tanh(W_c x_t + U_c h_{t-1} + b_c)} + f_t \\odot \\blue{c_{t-1}}$'),
    pause(),
    stmt('Output gate'),
    indent('$o_t = \\sigma(W_o x_t + U_o h_{t-1} + V_o c_t + b_o)$'),
    stmt('Hidden state'),
    indent('$h_t = o_t \\odot \\tanh(c_t)$'),
  _).scale(0.85),
  //parentCenter(xtable('$\\Encode(h_{t-1}, x_t) = \\sigma($', vectorBox('$V$', d, d, 'blue'), vectorBox('$h_{t-1}$', d), '$+$', vectorBox('$W$', d, nx = 8, 'blue'), vectorBox('$x_t$', nx), '$) =$', vectorBox('$h_t$', d)).center()),
_).leftHeader('[Schmidhuber &amp; Hochreiter, 1997]'));

add(slide('Long Short Term Memory (LSTM)',
  parentCenter(image('images/lstm-intuition.png').width(730)),
_).leftHeader('[Schmidhuber &amp; Hochreiter, 1997]'));


add(slide('Character-level language modeling',
  stmt('Sampled output'),
  greenitalics('Naturalism and decision for the majority of Arab countries\' capitalide was grounded by the Irish language by [[John Clair]], [[An Imperial Japanese Revolt]], associated with Guangzham\'s sovereignty. His generals were the powerful ruler of the Portugal in the [[Protestant Immineners]], which could be said to be directly in Cantonese Communication, which followed a ceremony and set inspired prison, training. The emperor travelled back to [[Antioch, Perth, October 25|21]] to note, the Kingdom of Costa Rica, unsuccessful fashioned the [[Thrales]], [[Cynth\'s Dajoard]], known in western [[Scotland]], near Italy to the conquest of India with the conflict.'),
_).leftHeader('[from Andrej Karpathy\'s blog]'));

add(slide(null,
  nil(),
  parentCenter(stagger(
    image('images/rnnlm-pane1.png').width(580),
    //image('images/rnnlm-pane2.png').width(580),
  _).center()),
_).leftHeader('[from Andrej Karpathy\'s blog]'));

add(slide('Sequence-to-sequence model',
  stmt('Motivation: machine translation'),
  indent(table(
    ['$x$:', greenitalics('Je crains l\'homme de un seul livre.')],
    ['$y$:', blueitalics('Fear the man of one book.')],
  _).ycenter()),
  pause(),
  parentCenter(encoderDecoder('$x_1$ $x_2$ $x_3$', '$y_4$ $y_5$ $y_6$', {hidden: true, genTarget: true})),
  pause(),
  stmt('Read in a sentence first, output according to RNN'),
  parentCenter('$h_t = \\red{\\Encode}(h_{t-1}, x_t \\text{ or } y_{t-1}), \\quad y_t = \\red{\\Decode}(h_t)$'),
_).leftHeader('[Sutskever et al., 2014]'));

add(slide('Attention-based models',
  stmt('Motivation: long sentences &mdash; compress to finite dimensional vector?'),
  parentCenter(xtable(
    text(greenitalics('Eine Folge von Ereignissen bewirkte, dass aus Beethovens Studienreise nach Wien ein dauerhafter und endg&uuml;ltiger Aufenthalt wurde. Kurz nach Beethovens Ankunft, am 18. Dezember 1792, starb sein Vater. 1794 besetzten franz&ouml;sische Truppen das Rheinland, und der kurf&uuml;rstliche Hof musste fliehen.')).scale(0.4),
    bigRightArrow(),
    vectorBox(),
  _).center().margin(10)),
  pause(),
  keyIdea('attention',
    'Learn to look back at your notes.',
  _),
_));

add(slide('Attention-based models',
  parentCenter(encoderDecoder('$x_1$ $x_2$ $x_3$', '$y_4$ $y_5$ $y_6$', {hidden: true, genTarget: true})).scale(0.9),
  stmt('Distribution over input positions'),
  indent('$\\alpha_t = \\text{softmax}([\\text{Attend}(h_1, h_{t-1}), \\dots, \\text{Attend}(h_L, h_{t-1})])$').scale(0.8), 
  pause(),
  stmt('Generate with '+red('attended input')),
  indent('$h_t = \\text{Encode}(h_{t-1}, y_{t-1}, \\red{\\sum_{j=1}^L \\alpha_t h_j})$'),
  stmt('Transformer models') + ' attention only -- no RNN!',
_).leftHeader('[Bahdanau et al., 2015]'));

add(slide('Machine translation',
  parentCenter(image('images/machine-translation-attention.png').width(400)),
_).leftHeader('[Bahdanau et al., 2015]'));

add(slide('Image captioning',
  parentCenter(image('images/image-captioning-attention.png').width(700)),
_).leftHeader('[Xu et al., 2015]'));

add(summarySlide('Summary',
  bulletedText('Recurrent neural networks: model sequences (non-linear version of Kalman filter or HMM)'),
  bulletedText('Logic intuition: learning a program with a for loop (reduce)'),
  bulletedText('LSTMs mitigate the vanishing gradient problem'),
  bulletedText('Attention-based models: when only part of input is relevant at a time'),
  bulletedText('Newer models with "external memory": memory networks, neural Turing machines'),
_));

////////////////////////////////////////////////////////////
roadmap(UNSUPERVISED);

add(slide('Motivation',
  bulletedText('Deep neural networks require lot of data'),
  bulletedText('Sometimes not very much labeled data, but plenty of unlabeled data (text, images, videos)'),
  bulletedText('Humans rarely get direct supervision; can learn from raw sensory information?'),
_));

G.autoencodingFramework = function(opts) {
  return parentCenter(xtable(
    vectorBox(opts.x || '$x$', opts.nx || 6), thickRightArrow(50),
    frameBox(opts.encode || 'Encode'), thickRightArrow(50),
    vectorBox(opts.h || '$h$', opts.nh || 3), thickRightArrow(50),
    frameBox(opts.decode || 'Decode'), thickRightArrow(50),
    vectorBox(opts.tx || '$\\hat x$', opts.nx || 6),
  _).center());
}

add(slide('Autoencoders',
  stmt('Analogy'),
  parentCenter(xtable(
    'A A A A B B B B B',
    thickRightArrow(50),
    '4 A\'s, 5 B\'s',
    thickRightArrow(50),
    'A A A A B B B B B',
  _).center().margin(5)),
  pause(),
  keyIdea('autoencoders',
    'If we can compress a data point and still reconstruct it, then we have learned something generally useful.',
  _),
  pause(),
  stmt('General framework'),
  nil(),
  autoencodingFramework({}),
  pause(),
  parentCenter('minimize $\\|x - \\hat x\\|^2$'),
_));

add(slide('Principal component analysis',
  //'Assume data is centered at 0: $\sum_{i=1}^n \x_i = 0$',
  parentCenter(xtable(
    stmt('Input: points $x_1, \\dots, x_n$'),
    image('images/pca-ex.png').width(200),
  _).center().margin(50)),
  nil(), nil(),
  pause(),
  parentCenter(xtable(
    xtable(
      '$\\Encode(x) =$',
      vectorBox('$U^\\top$', 3, 6, 'blue'),
      vectorBox('$x$', 6),
    _).center().margin(5),
    pause(),
    xtable(
      '$\\Decode(h) =$',
      vectorBox('$U$', 6, 3, 'blue'),
      vectorBox('$h$', 3),
    _).center().margin(5),
  _).margin(50)),
  pause(),
  parentCenter('(assume $x_i$\'s are mean zero and $U$ is orthogonal)').scale(0.6),
  pause(),
  stmt('PCA objective'),
  parentCenter(stagger(
    'minimize $\\displaystyle \\sum_{i=1}^n \\|x_i - \\Decode(\\Encode(x_i))\\|^2$',
  _)),
_));

add(slide('Autoencoders',
  stmt('Increase dimensionality of hidden dimension'),
  autoencodingFramework({nh: 6}),
  pause(),
  bulletedText(stmt('Problem: learning nothing &mdash; just set $\\Encode, \\Decode$ to identity function!')),
  bulletedText('Need to control complexity of $\\Encode$ and $\\Decode$ somehow...'),
_));

add(slide('Non-linear autoencoders',
  stmt('Non-linear transformation (e.g., logistic function)'),
  parentCenter(xtable(
    image('images/logistic.png').height(150),
    ytable(
      '$\\Encode(x) = \\red{\\sigma}(W x + b)$',
      '$\\Decode(h) = \\red{\\sigma}(W\' h + b\')$',
    _),
  _).margin(50).center()),
  parentCenter(xtable(
    vectorBox('$W$', 3, 6, 'blue'), vectorBox('$b$', 3, null, 'blue'),
    vectorBox('$W\'$', 6, 3, 'blue'), vectorBox('$b\'$', 6, null, 'blue'),
  _).center().margin(50)),
  pause(),
  stmt('Loss function'),
  parentCenter('minimize $\\|x - \\Decode(\\Encode(x))\\|^2$'),
  pause(),
  stmt('Key: non-linearity makes life harder, prevents degeneracy'),
_));

add(slide('Denoising autoencoders',
  nil(),
  autoencodingFramework({x: '$\\red{\\Corrupt}(x)$'}).scale(0.8),
  //'Add input noise $\\red{\\epsilon} \\sim \\mathcal N(0, I)$, try to reconstruct original $x$',
  pause(),
  stmt('Types of noise'),
  bulletedText('Blankout: $\\red{\\Corrupt}([1, 2, 3, 4]) = [0, 2, 3, 0]$'),
  bulletedText('Gaussian: $\\red{\\Corrupt}([1, 2, 3, 4]) = [1.1, 1.9, 3.3, 4.2]$'),
  pause(),
  stmt('Objective'),
  parentCenter('minimize $\\|x - \\Decode(\\Encode(\\red{\\Corrupt}(x)))\\|^2$'),
  pause(),
  //stmt('Notes'),
  stmt('Algorithm: pick example, add fresh noise, SGD update'),
  pause(),
  stmt('Key: noise makes life harder, prevents degeneracy'),
  //bulletedText(stmt('Complexity control: $\\red{\\Corrupt}$, early stopping, regularization')),
_));

add(slide('Denoising autoencoders',
  stmt('MNIST: 60,000 images of digits ($784$ dimensions)'),
  parentCenter(image('images/mnist.png')),
  pause(),
  stmt('$200$ learned filters (rows of $W$)'),
  parentCenter(xtable(
    vectorBox('$W$', 4, 16, 'blue'),
    image('images/denoising-autoencoder-filters.png').width(250),
  _).center().margin(50)),
_).leftHeader('[Figure 7 of Vincent et al. (2010)]'));

add(slide('Variational autoencoders',
  stmt('Motivation: learn a latent-variable model'),
  parentCenter(xtable(
    overlay(
      ytable(h = node('$h$'), x = node('$x$', {shaded: true})).margin(100),
      arrow(h, x),
    _),
    '$p(h, x) = p(h) p(x \\mid h)$',
  _).margin(100).center()),
  pause(),
  stmt('E-step in EM: computing $p(h \\mid x)$ is intractable'),
  stmt('Solution: approximate using a neural network $q(h \\mid x)$'),
_));

add(slide('Variational autoencoders',
  autoencodingFramework({encode: 'Encoder $q$', decode: 'Decoder $p$'}).scale(0.8),
  stmt('Objective: maximize'),
  parentCenter('$\\log p(x) \\ge \\E_{q(h \\mid x)}[\\log p(x \\mid h)] - \\text{KL}(q(h \\mid x) || p(h))$'),
  headerList('Algorithm',
    'Sample $h$ from encoder $q$, gradient update on $q$ and $p$',
    'Reparametrization trick [Kingma/Welling, 2014]',
  _),
_));

/*add(slide('Stacked denoising autoencoders',
  stmt('Goal: learn hierarchical features'),
  stmt('Train first layer'),
  nil(), nil(), nil(),
  autoencodingFramework({x: '$\\Corrupt(x)$', h: '$\\blue{h}$', tx: '$\\tilde x$', nh: 5}).scale(0.8),
  pause(),
  stmt('Train second layer'),
  nil(), nil(), nil(),
  autoencodingFramework({x: '$\\Corrupt(\\blue{h})$', h: '$h\'$', tx: '$\\tilde h$', nx: 5, encode: 'Encode$\'$', decode: 'Decode$\'$'}).scale(0.8),
  parentCenter('...'),
  pause(),
  stmt('Test time: $\\Encode\'(\\Encode(x))$'),
_));*/

add(slide('Reading comprehension (SQuAD)',
  parentCenter(xtable(
    image('images/squad-example.png').width(400),
    '100K examples',
  _).center().margin(50)),
_).rightHeader('[Rajpurkar+ 2016]'));

add(slide('Raw text',
  parentCenter(image('images/wikipedia-stanford.png').width(750)),
  parentCenter('...'),
  parentCenter('3.3 billion words'),
_));

add(slide('Unsupervised pre-training',
  nil(),
  parentCenter(xtable(
    frameBox(
      ytable(
        'labeled',
        //'passage, question $\\Rightarrow$ answer',
      _).margin(10),
    _).padding(10).bg.fillColor('red').fillOpacity(0.1).end.scale(0.4),
    frameBox(
      ytable(
        'unlabeled',
        //'previous words $\\Rightarrow$ next word',
      _).margin(10),
    _).padding(200, 200).bg.fillColor('green').fillOpacity(0.1).end,
  _).margin(100).center()),
_));

/*add(slide('ELMo (2018)',
  parentCenter(image('images/paper-elmo-results.png').width(700)),
_).leftHeader(image('images/elmo.jpg').width(300)));*/

var sentence = 'Paris Talks Set Stage for Action as Risks to the Climate Rise'.split(' ');
var sentence2 = 'Paris Talks ___ Stage for _____ as Risks to ___ Climate Rise'.split(' ');

add(slide('BERT',
  nil(),
  parentCenter(stagger(
    table(sentence.map(greenitalics)).margin(30),
    ytable(
      table(sentence2.map(greenitalics)).margin(30), pause(),
      bigDownArrow(50),
      table(sentence.map(greenitalics)).margin(30),
    _).margin(20).center(),
  _)).scale(0.7),
  bulletedText('Tasks: fill in words, predict whether is next sentence'),
  bulletedText('Trained on 3.3B words, 4 days on 64 TPUs'),
  //parentCenter(image('images/bert-glue-results.png').width(750)),
_).leftHeader(image('images/bert.jpg').width(150)).rightHeader('[Devlin+ 2018]'));

add(slide('BERT',
  nil(),
  //bulletedText('Trained on 3.3B words, 4 days on 64 TPUs'),
  parentCenter(image('images/bert-squad.png').width(500)),
_));

/*add(slide('BERT',
  nil(),
  parentRight('Trained on 3.3B words, 4 days on 64 TPUs'),
  parentCenter(image('images/bert-glue-results.png').width(750)),
_).leftHeader(image('images/bert.jpg').width(250)));*/

//add(dividerSlide('You can capture complex phenomena from simple models and lots of raw text.'));

/*add(slide('Reading Comprehension (SQuAD)',
  parentCenter(image('images/squad-example.png').width(400)),
_).rightHeader('[Rajpurkar+ 2016]'));*/

/*
Over the last 2 years, huge progress, teams have also exceeded human-level accuracy on this benchmark.
*/
add(slide(null,
  parentCenter(overlay(
    image('images/squad-leaderboard-2018-10-09.png').width(500), pause(),
  _)),
_));

add(summarySlide('Unsupervised learning',
  bulletedText('Principle: make up prediction tasks (e.g., $x$ given $x$ or context)'),
  bulletedText('Hard task $\\rightarrow$ pressure to learn something'),
  pause(),
  bulletedText('Loss minimzation using SGD'),
  bulletedText('Discriminatively fine tune: initialize feedforward neural network and backpropagate to optimize task accuracy'),
  pause(),
  bulletedText('How far can one push this?'),
_));

////////////////////////////////////////////////////////////
roadmap(CONSIDERATIONS);

add(slide('WaveNet for audio generation',
  parentCenter(image('images/wavenet-audio.png').width(700)),
  bulletedText('Work with <b>raw</b> audio (16K observations / second)'),
  parentCenter(image('images/wavenet.png').width(700)),
  bulletedText('Key idea: '+redbold('dilated convolutions')+' captures multiple scales of resolution, not recurrent'),
_).leftHeader(cite('[van den Oord et al., 2016]', 'http://arxiv.org/pdf/1609.03499.pdf')));

add(slide('Conditional adversarial networks',
  parentCenter(image('images/image-to-image-cgan.png').width(700)),
  stmt('Key idea: game between'),
  bulletedText(bluebold('Generator') + ': generates fake images'),
  bulletedText(redbold('Discriminator') + ': distinguishes between fake/real images'),
_).leftHeader(cite('[Isola et al., 2016]', 'http://arxiv.org/pdf/1611.07004.pdf')));

add(slide('Getting things to work',
  stmt('Better optimization algorithms: SGD, SGD+momentum, AdaGrad, AdaDelta, momentum, Nesterov, Adam'),
  stmt('Tricks: initialization, gradient clipping, batch normalization, dropout'),
  stmt('More hyperparameter tuning: step sizes, architectures'),
  stmt('Better hardware: GPUs, TPUs'),
  parentCenter(image('images/gpus.jpg').width(200)),
  pause(),
  parentCenter('...wait for a long time...'),
_));

add(slide('Theory: why does it work?',
  headerList('Two questions',
    'Approximation: why are neural networks good hypothesis classes?',
    'Optimization: why can SGD optimize a high-dimensional non-convex problem?',
  _),
  pause(), 
  headerList('Partial answers',
    '1-layer neural networks can approximate any continuous function on compact set [Cybenko, 1989; Barron, 1993]',
    'Generate random features works too [Rahimi/Recht, 2009; Andoni et. al, 2014]',
    'Use statistical physics to analyze loss surfaces [Choromanska et al., 2014]',
  _),
_));

add(summarySlide('Summary',
  parentCenter(table(
    ['Phenomena', 'Ideas'].map(darkblue),
    ['Fixed vectors', 'Feedforward NNs'],
    ['Spatial structure', 'convolutional NNs'],
    ['Sequence', ytable('recurrent NNs', 'LSTMs')],
    ['Sequence-to-sequence', ytable('encoder-decoder', 'attention-based models')],
    ['Unsupervised', ytable('autoencoders', 'variational autoencoders', 'any auxiliary task')],
  _).margin(40, 20)),
_));

add(slide('Outlook',
  stmt('Extensibility: able to compose modules'),
  parentCenter(xtable(
    frameBox('$\\text{LSTM}$'),
    frameBox('$\\text{Attend}$'),
    frameBox('$\\text{Encode}$'),
  _).margin(50)),
  pause(),
  stmt('Learning programs: think about analogy with a computer'),
  parentCenter(xtable('$x$', thickRightArrow(50), frameBox('$f_\\theta$'), thickRightArrow(50), '$y$').center()),
  //pause(),
  //stmt('Data'),
  //parentCenter('reinforcement learning?  unsupervised learning?'),
_));

initializeLecture();
