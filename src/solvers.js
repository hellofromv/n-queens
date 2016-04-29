/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var boardObj = new Board({n: n});
  var chessboard = boardObj.rows();
  var solution = [];

  for (var row = 0; row < chessboard.length; row++) {
    for (var column = 0; column < chessboard.length; column++) {
      boardObj.togglePiece(row, column);
      if (boardObj.hasAnyRooksConflicts()) {
        boardObj.togglePiece(row, column);

      } else {
        solution.push(chessboard[row]);
      }
    }  
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var boardObj = new Board({n: n});
  var solutionCount = 0;
  var theMatrix = boardObj.rows();
  var tempBoard = undefined;
  var startingRow = 0;
  var startingColumn = 0;

  var helper = function(aBoard) {
    for (var i = 0; i < aBoard.length; i++) {
    // if the subarrays contain at least one rook
      // solutionCount++
      if (aBoard[i].indexOf(1) !== -1) {
        solutionCount++;
      }
    }

    // put a rook at some position
      // check for collision
        // if there is, then toggle back
          // if next position is <= n
            // check next position 
        // if no collision, continue to next row
          // recurse at this position



    if (row > n || column > n) {
      // goes back to previous recursed call
      return;
    }

    if (this.hasAnyRooksConflicts()) {

    }
  };
  helper(theMatrix, startingRow, startingColumn);
  //recursive function - inputs ()
    //base case:
      //will stop recursing after we've hit the nth row
    
    //if there is a conflict in the current square, move to the next square

    //recursive case:
      //we find a rook position with no conflicts
      //call the recursive function to examine the next row



  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
