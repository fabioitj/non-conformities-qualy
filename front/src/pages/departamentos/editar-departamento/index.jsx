import { useEffect, useState } from "react";
import Field from "../../../components/field";
import Form from "../../../components/form";
import "./styles.scss";
import PageHeader from "../../../components/page-header";
import PageBody from "../../../components/page-body";
import { useNavigate, useParams } from "react-router";
import { getDepartmentById, updateDepartmentById } from "../../../api/departamentos";
import Button from "../../../components/button";

function EditarDepartamentoPage() {
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        getDepartmentById(id)
            .then((response) => {
                setNome(response.data.name);
            })
            .catch(err => alert(err.message));

    }, []);

    const handleOnClick = (e) => {
        e.preventDefault();

        updateDepartmentById(id, {name: nome})
            .then((response) => {
                alert("Departamento salvo com sucesso!");
                navigate("/departamentos");
            })
            .catch((err) => alert(err.message));
    }

    return (
        <section className="editar-departamento">
            <PageHeader
                title="Editar departamentos"
            />
            <PageBody>
                <Form>
                    <Field label="Id" type="text" value={id} isReadOnly/>
                    <Field label="Nome" type="text" value={nome} setValue={setNome}/>
                    <Button type="submit" onClick={handleOnClick}>Salvar</Button>
                </Form>
            </PageBody>
        </section>
    );
}

export default EditarDepartamentoPage;