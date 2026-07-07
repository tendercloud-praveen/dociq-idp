import "./Login.css";

import {
  FaFileAlt,
  FaRocket,
  FaLock,
  FaRobot,
  FaEnvelope,
  FaLockOpen,
  FaArrowRight
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function Login() {


  const navigate = useNavigate();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");



  const handleLogin = async (e) => {

    e.preventDefault();


    try {


      const response = await fetch(
        "http://127.0.0.1:8000/login/",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
          },


          body: JSON.stringify({

            username: username,

            password: password

          })

        }
      );



      const data = await response.json();



      if(data.success){


        // store user details

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );



        alert(data.message);



        // go dashboard

        navigate("/dashboard");



      }
      else{


        setError(
          data.message || "Invalid Login"
        );


      }



    }
    catch(error){


      console.log(error);

      setError(
        "Unable to connect server"
      );


    }


  };





  return (

    <div className="register-page">


      {/* Background */}

      <div className="bg bg1"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>




      <div className="register-container">



        {/* LEFT SECTION */}


        <div className="left-section">


          <div className="logo">


            <div className="logo-icon">

              <FaFileAlt />

            </div>



            <div>

              <h2>
                Document AI
              </h2>

              <p>
                Intelligent Document Processing Platform
              </p>

            </div>



          </div>





          <div className="hero">


            <span className="badge">

              AI Powered Platform

            </span>



            <h1>

              Intelligent Document Processing

              <br/>

              <span>
                Made Simple.
              </span>

            </h1>



            <p>

              Upload, organize and analyze your documents
              using Artificial Intelligence.

            </p>





            <div className="features">



              <div className="feature">


                <div className="feature-icon">

                  <FaRocket/>

                </div>



                <div>

                  <h4>
                    Lightning Fast
                  </h4>

                  <p>
                    Thousands of documents processed instantly.
                  </p>

                </div>


              </div>





              <div className="feature">


                <div className="feature-icon">

                  <FaLock/>

                </div>



                <div>

                  <h4>
                    Highly Secure
                  </h4>


                  <p>
                    Your files remain encrypted.
                  </p>

                </div>


              </div>





              <div className="feature">


                <div className="feature-icon">

                  <FaRobot/>

                </div>



                <div>

                  <h4>
                    AI Powered
                  </h4>


                  <p>
                    Automatic document understanding.
                  </p>

                </div>


              </div>



            </div>



          </div>



        </div>







        {/* RIGHT SECTION */}



        <div className="right-section">


          <div className="register-card">



            <h2>
              Welcome Back
            </h2>


            <p>
              Login to continue using Document AI
            </p>



            {
              error &&
              <p className="error">
                {error}
              </p>
            }





            <form onSubmit={handleLogin}>



              <div className="form-row">


                <label>
                  Mobile Number
                </label>



                <div className="input-box">


                  <FaEnvelope className="input-icon"/>



                  <input

                    type="text"

                    placeholder="Enter Mobile Number"


                    value={username}


                    onChange={
                      (e)=>setUsername(e.target.value)
                    }

                  />


                </div>


              </div>







              <div className="form-row">


                <label>
                  Password
                </label>



                <div className="input-box">


                  <FaLockOpen className="input-icon"/>



                  <input


                    type="password"


                    placeholder="Enter Password"



                    value={password}



                    onChange={
                      (e)=>setPassword(e.target.value)
                    }



                  />



                </div>


              </div>







              <button 
                type="submit"
                className="register-btn"
              >


                Login


                <FaArrowRight/>


              </button>



            </form>







            <div className="login-text">


              Don't have an account?


              <Link to="/register">

                <span>
                  Register
                </span>


              </Link>


            </div>





          </div>



        </div>





      </div>



    </div>

  );

}


export default Login;