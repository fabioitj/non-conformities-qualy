import axios from "axios";

const getDepartments = () => {
    return axios.get("http://localhost:3000/departments");
};

const getDepartmentById = (id) => {
    return axios.get(`http://localhost:3000/departments/${id}`);
};

const createDepartment = (data) => {
    return axios.post('http://localhost:3000/departments', data);
}

const updateDepartmentById = (id, data) => {
    return axios.put(`http://localhost:3000/departments/${id}`, data);
}

const removeDepartmentById = (id) => {
    return axios.delete(`http://localhost:3000/departments/${id}`);
}

export {
    getDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartmentById,
    removeDepartmentById
};