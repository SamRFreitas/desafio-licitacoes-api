var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res) => res.status(200).send('Server ta rodando'))

module.exports = router
