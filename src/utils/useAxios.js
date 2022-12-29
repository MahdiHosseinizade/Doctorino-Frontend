import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'


export const baseURL = 'http://188.121.113.74'

const useAxios = () => {
    const { authData, setUser, setAuthTokens, logOut, extractUserData } = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `${authData?.access}` }
    });


    axiosInstance.interceptors.request.use(async req => {

        const user = jwt_decode(authData.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 10;

        if (!isExpired) return req

        const response = await axios.post(`${baseURL}/api/auth/token/refresh/`, {
            refresh: authData.refresh
        });

        if (response.status === 401) {
            logOut();
        } else {
            authData.access = response.data.access;

            req.headers.Authorization = `Bearer ${response.data.access}`
            
            localStorage.setItem('authData', JSON.stringify(authData));
            
            return req
        }
    })

    return axiosInstance
}

export default useAxios;
