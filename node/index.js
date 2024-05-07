const express = require('express')
const random_name = require('node-random-name')
const mysql = require('mysql2/promise');

const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

async function connectToDatabase() {
  let connection;

  while (!connection) {
      try {
          connection = await mysql.createConnection(config);
      } catch (err) {
          console.log('Banco de dados indisponível, tentanto novamente em 5 segundos...');
          await new Promise(resolve => setTimeout(resolve, 5000));
      }
  }

  return connection;
}

connectToDatabase().then(async connection => {
  const create_table = 'CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(200) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;'
  try {
      await connection.query(create_table);
      const sql = `INSERT INTO people(name) values ('${random_name()}')`
      await connection.query(sql);
      const select = 'SELECT name FROM people'
      const [rows, fields] = await connection.query(select);

      let list = '';
      for (let i = 0; i < rows.length; i++) {
          list += '<p> - ' + rows[i].name + '</p>'
      }

      app.get('/', (_req, res) => {
          let html = '<h1>Full Cycle Rocks!</h1></br>'
          html += '<ul>'
          html += list
          html += '</ul>'
          res.send(html)
      })

      app.listen(port, () => {
          console.log('Node rodando na porta ' + port)
      })
  } catch (err) {
      console.error(err);
  }
});
