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
import { faUser, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faBookOpen, faLandmark, faTasks, faTicketAlt, faSearch, faSearchMinus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb, BreadcrumbItem, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom"
import { Carousel, CarouselControl, CarouselItem } from "reactstrap";
import Axios from "axios";
import { API_URL } from '../../../Constants/API'
import CardLapangan from '../../Components/Card/CardLapangan/CardLapangan'
import { searchInputHandler } from "../../../Redux/Actions";
import { faStar } from "@fortawesome/free-solid-svg-icons";


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
        activeCategory: "all",
        activeType: "all",
        activeRate: "all",
        voli: [],
        futsal: [],
        all: [],
        basket: [],
        tennis: [],
        badminton: [],
        indoor: [],
        outdoor: [],
        sangatBaik: [],
        baik: [],
        cukup: [],
        kurang: [],
        buruk: [],
        category: {

        }
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

    getLapanganTennis = () => {
        Axios.get(`${API_URL}/lapangan/tennis`, {
          params: {
            category: "tennis"
          }
        })
          .then((res) => {
            this.setState({ tennis: res.data })
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err)
          })
    }

    getLapanganBadminton = () => {
        Axios.get(`${API_URL}/lapangan/badminton`, {
          params: {
            category: "badminton"
          }
        })
          .then((res) => {
            this.setState({ badminton: res.data })
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

    getTypeIndoor = () => {
        Axios.get(`${API_URL}/lapangan/type`, {
            params: {
              type: "indoor"
            }
          })
            .then((res) => {
              this.setState({ indoor: res.data })
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err)
            })
    }

    getTypeOutdoor = () => {
        Axios.get(`${API_URL}/lapangan/type`, {
            params: {
              type: "outdoor"
            }
          })
            .then((res) => {
              this.setState({ outdoor: res.data })
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err)
            })
    }

    getRateSangatBaik = () => {
        Axios.get(`${API_URL}/lapangan/rate`, {
            params: {
              satu: 5,
              dua: 4
            }
          })
            .then((res) => {
              this.setState({ sangatBaik: res.data })
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err)
            })
    }

    getRateBaik = () => {
        Axios.get(`${API_URL}/lapangan/rate`, {
            params: {
              satu: 4,
              dua: 3
            }
          })
            .then((res) => {
              this.setState({ baik: res.data })
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err)
            })
    }

    getRateCukup = () => {
        Axios.get(`${API_URL}/lapangan/rate`, {
            params: {
              satu: 3,
              dua: 2
            }
          })
            .then((res) => {
              this.setState({ cukup: res.data })
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err)
            })
    }

    getRateKurang = () => {
        Axios.get(`${API_URL}/lapangan/rate`, {
            params: {
              satu: 2,
              dua: 1
            }
          })
            .then((res) => {
              this.setState({ kurang: res.data })
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err)
            })
    }

    getRateBuruk = () => {
        Axios.get(`${API_URL}/lapangan/rate`, {
            params: {
              satu: 1,
              dua: 0
            }
          })
            .then((res) => {
              this.setState({ buruk: res.data })
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
        this.getLapanganBadminton()
        this.getLapanganTennis()
        this.getTypeIndoor()
        this.getTypeOutdoor()
        this.getRateSangatBaik()
        this.getRateBaik()
        this.getRateCukup()
        this.getRateKurang()
        this.getRateBuruk()
    }
    

    renderLapangan = () => {
        if ( this.state.activeCategory === "all") {
            if (this.state.activeType === "indoor") {
                return this.state.indoor.map((val) => {
                    if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                      return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                    }
                })
            } else if ( this.state.activeType === "outdoor") {
                return this.state.outdoor.map((val) => {
                    if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                      return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                    }
                })
            } else if ( this.state.activeType === "all") {
                if (this.state.activeRate === "sangatbaik") {
                    return this.state.sangatBaik.map((val) => {
                        if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                          return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                        }
                    })
                } else if (this.state.activeRate === "baik") {
                    return this.state.baik.map((val) => {
                        if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                          return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                        }
                    })
                } else if (this.state.activeRate === "cukup") {
                    return this.state.cukup.map((val) => {
                        if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                          return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                        }
                    })
                } else if (this.state.activeRate === "kurang") {
                    return this.state.kurang.map((val) => {
                        if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                          return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                        }
                    })
                } else if (this.state.activeRate === "buruk") {
                    return this.state.buruk.map((val) => {
                        if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                          return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                        }
                    })
                }  else if (this.state.activeRate === "all") {
                    return this.state.all.map((val) => {
                        if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                          return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                        }
                    })
                } 
            } else {
                return this.state.all.map((val) => {
                    if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                      return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                        }
                })
            }
                
           
        } else if ( this.state.activeCategory === "basket" ) {
            return this.state.basket.map((val) => {
                if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                  return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                }
            })
        } else if ( this.state.activeCategory === "tennis" ) {
            return this.state.tennis.map((val) => {
                if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                  return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                }
            })
        } else if ( this.state.activeCategory === "badminton" ) {
            return this.state.badminton.map((val) => {
                if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                  return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                }
            })
        } else if ( this.state.activeCategory === "futsal" ) {
            return this.state.futsal.map((val) => {
                if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                  return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                }
            })
        } else if ( this.state.activeCategory === "voli" ) {
            return this.state.voli.map((val) => {
                if (val.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                  return <Link to={`/lapangan/${val.id}`} style={{ textDecoration: "none", color: "inherit" }}><CardLapangan key={`bestseller-${val.id}`} className="m-2" data={val} /></Link>
                }
            })
        }
        
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
                                    <Link to="/admin/list_user" style={{ textDecoration: "none", color: "inherit"}}>
                                    <button className="mt-4 button">
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
                                    <Link to="/admin/report/paket" style={{ textDecoration: "none", color: "inherit"}}>
                                    <button className="mt-4 button">
                                        Report Paket
                                    </button>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/admin/report/field" style={{ textDecoration: "none", color: "inherit"}}>
                                    <button className="mt-2 button">
                                        Report Field
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
                                    <Link to="/admin/list_field" style={{ textDecoration: "none", color: "inherit"}}>
                                    <button className="mt-2 button">
                                        List Field
                                    </button>
                                    </Link>
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
                                        className="mt-4 ml-2"
                                        icon={faTasks}
                                        style={{ fontSize: 100, color: "#336699" }}
                                    />
                                </div>
                                <div>
                                    <Link to="/admin/task" style={{ textDecoration: "none", color: "inherit"}}>
                                    <button className="mt-4 button">
                                        Task List
                                    </button>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/admin/task/list" style={{ textDecoration: "none", color: "inherit"}}>
                                    <button className="mt-2 button">
                                        Task Done
                                    </button>
                                    </Link>
                                </div>
                               
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="container-admin">
                                <div>
                                    <FontAwesomeIcon
                                        className="mt-4 ml-2"
                                        icon={faCalendarAlt}
                                        style={{ fontSize: 100, color: "#336699" }}
                                    />
                                </div>
                                <div>
                                    <Link to="/admin/report" style={{ textDecoration: "none", color: "inherit"}}>
                                    <button className="mt-4 button">
                                        Report Day
                                    </button>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/admin/validasi" style={{ textDecoration: "none", color: "inherit"}}>
                                    <button className="mt-2 button">
                                        Validasi
                                    </button>
                                    </Link>
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
                                        <p className="ml-3 mt-5" style={{ fontSize: "12px", fontWeight: "bold" }}>Cabang Olahraga</p>
                                        <div className="">

                                            <select className="mt-1 select-wrap">
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeCategory: "all"
                                                    })} 
                                                >
                                                    All
                                                </option>
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeCategory: "voli"
                                                    })} 
                                                >
                                                    voli
                                                </option>
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeCategory: "basket"
                                                    })} 
                                                >
                                                    basket
                                                </option>
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeCategory: "tennis"
                                                    })} 
                                                >
                                                    tennis
                                                </option>
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeCategory: "badminton"
                                                    })} 
                                                >
                                                    badminton
                                                </option>
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeCategory: "futsal"
                                                    })} 
                                                >
                                                    futsal
                                                </option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="dalam">
                                        <p className="ml-3 mt-4" style={{ fontSize: "12px", fontWeight: "bold" }}>Type Lapangan</p>
                                        <div className="">
                                            <select  className="mt-1 select-wrap">
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeType: "indoor"
                                                    })} 
                                                >
                                                    indoor
                                                </option>
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeType: "outdoor"
                                                    })} 
                                                >
                                                    outdoor
                                                </option>
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeType: "all"
                                                    })} 
                                                >
                                                    Show All
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="dalam">
                                        <p className="ml-3 mt-4" style={{ fontSize: "12px", fontWeight: "bold" }}>Rating</p>
                                        <select className="mt-1 select-wrap" >
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeRate: "sangatbaik"
                                                    })} 
                                                >
                                                    Sangat Baik
                                                </option>
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeRate: "baik"
                                                    })} 
                                                >
                                                    Baik
                                                </option>
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeRate: "cukup"
                                                    })} 
                                                >
                                                    Cukup
                                                </option>
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeRate: "Kurang"
                                                    })} 
                                                >
                                                    Kurang
                                                </option>
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeRate: "buruk"
                                                    })} 
                                                >
                                                    Buruk
                                                </option>
                                                <option 
                                                    value="" 
                                                    onClick={() => this.setState({
                                                        activeRate: "all"
                                                    })} 
                                                >
                                                    Show All
                                                </option>
                                            </select>
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

