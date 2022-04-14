const express = require("express");
const passport = require("passport");
const { ReportProblem } = require("../database/schemas");

const Mailgun = require('mailgun.js');
const formData = require('form-data');
const mailgun = new Mailgun(formData);
const router = express.Router();

module.exports = router;

router.post("/", (req, res) => {
  const mailgunClient = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || '' });
  req.body.user = req.user.id;
  let html = `<h2>דיווח התקבל מהמשתמש ${req.user.username}</h2>
  <div>נושא: ${req.body.subject}</div>
  <div>חורשה: ${req.body.forest}</div>
  <div>תיאור כללי: ${req.body.description}</div>
  <h5>מאיתנו, צוות יער האקלים</h5>`
  if (req.body.pic) {
    html += `<img src="${req.body.pic}">`
  }
  const data = {
    // Specify email data
    from: 'יער האקלים <support@goodforest.org>',
    to: process.env.REPORT_ADMIN_EMAILS || '',
    subject: 'יער האקלים - התקבל דיווח על עץ',
    html
  };
  mailgunClient.messages.create('sandboxbe750122e7054403a43b77ec1a865407.mailgun.org', data).then(() => {
    console.log('email sent')
  });
  const report = ReportProblem(req.body);
  report.save((err, result) => {
    if (err) {
      res.status(400).send({ message: "Create report failed", err });
    } else {
      res.send({ message: "Report sent successfully" });
    }
  });
});
