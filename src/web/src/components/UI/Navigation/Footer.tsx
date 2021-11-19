import { NavLink } from "react-router-dom";
import logo from "./tempLogo.png";

const Footer = () => {

    return (
        <div className="text-center text-lg-start text-muted">
            <hr/>
            <section className="">
                <div className="container text-center text-md-start">
                    {/* <!-- Grid row --> */}
                    <div className="row align-items-center">


                        <div className="col-md-1 col-lg-2 col-xl-1 mx-auto  ">
                            <NavLink className="navbar-brand" to="/">
                                <img
                                    src={logo}
                                    className="img-fluid img-thumbnail rounded-circle m-2 p-2"
                                    alt="logo"
                                    width="50"
                                    height="50"
                                />
                            </NavLink>

                        </div>
                        {/* <!-- Grid column --> */}
                        <div className="col-md-2 col-lg-3 col-xl-2 mx-auto  ">
                            {/* <!-- Content --> */}
                            <NavLink to='/'>
                                <h6 className="text-uppercase fw-bold  ">
                                    <i className="fas fa-gem me-3"></i>Our Story
                                </h6>
                            </NavLink>

                        </div>
                        {/* <!-- Grid column -->
        
                <!-- Grid column --> */}
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto  ">
                            {/* <!-- Links --> */}
                            <NavLink to="/">
                                <h6 className="text-uppercase fw-bold">
                                    About Us
                                </h6>
                            </NavLink>

                        </div>
                        {/* <!-- Grid column -->
        
                <!-- Grid column --> */}
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto  ">
                            {/* <!-- Links --> */}
                            <NavLink to="/">
                                <h6 className="text-uppercase fw-bold  ">
                                    Calendar
                                </h6>
                            </NavLink>

                        </div>
                        {/* <!-- Grid column -->
        
                <!-- Grid column --> */}
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 ">
                            {/* <!-- Links --> */}
                            <NavLink to='/' className="">
                                <h6 className="text-uppercase fw-bold ">
                                    Contact Us
                                </h6>
                            </NavLink>


                        </div>
                        {/* <!-- Grid column --> */}
                    </div>
                    {/* <!-- Grid row --> */}
                </div>
            </section>
            {/* <!-- Section: Links  -->
        
          <!-- Copyright --> */}
            <div className="text-center p-2" >
                © 2021 Copyright, All Rights Reserved
            </div>
            {/* <!-- Copyright --> */}
       </div>
    )
}

export default Footer;