import { useEffect, useState } from "react";
import Field from "../../../../components/field";
import "./styles.scss";
import PageHeader from "../../../../components/page-header";
import PageBody from "../../../../components/page-body";
import Form from "../../../../components/form";
import Button from "../../../../components/button";
import { getDepartments } from "../../../../api/departamento";
import { createNaoConformidade } from "../../../../api/nao-conformidade";
import Datepicker from "../../../../components/datepicker";
import SelectCustom from "../../../../components/select";
import departmentToOptions from "../../mappers/departments-to-options";
import { useNavigate } from "react-router-dom";
import GroupButton from "../../../../components/group-button";
import { isNull } from "../../../../scripts/validation";

function CriarNaoConformidadePage() {
    const [descricao, setDescricao] = useState("");
    const [dataOcorrencia, setDataOcorrencia] = useState();
    const [departamentos, setDepartamentos] = useState();
    const [departamentosOptions, setDepartamentosOptions] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getDepartments()
            .then((response) => {
                setDepartamentosOptions(departmentToOptions(response.data));
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

        createNaoConformidade({
            'description': descricao,
            'ocurrence-date': dataOcorrencia,
            'departments': departamentos ? departamentos.map(departamento => departamento.value) : []
        })
            .then((response) => {
                alert("Não conformidade criada com sucesso!");
                navigate("/nao-conformidade/" + response.data.id);
            })
            .catch((err) => {
                alert("O cadastro de uma não conformidade falhou!")
            });
    }

    

    return (
        <section className="criar-nao-conformidade">
            <PageHeader
                title="Cadastrar Não Conformidade"
            />
            <PageBody>
                <Form onSubmit={handleOnSubmit}>
                    <Field label="Descrição" type="text" value={descricao} setValue={setDescricao}/>
                    <Datepicker label="Data de ocorrência" value={dataOcorrencia} setValue={setDataOcorrencia}/>
                    <SelectCustom label="Departamentos" options={departamentosOptions} value={departamentos} setValue={setDepartamentos}/>
                    
                    
                    <GroupButton>
                        <Button type="button" onClick={() => navigate(-1)}>Voltar</Button>
                        <Button type="submit">Salvar</Button>
                    </GroupButton>
                </Form>
            </PageBody>

        </section>
    )
}

export default CriarNaoConformidadePage;