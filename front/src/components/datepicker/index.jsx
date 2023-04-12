import { isNull } from "../../scripts/validation";
import "./styles.scss";
import DatePicker from "react-datepicker";

function Datepicker({label, value, setValue, isReadOnly = false}) {
    const nullValue = isNull(value);

    return (
        <div className="datepicker">
            {
                label && (
                    <label className={"datepicker__label" + (!nullValue ? " datepicker__label-typed" : "")}>{label}</label>
                )
            }
            <DatePicker className={"datepicker__date" + (!nullValue ? " datepicker__date-typed" : "")} selected={value} onChange={date => setValue(date)} readOnly={isReadOnly} dateFormat="dd/MM/yyyy"/>
        </div>
        
    );
}

export default Datepicker;