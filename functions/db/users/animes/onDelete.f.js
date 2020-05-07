const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { null } // You do that because the admin SDK can only be initialized once.

async function decrementOrRemoveAnimeDoc(data) {
  const animeRef = admin.firestore().collection('animes').doc(data.malId.toString());
  const doc = await animeRef.get();
  if (doc.data().count === 1) {
    return animeRef.delete();
  } else {
    let decrement = admin.firestore.FieldValue.increment(-1);
    return animeRef.update({
      count: decrement
    });
  }
}

exports = module.exports = functions.https.onCall(async (data, context) => {
  // get user doc ref
  const user = admin.firestore().collection('users').doc(context.auth.uid);

  return user.update({
    animes: admin.firestore.FieldValue.arrayRemove(data.anime.malId)
  })
  .then(() => {
    // update the anime saved count in the anime collection    
    return decrementOrRemoveAnimeDoc(data.anime);
  });
});