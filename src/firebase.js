import { initializeApp, getApps, getApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from 'firebase/auth';
import { 
    getFirestore, 
    addDoc, 
    collection 
} from 'firebase/firestore';
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBVuC2z1sB3umPKMKvQ9ctfjBQgV0HuTns",
  authDomain: "netflix-clone-edc10.firebaseapp.com",
  projectId: "netflix-clone-edc10",
  storageBucket: "netflix-clone-edc10.appspot.com",
  messagingSenderId: "604966435566",
  appId: "1:604966435566:web:21a963474c3c6cc2f7d1ff"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (email, password, name) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: name.trim(),
            authProvider: "local",
            email: email.trim()
        });

        console.log("User signed up successfully:", user);
    } catch (error) {
        console.error("Signup error:", error.code, error.message);
        toast.error(error.code.split('/')[1].split('-').join(" ")); 
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email.trim(), password.trim());
        console.log("User logged in successfully.");
    } catch (error) {
        console.error("Login error:", error.code, error.message);
        toast.error(error.code.split('/')[1].split('-').join(" ")); 
    }
};

const logout = async () => {
    try {
        await signOut(auth);
        toast.success("User logged out successfully.");
    } catch (error) {
        console.error("Logout error:", error.message);
        toast.error(error.code.split('/')[1].split('-').join(" ")); 
    }
};

export {
    auth,
    db,
    login,
    signup,
    logout
};
