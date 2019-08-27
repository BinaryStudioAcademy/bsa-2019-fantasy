import nodemailer from 'nodemailer';

export const sendRemind = (email, gameDetails) => {
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fantasy.league.noreply@gmail.com',
      pass: '1223334444fantasy',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    to: email,
    from: 'fantasy.league.noreply@gmail.com',
    subject: 'Reminder to apply team',
    text: `<h1>Fixture reminder</h1>
    <p>You are receiving this letter, because you have subscribed to the fixture
    <em>${gameDetails.homeTeamName}</em> - <em>${gameDetails.awayTeamName}</em>,
    which starts at <strong>${gameDetails.start}</strong>. Don't miss it!`,
  };
  // eslint-disable-next-line func-names
  smtpTransport.sendMail(mailOptions, function(err) {
    // eslint-disable-next-line no-console
    console.log(err);
  });
};
