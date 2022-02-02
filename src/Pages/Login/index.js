import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import FireDB from "../../Firebase/config";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import MainLayout from "../../MyComponents/Layouts/MainLayout";
import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signin = async () => {
    try {
      const auth = getAuth();

      const result = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("currentUser", JSON.stringify(result));
      toast.success("Logged In Successfully!!");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("LogIn Failed!!");
    }
  };

  const GoogleProvider = new GoogleAuthProvider();
  const signinwithgoogle = async () => {
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, GoogleProvider);
      localStorage.setItem("currentUser", JSON.stringify(result));
      /* userProfileHandler(userAuth);*/
      toast.success("Logged In Successfully!!");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("LogIn Failed!!");
    }
  };
  /*
  const userProfileHandler = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const { uid } = userAuth;
    const userRef = doc(FireDB, `users/${uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      const { displayName, email } = userAuth;
      const timestamp = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdDate: timestamp,
          ...additionalData,
        });
      } catch (error) {
        console.log(error);
      }
    }
    userRef.onSnapshot((snapshot) => {
      this.setState({
        currentUser: {
          id: snapshot.id,
          ...snapshot.data(),
        },
      });
    });
  };*/
  return (
    <MainLayout>
      <section className="lgform vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                    onClick={signinwithgoogle}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" for="form3Example3">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" for="form3Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="form-outline">
                  <Link to="/" className="text-body">
                    Forgot password?
                  </Link>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={signin}
                  >
                    Login
                  </button>
                </div>
                <div className="form-outline">
                  <p className="medium fw-bold  mt-5 pt-3 mb-0">
                    Don't have an account?{" "}
                    <Link to="/register" className="link-danger">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Login;
