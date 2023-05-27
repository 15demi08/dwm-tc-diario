import React, { useEffect, useState } from "react";
import { Icon, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import meses, { mesReal } from "../utilidades/meses";
import { anoReal } from "../utilidades/anos";

export default function ListaPeriodo({ ano, mes }) {

    const
        idUsuario = 0, // DEV - O produto final usaria algo como contextProvider - ou talvez exatamente isso 🤔
        diaReal = new Date().getDate(),
        [entradasNosDiasDoMesEspecificado, setEntradasNosDiasDoMesEspecificado] = useState([]);

    useEffect(() => {

        const url = `http://localhost:1165/entradas?usuarioId=${idUsuario}&ano=${ano}&mes=${mes}`;

        axios.get(url)
            .then(
                (entradas) => {

                    let resultado = Array(meses(ano)[mes].dias).fill(false);

                    if (entradas.data.length > 0) {

                        for (let entrada of entradas.data) {
                            resultado[entrada.dia - 1] = true;
                        }


                    }

                    if (ano === anoReal() && mes === mesReal())
                        resultado = resultado.slice(0, diaReal);

                    setEntradasNosDiasDoMesEspecificado(resultado);
                }
            );

    }, [ano, mes]);

    return <List disablePadding>
        {entradasNosDiasDoMesEspecificado.length === 0
            ? <LinearProgress />
            : entradasNosDiasDoMesEspecificado.map((temEntrada, posicao) => {
                return <ListItem key={posicao} disableGutters>
                    <ListItemButton component={RouterLink} to={`/${ano}/${mes + 1}/${posicao + 1}`}>
                        <ListItemIcon>
                            <Icon>{temEntrada ? 'turned_in' : 'turned_in_not'}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={new Date(ano, mes, posicao + 1).toLocaleDateString()} secondary={temEntrada ? "Entrada Registrada" : "Sem Entrada"} />
                    </ListItemButton>
                </ListItem>
            })
        }
    </List>

}