import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DialogoPeriodo from "../componentes/DialogoPeriodo";
import CabecalhoPeriodo from "../componentes/CabecalhoPeriodo";
import ListaPeriodo from "../componentes/ListaPeriodo";

export default function PaginaInicial() {

    const
        navegar = useNavigate(),
        localizacao = useLocation(),
        [anoURL, mesURL] = localizacao.pathname.split("/").slice(1, 3).map(s => Number(s)), // "/2023/4" => [2023, 4]

        [ano, setAno] = useState(anoURL),
        [mes, setMes] = useState(mesURL - 1),

        [dialogoAberto, setDialogoAberto] = useState(false);

    function abrirDialogo() {
        setDialogoAberto(true);
    }

    function cancelarDialogo() {
        console.log("Cancelando diálogo");
        setDialogoAberto(false);
    }

    function confirmarDialogo(anoEscolhido, mesEscolhido) {

        console.log(`Confirmando diálogo - Ano: ${anoEscolhido}, Mês: ${mesEscolhido}`);

        if (anoEscolhido !== ano && mesEscolhido !== mes) {

            navegar(`/${anoEscolhido}/${mesEscolhido + 1}`, { replace: true })
            setAno(anoEscolhido);
            setMes(mesEscolhido);

        }

        setDialogoAberto(false);

    }

    return <>

        <CabecalhoPeriodo ano={ano} mes={mes} aoClicar={abrirDialogo} />

        <ListaPeriodo ano={ano} mes={mes} />

        <DialogoPeriodo
            aberto={dialogoAberto}
            anoInicial={ano}
            mesInicial={mes}
            aoConfirmar={confirmarDialogo}
            aoCancelar={cancelarDialogo}
        />

    </>;
}