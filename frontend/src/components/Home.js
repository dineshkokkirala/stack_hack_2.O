import React from 'react'
import "./Home.css"
const Home = () => {
    function myFunc1() {
        var x = document.getElementById("pass");
  
        var y = document.getElementById("show");
        if (x.type === "password") {
          y.className = "fa-eye fas img";
          x.type = "text";
        } else {
          y.className="fa-eye-slash fas img";
          x.type = "password";
        }
      }
    function myFunc2() {
        var x = document.getElementById("pass1");
  
        var y = document.getElementById("show1");
        if (x.type === "password") {
          y.className = "fa-eye fas img";
          x.type = "text";
        } else {
          y.className="fa-eye-slash fas img";
          x.type = "password";
        }
      }
    return (
        <div className="bg-container">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 mt-5">
                        <div className="card shadow text-center p-4" style={{opacity:"0.9",backgroundColor:"#1E97B1",maxWidth:"400px",margin:"100px auto"}}>
                            <h3 className="mb-5 main_heading">Admin Login</h3>
                            <form>
                                <div className="form-group mb-4" >
                                    <input type="email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-group div2">
                                <i className="fa-eye-slash fas img"  id="show" onClick={myFunc1} style={{cursor:"pointer"}} ></i>
                                 <input type="password" className="form-control" placeholder="Password" id="pass"  />
                                </div>
                                <button className="btn btn-block btn-success mt-5 w-100 opac" >Login</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-5">
                        <div className="card shadow text-center p-4" style={{opacity:"0.9",backgroundColor:"#294b71 ",maxWidth:"400px",margin:"100px auto"}}>
                            <h3 className="mb-5 main_heading">Employee Login</h3>
                            <form>
                                <div className="form-group mb-4">
                                    <input type="email" className="form-control" placeholder="Email"  />
                                </div>
                                <div className="form-group div2">
                                <i className="fa-eye-slash fas img"  id="show1" onClick={myFunc2} style={{cursor:"pointer"}} ></i>
                                 <input type="password" className="form-control" placeholder="Password" id="pass1"  />
                                </div>
                                <button className="btn btn-block btn-success mt-5 w-100" style={{opacity:"1"}}>Login</button> 
                            </form>
                        </div>  
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home
