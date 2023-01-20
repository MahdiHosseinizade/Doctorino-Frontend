import Profile from "./Profile";
import './aboutus.css';
import Seyed from '../../assets/img/MyPic.jpg';
import Amad from '../../assets/img/Amad.jpg';
import houman from '../../assets/img/houman.jpg'
import SeyedMir from '../../assets/img/SeyedMir.jpg';
import Mehti from '../../assets/img/Ghazavi.jpg';
import NavBar from '../NavBar/newNavBar'
const AboutUs = () => {
    return (
        <div>
            <div className="aboutUs">
                {/* <h1>درباره ما</h1> */}
                <NavBar/>
                <br></br>
            </div>
            <div className="about-us">
                <Profile name ={'سید مهدی حسینی زاده'} image={Seyed} position = {'فرانت اند'} />
                <Profile name ={'احمد رضا طهماسبی'} image={Amad} position = {'بک اند'} />
                <Profile name ={'رضا حقیقت گو'} image={houman} position = {'فرانت اند'} />
                <Profile name ={'سید امیر حسین میر محمدی'} image={SeyedMir} position = {'بک اند'} />
                <Profile name ={'مهدی قضاوی'} image={Mehti} position = {'فرانت اند'} />
                <Profile name = {'محسن رحیمی'} image={Mehti} position = {'فرانت اند'} />
            </div> 
        </div>
    );
}
 
export default AboutUs;