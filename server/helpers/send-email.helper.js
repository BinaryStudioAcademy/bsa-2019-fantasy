/* eslint-disable no-console */
import nodemailer from 'nodemailer';
import moment from 'moment';
import { getEmailTemplate } from './email-template.helper';

export const sendRemind = (email, gameDetails) => {
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    pool: true,

    auth: {
      user: 'fantasy.football.noreply@gmail.com',
      pass: 'fantasy123123',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const formEmailText = (details) => {
    if (details) {
      if (details.finished) {
        return `You are receiving this letter, because you have subscribed to the fixture
   <em>${details.homeTeamName}</em> - <em>${details.awayTeamName}</em>,
    which finished on <b>${moment(details.start).format('MMM Do YY')}</b> with result ${
          details.homeTeamScore
        } - ${details.awayTeamScore}.
    Don't miss it! Visit <a href="http://ec2-18-224-246-75.us-east-2.compute.amazonaws.com:5001/fixtures">our app</a> for more details`;
      }

      return `You are receiving this letter, because you have subscribed to the fixture
    <em>${details.homeTeamName}</em> - <em>${details.awayTeamName}</em>,
    which starts on <b>${moment(details.start).format(
      'MMM Do YY',
    )}</b>. Visit <a href="http://ec2-18-224-246-75.us-east-2.compute.amazonaws.com:5001/live">our app</a>`;
    }
    return `You are receiving this letter, because you haven't applied a team yet. Visit <a href="http://ec2-18-224-246-75.us-east-2.compute.amazonaws.com:5001/live">our app</a> to do this!`;
  };

  const mailOptions = {
    to: email,
    from: 'fantasy.football.noreply@gmail.com',
    subject: 'Fantasy Premier League',
    html: getEmailTemplate(formEmailText(gameDetails)),
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
