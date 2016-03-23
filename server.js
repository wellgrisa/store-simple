const path = require('path');
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
