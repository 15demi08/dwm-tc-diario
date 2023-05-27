import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import React, { useState } from "react";

import anos, { anoReal } from "../utilidades/anos";
import meses, { mesReal } from "../utilidades/meses";

export default function DialogoPeriodo({ aberto, anoInicial, mesInicial, aoConfirmar, aoCancelar }) {

    const
        [ano, setAno] = useState(anoInicial),
        [mes, setMes] = useState(mesInicial);

    /**
    * Disparado pelo onChange no select do Ano
    * @param {event} e O evento de mudança do valor (onChange)
    */
    function escolherAno(e) {

        const
            anoEscolhido = e.target.value,
            mr = mesReal();

        if (anoEscolhido === anoReal())
            if (mes > mr)
                setMes(mr);

        setAno(anoEscolhido);

    }

    /**
     * Disparado pelo onChange no select do Mês
     * @param {event} e O evento de mudança do valor (onChange)
     */
    function escolherMes(e) {

        setMes(e.target.value)

    }

    return <Dialog open={aberto}>
        <DialogTitle>Alterar Mês e Ano</DialogTitle>
        <DialogContent>
            <Stack direction="column">
                <FormControl sx={{ m: 1, flex: 1 }} size="small">
                    <InputLabel id="ano">Ano</InputLabel>
                    <Select labelId="ano" id="selectAno" label="Ano" onChange={escolherAno} value={ano}>
                        {anos().map((a) => <MenuItem key={a} value={a} selected={ a === ano }>{a}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, flex: 1 }} size="small">
                    <InputLabel id="mes">Mês</InputLabel>
                    <Select labelId="mes" id="selectMes" label="Mês" onChange={escolherMes} value={mes}>
                        {
                            (ano === anoReal()
                                ? meses().slice(0, mesReal() + 1)
                                : meses()
                            ).map( (m, i) => <MenuItem key={i} value={i} selected={ i === mes }>{m.nome}</MenuItem> )
                        }
                    </Select>
                </FormControl>
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => aoConfirmar(ano, mes)}>OK</Button>
            <Button onClick={aoCancelar}>Cancelar</Button>
        </DialogActions>
    </Dialog>

}