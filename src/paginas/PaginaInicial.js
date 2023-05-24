import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Icon, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Stack, Typography } from "@mui/material";

export default function PaginaInicial() {

    const
        /**  */
        hoje = new Date(), // Dia de Hoje, na vida real
        [diaAtual, mesAtual, anoAtual] = [hoje.getDate(), hoje.getMonth(), hoje.getFullYear()],
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
        diasNoMesEscolhidoDoAnoEscolhido = [], // Acredito que o nome é descritivo o suficiente XD

        [ano, setAno] = useState(anoAtual),

        [mes, setMes] = useState(mesAtual),

        [dialogoAberto, setDialogoAberto] = React.useState(false),

        dia1Mar = new Date(ano, 2, 1);

    for (let i = anoAtual; i > (anoAtual - 11); i--) {
        anos.push(i);
    }

    dia1Mar.setDate(dia1Mar.getDate() - 1);
    meses[1].dias = dia1Mar.getDate(); // Dias de Fevereiro

    for (let i = 1; i < meses[mes].dias + 1; i++) {

        diasNoMesEscolhidoDoAnoEscolhido.push(i);

        if (ano === anoAtual && mes === mesAtual && i === diaAtual)
            break;

    }

    /**
    * Disparado pelo onChange no select do Ano
    * @param {event} e 
    */
    function escolherAno(e) {

        const anoEscolhido = e.target.value;

        if (anoEscolhido === anoAtual)
            if (mes > mesAtual)
                setMes(mesAtual);

        setAno(anoEscolhido);

    }

    /**
     * Disparado pelo onChange no select do Mês
     * @param {event} e O evento de mudança do valor (onChange)
     */
    function escolherMes(e) {

        setMes(e.target.value)

    }

    function abrirDialogo() {
        setDialogoAberto(true);
    }

    function fecharDialogo() {
        console.log("Fechando diálogo");
        setDialogoAberto(false);
    }

    function confirmarDialogo() {
        console.log("Confirmando diálogo");
        setDialogoAberto(false);
    }

    /**
     * Retorna os itens do select do Mês
     * @returns Array de \<MenuItem />
     */
    function selectMeses() {

        const mesesDoAnoEscolhido = (ano === anoAtual ? meses.slice(0, mesAtual + 1) : meses);

        return mesesDoAnoEscolhido.map((mes, posicao) => <MenuItem key={posicao} value={posicao} selected={posicao === mesAtual}>{mes.nome}</MenuItem>)

    }

    return <>

        <Box sx={{
            position: 'sticky',
            top: 56,
            backgroundColor: '#FFF',
            borderBottom: '1px solid #DDD',
            zIndex: 1
        }}
        >
            <List disablePadding>
                <ListItemButton onClick={abrirDialogo}>
                    <ListItemIcon>
                        <Icon>calendar_month</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="h5">{`${meses[mes].nome} de ${ano}`}</Typography>}
                        secondary={<Typography variant="caption">Toque/Clique aqui para alterar</Typography>}
                    />
                </ListItemButton>
            </List>
        </Box>

        <List disablePadding>
            {
                diasNoMesEscolhidoDoAnoEscolhido.map((dia) =>
                    <ListItem key={dia} disableGutters>
                        <ListItemButton component={RouterLink} to={`/${ano}/${mes}/${dia}`}>
                            <ListItemIcon>
                                <Icon>label</Icon>
                            </ListItemIcon>
                            <ListItemText primary={new Date(ano, mes, dia).toLocaleDateString()} secondary="Sem Entrada" />
                        </ListItemButton>
                    </ListItem>
                )
            }
        </List>

        <Dialog open={dialogoAberto} onClose={fecharDialogo}>
            <DialogTitle>Alterar Mês e Ano</DialogTitle>
            <DialogContent>
                <Stack direction="column">
                    <FormControl sx={{ m: 1, flex: 1 }} size="small">
                        <InputLabel id="mes">Mês</InputLabel>
                        <Select labelId="mes" id="selectMes" value={mes} label="Mês" onChange={escolherMes}>
                            {selectMeses()}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, flex: 1 }} size="small">
                        <InputLabel id="ano">Ano</InputLabel>
                        <Select labelId="ano" id="selectAno" value={ano} label="Ano" onChange={escolherAno}>
                            {anos.map((ano) => <MenuItem key={ano} value={ano}>{ano}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={confirmarDialogo}>OK</Button>
                <Button onClick={fecharDialogo}>Cancelar</Button>
            </DialogActions>
        </Dialog>

    </>;
}