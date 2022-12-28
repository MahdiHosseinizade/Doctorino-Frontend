import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const PrivateSwitch = ({ children, role, ...rest }) => {

    const { user } = useContext(AuthContext);

    return (
        <>
            {user && role && user.role === role ? <Route {...rest} /> : <Redirect to="/" />}
        </>
    )
}

export default PrivateSwitch
