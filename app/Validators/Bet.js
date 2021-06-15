'use strict'

class Bet {
  get validateAll () {
    return true;
  }
  
  get rules () {
    return {
      numbers: 'required',
      price: 'required',
    }
  }
}

module.exports = Bet
