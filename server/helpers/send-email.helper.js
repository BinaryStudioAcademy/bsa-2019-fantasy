import nodemailer from 'nodemailer';

export const sendRemind = (email) => {
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fantasy.league.noreply@gmail.com',
      pass: '1223334444fantasy',
      pool: true,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    to: email,
    from: 'passwordreset@demo.com',
    subject: 'Reminder to apply team',
    text: `There are 5 hours left by the beginning of the next gameweek. 
Please apply your team:
http://localhost:5003/my-team`,
  };

  smtpTransport.sendMail(mailOptions, (err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });

  smtpTransport.close();
};
