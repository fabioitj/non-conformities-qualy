import { useEffect, useState } from "react";
import * as React from "react";
import "./styles.scss";
import { getNaoConformidadeById } from "../../../../api/nao-conformidade";
import { useParams } from "react-router";
import PageHeader from "../../../../components/page-header";
import PageBody from "../../../../components/page-body";
import Field from "../../../../components/field";
import Title from "../../../../components/title";
import Separator from "../../../../components/separator";
import Button from "../../../../components/button";
import Form from "../../../../components/form";
import AcoesCorretivas from "./components/acoes-corretivas";
import { getAcaoCorretivaById } from "../../../../api/acao-corretiva";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "../../../../components/datepicker";


function EditarNaoConformidadePage() {
    const [descricao, setDescricao] = useState("");
    const [dataOcorrencia, setDataOcorrencia] = useState(new Date());
    const [departamentos, setDepartamentos] = useState([1, 2]);
    const [acoesCorretivas, setAcoesCorretivas] = useState([]);
    const [departamentosOptions, setDepartamentosOptions] = useState();
 
    const { id } = useParams();

    useEffect(() => {

        getNaoConformidadeById(id)
            .then((response) => {
                console.log(response.data)
                setDescricao(response.data.description);
                setDataOcorrencia(new Date(response.data["ocurrence-date"]));
                setDepartamentos(response.data.departments);

                for(const correctiveActionId of response.data["corrective-actions"]) {
                    console.log(correctiveActionId);
                    getAcaoCorretivaById(correctiveActionId)
                    .then((response) => {
                        setAcoesCorretivas(acoesCorretivasOld => [...acoesCorretivasOld, response.data]);
                    })
                    .catch((err) => alert(err.message));
                }
            })
            .catch((err) => {
                alert(err.message);
            })

    }, []);

    const handleOnSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <section className="editar-nao-conformidade">
            <PageHeader
                title="Editar Não Conformidade"
            />
            <PageBody>
                <Form onSubmit={handleOnSubmit}>
                    <Field label="Id" type="text" value={id} isReadOnly/>
                    <Field label="Descrição" type="text" value={descricao} setValue={setDescricao} />
                    <Datepicker label="Data de ocorrência" value={dataOcorrencia} setValue={setDataOcorrencia}/>

                    <Button type="submit">Salvar</Button>
                </Form>
                <Separator />
                <Title h={'3'}>Ações corretivas</Title>
                <AcoesCorretivas acoesCorretivas={acoesCorretivas} setAcoesCorretivas={setAcoesCorretivas} idNaoConformidade={id}/>
            </PageBody>
        </section>
    );
}

export default EditarNaoConformidadePage;