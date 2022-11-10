import { Link } from "react-router-dom";
// import notfound from '../../assets/img/notfound.jpg'

const NotFound = () => {
    return (
        <div className="notfound">
            <p >
                404
                <br/>
                this page not found
            </p>
            <Link to='/'>LoginPage</Link>
            {/* <img src={notfound} alt="notfound" /> */}
         </div>
        
    );
}
 
export default NotFound;