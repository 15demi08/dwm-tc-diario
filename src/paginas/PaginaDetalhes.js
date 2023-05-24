import React from "react";
import { Icon, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PaginaDetalhes() {

    const navegar = useNavigate();

    return <>

        <Typography variant="h5" sx={{ mt: 2 }}>
            <IconButton onClick={ () => navegar(-1) }>
                <Icon>arrow_back</Icon>
            </IconButton> Detalhes
        </Typography>

    </>;
}