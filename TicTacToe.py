### print('Welcome To Tic Tac Toe')
# from Game import *

import random
# Game Board
def dashBoard(board):
    # This function prints out the game board that it was passed.
    
    '''"board" is a list of 10 strings representing the board (ignore index 0).'''
    print(f' {board[7]} | {board[8]} | {board[9]}')
    print('---+---+---')
    print(f' {board[4]} | {board[5]} | {board[6]}')
    print('---+---+---')
    print(f' {board[1]} | {board[2]} | {board[3]}')
    

# Player Selection 
def selectPlayer():
    letter = ' '
    while not (letter == "X" or letter == 'O'):
        letter = input('what do you want to be (X, O)- ').upper()
        
    if letter.upper() == 'X':
        return ('X','O')
    else:
        return ('O','X')


#  who will go first
def whoGoesFirst():
    if random.randint(0, 1) == 1:
        return "Computer"
    else:
        return "Player"

# making Move
def makemove(board, letter, move):
    board[move] = letter


# Step 5 - Checking Whether the Player Won
def isWinner(bo, le):
    return ( (bo[1] == le and bo[2] == le and bo[3] == le) or
            (bo[4] == le and bo[5] == le and bo[6] == le) or
            (bo[7] == le and bo[8] == le and bo[9] == le) or
            (bo[1] == le and bo[5] == le and bo[9] == le) or
            (bo[3] == le and bo[5] == le and bo[7] == le) or
            (bo[1] == le and bo[4] == le and bo[7] == le) or
            (bo[2] == le and bo[5] == le and bo[8] == le) or
            (bo[3] == le and bo[6] == le and bo[9] == le) )
            
# Space free
def isSpaceFree(board, move):
    if board[move] == " ":
        return True
    else:
        return False

# Step 7 - Checking Whether the Board Is Full
def boardFull(board):
    for i in range(1,10):
        if isSpaceFree(board,i):
            return False
    return True

# Step 8 - Letting the Player Enter a Move
def movePlayer(board):
    move = ' '
    while True:
        
        if move not in '1 2 3 4 5 6 7 8 9'.split() or not isSpaceFree(board, int(move)):
            move = input("Enter a move - ")
        else:
            return int(move)

# Step 9 - Duplicating the Board Data
def BoardCopy(board):
    return board.copy()

# Step 10 - Choosing a Move from a List of Moves
def chooseRandomMoveList(board, moveList):
    possibleMoves = []
    for i in moveList:
        if isSpaceFree(board, i):
            possibleMoves.append(i)
            
    if len(possibleMoves) != 0:
        return random.choice(possibleMoves)
    else:
        return None


# Step 11 - Creating the Computer’s AI
def getComputerMove(board, computer):
    if computer == "X":
        player = 'O'
    else:
        player = 'X'
        
#         check winning possibility For Computer
        for i in range(1, 10):
            boardcopy = BoardCopy(board)
            if isSpaceFree(boardcopy, i):
                makemove(boardcopy, computer, i)
                if isWinner(boardcopy, computer):
                    return int(i)
        
        #         check winning possibility For Player
        for i in range(1, 10):
            boardcopy = BoardCopy(board)
            if isSpaceFree(boardcopy, i):
                makemove(boardcopy, player, i)
                if isWinner(boardcopy, player):
                    return i
        
        # Try to take one of the corners, if they are free.
        move = chooseRandomMoveList(board, [1, 3, 7, 9])
        if move != None:
            return move 
    
        # Try to take the center, if it is free.
        if isSpaceFree(board, 5):
            return 5

        # Move on one of the sides.
        return chooseRandomMoveList(board, [2, 4, 6, 8])

#wanna play again
def playAgain():
    print('Do you want to play again? (yes or no)')
    return input().lower().startswith('y')








#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

if __name__=="__main__":

    while True:
        
        print('Tic Tac Toe Game')
        board = [' '] * 10
        player, computer = selectPlayer()
        turn = whoGoesFirst()
        print(f'The {turn} Will Go First')
        
        game = True
        
        while game:
            if turn == 'Player':
                dashBoard(board)
                move = movePlayer(board)          
                makemove(board, player, int(move))
                turn = 'Computer'    
                if isWinner(board, player):
                    dashBoard(board)
                    print('You have Won the Game')
                    game = False
                
                else:
                    if boardFull(board):
                        dashBoard(board)
                        print('The Game is Tie')
                        break
                turn = 'Computer'
                        
            
            else:
    #             Computers turn
                move = getComputerMove(board, computer)
                makemove(board, computer, move)
                
                if isWinner(board, computer):
                    dashBoard(board)
                    print('The computer has beaten you! You lose.')
                    game = False
                else:
                    if boardFull(board):
                        dashBoard(board)
                        print('The game is a tie!')
                        break 
                turn = 'Player'
                        
        if (not playAgain()):
            break