import re

# Return a string containing (cleaned up) contents of the file at path.
def readText(path):
    return ' '.join(re.sub('[^a-z ]', '', line.strip().lower()) for line in open(path))

# 'a' => 0, 'b' => 1, ..., 'z' => 25, ' ' => 26
def toInt(s):
    if s == ' ': return 26
    return ord(s[0]) - 97

# 0 => 'a', 1 => 'b', ..., 25 => 'z', 26 => ' '
def toStr(c):
    if c == 26: return ' '
    return chr(c + 97)

# 'ab' => [0, 1]
def toIntSeq(s):
    return [toInt(x) for x in s]

# [0, 1] => 'ab'
def toStrSeq(s):
    return ''.join(toStr(x) for x in s)

# [3, 4, 3] => [0.3, 0.4, 0.3]
def normalize(weights):
    z = sum(weights)
    return [1.0 * w / z for w in weights]

# [3, 4, 3] => 1
def argmax(weights):
    return max((w, i) for i, w in enumerate(weights))[1]

### Inference

# HMM: (startProbs, transitionProbs, emissionProbs)
# Return q, where q[i][h] = P(H_i = h | E = observations)
def forwardBackward(observations, startProbs, transitionProbs, emissionProbs):
    n = len(observations)
    K = len(startProbs)
    def weight(h1, h2, i):
        # weight on edge from (H_{i-1} = h1) to (H_i = h2)
        w = 1
        if i == 0:
            w *= startProbs[h2]
        else:
            w *= transitionProbs[h1][h2]
        w *= emissionProbs[h2][observations[i]]
        return w

    # Compute forward messages
    # F[i][h] = sum over all the paths from start to (H_i = h)
    F = [None] * n
    for i in range(n):
        F[i] = [None] * K
        for h2 in range(K):
            if i == 0:
                F[i][h2] = weight(None, h2, i)  # from start
            else:
                F[i][h2] = sum(F[i-1][h1] * weight(h1, h2, i) \
                    for h1 in range(K))
        F[i] = normalize(F[i])
        #print "F[%d] = %s" % (i, formatDistrib(F[i]))
    #print

    # Compute backward messages
    # B[i][h] = sum over all the paths from (H_i = h) to end
    B = [None] * n
    for i in range(n-1, -1, -1):
        B[i] = [None] * K
        for h1 in range(K):
            if i == n-1:
                B[i][h1] = 1  # to end
            else:
                B[i][h1] = sum(weight(h1, h2, i+1) * B[i+1][h2] \
                    for h2 in range(K))
        B[i] = normalize(B[i])
        #print "B[%d] = %s" % (i, formatDistrib(B[i]))
    #print

    # Compute marginals
    # q[i][h] = sum over all the paths that go through (H_i = h)
    q = [None] * n
    for i in range(n):
        q[i] = [None] * K
        for h in range(K):
            q[i][h] = F[i][h] * B[i][h]
        q[i] = normalize(q[i])
        #print "q[%d] = %s" % (i, formatDistrib(q[i]))
    #print
    return q

def formatDistrib(weights):
    return '\t'.join(['%d:%.1g' % (i, w) for i, w in enumerate(weights)])
