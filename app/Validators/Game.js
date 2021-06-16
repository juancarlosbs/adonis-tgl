'use strict'

class Game {
  get validateAll () {
    return true;
  }
  
  get rules () {
    return {
      type: 'required|unique:games',
       description: 'required', 
       range: 'required', 
       price: 'required', 
       max_number : 'required', 
       color: 'required', 
       min_cart_value: 'required'
    }
  }
}

module.exports = Game
