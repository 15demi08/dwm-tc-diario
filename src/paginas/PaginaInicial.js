import { Button, FormControl, Icon, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import React from "react";

export default function PaginaInicial() {

    const hoje = new Date(),
        meses = [
            "Janeiro", "Fevereiro", "Março",
            "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro",
            "Outubro", "Novembro", "Dezembro"
        ],
        mesAtual = hoje.getMonth(),
        anos = [],
        anoAtual = hoje.getFullYear();

    console.log(hoje);

    for (let i = anoAtual; i > (anoAtual - 11); i--) {
        anos.push(i);
    }

    const [ano, setAno] = React.useState(anoAtual),
        escolherAno = (event) => setAno(event.target.value);

    const [mes, setMes] = React.useState(mesAtual),
        escolherMes = (event) => {
            console.log(mes)
            return setMes(event.target.value);
        };


    return <>

        <Stack direction="row" justifyContent="space-between" sx={{ padding: 1 }}>

            <FormControl sx={{ m: 1, minWidth: 120, flexGrow: 1 }} size="small">
                <InputLabel id="ano">Ano</InputLabel>
                <Select labelId="ano" id="selectAno" value={ano} label="Ano" onChange={escolherAno}>
                    {anos.map((ano) => {
                        return <MenuItem value={ano}>{ano}</MenuItem>
                    })}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120, flexGrow: 1 }} size="small">
                <InputLabel id="mes">Mês</InputLabel>
                <Select labelId="mes" id="selectMes" value={mes} label="Mês" onChange={escolherMes}>
                    {meses.slice(0, mesAtual + 1).map((mes, posicao) => {
                        return <MenuItem value={posicao} selected={posicao === mesAtual}>{mes}</MenuItem>
                    })}
                </Select>
            </FormControl>

        </Stack>

        <Typography variant="h3"><Icon>menu_book</Icon> Página Inicial</Typography>

        <Button variant="contained" data-pagina="detalhes">
            <Icon>info</Icon> Abrir Detalhes
        </Button>

    </>;
}