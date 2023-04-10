import LinkedButton from "../linked-button";
import "./styles.scss";
import { default as hamburger } from "../../assets/images/hamburger.png";

function Navbar() {

    return (
        <div className="navbar">
            <h2 className="navbar__title">Sistema</h2>
            <input id="navbar__check" className="navbar__check" type="checkbox" hidden/>
            <label htmlFor="navbar__check" className="navbar__label">
                <img className="navbar__image" src={hamburger}/>
            </label>
            <div className="navbar__actions">
                <LinkedButton path="/nao-conformidade">Não conformidade</LinkedButton>
                <LinkedButton path="/departamentos">Departamentos</LinkedButton>
            </div>
            
        </div>
    );
}

export default Navbar;