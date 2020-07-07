import React from "react";
import Axios from 'axios'
import { API_URL } from "../../../../Constants/API";
import "./CardLapangan.css";
// import ButtonUI from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar as star } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";


interface CardLapanganData {
  id?: number;
  fieldName?: string;
  price: number;
  type?: string;
  image?: string;
  category?: string;
  rating?: number;
}

type CardLapanganProps = {
  data: CardLapanganData;
  className?: string;
};

class CardLapangan extends React.Component<CardLapanganProps> {

  render() {
    const { id, fieldName, price , image, type, rating } = this.props.data;

    return (

      <div className={`kolam-card d-inline-block ml-4 mt-4`}>
        <img
          className="image-lap"
          src={image}
          alt={this.props.data.fieldName}
        // style={{ width: "430px", height: "300px", objectFit: "contain" }}
        />
        <div>
        <p className="mt-3">{fieldName}</p>
          <div className="d-flex">
            <span>
              <h5 style={{ fontWeight: "bolder" }}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(price)}
                {'      '} / hour
                  </h5>
            </span>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between mt-1">
           <div>
             <div className="d-flex flex-row align-items-center justify-content-between">
               {/* Render stars dynamically */}
               {
                 rating == 1 ? (
                   <>
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} aria-hidden="true" />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={star} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={star} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={star} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={star} />
                   </>
                 ) : rating == 2 ? (
                   <>
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={star} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={star} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={star} />
                   </>
                 ) : rating == 3 ? (
                   <>
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={star} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={star} />
                   </>
                 ) : rating == 4 ? (
                   <>
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                    <FontAwesomeIcon style={{ fontSize: "15px" }} icon={star} />
                   </>
                 ) : rating == 5 ? (
                    <>
                      <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                      <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                      <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                      <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                      <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faStar} />
                  </>
                 ) : <p>Belum ada rating</p>
               }
               <small className="ml-2 mt-1" style={{ fontSize: "14px" }}>{rating}</small>
             </div>
           </div>
           </div>

        </div>
      </div>
    );
  }
}

export default CardLapangan;