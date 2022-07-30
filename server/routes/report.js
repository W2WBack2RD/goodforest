const express = require('express');
const passport = require('passport');
const { User, TreeReport } = require('../database/schemas');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const AWS = require('aws-sdk');
const multer = require('multer');
const os = require('os');
const mailgun = new Mailgun(formData);

const upload = multer();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
})


const router = express.Router();

module.exports = router;

router.post('/upload', upload.single('file'), function (req, res) {
  const title = req.file.originalname;
  const file = req.file.buffer;

  const params = {
    Bucket: "good-forest-static",
    Key: `imgs/${title}`,
    Body: file
  }

  s3.upload(params, (err, data) => {
    if (err) {
      res.status(400).send(err)
    }
    res.send(data)
  })
});

router.post('/tree', (req, res) => {
  const mailgunClient = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || '' });
  req.body.user = req.user?.id;
  const report = TreeReport(req.body);

  let html = `<h2>דיווח התקבל מהמשתמש ${req.user?.username}</h2>
  <div>מיקום העץ: ${req.body.location}</div>
  <div>גובה העץ מ-1 עד 5: ${req.body.height}</div>
  <div>קוטר העץ מ-1 עד 5: ${req.body.diameter}</div>
  <div>עלים: ${req.body.leaves}</div>
  <div>פרחים: ${req.body.flowers}</div>
  <div>פירות: ${req.body.fruits}</div>
  <div>דירוג כללי של המצב מ-1 עד 5: ${req.body.generalStatus}</div>
  <div>תיאור כללי: ${req.body.description}</div>
  <h5>מאיתנו, צוות יער האקלים</h5>`
  if (req.body.pic) {
    html += `<img src="${req.body.pic}">`
  }
  const data = {
    // Specify email data
    from: 'יער האקלים <support@goodforest.org>',
    to: JSON.parse(process.env.REPORT_ADMIN_EMAILS || ''),
    subject: 'יער האקלים - התקבל דיווח על עץ',
    html
  };
  mailgunClient.messages.create('sandboxbe750122e7054403a43b77ec1a865407.mailgun.org', data).then(() => {
    console.log('email sent')
  });

  report.save((err, result) => {
    if (err) {
      res.status(400).send({ message: "Create report failed", err });
    } else {
      res.send({ message: "Report sent successfully" });
    }
  });
});
