
Olá!

Essa aplicação tem como objetivo cadastrar comentários, listar eles, e permitir que seja executado um áudio que irá ler o comentário inserido.

Os comentários inseridos serão armazenados em um banco de dados mySQL e listados no painel de de comentários inseridos.
Clicar em ouvir enviará uma requisição ao banco de dados, onde estará armazenado um buffer do arquivo de áudio gerado pela API Text to Speech.

A razão pela qual escolhi armazenar o buffer ao invés de enviar uma requisição direto para a API foi para minimizar o gasto de caracteres da versão Lite da API, que tem um limite de 10,000 caracteres.

Requisitos:
- Um servidor [MySQL 8](https://dev.mysql.com/downloads/) 
- Nodejs instalado [Node.js](https://nodejs.org/)
- Conta na [IBM](https://www.ibm.com/cloud/watson-text-to-speech) para usar a API Text To Speech;


## Dependências

As seguintes dependências serão usadas na aplicação:
- express: será usado para criar roteamento e processamento de requisitos do cliente.
- ejs: engine usada para criação de templates
- mysql2: cliente MySQL para Node.js
- ibm-watson: será usado para converter os textos para áudio

Por que o mysql2?
O mysql tem problemas de autenticação com o MySQL 8 [explicação](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)


Instale as dependências:

```sh
cd assistente-virtual
npm i
```

## Database MySQL

O comando abaixo irá criar uma tabela com o nome de assistant-comments no seu banco de dados.

```sh
CREATE TABLE IF NOT EXISTS `assistant-comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
 `comment` TEXT(999) NOT NULL,
 `comment_audio` LONGBLOB NOT NULL,
 `username` varchar(255),
 `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;
```


## Parâmetros

No arquivo app.js, troque os valores de apiKey e apiUrl pelas suas credenciais da API.

```sh
const apiKey = 'your-api-key'
const apiUrl = 'your-text-to-speech-url'

```


Troque os valores de connection pelos valores de conexão do seu banco de dados.

```sh
const connection  = mysql.createConnection ({
  host: 'your-url',
  user: 'your-user',
  password: 'your-password',
  database: 'your-db'
})

```

## Execução

Para executar a aplicação, basta realizar o seguinte comando:

```sh
node app
```