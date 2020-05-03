const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { null } // You do that because the admin SDK can only be initialized once.

exports = module.exports = functions.https.onCall(async (data, context) => {
  // check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to save anime.'
    );
  }

  // get user doc ref
  const user = admin.firestore().collection('users').doc(context.auth.uid);

  return user.update({
    animes: firebase.firestore.FieldValue.arrayRemove(data)
  })
  .then(() => {
    // update the user recommended array
    return user.update({
      animeRecs: firebase.firestore.FieldValue.arrayRemove(data.recommendations)
    });
  });
});