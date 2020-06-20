import React from 'react'
import homePic from "../../../Assets/Images/home1.png"
import homePic2 from "../../../Assets/Images/home2.png"
import { connect } from "react-redux";
import "./Home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faBookOpen, faLandmark, faTasks, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom"

class Home extends React.Component {


    showMenu = () => {
        if (this.props.user.role === "super_admin") {
            return (
                <>
                    <div className="mt-1">
                        <Breadcrumb>
                            <BreadcrumbItem active>  <h5 className="font-weight-bolder m-1" > SUPER ADMIN DASHBOARD </h5></BreadcrumbItem>
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
                                    <Link to="/admin/add_user" style={{ textDecoration: "none", color: "inherit"}}>
                                        <button className="mt-4 button">
                                            <FontAwesomeIcon
                                                className="mt-1 mr-2"
                                                icon={faPlus}
                                                style={{ fontSize: 16, color: "white" }}
                                            /> Add User
                                        </button>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/admin/list_user" style={{ textDecoration: "none", color: "inherit"}}>
                                    <button className="mt-2 button">
                                        List User
                                    </button>
                                    </Link>
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
                                        Report User
                                    </button>
                                </div>
                                <div>
                                    <button className="mt-2 button">
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
                                        List User
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else if (this.props.user.role === "admin") {
            return (
                <>
                    <div className="mt-1">
                        <Breadcrumb>
                            <BreadcrumbItem active>  <h5 className="font-weight-bolder m-1" > ADMIN DASHBOARD </h5></BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row text-center">
                        <div className="col-6">
                            <div className="container-admin">
                                <div>
                                    <FontAwesomeIcon
                                        className="mt-5 ml-2"
                                        icon={faTasks}
                                        style={{ fontSize: 100, color: "#336699" }}
                                    />
                                </div>
                                <div>
                                    <button className="mt-4 button">
                                        Admin Task
                                    </button>
                                </div>
                                <div>
                                    <button className="mt-2 button">
                                        Task Done
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="container-admin">
                                <div>
                                    <FontAwesomeIcon
                                        className="mt-5 ml-2"
                                        icon={faTicketAlt}
                                        style={{ fontSize: 100, color: "#336699" }}
                                    />
                                </div>
                                <div>
                                    <button className="mt-4 button">
                                        e-Ticket
                                    </button>
                                </div>
                                {/* <div>
                                    <button className="mt-2 button">
                                        List User
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <div>
                    <img className="mt-5" style={{ width: "60%", opacity: "100px", color: "inherit" }} src={homePic} alt="" />
                </div>
            )
        }
    }

    render() {
        return (
            <>
                <div className="text-center">
                    <div className="d-flex">
                    </div>
                    <div>
                        {
                            this.showMenu()
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

