//   D A S H   B O A R D
function theGameBoard(board){
    console.log('\t\t\t Game Board\n');
    console.log(`\t\t\t ${board[7]} | ${board[8]} | ${board[9]}`);
    console.log(`\t\t\t---+---+---`);
    console.log(`\t\t\t ${board[4]} | ${board[5]} | ${board[6]}`);
    console.log(`\t\t\t---+---+---`);
    console.log(`\t\t\t ${board[1]} | ${board[2]} | ${board[3]}`);
}

function selectPlayer(){
    let letter = '';
    while( true ){
        letter = prompt('What you want to be (X-O) : ').toUpperCase();
        if (letter === 'X' || letter === 'O')
            break;
    }
    return letter
}

// W H O   G O E S    F I R S T 
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function whoGoesFirst(){
        if (getRandomInt(2) == 0)
            return 'Player';
        else
            return "Computer";
}

//  M A K I N G      M O V E
function makeMove(board, letter, move){
    board[move] = letter;
    // theGameBoard(board);
}

//   C H E C K I N G     W I N N E R 
function isWinner(bo, le){
    return ((bo[1] === le && bo[2] === le && bo[3] === le) ||
    (bo[4] === le && bo[5] === le && bo[6] === le) ||
    (bo[7] === le && bo[8] === le && bo[9] === le) ||
    (bo[1] === le && bo[5] === le && bo[9] === le) ||
    (bo[3] === le && bo[5] === le && bo[7] === le) ||
    (bo[1] === le && bo[4] === le && bo[7] === le) ||
    (bo[2] === le && bo[5] === le && bo[8] === le) ||
    (bo[3] === le && bo[6] === le && bo[9] === le) )
}

//   S P A C E    F R E E 
function isSpaceFree(board, move){

    if (board[move] === ' '){
        return true
    }
    else
        return false
}

//   B O A R D    F U L L 
function isBoardFull(board){
    let check = true;
    for(i=1; i < 10; i++){
        if ( isSpaceFree(board, i))
        {
            check = false;
            return check;
        }           
    }return check;
}

//  Move Player
function movePlayer(board){
    let move = ' '
    while (true){
        move = prompt('Enter a move (1 - 9) : ')
        if (move in "1 2 3 4 5 6 7 8 9 ".split(" ")){
            if (isSpaceFree(board, Number(move)))
                return Number(move);
        }
    }
}

//   ##############              C O M P U T E R           L O G I C      ################

//  C O P Y     B O A R D     
function boardCopy(board){
    let copy =  board.slice();
    return copy;
}

//   Random   Choice  
get_random = function (list) {
    return list[Math.floor((Math.random()*list.length))];
  } 

//  Random Move List
function chooseRandomMoveList(board, moveList){
    let possibleMoves = [];
    for (i in moveList){
        if (isSpaceFree(board, i)){
            possibleMoves.push(i)
        }
    }
    if (possibleMoves.length !== 0)
        return get_random(possibleMoves)
    return undefined
}


//   Computer  Move
function getComputerMove(board, computer){
    if (computer === 'X'){
        var player = 'O';
    }    
    else
    {
        var player = 'X'; 
    }      
//      Check winning possiblity for Computer
        for (i=1; i<10; i++){
            let copy = boardCopy(board);
            if (isSpaceFree(boardCopy(board), i)){
                makeMove(copy, computer, i);
                if (isWinner(copy, computer)){
                    return Number(i);
                }
            }
        }

        //////////////////////////////////////////////////
//      check winning possibility for Player
        for (i=1; i<10; i++){
            let copy = boardCopy(board);
            if (isSpaceFree(boardCopy(board), i)){
                makeMove(copy, player, i);
                if (isWinner(copy, player)){
                    return Number(i);
                }
            }
        }
        ///////////////////////////////////////////////////

        let move = chooseRandomMoveList(board, [1, 3, 7, 9])
        if (move !== undefined)
            return move 
    
        // Try to take the center, if it is free.
        if (isSpaceFree(board, 5))
            return 5

        // Move on one of the sides.
        return chooseRandomMoveList(board, [2, 4, 6, 8])
    }



//     P l a y   a g a i n  

function playAgain(){
    ch = prompt('Do you want to play again? (yes or no)  : ');
    return ch.toLowerCase()
}


//   F U N C T I O N    F U N C T I O N
function main()
{
    var board = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '];
    theGameBoard(board);
    let playerLetter = ''
    let computerLetter = ''
    
    letter = selectPlayer();
    if (letter === 'X') {
        playerLetter = 'X';
        computerLetter = 'O';
    }      
    else {
        playerLetter = 'O';
        computerLetter = 'X';
    }     
    console.log(`PlayerLetter - ${playerLetter},  Computer letter ${computerLetter}`); 
    let turn = whoGoesFirst();
    console.log(`The ${turn}  will Go first...`);
    while (true)
    {    
        //  Player Turn 
        if (turn === 'Player')
        {
            let move = movePlayer(board);
            makeMove(board, playerLetter, move);
            turn = 'Computer';
            theGameBoard(board);
          
            if (isWinner(board, playerLetter))
                {
                    theGameBoard(board);
                    console.log('You won !');
                    break;
                }
            else
                {
                    if (isBoardFull(board))
                        {
                            theGameBoard(board);
                            console.log('The Game is tie');
                            break;
                        }
                }
            turn = 'Computer';
        }
        else
        {
            //  Computer turn 
            let move = getComputerMove(board, computerLetter);
            makeMove(board, computerLetter, move);
            theGameBoard(board);            

            if (isWinner(board, computerLetter))
            {
                console.log('The Computer has beaten you !');
                break;
            }
            else
            {
                if (isBoardFull(board))
                {
                    console.log("The Game is tie");
                    break;
                }
            }

            turn = 'Player'
        }
    }
}

main()