'use strict'

class Bet {
  get validateAll () {
    return true;
  }
  
  get rules () {
    return {
      numbers: 'required',
      price: 'required',
      game_id: 'required'
    }
  }
}

module.exports = Bet
