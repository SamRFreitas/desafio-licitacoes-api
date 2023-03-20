class Licitacao {
  constructor(unidadeGestora, numeroDoProcessoAdm, numeroDoProcesso, modalidade, numeroDaModalidade, tipo, situacaoDoProcesso, dataDeJulgamento, dataDeHomologacao, objeto, valor, anexos) {
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
    this.anexos = anexos
  }
}

module.exports = Licitacao
