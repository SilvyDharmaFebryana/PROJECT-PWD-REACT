import React from 'react'
import homePic from "../../../Assets/Images/home1.png"
import care from "../../../Assets/Images/Showcase/care.png"
import futsal from "../../../Assets/Images/Lapangan/futsaloutdoor.jpg"
import voli from "../../../Assets/Images/Lapangan/voliindor.jpg"
import bola from "../../../Assets/Images/CarouselShow/bola.png"
import basket from "../../../Assets/Images/Lapangan/basketindoor.jpg"
import baskteOrang from "../../../Assets/Images/Showcase/basketOrang.png"
import cover from "../../../Assets/Images/Showcase/cover.png"
import cover1 from "../../../Assets/Images/Showcase/cover1.png"
import { connect } from "react-redux";
import "./Home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faBookOpen, faLandmark, faTasks, faTicketAlt, faSearch, faSearchMinus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb, BreadcrumbItem, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom"
import { Carousel, CarouselControl, CarouselItem } from "reactstrap";
import Axios from "axios";
import { API_URL } from '../../../Constants/API'
import CardLapangan from '../../Components/Card/CardLapangan/CardLapangan'
import { searchInputHandler } from "../../../Redux/Actions";
 


const dummy = [
    {
        productName: "KICKOFF",
        image: cover,
        desc: `Sweating makes you healty \n
                Booking lapangan yang kamu inginkan, Kickoff menyediakan tempat berolahraga dengan fasilitas yang sangat nyaman dan bersih serta mematuhi protokol
                kesehatan yang berlaku, kami menyediakan dua jenis lapangan yaitu indoor dan outdoor sehingga anda bisa memilih yang anda inginkan.`,
        id: 1,
    },
    {
        productName: "CARE",
        image: care,
        desc: ` Melayani dengan sepenuh hati \n
                Sehubung dengan adanya pandemi COVID-19, kami selalu rutin untuk melakukan penyemprotan disinfektan secara rutin di semua area olahraga, dan kami
                juga menyediakan handsanitizer di setiap sudut untuk di gunakan oleh pengunjung`,
        id: 2,
    },
    {
        productName: "",
        image: baskteOrang,
        desc: ` Dengan berolahraga, tubuh kita akan merasa jauh lebih baik. Selain itu, olahraga merupakan pilihan terbaik untuk mengatasi berbagai hal yang membebani pikiran, mengurangi depresi karena interaksi yang dijalin dengan berolahraga akan membantu untuk mengurangi nya.
                Olahraga juga mampu meningkatkan perkembangan tubuh bagi anak-anak menjadi lebih tinggi.`,
        id: 3,
    },
    {
        productName: "FUTSAL",
        image: futsal,
        desc: `Lapangan Futsal outdoor dengan fasilitas lengkap, mulai dari lapangan dilengkapi dengan rumput khusus, kursi penonton, ruang ganti, 
                kamar mandi, dan bahkan kantin khusus pengunjung atau pengguna, serta di lengkapi dengan lampu tembak`,
        id: 4,
    },
    {
        productName: "VOLI",
        image: voli,
        desc: `Lapangan Voli indoor dengan fasilitas lengkap, mulai dari lapangan dilengkapi dengan karpet khusus, kursi penonton, ruang ganti, 
                kamar mandi, dan bahkan kantin khusus pengunjung atau pengguna.`,
        id: 5,
    },
    {
        productName: "BASKET",
        image: basket,
        desc: `Lapangan Basket outdoor dengan fasilitas lengkap, mulai dari lapangan dilengkapi dengan karpet khusus, kursi penonton, ruang ganti, 
                kamar mandi, dan bahkan kantin khusus pengunjung atau pengguna, serta di lengkapi dengan lampu tembak.`,
        id: 6,
    },
];
  

class Home extends React.Component {

    state = {
        activeIndex: 0,
        animating: false,
        activeCategory: "",
        voli: [],
        futsal: [],
        all: [],
        basket: [],
      };


