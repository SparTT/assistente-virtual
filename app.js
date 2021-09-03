const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2')
const PORT = 5000

const apiKey = ''
const apiUrl = ''

global.apiKey = apiKey;
global.apiUrl = apiUrl;

const { sendComment, getComments } = require('./routers/comments');
const { readComment, loadWavFile } = require('./routers/read-comment');

const connection  = mysql.createConnection ({
  host: '',
  user: '',
  password: '',
  database: ''
})
global.connection = connection;

connection.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});




/*

  Caso essa aplicação seja alterada para ser executada em MySQL 5, a dependência mysql2 poderá ser trocada pelo mysql

  * OBJETIVOS
  * Interface no mesmo nível do mockup 
  * Fazer readme.md com instruções de como executar localmente
  * Requisição assincrona p/ requisição de comentários -- ok
  * Requisição assincrona p/ envio de comentário novo -- ok
  * Criar as funções dentro da pasta routers
  * Integração com o Watson feita -- ok
  
  
  * https://cloud.ibm.com/apidocs/text-to-speech?code=node#synthesize -- watson que gera arquivo .wav
  * https://github.com/sidorares/node-mysql2/blob/master/documentation/Examples.md -- mysql2

  * EXTRAS
  * Add campos de username e timestamp no mysql -- ok
  * Melhorar interface 
  * Fazer filterSwearing p/ filtrar certas palavras

*/




express()
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .use(express.static(path.join(__dirname, 'public')))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    res.render('pages/index')
  })
  .post('/send-comment', sendComment)
  .get('/get-comments', getComments)
  .post('/read-comment', readComment)
  .get('/read-comment/:id', loadWavFile)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



function filterSwearing() {
  
}
