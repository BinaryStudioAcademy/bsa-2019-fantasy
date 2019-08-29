import nodemailer from 'nodemailer';
import moment from 'moment';

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
    subject: 'Fixture reminder',
    text: gameDetails.finished
      ? `You are receiving this letter, because you have subscribed to the fixture
    ${gameDetails.homeTeamName} - ${gameDetails.awayTeamName},
    which finished on ${gameDetails.start} with result ${gameDetails.homeTeamScore} - ${gameDetails.awayTeamScore}.
    Don't miss it!`
      : `You are receiving this letter, because you have subscribed to the fixture
    ${gameDetails.homeTeamName} - ${gameDetails.awayTeamName},
    which starts on ${moment(gameDetails.start)}. 
    Don't miss it!`,
  };
  // eslint-disable-next-line func-names
  smtpTransport.sendMail(mailOptions, function(err) {
    // eslint-disable-next-line no-console
    console.log(err);
  });
};
