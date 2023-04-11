import { useEffect, useState } from "react";
import DataTable from "../../components/datatable";
import PageBody from "../../components/page-body";
import PageHeader from "../../components/page-header";
import "./styles.scss";
import columns from "./constants/datatable-columns";
import { getNaoConformidades, removeNaoConformidade } from "../../api/nao-conformidade";

function NaoConformidadePage() {
    const [naoConformidade, setNaoConformidade] = useState([]);

    useEffect(() => {
        getNaoConformidades()
            .then((response) => {
                setNaoConformidade(response);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleOnRemove = (id) => {
        removeNaoConformidade(id)
            .then((response) => {
                console.log(response.data);
                setNaoConformidade(naoConformidade => naoConformidade.filter(item => item.id !== id));
            })
            .catch((err) => {
                alert(err.message);
            });
    }

    return (
        <section className="nao-conformidade">
            <PageHeader
                title="Não confirmidade"
                hasAdd
                pathAdd="/nao-conformidade/criar"
            />
            <PageBody>
                <DataTable columns={columns} data={naoConformidade} pathEdit={"/nao-conformidade/"} onRemove={handleOnRemove}/>
            </PageBody>
        </section>
    );
}

export default NaoConformidadePage;