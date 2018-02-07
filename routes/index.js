var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('personal', { title: `Personal's kanban board` });
});

router.get('/project', function (req, res, next) {
  res.render('project', { title: `Project's kanban board` });
});

router.get('/project1', function (req, res, next) {
  res.render('project1', { title: `Project1's kanban board` });
});

module.exports = router;
