import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/addresses/";
const userToken = localStorage.getItem('userToken');

export const getAddressById = (addressId: string) => {
    return axios.get(API_URL + addressId, { headers: { Authorization: `${userToken}` } });
}
