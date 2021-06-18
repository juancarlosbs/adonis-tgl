'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Bet = use('App/Models/Bet')
const Mail = use('Mail')
const Kue = use('Kue')
const Job = use('App/Jobs/NewBetMail')


/**
 * Resourceful controller for interacting with bets
 */
class BetController {
  /**
   * Show a list of all bets.
   * GET bets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, auth }) {
    
    const bets = await Bet.query().with('game').fetch()

    const filteredBets = bets.rows.filter(key => key.user_id === auth.user.id)

    const user_id = auth.user.id
    return {filteredBets, user_id}
  }

  /**
   * Create/save a new bet.
   * POST bets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async store ({ request, auth }) {
    const dataReq = request.all()
    const data = dataReq.cart
    
    data.map(async betitem => {
      await Bet.create({...betitem, user_id: auth.user.id})
    })

    await Mail.send(
        ['emails.new_bet'],
        { 
        },
        message => {
            message
                .to(auth.user.email)
                .from('juan.cbserrano@gmail.com', 'Juan | TGL')
                .subject('Novas Apostas')
        }
    )
  }
  /*async store ({ request, auth }) {
    try {
      const data = request.only(['numbers', 'price'])
      console.log(auth.user.id)
      const bet = await Bet.create({...data, user_id: auth.user.id})
      await Mail.send(
        ['emails.new_bet'],
        { 
        },
            message => {
                message
                    .to(auth.user.email)
                    .from('juan.cbserrano@gmail.com', 'Juan | TGL')
                    .subject('Nova Aposta')
            }
        )
  
      return bet
    } catch (err) {
      return response.status(err.status).send({ message: 'Algo não deu certo, tivemos um problema interno.'})
    }

  }
  */

  /**
   * Display a single bet.
   * GET bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const bet = await Bet.findOrFail(params.id)

    await bet.load('user')
    await bet.load('game')

    return bet
  }

  /**
   * Update bet details.
   * PUT or PATCH bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const bet = await Bet.findOrFail(params.id)
    const data = request.only(['numbers', 'price'])

    bet.merge(data)

    await bet.save()

    return bet
  }

  /**
   * Delete a bet with id.
   * DELETE bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const bet = await Bet.findOrFail(params.id)

    await bet.delete()
  }
}

module.exports = BetController
