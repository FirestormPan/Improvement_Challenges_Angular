var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/player', function(req, res, next) {
//   res.send({text:'singing alalalalalooooo'});
// });

var users = [
  { id:1, name: "pantelos", pfp:"Default", contracts: ["id2", "id493"] },
  { id:2, name: "maria", pfp:"Default", contracts: ["id3", "id493"] },
  { id:3,  name: "slavanderos", pfp:"Default", contracts: ["id4", "id493"] },
  { id:4, name: "anika", pfp:"Default", contracts: ["id69", "id493"] },
  {id:7, name:"Pantelis", pfp:'https://picsum.photos/200'},
  {id:103, name:"Aurorra", pfp:'https://www.w3schools.com/images/w3schools_green.jpg', contracts: ["id4", "id493"]},
  {id:513, name:"Kosmas", pfp:'https://www.w3schools.com/images/w3schools_green.jpg', contracts: ["id4", "id493"]},
  {id:105, name:"Ioanna", pfp:'https://www.w3schools.com/images/w3schools_green.jpg', contracts: ["id4", "id493"]},
  {id:123, name:"Maria", pfp:'https://www.w3schools.com/images/w3schools_green.jpg', contracts: ["id4", "id493"]},
  {id:100, name:"Kwstas", pfp:'https://www.w3schools.com/images/w3schools_green.jpg', contracts: ["id4", "id493"]},
  {id:999, name:"Dimitris", pfp:'https://www.w3schools.com/images/w3schools_green.jpg', contracts: ["id4", "id493"]},
  {id:309, name:"Sindler", pfp:'https://www.w3schools.com/images/w3schools_green.jpg', contracts: ["id4", "id493"]},
  {id:807, name:"Zerg", pfp:'https://www.w3schools.com/images/w3schools_green.jpg', contracts: ["id4", "id493"]},
  {id:582, name:"Spaghetti", pfp:'https://www.w3schools.com/images/w3schools_green.jpg', contracts: ["id4", "id493"]},
  {id:580, name:"Spari", pfp:'https://www.w3schools.com/images/w3schools_green.jpg', contracts: ["id4", "id493"]},
  {id:581, name:"Sparilillililili", pfp:'https://www.w3schools.com/images/w3schools_green.jpg', contracts: ["id4", "id493"]},
]
  

// router.get('/:user', function(req, res, next) {
//   let userId = req.params.user
//   res.send({name:'singing alalalalalooooo', contracts:["id2"]});
// });

router.get('/:usernameIncludes', function(req, res, next) {
  let requestedName = req.params.usernameIncludes;
  let responseUsers = users.filter(
    (user)=>user.name.includes(requestedName) 
  )
  console.log(responseUsers)
  res.send(responseUsers)
});

module.exports = router;
