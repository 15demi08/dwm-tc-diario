import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, CssBaseline, Icon, Toolbar, Typography } from '@mui/material';

export default function App() {

    const
        n = useNavigate(),
        l = useLocation(),
        hoje = new Date(),
        [anoReal, mesReal] = [hoje.getFullYear(), hoje.getMonth()];

    useEffect(() => {

        if( l.pathname === "/" ) // Se estivermos na raíz (primeiro acesso)
            n(`/${anoReal}/${mesReal+1}`, { replace: true }) // Navegue para a página inicial (Ano e Mês reais como "estado inicial")

    });

    return <>

        <CssBaseline />

        <AppBar position='fixed'>
            <Toolbar>
                <Typography variant='h6' flex={1}>Diário Pessoal</Typography>
                <Icon>menu_book</Icon>
            </Toolbar>
        </AppBar>

        <Toolbar />

        <Outlet />

    </>

}