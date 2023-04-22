import axios from "axios";
import authHeader from "../auth/authHeader";

const API_URL = "http://localhost:8080/api/users/";

const getAllUsers = () => {
    return axios.get(API_URL, { headers: authHeader() });
}

const getUserById = (userId: string) => {
    return axios.get(API_URL + userId, { headers: authHeader() });
}

const updateUser = (userId: string, userInformation: any) => {
    return axios.put(API_URL + '/update-user/' + userId, {
        firstName: userInformation.firstName,
        lastName: userInformation.lastName,
        phoneNumber: userInformation.phoneNumber,
    }, { headers: authHeader()});
}

const changeUserAddress = (userId: string, addressInformation: any) => {
    return axios.put(API_URL + '/change-address/' + userId, {
        streetAddress: addressInformation.streetAddress,
        city: addressInformation.city,
        postalCode: addressInformation.postalCode,
        province: addressInformation.province,
        country: addressInformation.country
    }, { headers: authHeader()});
}

const deleteUser = (userId: string) => {
    return axios.delete(API_URL + userId, { headers: authHeader() });
}

export default {
    getAllUsers,
    getUserById,
    updateUser,
    changeUserAddress,
    deleteUser
}