import axios from 'axios';
// import 'dotenv/config';
axios.defaults.baseURL = 'http://localhost:3000';

export const callServer = async (
    method, endpoint, payload
) => {
    try {

        const response = await axios({
            method,
            url:  endpoint,
            data: payload,
            headers: {
                authorization: ` Bearer ${localStorage.getItem("token")}`,
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

