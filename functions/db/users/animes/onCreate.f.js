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
  const doc = await user.get();

  // check if duplicate anime and remove, otherwise add
  if (doc.data().animes.includes(data)) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'You have already saved this anime'
    )
  } else {
    // update user anime list with new anime
    return user.update({
      animes: firebase.firestore.FieldValue.arrayUnion(data)
    })
    .then(() => {
      // update the user recommended array
      return user.update({
        animeRecs: firebase.firestore.FieldValue.arrayUnion(data.recommendations)
      });
    });
  }
});