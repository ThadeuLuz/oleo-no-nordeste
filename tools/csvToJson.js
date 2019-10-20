const parse = require('csv-parse')
const fs = require('fs-extra')

const input = fs.readFileSync(
  './tools/2019-10-19_LOCALIDADES_AFETADAS_PLANILHA.csv',
  'utf-8',
)

var options = {
  delimiter: ';',
  columns: true,
}

parse(input, options, function(err, output) {
  if (err) {
    return console.error(err)
  }

  fs.writeJsonSync('./src/data/praias.json', output, { spaces: 2 })
})
