import { useEffect, useState } from "react";
import "./styles.scss";
import { getNaoConformidadeById, getNaoConformidades } from "../../../api/nao-conformidade";
import { useParams } from "react-router";
import PageHeader from "../../../components/page-header";
import PageBody from "../../../components/page-body";
import { Form } from "react-router-dom";
import Field from "../../../components/field";
import { Button } from "@mui/material";
import Title from "../../../components/title";
import Separator from "../../../components/separator";

function EditarNaoConformidade() {
    const [descricao, setDescricao] = useState("");
    const [dataOcorrencia, setDataOcorrencia] = useState("");
    const [departamentos, setDepartamentos] = useState([1, 2]);
    const [departamentosOptions, setDepartamentosOptions] = useState();
 
    const { id } = useParams();

    useEffect(() => {

        getNaoConformidadeById(id)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                alert(err.message);
            })

    }, []);

    const handleOnSubmit = () => {

    }
    

    <section className="editar-nao-conformidade">
            <PageHeader
                title="Editar Não Conformidade"
            />
            <PageBody>
                <Form onSubmit={handleOnSubmit}>
                    <Field label="Id" type="text" value={id} isReadOnly/>
                    <Field label="Descrição" type="text" value={descricao} setValue={setDescricao} />
                    <Field label="Data de Ocorrência" type="text" value={dataOcorrencia} setValue={setDataOcorrencia} />
                    
                    <Button type="submit">Salvar</Button>
                </Form>
             
            </PageBody>
    </section>
}

export default EditarNaoConformidade;