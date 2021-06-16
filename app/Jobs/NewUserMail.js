'use strict'

const Mail = use('Mail')

class NewUserMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewUserMail-job'
  }

  // This is where the work is done.
  async handle ({ email}) {
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
  }
}

module.exports = NewUserMail

