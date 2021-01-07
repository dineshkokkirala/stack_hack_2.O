import React from 'react'
import { Link } from 'react-router-dom';


const GetEmployee = (props) => {
    const data = props.location.state;
    //console.log(data)
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <Link to="/admin" style={{textDecoration:"none",color:"#fff"}}><button className="btn btn-primary">Back</button></Link>
                </div>
                <div className="col-12 col-md-4 mt-4">
                    <div className="card text-center shadow p-4">
                        <img src={data.photo} alt={data.username} style={{borderRadius:"50%"}} />
                        <h2 className="mt-3">{data.username}</h2>
                        <h3>{data.role}</h3>
                        <h3>{data.address}</h3>
                    </div>
                </div>
                <div className="col-12 col-md-8 mt-4">
                    <div className="card shadow p-3">
                        <div className="col-12">
                            <h5>Employee ID: <span style={{color:"gray"}}>{data.employeid}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Firstname: <span style={{color:"gray"}}>{data.firstname}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Lastname: <span style={{color:"gray"}}>{data.lastname}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Email: <span style={{color:"gray"}}>{data.email}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Phone: <span style={{color:"gray"}}>{data.contactnumber}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Date of Birth: <span style={{color:"gray"}}>{data.dateofbirth}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Address: <span style={{color:"gray"}}>{data.address}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Department: <span style={{color:"gray"}}>{data.department}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Role: <span style={{color:"gray"}}>{data.role}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Salary: <span style={{color:"gray"}}>{data.salary}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Joining Date: <span style={{color:"gray"}}>{data.joiningdate}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Gender: <span style={{color:"gray"}}>{data.gender}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Maritial Status: <span style={{color:"gray"}}>{data.maritialstatus}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Nationality: <span style={{color:"gray"}}>{data.nationality}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Blood Group: <span style={{color:"gray"}}>{data.bloodgroup}</span></h5>
                            <hr />
                        </div>
                        <div className="col-12">
                            <h5>Work Type: <span style={{color:"gray"}}>{data.worktype}</span></h5>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetEmployee
