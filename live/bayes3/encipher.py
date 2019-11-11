import util
import random

K = 27

def randomPermute(observations):
    random.seed(42)
    perm = list(range(K-1))
    random.shuffle(perm)
    perm.append(K-1)
    return [perm[x] for x in observations]

print((util.toStrSeq(randomPermute(util.toIntSeq(util.readText('/dev/stdin'))))))
