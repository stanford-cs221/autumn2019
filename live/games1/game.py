############################################################
# Modeling

class HalvingGame(object):
    def __init__(self, N):
        self.N = N

    # state = (player, number)
    def startState(self):
        return (+1, self.N)

    def actions(self, state):
        player, number = state
        return ['-', '/']

    def succ(self, state, action):
        player, number = state
        if action == '-':
            return (-player, number - 1)
        elif action == '/':
            return (-player, number // 2)
        assert False

    def isEnd(self, state):
        player, number = state
        return number == 0

    def utility(self, state):
        player, number = state
        assert self.isEnd(state)
        return player * float('inf')

    def player(self, state):
        player, number = state
        return player

############################################################
# Modeling

def simplePolicy(game, state):
    action = '-'
    print 'simplePolicy: state {} => action {}'.format(state, action)
    return action

def humanPolicy(game, state):
    while True:
        print 'humanPolicy: Enter move for state {}:'.format(state),
        action = raw_input().strip()
        if action in game.actions(state):
            return action

def minimaxPolicy(game, state):
    def recurse(state):
        # Return (utility of that state, action that achieves that utility)
        if game.isEnd(state):
            return (game.utility(state), None)
        # List of (utility of succ, action leading to that succ)
        candidates = [
            (recurse(game.succ(state, action))[0], action)
            for action in game.actions(state)
        ]
        player = game.player(state)
        if player == +1:
            return max(candidates)
        elif player == -1:
            return min(candidates)
        assert False

    utility, action = recurse(state)
    print 'minimaxPolicy: state {} => action {} with utility {}'.format(state, action, utility)
    return action

############################################################

game = HalvingGame(N=30)
#print game.succ(game.startState(), '/')

policies = {
    +1: humanPolicy,
    #-1: simplePolicy,
    -1: minimaxPolicy,
}

state = game.startState()
while not game.isEnd(state):
    # Who controls this state?
    player = game.player(state)
    policy = policies[player]
    # Ask policy to make a move
    action = policy(game, state)
    # Advance state
    state = game.succ(state, action)

print 'Final utility of game is {}'.format(game.utility(state))
