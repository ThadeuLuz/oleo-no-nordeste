const parse = require('csv-parse')
const fs = require('fs-extra')
const { promisify } = require('util')
const fetch = require('node-fetch')
const _ = require('lodash')

require('dotenv').config()

const asyncParse = promisify(parse)
// const asyncOutputFile = promisify(fs.outputFile)

// Este CSV foi exportado a partir do XLS disponível no site oficial do Ibama:
// https://www.ibama.gov.br/notas/2047-manchas-de-oleo-no-litoral-do-nordeste
const input = fs.readFileSync(
  './tools/2019-10-19_LOCALIDADES_AFETADAS_PLANILHA.csv',
  'utf-8',
)

var options = {
  delimiter: ';',
  // columns: ,
}

/**
 * Converte a geolocalização do formato DMS (Graus, minutos e segundos)
 * Tipo  ["5° 35' 10.09\" S", "35° 13' 38.60\" W"]
 * para [-5.586136111111111, -35.22738888888889 ]
 * A api do google maps exige parâmetros em DD.
 * @see https://www.gps-coordinates.net/gps-coordinates-converter
 * @see https://developers.google.com/maps/documentation/maps-static/dev-guide
 */
const dmsToDd = str => {
  const [d, m, s] = str
    .replace("'", '')
    .replace('"', '')
    .replace('°', '')
    // Como todos os pontos são S e W, pode tirar e multiplicar por -1 no fim
    .replace('S', '')
    .replace('W', '')
    .split(' ')
    .filter(v => !!v)
    .map(s => parseFloat(s))

  return -(d + m / 60 + s / 3600)
}

/**
 * Baixa uma imagem de mapa para um determinado local
 *
 * A api do maps static é cara $ (2 dólares por 1000 reqs). Então é muito
 * melhor baixar os arquivos uma única vez e servir a partir do github.
 * @param {string} filepath Nome do arquivo para salvar
 * @param {number} lat Latitude
 * @param {number} long Longitude
 * @param {number} imageSize Tamanho da imagem (largura e alura)
 */
const downloadImage = async (filepath, lat, long, imageSize = 300) => {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=10&size=${imageSize}x${imageSize}&key=${process.env.MAPS_API_KEY}`

  const response = await fetch(url)
  const buffer = await response.buffer()
  await fs.outputFile(`./src/static/${filepath}`, buffer)
}
;``
/**
 * Converte um data point de uma lista de arrays em um objeto que será salvo no
 * .json
 */
const cleanDataPoint = ([
  nome,
  municipio,
  dataAvist,
  estado,
  lat,
  long,
  dataRevis,
  status,
]) => ({
  nome,
  municipio,
  estado,
  status,
  // Colunas que convertemos em data
  dataRevis: new Date(dataRevis),
  dataAvist: new Date(dataAvist),
  // Colunas com geoloc
  lat: dmsToDd(lat),
  long: dmsToDd(long),
  imageUrl: `maps/${_.kebabCase(_.deburr(nome))}.jpg`,
})

const run = async () => {
  // Resultado do csv
  const output = await asyncParse(input, options)

  // Remove o primeiro item (nome das colunas)
  output.shift()

  // Limpa os dados
  const cleanData = output.map(cleanDataPoint)

  // Criar um array de
  const promises = cleanData.map(({ imageUrl, lat, long }) =>
    downloadImage(imageUrl, lat, long),
  )

  // Baixa todas as imagens em paralelo
  await Promise.all(promises)

  // Escreve o json em disco
  fs.writeJsonSync('./src/data/localidades.json', cleanData, { spaces: 2 })
}

run()
