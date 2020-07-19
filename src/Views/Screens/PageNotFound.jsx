import React from "react"
import notFound from "../../Assets/Images/404.png"


class PageNotFound extends React.Component {

    render() {
        return (
            <div>
                <center>
                    <img className="mt-5" src={notFound} alt=""/>
                </center>
                
            </div>
        )
    }
}

export default PageNotFound;