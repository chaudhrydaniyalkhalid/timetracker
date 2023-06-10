import { Button } from "mdbreact";
import React from "react";
// import { useContext } from "react";
// import { Context } from "../../Context/Context"
import { useNavigate } from "react-router-dom";

// import '../../dist/css/adminlte.min.css'
// import 'font-awesome/css/font-awesome.min.css';

const Header = ({ setAuth }) => {
  // const { user, dispatch } = useContext(Context)

  const navigate = useNavigate();

  const handleLogout = async () => {
    // await dispatch({ type: "LOGOUT" })
    localStorage.setItem("timesheet_user437", null);
    setAuth(null);
    navigate("/");
  };
  return (
  
      <div
        // className="wrapper"
        style={{ position: "fixed", width: "100%",height:"10%", zIndex:1}}
      >
        {/* <!-- Navbar --> */}
        <nav
          className="main-header navbar navbar-expand"
          style={{ background: "#516a7a" }}
        >
          {/* <!-- Left navbar links --> */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="/"
                role="button"
              >
                <i className="fas fa-bars" style={{ color: "white" }}></i>
              </a>
            </li>
            {/* {/* <li className="nav-item d-none d-sm-inline-block">
              <a href="../../index3.html" className="nav-link">Home</a>
            </li> */}
            <li className="nav-item d-none d-sm-inline-block">
              <i className="fa-solid  fa-fade"> <a className="nav-link" style={{color:'white',fontStyle:'italic',marginTop:'4px'}}><h5> H e l l o :</h5></a></i>
            </li>
          </ul>

          {/* {user.details.username} */}

          {JSON.parse(localStorage.getItem("timesheet_user437")) &&
            JSON.parse(localStorage.getItem("timesheet_user437")).details && (
              <h5 style={{ marginTop: "0.5%", color: "white" }}>
                {" "}
                {
                  JSON.parse(localStorage.getItem("timesheet_user437")).details.username
                }
              </h5>
            )}



{/* <ul className="navbar-nav">
          
            {/* {/* <li className="nav-item d-none d-sm-inline-block">
              <a href="../../index3.html" className="nav-link">Home</a>
            </li> */}
            {/* <li className="nav-item d-none d-sm-inline-block">
              <i className="fa-solid  fa-fade"> <a className="nav-link" style={{color:'white',fontStyle:'italic',marginTop:'4px'}}><h5> Company :</h5></a></i>
            </li>
          </ul>  */}

            {/* {JSON.parse(localStorage.getItem("timesheet_user437")) &&
            JSON.parse(localStorage.getItem("timesheet_user437")).details && (
              <h5 style={{ marginTop: "0.5%", color: "white" }}>
                {" "}
                {
                  JSON.parse(localStorage.getItem("timesheet_user437")).details.companies &&  JSON.parse(localStorage.getItem("timesheet_user437")).details.companies.companyName 
                }
              </h5>
            )} */}

          {/* <!-- Right navbar links --> */}
          <ul className="navbar-nav ml-auto mr-5">
            {/* <!-- Navbar Search --> */}

            {/* <li className="nav-item">
              <a className="nav-link" data-widget="navbar-search" href="/" role="button">
                <i className="fas fa-search" style={{color:"white"}}></i>
              </a>
              <div className="navbar-search-block">
                <form className="form-inline">
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                    <div className="input-group-append" >
                      <button className="btn btn-navbar"  type="submit">
                        <i className="fas fa-search" ></i>
                      </button>
                      <button className="btn btn-navbar" type="button" data-widget="navbar-search" >
                        <i className="fas fa-times" ></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li> */}
            <div style={{marginRight:'50px'}}>
              <input
                id="tableSearch"
                className="form-control "
                placeholder="Search"
                style={{
                  width: "100%",
                  border: "none",

                  backgroundColor: "white",
                 
                  borderRadius: "10px",
                }}
              ></input>
            </div>

            {/* <!-- Messages Dropdown Menu --> */}
            <li className="nav-item dropdown">
              {/* <a className="nav-link" data-toggle="dropdown" href="/">
                <i className="far fa-comments"></i>
                <span className="badge badge-danger navbar-badge">3</span>
              </a> */}
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <a href="/" className="dropdown-item">
                  {/* <!-- Message Start --> */}
                  <div className="media">
                    {/* <img src="../../dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle"> */}
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Brad Diesel
                        <span className="float-right text-sm text-danger">
                          <i className="fas fa-star"></i>
                        </span>
                      </h3>
                      <p className="text-sm">Call me whenever you can...</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1"></i> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                  {/* <!-- Message End --> */}
                </a>
                <div className="dropdown-divider"></div>
                <a href="/" className="dropdown-item">
                  {/* <!-- Message Start --> */}
                  <div className="media">
                    {/* <img src="../../dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3"> */}
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        John Pierce
                        <span className="float-right text-sm text-muted">
                          <i className="fas fa-star"></i>
                        </span>
                      </h3>
                      <p className="text-sm">I got your message bro</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1"></i> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                  {/* <!-- Message End --> */}
                </a>
                <div className="dropdown-divider"></div>
                <a href="/" className="dropdown-item">
                  {/* <!-- Message Start --> */}
                  <div className="media">
                    {/* <img src="../../dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3"/> */}
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Nora Silvester
                        <span className="float-right text-sm text-warning">
                          <i className="fas fa-star"></i>
                        </span>
                      </h3>
                      <p className="text-sm">The subject goes here</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1"></i> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                  {/* <!-- Message End --> */}
                </a>
                <div className="dropdown-divider"></div>
                <a href="/" className="dropdown-item dropdown-footer">
                  See All Messages
                </a>
              </div>
            </li>

            <li>
              <Button
                style={{ backgroundColor: "#4289ff" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
            {/* <!-- Notifications Dropdown Menu --> */}
            {/* <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="/">
                <i className="far fa-bell"></i>
                <span className="badge badge-warning navbar-badge">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">15 Notifications</span>
                <div className="dropdown-divider"></div>
                <a href="/" className="dropdown-item">
                  <i className="fas fa-envelope mr-2"></i> 4 new messages
                  <span className="float-right text-muted text-sm">3 mins</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="/" className="dropdown-item">
                  <i className="fas fa-users mr-2"></i> 8 friend requests
                  <span className="float-right text-muted text-sm">12 hours</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="/" className="dropdown-item">
                  <i className="fas fa-file mr-2"></i> 3 new reports
                  <span className="float-right text-muted text-sm">2 days</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="/" className="dropdown-item dropdown-footer">See All Notifications</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-widget="fullscreen" href="/" role="button">
                <i className="fas fa-expand-arrows-alt"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="/" role="button">
                <i className="fas fa-th-large"></i>
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
   
  );
};

export default Header;
