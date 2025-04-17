import React from 'react'
import Login from '../User/Login'
import Register from '../User/Register'
import logo from "../../img/logomain.png"
import back from "../../img/back.jpg"

export default function Reg() {
  return (
   <>
   <div class="text-center" >
  <div class="row">
   
  <div  className="col-md-6 left-side text-white py-4 px-5 d-flex flex-column justify-content-center" style={{ fontFamily: "'Open Sans', sans-serif" }}>
  {/* Logo */}
  <div className="logo mb-5 text-start">
    <img src={logo} alt="Logo" style={{ width: "180px" }} className="logo-img" />
  </div>

  {/* Content (only for medium and larger screens) */}
  <div className="d-none d-md-block text-start" style={{ maxWidth: "520px", paddingLeft: "10px" }}>
    <h3 className="fw-bold mb-3" style={{ fontSize: "2rem", fontFamily: "'Poppins', sans-serif", color: "black" }}>
      Budge-It before you splurge it!
    </h3>
    <p className="mb-4" style={{ fontSize: "1.1rem", color: "rgba(97, 76, 76, 0.85)", lineHeight: "1.8" }}>
      Our Expense Tracker helps you manage your money smarter. Add your income and expenses,
      categorize your spending, and get clear insights through visual reports — all in one place.
      Whether you're saving for something big or just want to see where your money goes, this
      tool makes budgeting simple and stress-free.
    </p>

    {/* New Section - Call to Action */}
    <h3 className="fw-bold mb-3" style={{ fontSize: "1.5rem", color: "black" }}>
      Create an account today and take control of your finances.
    </h3>
  </div>
</div>



  {/*  */}
    <div class="col-md-6">
      <Register/>
    </div>
    
  </div>
</div>
   </>
  )
}
