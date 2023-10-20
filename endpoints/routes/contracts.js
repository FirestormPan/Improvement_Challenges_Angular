var express = require('express');
var router = express.Router();

var contracts = [
    {id:"id2" , participants:["name1", "pantelos", "name2"], challenge:"some challenge text", anyotherInfo:"" },
    {id:"id3" , participants:["name1", "pantelos", "name2"], challenge:"some challenge text", anyotherInfo:"" },
    {id:"id6" , participants:["name1", "pantelos", "name2"], challenge:"some challenge text", anyotherInfo:"" },
    {id:"id493" , participants:["name1", "pantelos", "name2"], challenge:"some challenge text", anyotherInfo:"" }

]

router.get('/', function(req, res, next) {
res.send('respond with a resource');
});

router.get('/:contract', function(req, res, next) {
    let contractId = req.params.contract
    res.send(
        contracts.filter(contract=>contract.id==contractId)[0]
    );
  });


module.exports = router;