import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Icon, IconButton, Typography } from "@mui/material";

export default function PaginaDetalhes() {
    return <>

        <Typography variant="h5" sx={{ mt: 2 }}>
            <IconButton component={RouterLink} to="/">
                <Icon>arrow_back</Icon>
            </IconButton> Detalhes
        </Typography>

    </>;
}