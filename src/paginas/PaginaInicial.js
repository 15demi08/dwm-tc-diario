import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Icon, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Stack, Typography } from "@mui/material";
import axios from "axios";

export default function PaginaInicial() {


    const
        navegar = useNavigate(),
        localizacao = useLocation(),
        [anoURL, mesURL] = localizacao.pathname.split("/").slice(1, 3).map(s => Number(s)), // "/2023/4" => [2023, 4]
        hoje = new Date(), // Dia de Hoje, na vida real
        [diaReal, mesReal, anoReal] = [hoje.getDate(), hoje.getMonth(), hoje.getFullYear()],
        anos = [], // Guarda os dez últimos anos, incluindo anoReal
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

        [ano, setAno] = useState(anoURL),
        [mes, setMes] = useState(mesURL-1),

        [anoEscolhido, setAnoEscolhido] = useState(anoURL),
        [mesEscolhido, setMesEscolhido] = useState(mesURL-1),

        [dialogoAberto, setDialogoAberto] = React.useState(false),

        dia1Mar = new Date(ano, 2, 1);

    // Últimos dez anos, incluindo anoReal
    for (let i = anoReal; i > (anoReal - 11); i--) {
        anos.push(i);
    }

    // Dias de Fevereiro
    dia1Mar.setDate(dia1Mar.getDate() - 1);
    meses[1].dias = dia1Mar.getDate(); // Mais especificamente, o último dia de Fevereiro do ano em questão

    for (let i = 1; i < meses[mes].dias + 1; i++) {

        diasNoMesEscolhidoDoAnoEscolhido.push(false);

        if (ano === anoReal && mes === mesReal && i === diaReal)
            break;

    }

    /**
    * Disparado pelo onChange no select do Ano
    * @param {event} e O evento de mudança do valor (onChange)
    */
    function escolherAno(e) {

        const anoEscolhido = e.target.value;

        if (anoEscolhido === anoReal)
            if (mesEscolhido > mesReal)
                setMesEscolhido(mesReal);

        setAnoEscolhido(anoEscolhido);

    }

    /**
     * Disparado pelo onChange no select do Mês
     * @param {event} e O evento de mudança do valor (onChange)
     */
    function escolherMes(e) {

        setMesEscolhido(e.target.value)

    }

    function abrirDialogo() {
        setDialogoAberto(true);
    }

    function cancelarDialogo() {
        console.log("Cancelando diálogo");
        setDialogoAberto(false);
    }

    function confirmarDialogo() {
        console.log("Confirmando diálogo");
        navegar(`/${anoEscolhido}/${mesEscolhido+1}`, { replace: true })
        setAno(anoEscolhido);
        setMes(mesEscolhido);
        setDialogoAberto(false);
    }

    /**
     * Retorna os itens do select do Mês
     * @returns Array de \<MenuItem />
     */
    function selectMeses() {

        return (
            anoEscolhido === anoReal
                ? meses.slice(0, mesReal + 1)
                : meses
            ).map((mes, posicao) => <MenuItem key={posicao} value={posicao}>{mes.nome}</MenuItem>)

    }

    /* useEffect(()=>{

        axios.get(`http://localhost:1165/api/entradas?ano=${ano}&mes=${mes}`)
            .then((entradas) => {
                if(entradas.data.length > 0) {
                    for( let entrada of entradas.data ){
                        diasNoMesEscolhidoDoAnoEscolhido[entrada.dia] = true;
                    }
                }
            });

    }, [ano, mes]); */

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
                diasNoMesEscolhidoDoAnoEscolhido.map((temEntrada, posicao) =>
                    <ListItem key={posicao} disableGutters>
                        <ListItemButton component={RouterLink} to={`/${ano}/${mes+1}/${posicao+1}`}>
                            <ListItemIcon>
                                <Icon>{temEntrada ? 'turned_in' : 'turned_in_not'}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={new Date(ano, mes, posicao+1).toLocaleDateString()} secondary={ temEntrada ? "Entrada Registrada" : "Sem Entrada"} />
                        </ListItemButton>
                    </ListItem>
                )
            }
        </List>

        <Dialog open={dialogoAberto}>
            <DialogTitle>Alterar Mês e Ano</DialogTitle>
            <DialogContent>
                <Stack direction="column">
                    <FormControl sx={{ m: 1, flex: 1 }} size="small">
                        <InputLabel id="mes">Mês</InputLabel>
                        <Select labelId="mes" id="selectMes" value={mesEscolhido} label="Mês" onChange={escolherMes}>
                            {selectMeses()}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, flex: 1 }} size="small">
                        <InputLabel id="ano">Ano</InputLabel>
                        <Select labelId="ano" id="selectAno" value={anoEscolhido} label="Ano" onChange={escolherAno}>
                            {anos.map((ano) => <MenuItem key={ano} value={ano}>{ano}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={confirmarDialogo}>OK</Button>
                <Button onClick={cancelarDialogo}>Cancelar</Button>
            </DialogActions>
        </Dialog>

    </>;
}