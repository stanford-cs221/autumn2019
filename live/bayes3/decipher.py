import util

K = 26 + 1  # lowercase letters + space

### Initialize the HMM

# startProbs[h] = p_start(h)
startProbs = [1.0 / K for h in range(K)]

# transitionProbs[h1][h2] = p_trans(h2 | h1)
transitionCounts = [[0 for h2 in range(K)] for h1 in range(K)]
rawText = util.toIntSeq(util.readText('lm.train'))
for i in range(len(rawText) - 1):
    h1 = rawText[i]
    h2 = rawText[i + 1]
    transitionCounts[h1][h2] += 1
transitionProbs = [util.normalize(transitionCounts[h1]) for h1 in range(K)]

# emissionProbs[h][e] = p_emit(e | h)
emissionProbs = [[1.0 / K for e in range(K)] for h in range(K)]

### Run EM

observations = util.toIntSeq(util.readText('ciphertext'))

for t in range(200):
    # E-step
    # q[i][h]: q_i(h)
    q = util.forwardBackward(observations, startProbs, transitionProbs, emissionProbs)

    # Printing the best guess
    print(util.toStrSeq([util.argmax(q[i]) for i in range(len(observations))]))
    print('')

    # M-step
    emissionCounts = [[0 for e in range(K)] for h in range(K)]
    for i in range(len(observations)):
        for h in range(K):
            emissionCounts[h][observations[i]] += q[i][h]
    emissionProbs = [util.normalize(emissionCounts[h]) for h in range(K)]
