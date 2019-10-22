const parse = require('csv-parse')
const fs = require('fs-extra')

// Esta tabela foi exportada a partir do XLS disponível no site oficial do Ibama:
// https://www.ibama.gov.br/notas/2047-manchas-de-oleo-no-litoral-do-nordeste
const input = fs.readFileSync(
  './tools/2019-10-19_LOCALIDADES_AFETADAS_PLANILHA.csv',
  'utf-8',
)

var options = {
  delimiter: ';',
  // columns: ,
}

// O nome das colunas é bizonho, vamos renomear.
const columns = [
  'nome',
  'municipio',
  'dataAvist',
  'estado',
  'lat',
  'long',
  'dataRevis',
  'status',
]

parse(input, options, function(err, output) {
  if (err) {
    return console.error(err)
  }

  const finalData = output
    .map(values => {
      const location = {}
      columns.forEach((key, index) => {
        location[key] =
          key === 'dataAvist' || key === 'dataRevis'
            ? new Date(values[index])
            : values[index]
      })
      return location
    })
    .filter(l => l && l.nome !== 'Name')

  fs.writeJsonSync('./src/data/localidades.json', finalData, { spaces: 2 })
})