    getLapanganBasket = () => {
        Axios.get(`${API_URL}/lapangan/basket`, {
          params: {
            category: "basket"
          }
        })
          .then((res) => {
            this.setState({ basket: res.data })
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err)
          })
      }

    getLapanganFutsal = () => {
        Axios.get(`${API_URL}/lapangan/futsal`, {
          params: {
            category: "futsal"
          }
        })
          .then((res) => {
            this.setState({ futsal: res.data })
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err)
          })
    }

    getLapanganVoli = () => {
        Axios.get(`${API_URL}/lapangan/voli`, {
          params: {
            category: "voli"
          }
        })
          .then((res) => {
            this.setState({ voli: res.data })
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err)
          })
    }

    getAllLapangan = () => {
        Axios.get(`${API_URL}/lapangan/`)
          .then((res) => {
            this.setState({ all: res.data })
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err)
          })
    }
    
    
    componentDidMount() {
        this.getLapanganBasket()
        this.getLapanganFutsal()
        this.getLapanganVoli()
        this.getAllLapangan()
    }
    

    renderLapangan = () => {
        return this.state.all.map((val) => {
            if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
              return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
            }
        })
    }

    //==================================== CARROUSSEL =====================================================================================================================

    renderCarouselItems = () => {
        return dummy.map(({ image, productName, desc, id }) => {
          return (
            <CarouselItem
              onExiting={() => this.setState({ animating: true })}
              onExited={() => this.setState({ animating: false })}
              key={id.toString()}
            >
              <div className="carousel-item-home">
                <div className="container position-relative">
                  <div className="row" style={{ paddingTop: "80px" }}>
                  <div className="col-6 d-flex flex-row justify-content-center">
                      <img src={image} alt="" style={{ height: "300px", width: "100%" }} />
                    </div>
                    <div className="col-6" style={{ width: "50%", color: "#c5d9ec" }}>
                      <h2 style={{ width: "20%" }}>{productName}</h2>
                      <p className="mt-4" style={{ width: "40%", fontSize: "14px"}} >{desc}</p>
                       
                    </div>
                   
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        });
      };

    nextHandler = () => {
        if (this.state.animating) return;
        let nextIndex =
            this.state.activeIndex === dummy.length - 1
                ? 0
                : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    };

    prevHandler = () => {
        if (this.state.animating) return;
        let prevIndex =
            this.state.activeIndex === 0
                ? dummy.length - 1
                : this.state.activeIndex - 1;
        this.setState({ activeIndex: prevIndex });
    };


    //==========================================================================================================================================================================
    
    
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
                                    <Link to="/admin/add_field" style={{ textDecoration: "none", color: "inherit"}}>
                                    <button className="mt-4 button">
                                        <FontAwesomeIcon
                                            className="mt-1 mr-2"
                                            icon={faPlus}
                                            style={{ fontSize: 16, color: "white" }}
                                        /> Add Field
                                    </button>
                                    </Link>
                                </div>
                                <div>
                                    <button className="mt-2 button">
                                        List Field
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
                                    <Link to="/admin/task" style={{ textDecoration: "none", color: "inherit"}}>
                                    <button className="mt-2 button">
                                        Task List
                                    </button>
                                    </Link>
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
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <div>
                   <div className="row" >
                       <div className="col-3">
                           <div className="search d-flex">
                                <FontAwesomeIcon
                                    className="mt-2 ml-3 mr-3 mb-2"
                                    icon={faSearch}
                                    style={{ fontSize: 23, color: "#003cb3" }}
                                />
                               <input 
                                    className="search-input mr-5" 
                                    type="text" 
                                    placeholder="search"  
                                    onChange={(e) => this.props.onSearch(e.target.value)}
                                />
                           </div>
                           <div>
                               <div className="filter-wrap">
                                    <div className="d-flex">
                                        <FontAwesomeIcon
                                            className="mt-3 ml-3 mr-2 mb-2"
                                            icon={faFilter}
                                            style={{ fontSize: 15, color: "#003cb3" }}
                                        />
                                        <p className="mt-3" style={{ fontSize: "12px", fontWeight: "bold" }}>Sort By</p>
                                    </div>
                                    <div className="dalam">
                                        <p className="ml-3 mt-3" style={{ fontSize: "12px", fontWeight: "bold" }}>Cabang Olahraga</p>
                                        <div className="category d-flex">

                                        <form className="d-flex">
                                            <span>

                                                <input className="" style={{ fontSize: "12px"}} type="radio" id="voli" name="lapangan" value="voli" />
                                                <label className="ml-2" style={{ fontSize: "12px"}} for="voli">Lapangan Voli</label><br/>
                                                <input className="ml-1 " style={{ fontSize: "12px"}} type="radio" id="futsal" name="lapangan" value="futsal" />
                                                <label className="ml-2" style={{ fontSize: "12px"}} for="futsal">Lapangan Futsal</label><br/>
                                                <input className="ml-2" style={{ fontSize: "12px"}} type="radio" id="basket" name="lapangan" value="basket" />
                                                <label className="ml-2" style={{ fontSize: "12px"}} for="basket">Lapangan Basket</label><br/>
                                                <input className="ml-2" style={{ fontSize: "12px"}} type="radio" id="basket" name="lapangan" value="badminton" />
                                                <label className="ml-2" style={{ fontSize: "12px"}} for="badminton">Lapangan Badminton</label><br/>
                                        
                                            </span>
                                        </form>
                                          
                                        </div>
                                    </div>
                                    <div className="dalam">
                                        <p className="ml-3 mt-3" style={{ fontSize: "12px", fontWeight: "bold" }}>Type Lapangan</p>
                                        <div className="type">
                                            
                                        </div>
                                    </div>
                               </div>
                           </div>
                       </div>
                        <div className="col-9" style={{ height: "150px"}}>
                            <Carousel
                                className="carousel-item-home-bg "
                                next={this.nextHandler}
                                previous={this.prevHandler}
                                activeIndex={this.state.activeIndex}
                            >
                                {this.renderCarouselItems()}
                                <CarouselControl
                                    directionText="Previous"
                                    direction="prev"
                                    onClickHandler={this.prevHandler}
                                />
                                <CarouselControl
                                    directionText="Next"
                                    direction="next"
                                    onClickHandler={this.nextHandler}
                                />
                            </Carousel>
                        </div>
                   </div>
                    <div>
                        <h3 className="text-center font-weight-bolder mt-5">Lapangan</h3>
                        <div className="container-lapangan">
                            {/* BEST SELLER SECTION */}
                            
                            <div className="row d-flex flex-wrap justify-content-center">
                                {
                                    this.renderLapangan()
                                }
                            </div>
                        </div>
                    </div>
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
        search: state.search
    };
};

const mapDispatchToProps = {
    onSearch: searchInputHandler,

  };

export default connect(mapStateToProps, mapDispatchToProps)(Home)

