const sendgridEmailApiKey = process.env.SENDGRID_API_KEY
const fromEmail = process.env.FROM_EMAIL
const emailFunctionalityEnabled =
  process.env.EMAIL_FUNCTIONALITY_ENABLED || false

module.exports = { sendgridEmailApiKey, fromEmail, emailFunctionalityEnabled }
