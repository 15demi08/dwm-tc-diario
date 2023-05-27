import React from "react";
import { Box, Icon, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

import meses from "../utilidades/meses";

export default function CabecalhoPeriodo({ ano, mes, aoClicar }) {

    return <Box sx={{
        position: 'sticky',
        top: 56,
        backgroundColor: '#FFF',
        borderBottom: '1px solid #DDD',
        zIndex: 1
    }}
    >
        <List disablePadding>
            <ListItemButton onClick={aoClicar}>
                <ListItemIcon>
                    <Icon>calendar_month</Icon>
                </ListItemIcon>
                <ListItemText
                    primary={<Typography variant="h5">{`${meses()[mes].nome} de ${ano}`}</Typography>}
                    secondary={<Typography variant="caption">Toque/Clique aqui para alterar</Typography>}
                />
            </ListItemButton>
        </List>
    </Box>

}