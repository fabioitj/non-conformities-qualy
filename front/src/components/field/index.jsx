import { isNull } from "../../scripts/validation";
import "./styles.scss";

function Field({label, type, value, setValue, isReadOnly = false}) {
    const nullValue = isNull(value);

    return (
        <div className="field">
            {
                label && (
                    <label className={"field__label" + (!nullValue ? " field__label-typed" : "")}>{label}</label>
                )
            }
            <input className={"field__input" + (!nullValue ? " field__input-typed" : "")} type={type} value={value} onChange={e => setValue(e.target.value)} disabled={isReadOnly}/>
        </div>
    );
}

export default Field;