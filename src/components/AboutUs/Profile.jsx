import './Profile.css';

const Profile = () => {
    
    return (
        <div className="card">
            <div className="prof-image">
                <img src="https://picsum.photos/200/300" alt="profile" />
            </div>
            <div className="insideText" >
                <div className="insideText" >
                    <h3>John Doe</h3>
                </div>
            </div>
        </div>
    );
}
 
export default Profile;