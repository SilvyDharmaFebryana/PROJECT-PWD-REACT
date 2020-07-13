import React from "react"
import Axios from "axios"
import { API_URL } from "../../../../../Constants/API"
import { faStepBackward, faFastBackward, faStepForward, faFastForward } from "@fortawesome/free-solid-svg-icons/";
import { Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl, Breadcrumb, BreadcrumbItem, } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Button from "../../../../Components/Buttons/Buttons";
import { priceFormatter } from "../../../../../Supports/formatter";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import "./TaskList.css"


class TaskList extends React.Component {
    state = {
        taskList: [],
        currentPage : 0,
        listPerPage : 4,
        // targetPage: 0,
        totalPages: 0,
        totalElements: 0
    }

    getAllListDone = (currentPage) => {
        currentPage -= 1;

        Axios.get(`${API_URL}/transaction/pagination?page=${currentPage}&size=${this.state.listPerPage}` )
        .then((res) => {
            this.setState({
                taskList: res.data.content,
                totalPages: res.data.totalPages,
                totalElements: res.data.totalElements,
                currentPage: res.data.number + 1
            })
        })

    }

    componentDidMount() {
      this.getAllListDone()
    }
    
    renderList = () => {
        return this.state.taskList.map((val, idx) => {
            return (
                
                    <tr>
                        <td>{idx + 1}</td>
                        <td>Order #{val.noPesanan}</td>
                        <td>{val.checkoutDate}</td>
                        <td>{val.approveDate}</td>
                        <td>{priceFormatter(val.grandTotal)}</td>
                    </tr>
           
            )
        })
    }

    changePage = event => {
      let targetPage = parseInt(event.target.value)
      this.getAllListDone(targetPage);
      this.setState({
        [event.target.name]: targetPage
      })
    }

    prevPage = () => {
      let prevPage = 1;
        if (this.state.currentPage > prevPage) {
          this.getAllListDone(this.state.currentPage - prevPage);
        }
    }

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.listPerPage)) {
          this.getAllListDone(this.state.currentPage + 1)
        }
    }

    firstPage = () => {
      let firstPage = 1;

        if (this.state.currentPage > firstPage) {
          this.getAllListDone(firstPage);
      }
    }


    lastPage = () => {
      let condition = Math.ceil(this.state.totalElements / this.state.listPerPage)
        if (this.state.currentPage < condition) {
          this.getAllListDone(condition)
        }
    }

    pageHandler = () => {
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


    render() {
        return (
            <div>
                 <div className="mt-1">
                    <Breadcrumb>
                        <BreadcrumbItem active>
                            <h5 className="font-weight-bolder m-1">
                                <FontAwesomeIcon
                                    className="mt-2 mr-2"
                                    icon={faListAlt}
                                    style={{ fontSize: 18 }}
                                /> All Transactions List 
                            </h5>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                
                <div className="mb-2 pagination-task " style={{ width: "20%" }}>
                    {
                      this.pageHandler()
                    }
                </div>
                <div className="table-list-margin">
                <Table style={{ width: "97%" }}>
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>No Pesanan</th>
                            <th>Checkout Date</th>
                            <th>Approve Date</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                      {this.renderList()}
                    </tbody>
                    

                </Table>
                </div>
            </div>
        )
    }
}

export default TaskList;