import { AppBar, CssBaseline, Icon, IconButton, Toolbar, Typography } from '@mui/material';
import './App.css';
import React from 'react';
import PaginaInicial from './paginas/PaginaInicial';
import PaginaDetalhes from './paginas/PaginaDetalhes';

export default function App() {

  //const [pagina, setPagina] = React.useState("inicial")
  const pagina = "inicial"
  // const pagina = "detalhes"
  //const mudarPagina = (event) => setPagina(event.target.value);

  function mostrarBotaoVoltar(){
    if ( pagina === "detalhes" )
      return <IconButton color="inherit" edge="start"><Icon>arrow_back</Icon></IconButton>
  }

  return <>

    <CssBaseline />

    <AppBar position='static'>

      <Toolbar>

      {mostrarBotaoVoltar()}

        <Typography variant='h6'>Diário Pessoal</Typography>

      </Toolbar>

    </AppBar>

    {pagina === "inicial"
      ? <PaginaInicial />
      : <PaginaDetalhes />
    }

  </>

}