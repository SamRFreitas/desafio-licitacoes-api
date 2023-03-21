const puppeteer = require('puppeteer')
const Licitacao = require('./Model/Licitacao')
const date = require('./utils/date')

async function getLicitacoes (year) {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  })

  // Open a new page
  const page = await browser.newPage()


  // For unknown reasons, sometimes a dialog appears and disturb 
  // the process of scrapping, this page.on is to handle with this problem
  page.on('dialog', async dialog => {
    //accept alert
    await dialog.accept();
 })

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("http://18.230.147.90/pronimtb_pm/index.asp?acao=1&item=2&flagRedFiltroLicitacao=2", {
    waitUntil: "domcontentloaded",
  })

  await page.select('#cmbDataVigenciaLC', year)

  await Promise.all([
    page.waitForNavigation(),
    page.click('#confirma')
  ])

  const rows = await page.$$('#tbTabela .Class_Relatorio')

  const licitacoes = []

  if(await rows[0].$eval('td:nth-of-type(1)', element => element.innerText) === 'Não há informações.') {
    await browser.close()
    return licitacoes
  } else {

    for(let i=0; i < rows.length - 1; i++) {
    
      const licitacao = new Licitacao(
        // Unidade Gestora
        await rows[i].$eval('td:nth-of-type(1) a', element => element.innerText),
        // Número do Processo ADM
        await rows[i].$eval('td:nth-of-type(2) a', element => element.innerText),
        // Número do Processo
        await rows[i].$eval('td:nth-of-type(3) a', element => element.innerText),
        // Modalidade
        await rows[i].$eval('td:nth-of-type(4) a', element => element.innerText),
        // Número da Modalidade
        await rows[i].$eval('td:nth-of-type(5) a', element => element.innerText),
        // Tipo
        await rows[i].$eval('td:nth-of-type(6) a', element => element.innerText),
        // Situação do Processo
        await rows[i].$eval('td:nth-of-type(7) a', element => element.innerText),
        // Data Julgamento
        await rows[i].$eval('td:nth-of-type(8) a', element => element.innerText),
        // Data Homologação
        await rows[i].$eval('td:nth-of-type(9) a', element => element.innerText),
        // Objeto/Descrição
        await rows[i].$eval('td:nth-of-type(10) a', element => element.innerText),
        // Valor
        await rows[i].$eval('td:nth-of-type(11) a', element => element.innerText),
        // Link para Licitação
        extractAndFormatLink(await rows[i].$eval('td:nth-of-type(12) a', element => element.getAttribute('href'))),
      )
      
      licitacao.dataDeJulgamento = date.convertStringToValidJsonDate(licitacao.dataDeJulgamento)
      licitacao.dataDeHomologacao = date.convertStringToValidJsonDate(licitacao.dataDeHomologacao)
      licitacoes.push(JSON.stringify(licitacao))
    }

  }
 
  await browser.close()

  return licitacoes
}

function extractAndFormatLink(href) {
  const link = href.split('montaURLDetalhamentoItem(\'')[1].split(`');`)[0]
  const formatedLink = 'http://18.230.147.90' + link
  return formatedLink
}

async function getYears () {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  })

  // Open a new page
  const page = await browser.newPage()

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("http://18.230.147.90/pronimtb_pm/index.asp?acao=1&item=2&flagRedFiltroLicitacao=2", {
    waitUntil: "domcontentloaded",
  })
  
  const options = await page.$$('#cmbDataVigenciaLC option')
  const years = []

  for(let i=1; i < options.length; i++) {
    const year = await (await options[i].getProperty('innerText')).jsonValue()
    years.push(year)
  }

  await browser.close()
  
  return years
}

module.exports = { getLicitacoes, getYears }