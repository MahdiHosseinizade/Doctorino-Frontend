import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

// const baseURL = 'http://127.0.0.1:8000'
const baseURL = 'http://188.121.113.74'


const useAxios = () => {
    const { authTokens, setUser, setAuthTokens, logOut } = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `${authTokens?.access}` }
    });


    axiosInstance.interceptors.request.use(async req => {

        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 10;

        if (!isExpired) return req

        const response = await axios.post(`${baseURL}/api/auth/token/refresh/`, {
            refresh: authTokens.refresh
        });


        if (response.status === 401) {
            logOut();
        } else {
            localStorage.setItem('authTokens', JSON.stringify(response.data))

            setAuthTokens((perv) => ({
                refresh: perv.refresh,
                access: response.data.access,
            }))

            authTokens.access = response.data.access;

            setUser(jwt_decode(response.data.access))

            req.headers.Authorization = `${response.data.access}`
            
            localStorage.setItem('authTokens', JSON.stringify(authTokens));
            
            return req
        }
    })

    return axiosInstance
}

export default useAxios;
