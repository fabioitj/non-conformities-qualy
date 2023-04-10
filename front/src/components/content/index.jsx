import "./styles.scss";
import { Routes } from "react-router-dom";
import { Navigate, Route } from "react-router";

import NaoConformidadePage from "../../pages/nao-conformidade";
import DepartamentosPage from "../../pages/departamentos";
import CriarNaoConformidadePage from "../../pages/nao-conformidade/criar-nao-conformidade";
import EditarNaoConformidade from "../../pages/nao-conformidade/editar-nao-conformidade";
import CriarDepartamentoPage from "../../pages/departamentos/criar-departamento";
import EditarDepartamentoPage from "../../pages/departamentos/editar-departamento";

function Content() {
    return (
        <div className="content">
            <Routes>
                <Route path="/" element={<Navigate to="/nao-conformidade" replace/>}></Route>

                <Route path="/nao-conformidade" element={<NaoConformidadePage/>}></Route>
                <Route path="/nao-conformidade/criar" element={<CriarNaoConformidadePage/>}></Route>
                <Route path="/nao-conformidade/:id" element={<EditarNaoConformidade/>}></Route>

                <Route path="/departamentos" element={<DepartamentosPage/>}></Route>
                <Route path="/departamentos/criar" element={<CriarDepartamentoPage/>}></Route>
                <Route path="/departamentos/:id" element={<EditarDepartamentoPage/>}></Route>
            </Routes>
        </div>
    );
}

export default Content;