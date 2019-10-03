import submission, util
from collections import defaultdict

# Read in examples
trainExamples = util.readExamples('names.train')
devExamples = util.readExamples('names.dev')

def featureExtractor(x):  # phi(x)
    # x = "took Mauritius into"
    phi = defaultdict(float)
    tokens = x.split()
    left, entity, right = tokens[0], tokens[1:-1], tokens[-1]
    phi['entity is ' + ' '.join(entity)] = 1
    phi['left is ' + left] = 1
    phi['right is ' + right] = 1
    for word in entity:
        phi['entity contains ' + word] = 1
        phi['entity contains prefix ' + word[:4]] = 1
        phi['entity contains suffix ' + word[-4:]] = 1
    return phi

# Learn a predictor
weights = submission.learnPredictor(trainExamples, devExamples, featureExtractor)
util.outputWeights(weights, 'weights')
util.outputErrorAnalysis(devExamples, featureExtractor, weights, 'error-analysis')

# Test!!!
testExamples = util.readExamples('names.test')
predictor = lambda x : 1 if util.dotProduct(featureExtractor(x), weights) > 0 else -1
print('test error =', util.evaluatePredictor(testExamples, predictor))
