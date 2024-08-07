import { jwtDecode } from 'jwt-decode';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const GetUserId = () => {
    const token = getCookie('jwt');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.id;
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return null;
        }
    }
    return null;
};

export default GetUserId;