const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) {null} // You do that because the admin SDK can only be initialized once.

exports = module.exports = functions.auth.user().onCreate(user => {
  admin.firestore().collection('users').doc(user.uid).set({
    animes: [],
    animeRecs: []
  });
});