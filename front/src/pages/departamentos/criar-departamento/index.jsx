import { useState } from "react";
import Field from "../../../components/field";
import Form from "../../../components/form";
import "./styles.scss";
import PageHeader from "../../../components/page-header";
import PageBody from "../../../components/page-body";
import { useNavigate } from "react-router";
import { createDepartment } from "../../../api/departamentos";
import Button from "../../../components/button";

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
                <Form>
                    <Field label="Nome" type="text" value={nome} setValue={setNome}/>
                    
                    <Button type="submit" onClick={handleOnClick}>Salvar</Button>
                </Form>
            </PageBody>
        </section>
    );
}

export default CriarDepartamentoPage;