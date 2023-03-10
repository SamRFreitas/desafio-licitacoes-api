var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  const json = {
    'teste': 'Teste',
    'dale': 'Chama Nenem',
  }
  res.status(200).json(json)
})

module.exports = router
