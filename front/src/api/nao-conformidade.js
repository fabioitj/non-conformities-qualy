import axios from "axios";

const getNaoConformidades = () => {
    return axios.get("http://localhost:3000/non-conformities");
};

const getNaoConformidadeById = (id) => {
    return axios.get("http://localhost:3000/non-conformities/" + id);
}

const createNaoConformidade = (data) => {
    return axios.post("http://localhost:3000/non-conformities", data);
}

const removeNaoConformidade = (id) => {
    return axios.delete("http://localhost:3000/non-conformities/" + id);
}

export {
    getNaoConformidades,
    getNaoConformidadeById,
    createNaoConformidade,
    removeNaoConformidade,
}