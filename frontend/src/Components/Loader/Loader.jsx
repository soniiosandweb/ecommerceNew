import { Spinner } from "react-bootstrap";
import "./Loader.css";

const Loader = () => {
    return(
        <div className="loader_block">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader