module.exports = {
  readComment: (req, res) => {
    var { commentId } = req.body
    connection.query('SELECT comment_audio FROM `assistant-comments` WHERE id = ? LIMIT 1;', [ commentId ], (err, rows) => {
      var audio = rows[0].comment_audio
      res.json({ audio })
    });
  },
  loadWavFile: (req, res) => {
    var { id } = req.params

    connection.query('SELECT comment_audio FROM `assistant-comments` WHERE id = ? LIMIT 1;', [ id ], (err, rows) => {
      var audio = rows[0].comment_audio.toString('base64')
      res.send(`<audio controls><source src="data:audio/wav;base64,${audio}"></audio>`)
    });
  }
}
