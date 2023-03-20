const express = require('express')
const router = express.Router()
const { getLicitacoes, getYears } = require('../Scrapper') 

router.post('/', async function (req, res, next) {
  await getLicitacoes(req.body.data.year).then(licitacoes => {
    res.status(200).json(licitacoes)
  })
})


router.get('/years', async function(req, res, next) {
  await getYears().then(years => {
    res.status(200).json(years)
  })
})

module.exports = router
