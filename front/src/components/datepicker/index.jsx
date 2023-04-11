import "./styles.scss";
import DatePicker from "react-datepicker";

const isNull = (el) => el == null || el == undefined || el == "";

function Datepicker({label, value, setValue, isReadOnly = false, isRequired = false}) {
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