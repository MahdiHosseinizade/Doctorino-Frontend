import './Profile.css';

const Profile = ({name,image, position}) => {
    
    return (
        <div className="card">
            <div className="prof-image">
                <img src={image} alt="profile" />
            </div>
            <div className="insideText" >
                <div className="cardTitle" >
                    <h3 className='CardName'>{name}</h3>
                    <h3 className='CardPosition'>توسعه دهنده {position}</h3>
                </div>
            </div>
        </div>
    );
}
 
export default Profile;