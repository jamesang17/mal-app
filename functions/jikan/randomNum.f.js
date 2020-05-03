const functions = require('firebase-functions');

exports = module.exports = functions.https.onRequest((request, response) => {
  const number = Math.round(Math.random() * 100);
  response.send(number.toString());
});