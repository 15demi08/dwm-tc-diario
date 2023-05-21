import { AppBar, CssBaseline, Icon, Toolbar, Typography } from '@mui/material';
import './App.css';
import React from 'react';
// import PaginaDetalhes from './paginas/PaginaDetalhes';
import PaginaInicial from './paginas/PaginaInicial';

export default function App() {

  return <>

    <CssBaseline />

    <AppBar position='sticky'>

      <Toolbar>

        <Typography variant='h6' flex={1}>Diário Pessoal</Typography>
        
        <Icon>menu_book</Icon>

      </Toolbar>

    </AppBar>

    <PaginaInicial />
    {/* <PaginaDetalhes /> */}

  </>

}