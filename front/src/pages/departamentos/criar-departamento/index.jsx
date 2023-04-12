import { useState } from "react";
import Field from "../../../components/field";
import Form from "../../../components/form";
import "./styles.scss";
import PageHeader from "../../../components/page-header";
import PageBody from "../../../components/page-body";
import { useNavigate } from "react-router";
import { createDepartment } from "../../../api/departamento";
import Button from "../../../components/button";
import GroupButton from "../../../components/group-button";

function CriarDepartamentoPage() {
    const [nome, setNome] = useState("");

    const navigate = useNavigate();

    const handleOnClick = (e) => {
        e.preventDefault();

        createDepartment({name: nome})
            .then((response) => {   
                alert("Departamento salvo com sucesso!");
                navigate("/departamentos");
            })
            .catch((err) => alert(err.message));

    }

    return (
        <section className="criar-departamento">
            <PageHeader
                title="Criar departamentos"
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

export default CriarDepartamentoPage;