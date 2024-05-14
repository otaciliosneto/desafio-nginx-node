const express = require('express')
const random_name = require('node-random-name')

const app = express()

const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config)

const create_table = 'CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(200) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;'
connection.query(create_table)

const sql = `INSERT INTO people(name) values ('${random_name()}')`
connection.query(sql)

const select = 'SELECT name FROM people'
let list = ''
connection.query(select, (_err, result, _) => {
  let i
  for (i = 0; i < result.length; i++) {
    list += '<li>' + result[i].name + '</li>'
  }
})
connection.end()

app.get('/', (_req, res) => {
    let html = '<h1>Full Cycle Rocks!</h1></br>'
    html += '<ol>'
    html += list
    html += '</ol>'
    res.send(html)
  })

app.listen(port, ()=> {
    console.log('...rodando na porta ' + port)
})
