import axios from "axios";

const getNaoConformidades = async () => {
    try {
      const response = await axios.get("http://localhost:3000/non-conformities");
      const naoConformidades = response.data;
  
      const result = await Promise.all(
        naoConformidades.map(async (nc) => {
          const departmentsPromises = nc.departments.map(async (id) => {
            const departmentResponse = await axios.get(`http://localhost:3000/departments/${id}`);
            return departmentResponse.data.name;
          });
          const departments = await Promise.all(departmentsPromises);
          const updatedNc = { ...nc, departments };
          return updatedNc;
        })
      );
  
      return result;
    } catch (error) {
      console.error(error);
    }
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