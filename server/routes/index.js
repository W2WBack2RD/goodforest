const express = require("express");
const path = require("path");
const auth = require("./auth");
const user = require("./user");
const users = require("./users");
const todos = require("./todos");
const example = require("./example");
const report = require("./report");
const forest = require("./forest");
const reportProblem = require("./reportProblem");

const router = express.Router();

router.use("/api/auth", auth);
router.use("/api/user", user);
router.use("/api/forest", forest);
router.use("/api/users", users);
router.use("/api/example", example);
router.use("/api/todos", todos);
router.use("/api/report", report);
router.use("/api/reportProblem", reportProblem);

router.get("/api/tags", (req, res) => {
  res.send([
    "MERN",
    "Node",
    "Express",
    "Webpack",
    "React",
    "Redux",
    "Mongoose",
    "Bulma",
    "Fontawesome",
    "Ramda",
    "ESLint",
    "Jest",
  ]);
});

router.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../dist", "index.html"));
});

module.exports = router;
