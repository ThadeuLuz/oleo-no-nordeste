const parse = require('csv-parse')
const fs = require('fs-extra')
const { promisify } = require('util')
// const { mapsApiKey } = require('../config')

const asyncParse = promisify(parse)

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
})

const run = async () => {
  // Resultado do csv
  const output = await asyncParse(input, options)

  // Remove o primeiro item (nome das colunas)
  output.shift()

  // Limpa os dados
  const cleanData = output.map(cleanDataPoint)

  // Escreve o json em disco
  fs.writeJsonSync('./src/data/localidades.json', cleanData, { spaces: 2 })

  console.log(cleanData[0])
}

run()
