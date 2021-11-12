import nodemailer from 'nodemailer';


const validationEmail = async user => {
  const transporter = nodemailer
    .createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  const emailLink = `${process.env.HOST}api/users/${user.id}/activate`;
  await transporter
    .sendMail({
      from: `Avenged Sevenfold <${user}>`,
      to: user.email,
      subject: 'Welcome to the family',
      html: `
        <h1>Welcome to the Family</h1>
        <p>Activa tu cuenta</p>
        <a href="${emailLink}">Click aquí para activar</a>
      `,
    })
    .then(res => {
      console.log(`Email enviado a ${user.id}`)
    })
    .catch(err => {
      console.log('Error email', err);
    })
}


export default validationEmail;