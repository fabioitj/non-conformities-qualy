import { useEffect, useState } from "react";
import DataTable from "../../components/datatable";
import PageBody from "../../components/page-body";
import PageHeader from "../../components/page-header";
import columns from "./constants/datatable-columns";
import "./styles.scss";
import { getDepartments, removeDepartmentById } from "../../api/departamentos";

function DepartamentosPage() {
    const [departamentos, setDepartamentos] = useState([]);

    useEffect(() => {
        getDepartments()
            .then((response) => {
                setDepartamentos(response.data);
            })
            .catch((err) => alert(err));
    }, []);

    const handleOnRemove = (id) => {
        removeDepartmentById(id)
            .then(() => {
                setDepartamentos(departamentos => departamentos.filter(departamento => departamento.id !== id));
            })
            .catch((err) => alert(err.message));
    }

    return (
        <section className="departamentos">
            <PageHeader
                title="Departamentos"
                hasAdd
                pathAdd="/departamentos/criar"
            />
            <PageBody>
                <DataTable columns={columns} data={departamentos} pathEdit="/departamentos/" onRemove={handleOnRemove}/>
            </PageBody>
        </section>
    );
}

export default DepartamentosPage;