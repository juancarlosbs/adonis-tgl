'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')
const Kue = use('Kue')
const Job = use('App/Jobs/NewUserMail')

class UserController {
    async index({}) {
        const users = await User.all()
    
        return users
    }

    async store({request}) {
        try {
            const data = request.only(['username', 'email', 'password'])

            const user = await User.create(data)

            const email = data.email

            await Mail.send(
                ['emails.new_user'],
                { 
                    email,
                },
                message => {
                    message
                        .to(user.email)
                        .from('juan.cbserrano@gmail.com', 'Juan | TGL')
                        .subject('Conta Criada')
                }
            )
    
            return user
        } catch (err) {
            return response
            .status(err.status)
            .send({ message: 'Algo não deu certo, tivemos um problema interno.'})
        }
    }

    async show({ params }) {
        const user = await User.findOrFail(params.id)
    
        return user
    }

    async update({ params, request }) {
        const user = await User.findOrFail(params.id)
        const data = request.only(['username','email', 'password'])
    
        user.merge(data)
    
        await user.save()
    
        return user
    }

    async destroy({ params }) {
        const user = await User.findOrFail(params.id)
    
        await user.delete()
    }
}

module.exports = UserController
