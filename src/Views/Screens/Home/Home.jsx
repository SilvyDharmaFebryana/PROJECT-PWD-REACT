import React from 'react'
import homePic from "../../../Assets/Images/home1.png"
import homePic2 from "../../../Assets/Images/home2.png"
import { connect } from "react-redux";
import "./Home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faBookOpen, faLandmark } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

class Home extends React.Component {

    state = {
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    }

    

    render() {
        return (
            <>
            
            <div className="text-center">
                <div className="d-flex">
                </div>
                <div>
                    {
                        this.props.user.role === "admin" ? (
                            <>
                        <div className="mt-1">
                            <Breadcrumb>
                                <BreadcrumbItem active>  <h5 className="font-weight-bolder m-1" > ADMIN DASHBOARD </h5></BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                            <div className="row text-center">
                                <div className="col-4">
                                    <div className="container-admin">
                                        <div>
                                            <FontAwesomeIcon
                                                className="mt-5 ml-2"
                                                icon={faUser}
                                                style={{ fontSize: 100, color: "#336699" }}
                                            />
                                        </div>
                                        <div>
                                            <button className="mt-4 button">
                                                <FontAwesomeIcon
                                                    className="mt-1 mr-2"
                                                    icon={faPlus}
                                                    style={{ fontSize: 16, color: "white" }}
                                                /> Add User
                                            </button> 
                                        </div>
                                        <div>
                                            <button className="mt-2 button">
                                                {/* <FontAwesomeIcon
                                                    className="mt-1 mr-2"
                                                    icon={faPlus}
                                                    style={{ fontSize: 16, color: "white" }}
                                                />  */}
                                                List User
                                            </button> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="container-admin">
                                        <div>
                                            <FontAwesomeIcon
                                                className="mt-5 ml-2"
                                                icon={faBookOpen}
                                                style={{ fontSize: 100, color: "#336699" }}
                                            />
                                        </div>
                                        <div>
                                            <button className="mt-4 button">
                                                {/* <FontAwesomeIcon
                                                    className="mt-1 mr-2"
                                                    icon={faPlus}
                                                    style={{ fontSize: 16, color: "white" }}
                                                />  */}
                                                Report User
                                            </button> 
                                        </div>
                                        <div>
                                            <button className="mt-2 button">
                                                {/* <FontAwesomeIcon
                                                    className="mt-1 mr-2"
                                                    icon={faPlus}
                                                    style={{ fontSize: 16, color: "white" }}
                                                />  */}
                                                Report Field
                                            </button> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="container-admin">
                                        <div>
                                            <FontAwesomeIcon
                                                className="mt-5 ml-2"
                                                icon={faLandmark}
                                                style={{ fontSize: 100, color: "#336699" }}
                                            />
                                        </div>
                                        <div>
                                            <button className="mt-4 button">
                                                <FontAwesomeIcon
                                                    className="mt-1 mr-2"
                                                    icon={faPlus}
                                                    style={{ fontSize: 16, color: "white" }}
                                                /> Add Field
                                            </button> 
                                        </div>
                                        <div>
                                            <button className="mt-2 button">
                                                {/* <FontAwesomeIcon
                                                    className="mt-1 mr-2"
                                                    icon={faPlus}
                                                    style={{ fontSize: 16, color: "white" }}
                                                />  */}
                                                List User
                                            </button> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                        ) : (
                            <div>
                                <img className="" style={{ width: "60%", opacity: "100px", color:"inherit" }} src={homePic} alt="" />
                            </div>
                            
                        )
                    }
                </div>
            </div>
            
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };

export default connect(mapStateToProps)(Home)