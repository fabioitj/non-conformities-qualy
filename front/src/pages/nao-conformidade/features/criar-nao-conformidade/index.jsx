import { useEffect, useState } from "react";
import Field from "../../../../components/field";
import "./styles.scss";
import PageHeader from "../../../../components/page-header";
import PageBody from "../../../../components/page-body";
import Form from "../../../../components/form";
import Button from "../../../../components/button";
import { getDepartments } from "../../../../api/departamento";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createNaoConformidade } from "../../../../api/nao-conformidade";
import Separator from "../../../../components/separator";
import Datepicker from "../../../../components/datepicker";

function CriarNaoConformidadePage() {
    const [descricao, setDescricao] = useState("");
    const [dataOcorrencia, setDataOcorrencia] = useState();
    const [departamentos, setDepartamentos] = useState([1, 2]);
    const [departamentosOptions, setDepartamentosOptions] = useState();

    useEffect(() => {
        getDepartments()
            .then((response) => {
                console.log(response);
                setDepartamentosOptions(response.data);
            })
    }, []);

    const handleAddDepartamento = (id) => {
        setDepartamentos([...departamentos, id]);
    }

    const handleRemoveDepartamento = (id) => {
        setDepartamentos(departamentos.filter((item) => item !== id));
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        createNaoConformidade({
            'description': descricao,
            'ocurrence-date': dataOcorrencia,
            'departments': departamentos
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                alert("O cadastro de uma não conformidade falhou!")
            })
    }

    return (
        <section className="criar-nao-conformidade">
            <PageHeader
                title="Cadastrar Não Conformidade"
            />
            <PageBody>
                <Form onSubmit={handleOnSubmit}>
                    <Field label="Descrição" type="text" value={descricao} setValue={setDescricao} />
                    <Datepicker label="Data de ocorrência" value={dataOcorrencia} setValue={setDataOcorrencia} isRequired/>
                    <Button type="submit">Salvar</Button>
                </Form>
            </PageBody>

        </section>
    )
}

export default CriarNaoConformidadePage;