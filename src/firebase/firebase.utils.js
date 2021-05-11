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
    // console.log(ref, " here")
    // const snapShot = await ref.get(); //gets me the obj 'simply represents the data'
    //console.log(ref);
    const createdAt = new Date();
    ref.set({ txt, createdAt, hidden: false }) //save to DB
        .then((res) => { console.log(res, 'saved to DB') })
        .catch((err) => console.log(err, "err while saving the data"));

    // console.log(snapShot)
    const snapShot = ref.get().then((res) => res).catch((err) => err)
    return snapShot;
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

export const editText = async (userId, textId, newText) => {
    if (!userId || !textId || !newText) return;
    let ref = firestore.collection('users').doc(userId).collection('texts').doc(textId);
    // console.log(snapShot.data().hidden)
    let updatedAt = new Date();
    ref.set({
        updatedAt,
        txt: newText,
        hidden: true,
    }).then((res) => console.log("succefuly updated"))
        .catch((err) => console.log("err editing"))
}

export const hideText = async (userId, textId, newText) => {
    if (!userId || !textId || !newText) return;
    let ref = firestore.collection('users').doc(userId).collection('texts').doc(textId);
    let snapShot = await ref.get();
    let oldHidden = snapShot.data().hidden;
    let updatedAt = new Date();
    ref.set({
        updatedAt,
        txt: newText,
        hidden: !oldHidden,
    }).then((res) => console.log("succefuly updated"))
        .catch((err) => console.log("err editing"))
}

//NOTE SPACE
export const saveNote = async (task, id) => {
    if (!id) return;
    // const userRef = firestore.doc('users/random12') //returns a ref to the doc not the obj itself which technically doesnt exsit
    const ref = firestore.collection('users').doc(id).collection('notes').doc();//is this user exist in the DB? 
    // console.log(ref, " here")
    // const snapShot = await ref.get(); //gets me the obj 'simply represents the data'
    //console.log(ref);
    const createdAt = new Date();
    ref.set({ task, createdAt, done: false }) //save to DB
        .then((res) => { console.log(res, 'saved to DB') })
        .catch((err) => console.log(err, "err while saving the data"));

    // console.log(snapShot)
    const snapShot = await ref.get();
    return snapShot;
}

export const getNotes = async (id) => {
    if (!id) return;
    // const userRef = firestore.doc('users/random12') //returns a ref to the doc not the obj itself which technically doesnt exsit
    const ref = firestore.collection('users').doc(id).collection('notes');//is this user exist in the DB? 
    const snapShot = await ref.get(); //gets me the obj 'simply represents the data'
    if (snapShot.size > 0) return snapShot.docs;
}

export const updateNote = async (userId, noteId, note) => {
    if (!userId || !note || !noteId) return;
    let ref = firestore.collection('users').doc(userId).collection('notes').doc(noteId);
    let snapShot = await ref.get();
    // console.log(snapShot.data().hidden)
    let updatedAt = new Date();
    let oldDone = snapShot.data().done;


    ref.set({
        updatedAt,
        task: note,
        done: !oldDone
    }).then((res) => console.log("succefuly updated"))
        .catch((err) => console.log("err editing"))
}

export const deleteNote = async (userId, textId) => {
    if (!userId || !textId) return;
    let ref = firestore.collection('users').doc(userId).collection('notes').doc(textId);
    ref.delete().then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}
//GENERAL >>> SHARING 
export const shareBlog = async (userId, blog, textId) => {
    let exsist = true; //to make sure it's not laready shared
    return getGeneral().then((res) => {
        res.forEach((blog) => {
            if (blog.data().blogId === textId) {
                exsist = false;
            };
        })
        if (exsist) {
            let ref = firestore.collection('general').doc();
            let sharedAt = new Date();
            ref.set({ blog, userId, sharedAt, blogId: textId }).then((res) => {
                console.log(res, "sucessfully shared")
            }).catch((err) => {
                console.log(err, "err sharing the blog")
            })
            return true;
        }
        return false;
    }).catch((err) => { console.log("doesn't exsit") })
}

export const getGeneral = async () => {
    const ref = firestore.collection('general');//is this user exist in the DB? 
    const snapShot = await ref.get(); //gets me the obj 'simply represents the data'
    if (snapShot.size > 0) return snapShot.docs;
}

export const deleteBlogFromGeneral = async (blogId) => {
    const ref = firestore.collection("general").doc(blogId);
    //const snapShot = await ref.get();
    ref.delete().then((res) => {
        console.log("blog deleted form general posts");
    }).catch((err) => {
        console.log(err, " err deleteing post in general")
    })
}

//bookmark posts 
export const bookmarkBlog = async (userId, additionalData) => {
    if (!userId) return;
    let exsit = false;
    // const userRef = firestore.doc('users/random12') //returns a ref to the doc not the obj itself which technically doesnt exsit
    const ref = firestore.collection('users').doc(userId).collection('bookmarks').doc();//is this user exist in the DB? 
    //not to bookmark the same one twice checkign if it exsits
    return getBookmarks(userId).then((res) => {
        if (res.docs.length === 0) { //in case there is not alreayd stored// nothing to compare! 
            const createdAt = new Date();
            ref.set({ ...additionalData, createdAt }) //save to DB
                .then((res) => { console.log(res, 'saved to DB') })
                .catch((err) => console.log(err, "err while saving the data"));
            return true;
        }
        res.forEach((bookmark) => {
            if (bookmark.data().blogId === additionalData.blogId) {
                exsit = true;
            }
        })
        if (!exsit) {
            const createdAt = new Date();
            ref.set({ ...additionalData, createdAt }) //save to DB
                .then((res) => { console.log(res, 'saved to DB') })
                .catch((err) => console.log(err, "err while saving the data"));

            return true;
        }
        return false;
    }).catch((err) => {
        console.log(err)
    })
}

export const getBookmarks = async (userId) => {
    if (!userId) return;
    const ref = firestore.collection("users").doc(userId).collection("bookmarks");
    let snapShot = ref.get().then((res) => res).catch((err) => console.log(err, "err getting bookmarks"))
    return snapShot;
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