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
        [carregado, setCarregado] = useState(false);

    let entradasNosDiasDoMesEspecificado = Array(meses(ano)[mes].dias).fill(false);

    if (ano === anoReal() && mes === mesReal()) {

        entradasNosDiasDoMesEspecificado = entradasNosDiasDoMesEspecificado.slice(0, diaReal);

    }

    useEffect(() => {

        const url = `http://localhost:1165/entradas?usuarioId=${idUsuario}&ano=${ano}&mes=${mes}`;

        console.log("URL da Requisição: " + url);

        axios.get(url)
            .then(
                (entradas) => {
                    console.log("Resposta: ");
                    console.log(entradas);
                    if (entradas.data.length > 0) {
                        for (let entrada of entradas.data) {
                            console.log("Entrada: ");
                            console.log(entrada);
                            entradasNosDiasDoMesEspecificado[entrada.dia - 1] = true;
                        }
                    }
                    console.log("Array de booleans: ");
                    console.log(entradasNosDiasDoMesEspecificado);
                    setCarregado(true);
                },
                () => setCarregado(false)
            );

    }, [ano, mes, entradasNosDiasDoMesEspecificado]);

    return <List disablePadding>
        {!carregado
            ? <LinearProgress />
            : entradasNosDiasDoMesEspecificado.map((temEntrada, posicao) =>
                <ListItem key={posicao} disableGutters>
                    <ListItemButton component={RouterLink} to={`/${ano}/${mes + 1}/${posicao + 1}`}>
                        <ListItemIcon>
                            <Icon>{temEntrada ? 'turned_in' : 'turned_in_not'}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={new Date(ano, mes, posicao + 1).toLocaleDateString()} secondary={temEntrada ? "Entrada Registrada" : "Sem Entrada"} />
                    </ListItemButton>
                </ListItem>
            )
        }
    </List>

}