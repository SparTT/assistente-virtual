const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: apiKey,
  }),
  serviceUrl: apiUrl,
});

const defaultVoice = 'pt-BR_IsabelaV3Voice'


module.exports = {
  sendComment: async (req, res) => {
    var { comment, username } = req.body

    if(comment.length === 0) res.json({ status: 'error', errorMsg: 'Insira um comentário' })
    username = username.length === 0 ? 'Anônimo' : username
    var audioBuffer = await convertText(comment)

    connection.query('INSERT INTO `assistant-comments` (comment, comment_audio, username) VALUES (?, ?, ?);', [ comment, audioBuffer, username ], (err, rows) => {
      if(err) throw err;
      res.json({ status: 'ok', commentId: rows.insertId})
    });
  },
  getComments: (req, res) => {
    connection.query('SELECT id, comment, username, created_at FROM `assistant-comments` ORDER BY id DESC;', (err, rows) => {
      res.json({ rows })
    });
  }
}



async function convertText(comment) {
  
  var synthesizeParams = {
    text: comment,
    accept: 'audio/wav',
    voice: defaultVoice,
  };
  
  return new Promise( async (resolve, reject) => {
    textToSpeech.synthesize(synthesizeParams)
    .then(response => {
      // A linha abaixo é necessária somente para formatos ".wav". Em outros casos, "response.result" poderia ser direcionado direto para a proxima etapa
      return textToSpeech.repairWavHeaderStream(response.result);
    })
    .then(buffer => {
      resolve(buffer)
    })
    .catch(err => {
      console.log('error:', err);
    });
  })
}