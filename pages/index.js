import Head from 'next/head'
import { useState } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC10lviYE8F9sJSOmR3pAPYJ9XwwiwG5xc",
  authDomain: "fir-project-76d42.firebaseapp.com",
  projectId: "fir-project-76d42",
  storageBucket: "fir-project-76d42.appspot.com",
  messagingSenderId: "775403613850",
  appId: "1:775403613850:web:6a78231ef195bd069eb923",
  measurementId: "G-H7R6CB1CE0"
};

export default function Home() {


  // if (firebaseConfig.projectId) {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // if (app.name && typeof window !== 'undefined') {
    //   const analytics = getAnalytics(app);
    // }

  // }
  const auth = getAuth(app)

  const [cred, setCred] = useState({ email: '', password: '' })
  const [user, setUser] = useState()
  const [isLoggedin, setIsloggedin] = useState(false)

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }

  const signup = (e) => {
    e.preventDefault()
    console.log(cred)
    createUserWithEmailAndPassword(auth, cred.email, cred.password)
      .then((userCredential) => {
        // Signed in 
        setUser(auth.currentUser)
        console.log(auth.currentUser)
        setIsloggedin(true)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      });
  }

  const login = (e) => {
    e.preventDefault()
    console.log(cred)
    signInWithEmailAndPassword(auth, cred.email, cred.password)
      .then((userCredential) => {
        setUser(auth.currentUser)
        console.log(auth.currentUser)
        setIsloggedin(true)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null)
        setIsloggedin(false)
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        isLoggedin ?
          <main className={styles.main}>
            <p>{user.email}</p>
            <button type="button" onClick={logout}>logout</button>
          </main>
          :
          <main className={styles.main}>
            {/* <from onSubmit={signup}> */}
              <input onChange={onChange} type="email" name="email" />
              <input onChange={onChange} type="password" name="password" />
              <button type="submit" onClick={login}>login</button>
              <button type="submit" onClick={signup}>signup</button>
            {/* </from> */}
          </main>
      }
    </div>
  )
}
