import { useEffect, useState } from "react";
import Field from "../../../components/field";
import Form from "../../../components/form";
import "./styles.scss";
import PageHeader from "../../../components/page-header";
import PageBody from "../../../components/page-body";
import { useNavigate, useParams } from "react-router";
import { getDepartmentById, updateDepartmentById } from "../../../api/departamento";
import Button from "../../../components/button";
import GroupButton from "../../../components/group-button";

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
                <Form onSubmit={handleOnClick}>
                    <Field label="Nome" type="text" value={nome} setValue={setNome}/>
                    
                    <GroupButton>
                        <Button type="button" onClick={() => navigate(-1)}>Voltar</Button>
                        <Button type="submit">Salvar</Button>
                    </GroupButton>
                </Form>
            </PageBody>
        </section>
    );
}

export default EditarDepartamentoPage;