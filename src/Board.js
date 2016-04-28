// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var currentRow = this.get(rowIndex);
      var counter = 0;

      for (var square = 0; square < currentRow.length; square++) {
        if (currentRow[square]) {
          counter++;
        }
      }

      return counter > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rowsArr = this.rows();
      var conflictFound = false;
      // loop through the rows
      for (var row = 0; row < rowsArr.length; row++) {
        // have counter variable to see how many pieces are on that row
        var rowPieces = 0;
        // loop through each square
        for (var square = 0; square < rowsArr[row].length; square++) {
          // check each square to see if there's a piece
          if (rowsArr[row][square]) {
            // increment rowPieces
            rowPieces++;
          }
        }
        // also check if there are more than one, if there is, then there is a collision
        if (rowPieces > 1) {
          // stop looping & return
          conflictFound = true;
          // return conflictFound;
        }
      }
      // will return false
      return conflictFound;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.attributes;
      var counter = 0;

      for (var column = 0; column < board[0].length; column++) { //keeps track of how many columns to iterate through
        for (var row in board[column]) { //iterate through keys in board object at index[column] 
          if (board[row][column] === 1) {
            counter++;
          }
          if (counter > 1) {
            return true;
          }
        }
        counter = 0;
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.attributes;

      var pieceCounter = 0;

      for (var column = majorDiagonalColumnIndexAtFirstRow, row = 0; row < board[0].length; column++, row++) {
        if (board[column] === undefined){
          continue;
        }
        if (board[row][column] === 1) {
          pieceCounter++;
        }
      }
      if (pieceCounter > 1) {
        return true;
      } else {
        return false;
      }

    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      // returns the board -- array of arrays
      var board = this.rows();
      var startLookingHere = -(board[0].length - 1);
      var endBeforeHere = board[0].length;
      var hasConflict = false;
      var row = 0;
 
      for (startLookingHere, row; startLookingHere < endBeforeHere; startLookingHere++, row++) {

        if (this.hasMajorDiagonalConflictAt(startLookingHere)) {
          hasConflict = true;
          return hasConflict;
        }
        
      }
      return hasConflict;
    },

// ALL RECURSE    
// 1. need a loop to start at 0, 0 
// 2. does same as 1 -- but starting at the next iteration of the row
// 3. does same as 1 -- but starting at the next iteration for column


// loop through starting at 0,0
// if queen is found
// loop through starting from her index--





    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.attributes;
      var pieceCounter = 0;

      for (var column = minorDiagonalColumnIndexAtFirstRow, row = 0; row < board[0].length; column--, row++) {
        if (board[column] === undefined){
          continue;
        }
        if (board[column][row] === 1) {
          pieceCounter++;
        }
      }
      if (pieceCounter > 1) {
        return true;
      } else {
        return false;
      }

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();
      var startLookingHere = board[0].length + board[0].length - 2;
      var endBeforeHere = 0;
      var hasConflict = false;
      var row = 0;

      for (startLookingHere; startLookingHere > endBeforeHere; startLookingHere--) {
        if (this.hasMinorDiagonalConflictAt(startLookingHere)) {
          hasConflict = true;
          return hasConflict;
        }
      }
      return hasConflict;

    },

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
