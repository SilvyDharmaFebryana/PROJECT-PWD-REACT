import React from 'react'
import homePic from "../../../Assets/Images/home1.png"

class Home extends React.Component {
    render() {
        return (
            <>
            <div className="text-center">
                <div className="d-flex">
                    <h1></h1>
                </div>
                <div>
                    <img className="mt-5" style={{ width: "50%", opacity: "100px" }} src={homePic} alt="" />
                </div>
            </div>
            <div
                className="py-5"
                style={{ marginTop: "128px", backgroundColor: "#cccccc" }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-center d-flex flex-column align-items-center">
                            <h3 className="font-weight-bolder mt-4">FAST SHIPPING</h3>
                            <p className="mt-4">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
                                impedit facilis nam vitae, accusamus doloribus alias
                                repellendus veniam voluptates ad doloremque sequi est, at
                                fugit pariatur quisquam ratione, earum sapiente.
                            </p>
                        </div>
                        <div className="col-4 text-center d-flex flex-column align-items-center">
                            <h3 className="font-weight-bolder mt-4">100% REFUND</h3>
                            <p className="mt-4">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
                                impedit facilis nam vitae, accusamus doloribus alias
                                repellendus veniam voluptates ad doloremque sequi est, at
                                fugit pariatur quisquam ratione, earum sapiente.
                            </p>
                        </div>
                        <div className="col-4 text-center d-flex flex-column align-items-center">
                            <h3 className="font-weight-bolder mt-4">SUPPORT 24/7</h3>
                            <p className="mt-4">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
                                impedit facilis nam vitae, accusamus doloribus alias
                                repellendus veniam voluptates ad doloremque sequi est, at
                                fugit pariatur quisquam ratione, earum sapiente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Home