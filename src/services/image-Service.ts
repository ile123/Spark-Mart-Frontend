import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/images/";
const userToken = localStorage.getItem('userToken');

export const getBrandImage = (imageName: string) => {
    return axios.get(API_URL + "brand/" + imageName, { headers: { Authorization: `${userToken}` } });
}