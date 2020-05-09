const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { null } // You do that because the admin SDK can only be initialized once.


function updateAnimesCollection(data) {
  const animeRef = admin.firestore().collection('animes').doc(data.mal_id.toString());
  return animeRef.get()
    .then((docSnapShot) => {
      if (docSnapShot.exists) {
        let increment = admin.firestore.FieldValue.increment(1);
        return animeRef.update({
          count: increment
        });
      } else {
        return animeRef.set({
          title: data.title,
          image_url: data.image_url,
          recommendations: data.recommendations,
          count: 1
        });
      }
    });
}

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

  // check if duplicate anime, otherwise add
  if (doc.data().animes.includes(data.anime.mal_id)) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'You have already saved this anime'
    )
  } else {
    // update user anime list with new anime id
    return user.update({
      animes: admin.firestore.FieldValue.arrayUnion(data.anime.mal_id)
    })
    .then(() => {
      // update the anime saved count in the anime collection
      return updateAnimesCollection(data.anime);
    })
  }
});