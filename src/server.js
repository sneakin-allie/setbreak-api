const knex = require('knex')
const app = require('./app')
const { PORT, DB_URL } = require('./config')

console.log(DB_URL);
const db = knex({
  client: 'pg',
  connection: "postgresql://allison_schulman@localhost/concerts"
})

app.set("db", db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})