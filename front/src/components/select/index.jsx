import { useEffect, useState } from "react";
import { isNull } from "../../scripts/validation";
import "./styles.scss";
import Select from "react-select";

function SelectCustom({options, label, value, setValue}) {
    const nullValue = isNull(value);

    return (
        <div className="select">
            {
                label && (
                    <label className={"select__label" + (!nullValue ? " select__label-typed" : "")}>{label}</label>
                )
            }
            <Select
                className={"select__field" + (!nullValue ? " select__field-typed" : "")}
                closeMenuOnSelect={true}
                isMulti
                isSearchable
                value={value}
                options={options}
                onChange={(state) => setValue(state)}
                placeholder=""
            />
        </div>
    );
}

export default SelectCustom;