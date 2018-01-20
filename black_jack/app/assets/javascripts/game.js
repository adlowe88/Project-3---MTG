const suits = [ "c", "h", "s", "d" ];
const ranks = ["1","2","3","4","5","6","7","8","9","10","11","12","13"];

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  value() {
    let value = null;
    if ( +this.rank === 1 ) {
      value = 11;
    }
    else if ( +this.rank >= 2 && +this.rank <= 10 ) {
      value = this.rank
    }
    else if ( +this.rank >= 11 ) {
      value = 10;
    }
    return value;
  }

  displayRank() {
    let rank = null;
    if ( this.rank === "11" ) {
      rank = "J";
    }
    else if ( this.rank === "12" ) {
      rank = "Q";
    }
    else if ( this.rank === "13" ) {
      rank = "K";
    }
    else if ( this.rank === "1" ) {
      rank = "A";
    }
    else {
      rank = this.rank;
    }
    return rank;
  }
}

class Deck {
  constructor() {
    let cards = [];
    suits.forEach( function ( suit ) {
      ranks.forEach( function ( rank ) {
        cards.push( new Card(rank, suit) );
      });
    });
    this.cards = cards;
  }

  shuffle() {
    var j, x, i;
    for (i = this.cards.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = x;
    }
  }

  draw() {
    return this.cards.pop();
  }
}

class Player {
  constructor() {
    this.hand = [];
    this.handValue = 0;
    this.aceCount = 0;
    this.gameOver = false;
    this.gameStatus = '';

    this.hit();
    this.hit();
  }

  hit() {
    const card = deck.draw();
    if ( card.rank === '1' ) {
      this.aceCount += 1;
    }
    this.handValue += Number( card.value() );
    this.hand.push( card );
  }

  switchAce() {
    while ( this.handValue > 21 && this.aceCount > 0 ) {
      this.aceCount -= 1;
      this.handValue -= 10;
    }
  }

  checkGameOver() {
    if ( this.handValue === 21 ) {
      this.gameOver = true;
      this.gameStatus = 'Player 1 wins!!';
    }
    else if ( this.handValue > 21 ) {
      this.switchAce();
      if ( this.handValue > 21 ) {
        this.gameOver = true;
        this.gameStatus = 'Player 1 bust';
      }
    }
    else {
      this.gameStatus = 'hit or stay?'
    }
  }

  checkWinner() {
    player1.gameOver = true;
    console.log( 'check winner', player1.handValue, player2.handValue );
    if ( player1.handValue > player2.handValue ) {
      this.gameStatus = 'Player 1 wins!!';
    }
    else if ( player1.handValue === player2.handValue ) {
      this.gameStatus = 'Game drawn!';
    }
    else {
      this.gameStatus = 'Player 2 wins!';
    }
  }
}


$( document ).ready( function () {
  deck = new Deck;
  deck.shuffle();

  player1 = new Player;
  player2 = new Player;
  player1.checkGameOver();
  render();

  $( '.hit' ).on( 'click', function () {
    if ( player1.gameOver ) { return };
    player1.hit();
    player1.checkGameOver();
    render();
  });

  $( '.stay' ).on( 'click', function () {
    if ( player1.gameOver ) { return };
    player1.checkWinner();
    render();
  } );
} );

const render = function () {
  $( '.hand' ).empty();
  const hand = player1.hand;
  hand.forEach( renderCard );

  $( '.game-status' ).text( player1.gameStatus );
}

const renderCard = function ( card ) {
  let $div = $( '<div>' );
  $div.text( `Rank: ${ card.displayRank() }${ card.suit }` );
  $div.addClass( 'player-cards' );
  $div.appendTo( '.hand' );
}
