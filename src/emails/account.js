const sgMail = require('@sendgrid/mail')
const {
  sendgridEmailApiKey,
  fromEmail,
  emailFunctionalityEnabled
} = require('../config/emailConfig')

sgMail.setApiKey(sendgridEmailApiKey)

const sendWelcomeEmail = (email, name) => {
  if (emailFunctionalityEnabled === 'true') {
    sgMail.send({
      to: email,
      from: fromEmail,
      subject: 'Thanks for joining in!',
      text: `Welcome to the Task Manager app, ${name}. Let me know how you get along with thee app.`
    })
  }
}

const sendCancelationEmail = (email, name) => {
  if (emailFunctionalityEnabled === 'true') {
    sgMail.send({
      to: email,
      from: fromEmail,
      subject: 'Sorry to see you go!',
      text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
  }
}

module.exports = { sendWelcomeEmail, sendCancelationEmail }
