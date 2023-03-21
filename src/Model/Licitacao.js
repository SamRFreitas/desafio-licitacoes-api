class Licitacao {
  constructor(unidadeGestora, numeroDoProcessoAdm, numeroDoProcesso, modalidade, numeroDaModalidade, tipo, situacaoDoProcesso, dataDeJulgamento, dataDeHomologacao, objeto, valor, link) {
    this.unidadeGestora = unidadeGestora
    this.numeroDoProcessoAdm = numeroDoProcessoAdm
    this.numeroDoProcesso = numeroDoProcesso
    this.modalidade = modalidade
    this.numeroDaModalidade = numeroDaModalidade
    this.tipo = tipo
    this.situacaoDoProcesso = situacaoDoProcesso
    this.dataDeJulgamento = dataDeJulgamento
    this.dataDeHomologacao = dataDeHomologacao
    this.objeto = objeto
    this.valor = valor
    this.link = link
  }
}

module.exports = Licitacao
