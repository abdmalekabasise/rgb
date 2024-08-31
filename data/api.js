import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const url = "http://localhost:5000";

export const signUp = async (body) => {
    try {
        const response = await axios.post(`${url}/api/auth/register`, body);
        return response.data;
    } catch (e) {
        console.log("error");
    }


}
export const login = async (body) => {
    try {
        const response = await axios.post(`${url}/api/auth/login`, body);
        return response.data;
    } catch (e) {
        console.log("error :", e);
    }

}

export const forgotPassword = async (body) => {
    try {
        const response = await axios.post(`${url}/api/auth/forgot-password`, body);
        return response.data;
    } catch (e) {
        console.log("error :", e);
    }

}
export const userIsLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = decodeToken(token);
        console.log('Decoded Token:', decodedToken);
        return decodeToken ? true : false;
    }
    return false;



}
const decodeToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (err) {
        console.error('Token decoding failed:', err);
        return null;
    }
};