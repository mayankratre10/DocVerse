import axios from 'axios';
// import 'dotenv/config';
axios.defaults.baseURL = 'http://localhost:3000';

export const callServer = async (
    method, endpoint, payload
) => {
    console.log(payload)
    const token = await localStorage.getItem('token');
    try {
        // console.log(localStorage.getItem('token'), method)
        const response = await axios({
            method,
            url:  endpoint,
            data:payload,
            headers: {
                authorization: ` Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }
            ,

        );
        return response.data;
    } catch (error) {
        return error;
    }
}
export const callServerFile = async (
    method, endpoint, payload
) => {
    // console.log(payload)
    const token = await localStorage.getItem('token');
    try {
        console.log(localStorage.getItem('token'), method)
        const response = await axios({
            method,
            url:  endpoint,
            data:payload,
            headers: {
                authorization: ` Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        }
            ,

        );
        return response.data;
    } catch (error) {
        return error;
    }
}

