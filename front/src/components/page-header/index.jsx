import "./styles.scss";
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import LinkedButton from "../linked-button";
import LinkedIconButton from "../linked-icon-button";

function PageHeader({title, pathAdd, hasAdd = false}) {
    return (
        <div className="page-header">
            <h3 className="page-header__title">{title}</h3>
            {
                hasAdd && (
                    <LinkedIconButton path={pathAdd}>
                        <Add />
                    </LinkedIconButton>
                )
            }
        </div>
    );
}

export default PageHeader;