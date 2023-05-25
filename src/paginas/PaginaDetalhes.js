import React from "react";
import { Icon, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaginaDetalhes() {

    const
        navegar = useNavigate(),
        localizacao = useLocation(),
        [ano, mes, dia] = localizacao.pathname.split("/").slice(1, 4).map(s => Number(s)), // "/2023/4/1" => [2023, 4, 1]
        meses = [
            "Janeiro", "Fevereiro", "Março",
            "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro",
            "Outubro", "Novembro", "Dezembro"
        ]

    return <>

        <Typography variant="h5" sx={{ mt: 2 }}>
            <IconButton onClick={() => navegar(-1)}>
                <Icon>arrow_back</Icon>
            </IconButton>{ dia === 1 ? "1º" : dia } de { meses[mes-1] } de {ano}
        </Typography>

    </>;
}