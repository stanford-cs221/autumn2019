def computeEditDistance(s, t):
    cache = {}  # (m, n) => result
    def recurse(m, n):
        """
        Return the minimum edit distance between:
        - first m letters of s
        - first n letters of t
        """
        if (m, n) in cache:
            return cache[(m, n)]
        if m == 0:  # Base case
            result = n
        elif n == 0:  # Base case
            result = m
        elif s[m - 1] == t[n - 1]:  # Last letter matches
            result = recurse(m - 1, n - 1)
        else:
            subCost = 1 + recurse(m - 1, n - 1)
            delCost = 1 + recurse(m - 1, n)
            insCost = 1 + recurse(m, n - 1)
            result = min(subCost, delCost, insCost)
        cache[(m, n)] = result
        return result

    return recurse(len(s), len(t))

#print(computeEditDistance('a cat!', 'the cats!'))
print(computeEditDistance('a cat!' * 10, 'the cats!' * 10))
