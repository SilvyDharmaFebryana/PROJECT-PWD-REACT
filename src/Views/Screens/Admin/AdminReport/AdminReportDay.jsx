import React from "react"
import { Breadcrumb, BreadcrumbItem, Table, Button, InputGroup, FormControl } from "react-bootstrap";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AdminReportDay.css"
import DatePicker from "react-datepicker";
import { API_URL } from "../../../../Constants/API";
import Axios from "axios"
import swal from "sweetalert";
import { faSearch, faStepBackward, faFastBackward, faStepForward, faFastForward } from "@fortawesome/free-solid-svg-icons";
import { searchInputHandler } from "../../../../Redux/Actions";
import { connect } from "react-redux";
import { priceFormatter } from "../../../../Supports/formatter";


class AdminReportDay extends React.Component{

    state = {
        report : {
            endDate : new Date(),
            date: new Date(),
            fieldId : 0,
            status: "approve"
        },
        hasilSeacrh: [],
        all: [],
        currentPage : 0,
        listPerPage : 4,
        totalPages: 0,
        totalElements: 0
    }


    onChangeDate = (tanggal) => {
        const ISODate = tanggal.toISOString()
        this.setState({
            report: {
              ...this.state.report,
              date: tanggal,
            },
          });
        console.log(tanggal)
    }

    
    onChangeENDDate = (tanggal) => {
        const ISODate = tanggal.toISOString()
        this.setState({
            report: {
              ...this.state.report,
              endDate: tanggal,
            },
          });
        console.log(tanggal)
    }
   

