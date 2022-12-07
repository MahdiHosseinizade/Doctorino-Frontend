import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const PrivateSwitch = ({ children, ...rest }) => {

    const { user } = useContext(AuthContext);

    return (
        <>
            {user ? <Route {...rest} /> : <Redirect to="/" />}
        </>
    )
}

export default PrivateSwitch
