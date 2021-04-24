import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBFzzNfmY1zjHOllfBbX_PZRnhIr3VO1aw",
    authDomain: "my-first-project-4f905.firebaseapp.com",
    projectId: "my-first-project-4f905",
    storageBucket: "my-first-project-4f905.appspot.com",
    messagingSenderId: "282079807871",
    appId: "1:282079807871:web:2f2d815e0acbb8d66cf24a",
    measurementId: "G-QJWJPNM0V8"
};

export const createUserProfileDoc = async (userAuth, additionalData) => {
    if (!userAuth) return;
    // const userRef = firestore.doc('users/random12') //returns a ref to the doc not the obj itself which technically doesnt exsit
    const userRef = firestore.doc(`users/${userAuth.uid}`);//is this user exist in the DB? 
    const snapShot = await userRef.get(); //gets me the obj 'simply represents the data'
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        userRef.set({ displayName, email, createdAt, ...additionalData }) //save to DB
            .then((res) => { console.log(res, 'saved to DB') })
            .catch((err) => console.log(err, "err while saving the data"));
    }
    // console.log(snapShot)
    return userRef;
}

//saving the texts for each single user
export const saveText = async (txt, id) => {
    if (!id) return;
    // const userRef = firestore.doc('users/random12') //returns a ref to the doc not the obj itself which technically doesnt exsit
    const ref = firestore.collection('users').doc(id).collection('texts').doc();//is this user exist in the DB? 
    console.log(ref, " here")
    //const snapShot = await ref.get(); //gets me the obj 'simply represents the data'
    console.log(ref);
    const createdAt = new Date();
    ref.set({ txt, createdAt }) //save to DB
        .then((res) => { console.log(res, 'saved to DB') })
        .catch((err) => console.log(err, "err while saving the data"));

    // console.log(snapShot)
    return ref;
}

export const getTexts = async (id) => {
    if (!id) return;
    // const userRef = firestore.doc('users/random12') //returns a ref to the doc not the obj itself which technically doesnt exsit
    const ref = firestore.collection('users').doc(id).collection('texts');//is this user exist in the DB? 
    const snapShot = await ref.get(); //gets me the obj 'simply represents the data'
    //each one has the property of snapShot.data
    // if (snapShot.size > 0)
    //     snapShot.docs.forEach(doc => {
    //         const data = doc.data();
    //         console.log(data)
    //     })

    // console.log(snapShot)
    if (snapShot.size > 0) return snapShot.docs;
}

export const deleteText = async (userId, textId) => {
    if (!userId || !textId) return;
    let ref = firestore.collection('users').doc(userId).collection('texts').doc(textId);
    ref.delete().then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//google auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'prompt': 'select_account' });
export const signInWithGoogle = function () {
    // [START auth_google_signin_popup]
    return auth
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            console.log(result)

        }).catch((error) => {
            // Handle Errors here.
            console.log(error)
        });
    // [END auth_google_signin_popup]
}

export default firebase;