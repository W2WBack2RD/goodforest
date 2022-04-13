const express = require("express");
const passport = require("passport");
const { User, TreeReport } = require("../database/schemas");

const router = express.Router();

module.exports = router;

router.post("/tree", (req, res) => {
  console.log("H5");
  // TODO upload an image
  // TODO interact with notion API / Email
  // req.body.user = req.user.id;
  const report = TreeReport(req.body);
  report.save((err, result) => {
    if (err) {
      res.status(400).send({ message: "Create report failed", err });
    } else {
      res.send({ message: "Report sent successfully" });
    }
  });
});

});
