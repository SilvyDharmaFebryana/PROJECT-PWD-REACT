import React from 'react'
import "./kolam.css"
import Axios from 'axios'
import { API_URL } from '../../../../Constants/API'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import swim from "../../../../Assets/icon/swim.png"


class Kolam extends React.Component {


    state = {
        listKolam: []
    }


    getDataKolam = () => {
        Axios.get(`${API_URL}/kolam`)
        .then((res) => {
            this.setState({ listKolam: res.data})
            console.log(this.state.listKolam);
            
        })
        .catch((err) => {
            console.log(err);
            
        });
        
    }

    componentDidMount() {
        this.getDataKolam()
        // console.log(this.state.listKolam);
        
    }

    renderKolam = () => {
        const { listKolam } = this.state
        return listKolam.map((val, idx) => {
            return (
                <div className={`kolam-card d-inline-block ml-4 mt-4`}>
                    <img
                        src={val.image}
                        style={{ width: "430px", height: "300px", objectFit: "contain" }}
                    />
                    <div>
                        <p className="mt-3">{val.type}</p>
                        <div className="d-flex">
                            <span>
                                <h5 style={{ fontWeight: "bolder" }}>
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(val.price)}
                                    {'      '}/
                                </h5> 
                            </span>
                           <span>
                                    {
                                        val.person === "group" ? (
                                            <h6>group (min. 5 orang)</h6>
                                        ) : (
                                            <h6>orang</h6>
                                        )
                                    }
                           </span>
                            
                        </div>
                        
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <>
            <div>
                <Breadcrumb>
                        <BreadcrumbItem active>  <h5 className="font-weight-bolder m-1" > SWIMMING POOL</h5></BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="container" >
              
                <div className="row d-flex flex-wrap justify-content-center ">
                    {
                        this.renderKolam()
                    }
                </div>
            </div>
            </>
        )
    }
}

export default Kolam