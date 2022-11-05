import { Link } from "react-router-dom";


const NotFound = () => {
    return (
        <div className="notfound">
            <p >
                404
                <br/>
                this page not found
            </p>
            <Link to='/'>LoginPage</Link>
        </div>
    );
}
 
export default NotFound;