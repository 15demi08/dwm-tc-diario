import { AppBar, Button, CssBaseline, FormControl, Icon, InputLabel, MenuItem, Select, Stack, Toolbar, Typography } from '@mui/material';
import './App.css';
import React from 'react';

function App() {

  const [ano, setAno] = React.useState(2023);
  const escolherAno = (event) => setAno(event.target.value);

  const mudarAno = (valor) => valor > 0 ? setAno(ano + 1) : setAno(ano - 1);

  return <>

    <CssBaseline />

    <AppBar position='static'>

      <Toolbar>

        <Typography variant='h6'>Diário Pessoal</Typography>

      </Toolbar>

    </AppBar>

    <Stack direction="row" justifyContent="space-between">

      <Button onClick={() => mudarAno(-1)}>
        <Icon>keyboard_arrow_left</Icon>
      </Button>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="ano">Ano</InputLabel>
        <Select labelId="ano" id="selectAno" value={ano} label="Ano" onChange={escolherAno}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={() => mudarAno(1)}>
        <Icon>keyboard_arrow_right</Icon>
      </Button>

    </Stack>

  </>

}

export default App;
