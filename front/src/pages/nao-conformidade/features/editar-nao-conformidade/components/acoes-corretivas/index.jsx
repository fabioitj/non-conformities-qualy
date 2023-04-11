import { useState } from "react";
import { createAcaoCorretiva, removeAcaoCorretiva } from "../../../../../../api/acao-corretiva";
import Field from "../../../../../../components/field";
import { IconButton } from "@mui/material";
import { Check, RemoveCircleOutline } from "@mui/icons-material";
import Datepicker from "../../../../../../components/datepicker";

function AcoesCorretivas({acoesCorretivas, setAcoesCorretivas, idNaoConformidade}) {

    const [oque, setOque] = useState("");
    const [porque, setPorque] = useState("");
    const [como, setComo] = useState("");
    const [onde, setOnde] = useState("");
    const [ateQuando, setAteQuando] = useState();

    const handleOnAdd = () => {
        createAcaoCorretiva({
            'what-to-do': oque,
            'why-to-do-it': porque,
            'how-to-do-it': como,
            'where-to-do-it': onde,
            'until-when': ateQuando
        })
        .then((response) => {
            setAcoesCorretivas(acoesCorretivasOld => [...acoesCorretivasOld, response.data]);
            update
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
            <table className="datatable">
                <thead className="datatable__header">
                    <tr>
                        <th>O que</th>
                        <th>Por que</th>
                        <th>Como</th>
                        <th>Onde</th>
                        <th>Até quando</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody className="datatable__body">
                    <tr>
                        <td>
                            <Field type="text" value={oque} setValue={setOque} isRequired/>
                        </td>
                        <td>
                            <Field type="text" value={porque} setValue={setPorque} isRequired/>
                        </td>
                        <td>
                            <Field type="text" value={como} setValue={setComo} isRequired/>
                        </td>
                        <td>
                            <Field type="text" value={onde} setValue={setOnde} isRequired/>
                        </td>
                        <td>
                            <Datepicker value={ateQuando} setValue={setAteQuando} isRequired/>
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
                            <td>{item['until-when']}</td>
                            <td>
                                <IconButton onClick={() => { onRemove(row.id) }}>
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