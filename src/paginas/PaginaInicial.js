import { FormControl, Icon, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Stack } from "@mui/material";
import React from "react";

export default function PaginaInicial() {

    const
        hoje = new Date(), // Dia de Hoje, na vida real
        mesAtual = hoje.getMonth(), // Mês na vida real
        anoAtual = hoje.getFullYear(), // Ano na vida real
        anos = [], // Guarda os dez últimos anos, incluindo anoAtual
        meses = [ 
            { nome: "Janeiro", dias: 31 },
            { nome: "Fevereiro", dias: 0 }, // Dias de fevereiro são calculados mais abaixo
            { nome: "Março", dias: 31 },
            { nome: "Abril", dias: 30 },
            { nome: "Maio", dias: 31 },
            { nome: "Junho", dias: 30 },
            { nome: "Julho", dias: 31 },
            { nome: "Agosto", dias: 31 },
            { nome: "Setembro", dias: 30 },
            { nome: "Outubro", dias: 31 },
            { nome: "Novembro", dias: 30 },
            { nome: "Dezembro", dias: 31 }
        ],
        diasNoMesEscolhidoDoAnoEscolhido = [],

        [ano, setAno] = React.useState(anoAtual),

        [mes, setMes] = React.useState(mesAtual),

        dia1Mar = new Date(ano, 2, 1),

        escolherAno = (event) => {
            const anoEscolhido = event.target.value;

            if (anoEscolhido == anoAtual)
                if (mes > mesAtual)
                    setMes(mesAtual);

            setAno(anoEscolhido);
        },

        escolherMes = (event) => setMes(event.target.value);

    for (let i = anoAtual; i > (anoAtual - 11); i--) {
        anos.push(i);
    }

    dia1Mar.setDate(dia1Mar.getDate() - 1);
    meses[1].dias = dia1Mar.getDate(); // Dias de Fevereiro

    for (let i = 1; i < meses[mes].dias + 1; i++) {
        diasNoMesEscolhidoDoAnoEscolhido.push(i);
    }

    return <>

        <Stack direction="row" sx={{ padding: 1, position: 'sticky' }}>

            <FormControl sx={{ m: 1, flex: 1 }} size="small">
                <InputLabel id="ano">Ano</InputLabel>
                <Select labelId="ano" id="selectAno" value={ano} label="Ano" onChange={escolherAno}>
                    {
                        anos.map((ano) => {
                            return <MenuItem key={ano} value={ano}>{ano}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, flex: 2 }} size="small">
                <InputLabel id="mes">Mês</InputLabel>
                <Select labelId="mes" id="selectMes" value={mes} label="Mês" onChange={escolherMes}>
                    {
                        ano === anoAtual
                            ? meses.slice(0, mesAtual + 1).map((mes, posicao) => {
                                return <MenuItem key={posicao} value={posicao} selected={posicao === mesAtual}>{mes.nome}</MenuItem>
                            })
                            : meses.map((mes, posicao) => {
                                return <MenuItem key={posicao} value={posicao} selected={posicao === mesAtual}>{mes.nome}</MenuItem>
                            })
                    }
                </Select>
            </FormControl>

        </Stack>

        <List disablePadding>
            {
                diasNoMesEscolhidoDoAnoEscolhido.map((dia) => {
                    return <ListItem key={dia} disableGutters>
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon>label</Icon>
                            </ListItemIcon>
                            <ListItemText primary={new Date(ano, mes, dia).toLocaleDateString()} secondary="Sem Entrada" />
                        </ListItemButton>
                    </ListItem>
                })
            }
        </List>

    </>;
}