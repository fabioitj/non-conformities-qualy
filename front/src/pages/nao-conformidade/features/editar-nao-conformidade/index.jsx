import { useEffect, useState } from "react";
import * as React from "react";
import "./styles.scss";
import { getNaoConformidadeById, updateNaoConformidade } from "../../../../api/nao-conformidade";
import { useNavigate, useParams } from "react-router";
import PageHeader from "../../../../components/page-header";
import PageBody from "../../../../components/page-body";
import Field from "../../../../components/field";
import Title from "../../../../components/title";
import Separator from "../../../../components/separator";
import Button from "../../../../components/button";
import Form from "../../../../components/form";
import AcoesCorretivas from "./components/acoes-corretivas";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "../../../../components/datepicker";
import SelectCustom from "../../../../components/select";
import { getDepartments } from "../../../../api/departamento";
import departmentToOptions from "../../mappers/departments-to-options";
import GroupButton from "../../../../components/group-button";
import { isNull } from "../../../../scripts/validation";


function EditarNaoConformidadePage() {
    const [descricao, setDescricao] = useState("");
    const [dataOcorrencia, setDataOcorrencia] = useState(new Date());
    const [departamentos, setDepartamentos] = useState();
    const [acoesCorretivas, setAcoesCorretivas] = useState([]);
    const [departamentosOptions, setDepartamentosOptions] = useState();

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        getDepartments()
            .then((response) => {
                setDepartamentosOptions(departmentToOptions(response.data));
            })
            .catch((err) => alert(err.message));

        getNaoConformidadeById(id)
            .then((response) => {
                setDescricao(response.description);
                setDataOcorrencia(new Date(response["ocurrence-date"]));
                setDepartamentos(departmentToOptions(response.departments));

                if(response['corrective-actions'])
                    setAcoesCorretivas(response['corrective-actions']);
            })
            .catch((err) => {
                alert(err.message);
            })

    }, []);

    const validaCampos = () => {
        let message = "";

        if(isNull(descricao)) {
            message += "Campo 'Descrição' obrigatório\n";
        }
        
        if(isNull(dataOcorrencia)) {
            message += "Campo 'Data de ocorrência' obrigatório\n";
        }

        if(!departamentos || (departamentos && departamentos.length === 0)) {
            message += "Campo 'Departamentos' obrigatório\n";
        }

        if(!isNull(message)){
            alert(message);
            return false;
        }

        return true;
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(!validaCampos()) return;

        updateNaoConformidade({
            'id': id,
            'description': descricao,
            'ocurrence-date': dataOcorrencia,
            'departments': departamentos ? departamentos.map(departamento => departamento.value) : [],
            'corrective-actions': acoesCorretivas ? acoesCorretivas.map(acao => acao.id) : [],
        }, id)
            .then((response) => {
                alert("Não conformidade salva com sucesso!");
                navigate("/nao-conformidade/" + response.data.id);
            })
            .catch((err) => {
                alert("O cadastro de uma não conformidade falhou!")
            })
    }

    const naoConformidade = {
        'id': id,
        'description': descricao,
        'ocurrence-date': dataOcorrencia,
        'departments': departamentos ? departamentos.map(departamento => departamento.value) : [],
        'corrective-actions': acoesCorretivas ? acoesCorretivas.map(acao => acao.id) : []
    };

    return (
        <section className="editar-nao-conformidade">
            <PageHeader
                title="Editar Não Conformidade"
            />
            <PageBody>
                <Form onSubmit={handleOnSubmit}>
                    <Field label="Descrição" type="text" value={descricao} setValue={setDescricao} />
                    <Datepicker label="Data de ocorrência" value={dataOcorrencia} setValue={setDataOcorrencia}/>
                    <SelectCustom label="Departamentos" options={departamentosOptions} value={departamentos} setValue={setDepartamentos}/>
                    
                    <GroupButton>
                        <Button type="button" onClick={() => navigate(-1)}>Voltar</Button>
                        <Button type="submit">Salvar</Button>
                    </GroupButton>
                </Form>
                <Separator />
                <Title h={'3'}>Ações corretivas</Title>
                <AcoesCorretivas acoesCorretivas={acoesCorretivas} setAcoesCorretivas={setAcoesCorretivas} naoConformidade={naoConformidade}/>
            </PageBody>
        </section>
    );
}

export default EditarNaoConformidadePage;