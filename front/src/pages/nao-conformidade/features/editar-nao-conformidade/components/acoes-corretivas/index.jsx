import "./styles.scss";
import { useState } from "react";
import { createAcaoCorretiva, removeAcaoCorretiva } from "../../../../../../api/acao-corretiva";
import Field from "../../../../../../components/field";
import { IconButton } from "@mui/material";
import { Check, RemoveCircleOutline } from "@mui/icons-material";
import Datepicker from "../../../../../../components/datepicker";
import { updateNaoConformidade } from "../../../../../../api/nao-conformidade";
import { isNull } from "../../../../../../scripts/validation";

function AcoesCorretivas({acoesCorretivas, setAcoesCorretivas, naoConformidade}) {

    const [oque, setOque] = useState("");
    const [porque, setPorque] = useState("");
    const [como, setComo] = useState("");
    const [onde, setOnde] = useState("");
    const [ateQuando, setAteQuando] = useState();

    const handleUpdateNaoConformidade = (idAcaoCorretiva) => {
        naoConformidade['corrective-actions'].push(idAcaoCorretiva);
        updateNaoConformidade(naoConformidade, naoConformidade.id)
        .then().catch((err) => alert(err.message));
    }

    const validaCampos = () => {
        let message= "";

        if(isNull(oque))
            message += "Campo 'O que' obrigatório.\n";

        if(isNull(porque))
            message += "Campo 'Por que' obrigatório.\n";

        if(isNull(como))
            message += "Campo 'Como' obrigatório.\n";

        if(isNull(onde))
            message += "Campo 'Onde' obrigatório.\n";

        if(isNull(ateQuando))
            message += "Campo 'Até quando' obrigatório.\n";

        if(!isNull(message)) {
            alert(message);
            return false;
        }

        return true;
    }

    const handleOnAdd = () => {

        if(!validaCampos()) return;

        createAcaoCorretiva({
            'what-to-do': oque,
            'why-to-do-it': porque,
            'how-to-do-it': como,
            'where-to-do-it': onde,
            'until-when': ateQuando
        })
        .then((response) => {
            setAcoesCorretivas(acoesCorretivasOld => [...acoesCorretivasOld, response.data]);
            handleUpdateNaoConformidade(response.data.id)
            setOque("");
            setPorque("");
            setComo("");
            setOnde("");
            setAteQuando("");
        })
        .catch((err) => alert(err.message));
    }

    const handleOnRemove = (id) => {
        removeAcaoCorretiva(id)
        .then(() => {
            setAcoesCorretivas(acoesCorretivasOld => acoesCorretivasOld.filter(acaoCorretiva => acaoCorretiva.id !== id));
        })
        .catch((err) => alert(err.message));
    }

    return (
        <section className="acoes-corretivas">
            <table className="acoes-corretivas__datatable">
                <thead className="acoes-corretivas__datatable__header">
                    <tr>
                        <th>O que</th>
                        <th>Por que</th>
                        <th>Como</th>
                        <th>Onde</th>
                        <th>Até quando</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody className="acoes-corretivas__datatable__body">
                    <tr>
                        <td>
                            <Field type="text" value={oque} setValue={setOque}/>
                        </td>
                        <td>
                            <Field type="text" value={porque} setValue={setPorque}/>
                        </td>
                        <td>
                            <Field type="text" value={como} setValue={setComo}/>
                        </td>
                        <td>
                            <Field type="text" value={onde} setValue={setOnde}/>
                        </td>
                        <td>
                            <Datepicker value={ateQuando} setValue={setAteQuando}/>
                        </td>
                        <td>
                            <IconButton onClick={() => { handleOnAdd() }}>
                                <Check/>
                            </IconButton>
                        </td>
                    </tr>
                    {acoesCorretivas && acoesCorretivas.map(item => (
                        <tr key={item.id}>
                            <td>{item['what-to-do']}</td>
                            <td>{item['why-to-do-it']}</td>
                            <td>{item['how-to-do-it']}</td>
                            <td>{item['where-to-do-it']}</td>
                            <td>{(new Date(item['until-when'])).toLocaleDateString()}</td>
                            <td>
                                <IconButton onClick={() => { handleOnRemove(item.id) }}>
                                    <RemoveCircleOutline/>
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>    
        </section>
    );
}

export default AcoesCorretivas;