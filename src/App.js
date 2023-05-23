import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppBar, CssBaseline, Icon, Toolbar, Typography } from '@mui/material';
import PaginaDetalhes from './paginas/PaginaDetalhes';
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

    <Routes>
      <Route path='/' element={<PaginaInicial />} />
      <Route path='/detalhes' element={<PaginaDetalhes />} />
    </Routes>

  </>

}