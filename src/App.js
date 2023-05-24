import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, CssBaseline, Icon, Toolbar, Typography } from '@mui/material';
import PaginaDetalhes from './paginas/PaginaDetalhes';
import PaginaInicial from './paginas/PaginaInicial';

export default function App() {

  const
    hoje = new Date(),
    [ mesAtual, anoAtual ] = [ hoje.getMonth(), hoje.getFullYear() ],
    navegar = useNavigate();

  useEffect(()=>{
    console.log("Navegando...");
    navegar(`/${anoAtual}/${mesAtual}`);
  // eslint-disable-next-line
  }, []);

  return <>

    <CssBaseline />

    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant='h6' flex={1}>Diário Pessoal</Typography>
        <Icon>menu_book</Icon>
      </Toolbar>
    </AppBar>

    <Toolbar></Toolbar>

    <Routes>
      <Route path='/:ano/:mes/' element={<PaginaInicial />} />
      <Route path='/:ano/:mes/:dia' element={<PaginaDetalhes />} />
    </Routes>

  </>

}