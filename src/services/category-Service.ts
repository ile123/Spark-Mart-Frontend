import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/categories";
const userToken = localStorage.getItem("userToken");

export const getAllCategories = async (
  pageNum: number,
  pageSize: number,
  sortBy: string,
  sortDir: string,
  searchValue: string
) => {
  if (searchValue === "") {
    return await axios.get(
      API_URL +
        "?page=" +
        pageNum +
        "&pageSize=" +
        pageSize +
        "&sortBy=" +
        sortBy +
        "&sortDir=" +
        sortDir,
      { headers: { Authorization: `${userToken}` } }
    );
  } else {
    return await axios.get(
      API_URL +
        "?page=" +
        pageNum +
        "&pageSize=" +
        pageSize +
        "&sortBy=" +
        sortBy +
        "&sortDir=" +
        sortDir +
        "&keyword=" +
        searchValue,
      { headers: { Authorization: `${userToken}` } }
    );
  }
};

export const createNewCategory = async (newCategory: any) => {
  return await axios.post(API_URL, newCategory, {
    headers: {
      Authorization: `${userToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCategoryById = async (categoryId: string) => {
  return await axios.get(API_URL + "/" + categoryId, {
    headers: { Authorization: `${userToken}` },
  });
};

export const deleteCategory = async (categoryId: string) => {
  return await axios.delete(API_URL + "/" + categoryId, {
    headers: { Authorization: `${userToken}` },
  });
};

export const updateCategory = async (newCategory: any) => {
  return await axios.put(API_URL + "/" + newCategory.id, newCategory, {
    headers: {
      Authorization: `${userToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
