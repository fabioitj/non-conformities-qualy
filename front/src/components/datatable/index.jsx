import { IconButton } from "@mui/material";
import LinkedButton from "../linked-button";
import "./styles.scss";
import { Edit, Remove, RemoveCircle, RemoveCircleOutline } from "@mui/icons-material";
import LinkedIconButton from "../linked-icon-button";

function DataTable({columns, data, pathEdit, onRemove}) {
    return (
        <table className="datatable">
            <thead className="datatable__header">
                <tr>
                    {columns && columns.map(column => (
                        <th key={column.id} style={{ width: column.width }}>{column.title}</th>
                    ))}
                    <th style={{ textAlign: 'center' }}>Ações</th>
                </tr>
            </thead>
            <tbody className="datatable__body">
                {data && data.map(row => (
                    <tr key={row.id}>
                        {columns.map(column => (
                            <td key={column.id}><div>{row[column.id]}</div></td>
                        ))}
                        <td>
                            <div className="datatable__body__actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <LinkedIconButton className="datatable__button" path={pathEdit + row.id}>
                                    <Edit/>
                                </LinkedIconButton>
                                <IconButton onClick={() => { onRemove(row.id) }}>
                                    <RemoveCircleOutline/>
                                </IconButton>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;