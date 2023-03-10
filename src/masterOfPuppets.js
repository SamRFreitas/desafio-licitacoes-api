const puppeteer = require('puppeteer')
const fs = require('fs')

const getLicitacoes = async () => {
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

  const teste = await page.select('select[id="cmbDataVigenciaLC"]', '2023')

  console.log(teste)

  await Promise.all([
    page.waitForNavigation(),
    page.click('#confirma')
  ])

  const rows = await page.$$('#tbTabela .Class_Relatorio')

  const licitacoes = []

  for(let i=0 i < rows.length - 1 i++) {

    const licitacao = {
       unidadeGestora: await rows[i].$eval('td:nth-of-type(1) a', element => element.innerText),
       numeroDoProcessoAdm: await rows[i].$eval('td:nth-of-type(2) a', element => element.innerText),
       numeroDoProcesso: await rows[i].$eval('td:nth-of-type(3) a', element => element.innerText),
       numeroDamodalidade: await rows[i].$eval('td:nth-of-type(4) a', element => element.innerText),
       modalidade: await rows[i].$eval('td:nth-of-type(5) a', element => element.innerText),
       tipo: await rows[i].$eval('td:nth-of-type(6) a', element => element.innerText),
       situacaoDoProcesso: await rows[i].$eval('td:nth-of-type(7) a', element => element.innerText),
       dataDeJulgamento: await rows[i].$eval('td:nth-of-type(8) a', element => element.innerText),
       dataDeHomologacao: await rows[i].$eval('td:nth-of-type(9) a', element => element.innerText),
       objeto: await rows[i].$eval('td:nth-of-type(10) a', element => element.innerText),
       valor: await rows[i].$eval('td:nth-of-type(11) a', element => element.innerText),
       possuiAnexo: await rows[i].$eval('td:nth-of-type(12) a', element => element.innerText)
    }

    licitacoes.push(licitacao)
    
  }

  const json = JSON.stringify(
    {
      metadata: {
        quantidadeDeLicitacoes: licitacoes.length
      }, 
      licitacoes: licitacoes
    },
    null,
    '\t'
    )

  fs.writeFile('./licitacoes.json', json, (err) => {
    if (err)
      console.log(err)
    else {
      console.log("File written successfully\n")
    }
  })

  await browser.close()

}

getLicitacoes()