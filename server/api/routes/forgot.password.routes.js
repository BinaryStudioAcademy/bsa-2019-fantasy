import { Router } from 'express';
import nodemailer from 'nodemailer';
import async from 'async';
import crypto from 'crypto';
import * as userService from '../services/user.service';

const router = Router();
/* eslint-disable */
router.post('/', (req, res, next) => {
  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, (err, buf) => {
          const token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        userService.getUserByEmail(req.body.email).then(user => {
          if (!user) {
            return res.redirect('/forgot');
          }

          let smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'fantasy.league.noreply@gmail.com',
              pass: '1223334444fantasy'
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          const mailOptions = {
            to: user.email,
            from: 'passwordreset@demo.com',
            subject: 'Password Reset',
            text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' +
              req.headers['x-forwarded-host'] +
              '/reset/' +
              user.id +
              '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            res.json({
              status: 'success',
              message:
                'An e-mail has been sent to ' +
                user.email +
                ' with further instructions.'
            });
            done(err, 'done');
          });
        });
      }
    ],
    err => {
      if (err) return next(err);
      res.redirect('/forgot');
    }
  );
});

router.post('/:id', (req, res) => {
  async.waterfall([
    function(done) {
      userService.getUserById(req.params.id).then(user => {
        if (!user) {
          console.log('error');
        }
        // TODO: add changing password to a new one

        let smtpTransport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'fantasy.league.noreply@gmail.com',
            pass: '1223334444fantasy'
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        const mailOptions = {
          to: user.email,
          from: 'passwordreset@demo.com',
          subject: 'Your password has been changed',
          text:
            'Hello,\n\n' +
            'This is a confirmation that the password for your account ' +
            user.email +
            ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          res.json({
            status: 'success',
            message: 'Success! Your password has been changed.'
          });
          done(err, 'done');
        });
      });
    }
  ]);
});

export default router;
