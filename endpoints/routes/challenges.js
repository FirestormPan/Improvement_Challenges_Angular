var express = require('express');
var router = express.Router();

let challengesAll = {
    green: [
        {difficulty: "green", type: 'activateable', question:'Πεσε 10 καμψεις'},
    ],
    yellow:[

    ],
    red:[
      
    ]
}

router.get('/', function(req, res, next) {
    res.send('respond with a resource!!!!!!!!!!!!!!!');
  });

router.get('/green', function(req, res, next) {
  res.send(challengesAll.green);
});


module.exports = router;
