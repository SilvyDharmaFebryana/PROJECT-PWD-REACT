import React from "react"
import Axios from "axios";
// import { API_URL } from "../../../../Constants/API";
import "./LapanganBasket.css"
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";
import { API_URL } from "../../../../Constants/API";
import CardLapangan from "../../../Components/Card/CardLapangan/CardLapangan";

class LapanganVoli extends React.Component {

  state = {
    lapanganBasket: [],
  }

  getLapanganBasket = () => {
    Axios.get(`${API_URL}/lapangan/basket`, {
      params: {
        category: "basket"
      }
    })
      .then((res) => {
        this.setState({ lapanganBasket: res.data })
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getLapanganBasket()
  }

  renderLapangan = () => {
    return this.state.lapanganBasket.map((val) => {
      return (
        <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <CardLapangan key={`fields-cart-${val.id}`} className="m-2" data={val} />
        </Link>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="mt-1">
          <Breadcrumb>
            <BreadcrumbItem active>  <h5 className="font-weight-bolder m-1" > LAPANGAN BASKET </h5></BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="container" >

          <div className="row d-flex flex-wrap justify-content-center ">
            {
              this.renderLapangan()
            }
          </div>
        </div>
      </div>
    )
  }
}

export default LapanganVoli;