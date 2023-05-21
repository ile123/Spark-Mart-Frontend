import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/users/";
const userToken = localStorage.getItem('userToken');

export const getAllUsers = () => {
    return axios.get(API_URL, { headers: { Authorization: `Bearer ${userToken}` } });
}

export const getUserById = (userId: string) => {
    return axios.get(API_URL + userId, { headers: { Authorization: `${userToken}` } });
}

export const updateUser = (userId: string, userInformation: any) => {
    return axios.put(API_URL + 'update-user/' + userId, {
        firstName: userInformation.firstName,
        lastName: userInformation.lastName,
        phoneNumber: userInformation.phoneNumber,
    }, { headers: { Authorization: `${userToken}` } });
}

export const changeUserPassword = (userId: string, password: any) => {
    return axios.patch(API_URL + 'change-password/' + userId, {
        newPassword: password
    }, { headers: { Authorization: `${userToken}` } })
}

export const changeUserAddress = (userId: string, addressInformation: any) => {
    return axios.put(API_URL + 'change-address/' + userId, {
        id: addressInformation.id,
        streetAddress: addressInformation.streetAddress,
        city: addressInformation.city,
        postalCode: addressInformation.postalCode,
        province: addressInformation.province,
        country: addressInformation.country
    }, { headers: { Authorization: `${userToken}` } });
}

export const deleteUser = (userId: string) => {
    return axios.delete(API_URL + userId, { headers: { Authorization: `${userToken}` } });
}
