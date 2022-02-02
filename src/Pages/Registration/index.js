import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection } from "firebase/firestore";

import MainLayout from "../../MyComponents/Layouts/MainLayout";
//import { withRouter } from "react-router-dom";
import "./styles.css";
import FireDB from "../../Firebase/config";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [name, setName] = useState("");

  const addUserInfo = async () => {
    const userInfo = {
      name,
      email,
      userRoles: ["user"],
    };
    try {
      console.log(userInfo);
      await addDoc(collection(FireDB, "users"), userInfo);
    } catch (error) {
      console.log(error);
    }
  };
  const register = async () => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registration Sucessfully Done!!");
      addUserInfo();
    } catch (error) {
      console.log(error);
      toast.error("Sorry! Registration Failed.");
    }
  };

  return (
    <MainLayout>
      <div className="d-flex align-items-center h-100 gradient-custom-3 py-5">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100 float-start">
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_bCtom0.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
            <div className=" reg-form col-12 col-md-9 col-lg-7 col-xl-6 float-end">
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                      <label className="form-label" for="form3Example1cg">
                        Username
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <label className="form-label" for="form3Example3cg">
                        Your Email
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <label className="form-label" for="form3Example4cg">
                        Password
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                        value={cpassword}
                        onChange={(e) => {
                          setCPassword(e.target.value);
                        }}
                      />
                      <label className="form-label" for="form3Example4cdg">
                        Confirm your password
                      </label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                      />
                      <label className="form-check-label" for="form2Example3g">
                        I agree all statements in{" "}
                        <Link to="/" className="text-body">
                          <u>Terms of service</u>
                        </Link>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        onClick={register}
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link to="/login" className="fw-bold text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Registration;
