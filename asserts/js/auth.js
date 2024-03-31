import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    get,
    onValue,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/9.6.8//firebase-database.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import {
    firebaseConfig
} from "./firebase-config.js";
import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");
let AuthName = "";
let AuthEmail = "";
let AuthUID = "";
let AuthProfileLink = "";

export const createData = async (path, data) => {
    try {
        await set(ref(database, path), data);
        return true;
    } catch (error) {
        console.error("Error creating Room", error);
        return false;
    }
};

export const updateData = async (path, newData) => {
    try {
        await update(ref(database, path), newData);
        return true;
    } catch (error) {
        console.error("Error Updating", error);
        return false;
    }
};

export const getData = (path) => {
    return new Promise((resolve, reject) => {
        try {
            onValue(ref(database, path), (snapshot) => {
                resolve(snapshot.val());
            });
        } catch (error) {
            reject(error);
        }
    });
};

export const deleteData = async (path) => {
    try {
        await remove(ref(database, path));
        return true;
    } catch (error) {
        console.error("Error Deleting", error);
        return false;
    }
};

export const getDataOnce = async (path) => {
    try {
        const snapshot = await get(ref(database, path));
        return snapshot.val();
    } catch (error) {
        console.error("Error getting data Once", error);
        return false;
    }
};



//   const handleDataOnce = async () => {
//     try {
//       const data = await getDataOnce("Counters/Members");
//       console.log(data);
//     } catch (error) {
//       console.error("Error getting data Once", error);
//     }
//   };

//   handleDataOnce();


// deleteData("Counters/Members");

//   updateData("Counters/Members",{count:0})

//   getData("Counters/Members").then((data) => {
//     console.log(data);
//   });

// Only For initialize first time Or restart firebase
// createData("Counters/Members",{count:0});
// createData("Counters/CampusAmbassador",{count:0});
// createData("Counters/TeamMemberHeads",{count:0});
// createData("Counters/TeamMemberLeads",{count:0});
// createData("Counters/CoreTeam",{count:0});


export async function uploadImageToFirebase(blob, fileName) {
    try {
        const Ref = storageRef(storage, 'images/' + fileName);
        await uploadBytes(Ref, blob);
        const imageUrl = await getDownloadURL(Ref);
        return imageUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

export async function uploadIDProofToFirebase(IDProofFile, fileName) {
    return new Promise(async (resolve, reject) => {
        try {
            const Ref = storageRef(storage, 'IDProof/' + fileName);
            await uploadBytes(Ref, IDProofFile);
            const pdfUrl = await getDownloadURL(Ref);
            resolve(pdfUrl);
        } catch (error) {
            console.error('Error uploading Resume:', error);
            reject(error);
        }
    });
}

export function uploadResumeToFirebase(pdfFile, fileName) {
    return new Promise(async (resolve, reject) => {
        try {
            const Ref = storageRef(storage, 'resumes/' + fileName);
            await uploadBytes(Ref, pdfFile);
            const pdfUrl = await getDownloadURL(Ref);
            resolve(pdfUrl);
        } catch (error) {
            console.error('Error uploading Resume:', error);
            reject(error);
        }
    });
}

const userSignIn = async () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            // const user = result.user
            // const authResult = await getData("Users/" + user.uid);
            // if (authResult) {
            //     window.location.href = "/profile"
            // } else {
            //     window.location.href = "/finish-profile-setup";
            // }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message
        })
}

const userSignOut = async () => {
    signOut(auth).then(() => {
        AuthProfileLink = AuthUID = AuthEmail = AuthName = "";
        alert("You have signed out successfully!");
        window.location.href = "/"
    }).catch((error) => {})
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        AuthName = user.displayName;
        AuthEmail = user.email;
        AuthUID = user.uid;
        AuthProfileLink = user.photoURL;
        const head = await getData("head/" + user.email.substring(0, user.email.indexOf("@")).replace(/[.#$\[\]]/g, ""));
        if (window.location.pathname === "/admin-control-panel/member/" || window.location.pathname === "/admin-control-panel/" || window.location.pathname === "/admin-control-panel/campus-ambassador/" || window.location.pathname === "/admin-control-panel/add-admin/") {
            if (!head) {
                window.location.href = "/";
            }
        } else if (window.location.pathname === "/") {
            if (head) {
                window.location.href = "/admin-control-panel";
                return;
            }
            const authResult = await getData("Users/" + user.uid);
            if (authResult) {
                window.location.href = "/profile"
            } else {
                window.location.href = "/finish-profile-setup";
            }
        } else if (window.location.pathname === "/finish-profile-setup/") {
            const authResult = await getData("Users/" + user.uid);
            if (authResult) {
                if (!head) {
                    window.location.href = "/profile";
                } else {
                    window.location.href = "/admin-control-panel";
                }
            }else{
                if (head) {
                    window.location.href = "/admin-control-panel";
                }
            }
        } else if (window.location.pathname === "/profile/") {
            const authResult = await getData("Users/" + user.uid);
            if (!authResult) {
                window.location.href = "/finish-profile-setup/"
            } else {
                if (head) {
                    window.location.href = "/admin-control-panel";
                }
            }
        }
    } else {
        if (window.location.pathname !== "/") {
            window.location.href = "/";
        }
    }
})

if (window.location.pathname === "/") {
    signInButton.addEventListener('click', userSignIn);
} else {
    signOutButton.addEventListener('click', userSignOut);
}

export {
    AuthUID,
    AuthEmail,
    AuthName,
    AuthProfileLink
}