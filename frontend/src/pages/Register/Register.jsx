import "./Register.css";

import {
  FaFileAlt,
  FaRocket,
  FaLock,
  FaRobot,
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaBriefcase,
  FaLockOpen,
  FaArrowRight,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    role: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });


  const [errors, setErrors] = useState({});


  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

  };


  const validate = () => {

    let newErrors = {};


    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }


    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter valid email";
    }


    // Company
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }


    // Role
    if (!formData.role) {
      newErrors.role = "Please select role";
    }


    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    else if (formData.password.length < 6) {
      newErrors.password =
        "Password must contain minimum 6 characters";
    }


    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Confirm password is required";
    }
    else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }


    // Terms
    if (!formData.terms) {
      newErrors.terms =
        "Please accept terms and conditions";
    }


    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;

  };




const handleSubmit = async (e)=>{

    e.preventDefault();


    if(validate()){


        try{


            const response = await axios.post(
  "http://localhost:8000/users/register",
  {
    full_name: formData.fullName,
    company_name: formData.company,
    email: formData.email,
    mobile_number: formData.mobileNumber,
    role: formData.role.toLowerCase(),
    password: formData.password,
    confirm_password: formData.confirmPassword
  }
);



            console.log(response.data);


            alert("Account created successfully");


            navigate("/login");


        }
        catch(error){

            console.log(error);


            alert(
              error.response?.data?.detail ||
              "Registration failed"
            );

        }


    }

};


  return (

<div className="register-page">


<div className="bg bg1"></div>
<div className="bg bg2"></div>
<div className="bg bg3"></div>



<div className="register-container">


{/* LEFT SECTION */}

<div className="left-section">


<div className="logo">

<div className="logo-icon">
<FaFileAlt/>
</div>


<div>
<h2>Document AI</h2>
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
<span>Made Simple.</span>
</h1>


<p>
Upload, organize and analyze your documents using Artificial Intelligence.
</p>



<div className="features">


<div className="feature">

<div className="feature-icon">
<FaRocket/>
</div>


<div>
<h4>Lightning Fast</h4>
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
<h4>Highly Secure</h4>

<p>
Your files remain encrypted and protected.
</p>

</div>

</div>




<div className="feature">

<div className="feature-icon">
<FaRobot/>
</div>


<div>
<h4>AI Powered</h4>

<p>
Automatic extraction of information.
</p>

</div>

</div>



</div>


</div>

</div>





{/* RIGHT SECTION */}


<div className="right-section">


<div className="register-card">


<h2>Create Account</h2>


<p>
Create your workspace and start using Document AI.
</p>



<form onSubmit={handleSubmit}>


{/* FULL NAME */}

<div className="form-row">

<label>Full Name</label>

<div className="input-box">

<FaUser className="input-icon"/>

<input
type="text"
name="fullName"
placeholder="Enter your full name"
value={formData.fullName}
onChange={handleChange}
/>

</div>

<p className="error">
{errors.fullName}
</p>

</div>





{/* EMAIL */}

<div className="form-row">

<label>Email</label>


<div className="input-box">

<FaEnvelope className="input-icon"/>

<input
type="email"
name="email"
placeholder="Enter your email"
value={formData.email}
onChange={handleChange}
/>

</div>


<p className="error">
{errors.email}
</p>


</div>





{/* COMPANY */}

<div className="form-row">


<label>Company</label>


<div className="input-box">


<FaBuilding className="input-icon"/>


<input
type="text"
name="company"
placeholder="Company Name"
value={formData.company}
onChange={handleChange}
/>


</div>


<p className="error">
{errors.company}
</p>


</div>






{/* ROLE */}

<div className="form-row">


<label>Role</label>


<div className="input-box">


<FaBriefcase className="input-icon"/>


<select
name="role"
value={formData.role}
onChange={handleChange}
>


<option value="">
Select Role
</option>

<option value="Developer">
Developer
</option>

<option value="HR">
HR
</option>


<option value="Manager">
Manager
</option>


<option value="Admin">
Admin
</option>


</select>


</div>


<p className="error">
{errors.role}
</p>


</div>






{/* PASSWORD */}


<div className="form-row">

<label>Password</label>


<div className="input-box">


<FaLockOpen className="input-icon"/>


<input
type="password"
name="password"
placeholder="Password"
value={formData.password}
onChange={handleChange}
/>


</div>


<p className="error">
{errors.password}
</p>


</div>







{/* CONFIRM PASSWORD */}



<div className="form-row">


<label>Confirm Password</label>


<div className="input-box">


<FaLockOpen className="input-icon"/>


<input
type="password"
name="confirmPassword"
placeholder="Confirm Password"
value={formData.confirmPassword}
onChange={handleChange}
/>


</div>


<p className="error">
{errors.confirmPassword}
</p>


</div>







<div className="remember">


<input
type="checkbox"
name="terms"
checked={formData.terms}
onChange={handleChange}
/>


<span>
I agree to Terms & Conditions
</span>


</div>


<p className="error">
{errors.terms}
</p>






<button className="register-btn">

Create Account

<FaArrowRight/>

</button>



</form>





<div className="login-text">

Already have an account?


<Link to="/login">
<span> Login</span>
</Link>


</div>



</div>


</div>


</div>


</div>

  );

};


export default Register;