    getJadwal = () => {
        
        Axios.get(`${API_URL}/transaction/details/admin/report/day/date` , {
            params: {
                booking_date : this.state.report.date,
                status : "approve",
                field_id : this.state.report.fieldId,
                end_date : this.state.report.endDate
            }
        })
        .then((res) => {
            console.log(res.data);
           
            if (res.data.length === 0 ) {
                swal(
                    "Kosong!",
                    "Tidak ada booking list",
                    ""
                )
            }
            this.setState({ hasilSeacrh : res.data })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getAllReport = (currentPage) => {

        currentPage -= 1;

        Axios.get(`${API_URL}/transaction/details/admin/?page=${currentPage}&size=${this.state.listPerPage}`)
        .then((res) => {
            // this.setState({ all: res.data })
            this.setState ({ 
                all: res.data.content,
                totalPages: res.data.totalPages,
                totalElements: res.data.totalElements,
                currentPage: res.data.number + 1,
            })
            console.log(res.data);            
        })
        .catch((err) => {
            console.log(err);
            
        })
    }


    inputHandler = (e, field, form) => {
        const { value } = e.target;
        this.setState({
          [form]: {
            ...this.state[form],
            [field]: value,
          },
        });
      };



    componentDidMount() {
        this.getAllReport()
        // console.log(this.state.report.date);
        // this.getJadwal()
        
    }

    changePage = event => {
        let targetPage = parseInt(event.target.value)
        this.getAllReport(targetPage);
        this.setState({
          [event.target.name]: targetPage
        })
      }
  
      prevPage = () => {
        let prevPage = 1;
          if (this.state.currentPage > prevPage) {
            this.getAllReport(this.state.currentPage - prevPage);
          }
      }
  
      nextPage = () => {
          if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.listPerPage)) {
            this.getAllReport(this.state.currentPage + 1)
          }
      }
  
      firstPage = () => {
        let firstPage = 1;
  
          if (this.state.currentPage > firstPage) {
            this.getAllReport(firstPage);
        }
      }
  
  
      lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.listPerPage)
          if (this.state.currentPage < condition) {
            this.getAllReport(condition)
          }
      }
  

    pageHandler = () => {
        
        if ( this.state.report.fieldId === 0) {
            const { currentPage, totalPages } = this.state;
            return (
                <>
                    <InputGroup size="sm">
                    <InputGroup.Prepend>
                        <Button className="pag-color" disabled={currentPage === 1 ? true : false}
                        onClick={this.firstPage}><FontAwesomeIcon icon={faFastBackward} /></Button>
                        <Button className="pag-color" disabled={currentPage === 1 ? true : false}
                        onClick={this.prevPage}><FontAwesomeIcon icon={faStepBackward} /></Button>
                    </InputGroup.Prepend>
                    <FormControl className="text-center" name="currentPage" value={"Page " + currentPage + " of "  + totalPages}
                        onChange={this.changePage} disabled/>
                    <InputGroup.Append>
                        <Button className="pag-color" disabled={currentPage === totalPages ? true : false}
                        onClick={this.nextPage}><FontAwesomeIcon icon={faStepForward} /></Button>
                        <Button className="pag-color" disabled={currentPage === totalPages ? true : false}
                        onClick={this.lastPage}><FontAwesomeIcon icon={faFastForward} /></Button>
                    </InputGroup.Append>
                    </InputGroup>
                </>
            )
        } 
    }


    renderReport = () => {
        if ( this.state.report.fieldId === 0) {
            return this.state.all.map((val, idx) => {
                if (val.kodeBooking.toLowerCase().includes(this.props.search.searchInput.toLowerCase()) || 
                    val.field.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase()) || 
                    val.bookingDate.toLowerCase().includes(this.props.search.searchInput.toLowerCase()) 
                    ) 
                    {
                return (
                    <tbody>
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{val.field.fieldName}</td>
                            <td>{val.bookingDate}</td>
                            <td>{val.kodeBooking}</td>
                            <td>{val.time}</td>
                            <td>{priceFormatter(val.totalPrice)}</td>
     
                        </tr>
                    </tbody>
                )
                }
            })
        } else {
            return this.state.hasilSeacrh.map((val, idx) => {
                if (val.kodeBooking.toLowerCase().includes(this.props.search.searchInput.toLowerCase()) || 
                val.field.fieldName.toLowerCase().includes(this.props.search.searchInput.toLowerCase()) || 
                val.bookingDate.toLowerCase().includes(this.props.search.searchInput.toLowerCase()) 
                ) 
                {
                return (
                    <tbody>
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{val.field.fieldName}</td>
                            <td>{val.bookingDate}</td>
                            <td>{val.kodeBooking}</td>
                            <td>{val.time}</td>
                            <td>{priceFormatter(val.totalPrice)}</td>
                    
                        </tr>
                    </tbody>
                )
                }
            })
        }
    }

    render () {
        return (
            <div>
                 <div className="mt-1">
                    <Breadcrumb>
                        <BreadcrumbItem active>
                            <h5 className="font-weight-bolder m-1">
                                <FontAwesomeIcon
                                    className="mt-2 mr-2"
                                    icon={faCalendar}
                                    style={{ fontSize: 18 }}
                                /> Admin Day Report 
                            </h5>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="wrap-report-admin">
                    <div className="row">
                        <div className="col-3">
                            <div>
                                <h6>Pilih Tanggal :</h6>
                                <DatePicker
                                    classNam="ml-5"
                                    selected={this.state.report.date}
                                    onChange={this.onChangeDate}
                                    value={(this.state.report.date)}
                                    style={{ color: "#003cb3" }}
                                    // dateFormat="MM/dd/yyyy"
                                    minDate={new Date()}
                                    // isClearable={true}
                                    
                                    
                                /> 
                                <p>-</p>
                                 <DatePicker
                                    classNam="ml-5 ml-2"
                                    selected={this.state.report.endDate}
                                    onChange={this.onChangeENDDate}
                                    value={(this.state.report.endDate)}
                                    style={{ color: "#003cb3" }}
                                    // dateFormat="MM/dd/yyyy"
                                    minDate={new Date()}
                                    // isClearable={true}
                                    
                                    
                                />
                                {console.log(this.state.report.date)}
                            </div>
                            <div>
                                <h6 className="mt-4">Pilih Lapangan : </h6>
                                <select
                                    // value={this.state.report.fieldId}
                                    className="custom-text-input mt-1"
                                    onChange={(e) =>
                                        this.inputHandler(e, "fieldId", "report")
                                      }
                                >
                                      <option
                                         onClick={() =>
                                            this.setState({
                                              report: {
                                                ...this.state.report,
                                                fieldId: 0,
                                              },
                                            })
                                          }
                                        value="All Booking List"
                                    >
                                        All Booking List
                                    </option>
                                    <option
                                         onClick={() =>
                                            this.setState({
                                              report: {
                                                ...this.state.report,
                                                fieldId: 1,
                                              },
                                            })
                                          }
                                        value="Lapangan Voli (Indoor)"
                                    >
                                        Lapangan Voli (Indoor)
                                    </option>
                                    <option
                                         onClick={() =>
                                            this.setState({
                                              report: {
                                                ...this.state.report,
                                                fieldId: 2,
                                              },
                                            })
                                          }
                                        value="Lapangan Voli (Outdoor)"
                                    >
                                        Lapangan Voli (Outdoor)
                                    </option>
                                    <option
                                         onClick={() =>
                                            this.setState({
                                              report: {
                                                ...this.state.report,
                                                fieldId: 3,
                                              },
                                            })
                                          }
                                        value="Lapangan Basket (Indoor)"
                                    >
                                        Lapangan Basket (Indoor)
                                    </option>
                                    <option
                                         onClick={() =>
                                            this.setState({
                                              report: {
                                                ...this.state.report,
                                                fieldId: 4,
                                              },
                                            })
                                          }
                                        value="Lapangan Basket (Outdoor)"
                                    >
                                        Lapangan Basket (Outdoor)
                                    </option>
                                    <option
                                         onClick={() =>
                                            this.setState({
                                              report: {
                                                ...this.state.report,
                                                fieldId: 5,
                                              },
                                            })
                                          }
                                        value="Lapangan Futsal (Indoor)"
                                    >
                                        Lapangan Futsal (Indoor)
                                    </option>
                                    <option
                                         onClick={() =>
                                            this.setState({
                                              report: {
                                                ...this.state.report,
                                                fieldId: 6,
                                              },
                                            })
                                          }
                                        value="Lapangan Futsal (Outdoor)"
                                    >
                                        Lapangan Futsal (Outdoor)
                                    </option>
                                </select>
                            </div>
                            <div>
                                <Button className="mt-2" color="primary" onClick={this.getJadwal}>Get</Button>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <FontAwesomeIcon
                                        className="mt-1 mr-3 mb-3"
                                        icon={faSearch}
                                        style={{ fontSize: 23, color: "#003cb3" }}
                                    />
                                    <input 
                                        className="mr-5 mb-3 input-search" 
                                        type="text" 
                                        placeholder="Kode Booking"  
                                        onChange={(e) => this.props.onSearch(e.target.value)}
                                    />
                                </div>
                                <div>
                                    {
                                        this.pageHandler()
                                    }
                                </div>
                           
                            </div>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>no</th>
                                        <th>Nama Lapangan</th>
                                        <th>Tanggal Booking</th>
                                        <th>Kode Booking</th>
                                        <th>Jam</th>
                                        <th colSpan={2}>Total Price</th>    
                                      
                                    </tr>
                                </thead>
                                {
                                    this.renderReport()
                                }
                            </Table>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    };
};

const mapDispatchToProps = {
    onSearch: searchInputHandler,

  };

export default connect(mapStateToProps, mapDispatchToProps)(AdminReportDay)