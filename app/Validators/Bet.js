'use strict'

class Bet {
  get validateAll () {
    return true;
  }
  
  get rules () {
    return {
      cart: 'required'
    }
  }
}

module.exports = Bet
