import React, { useEffect, useRef, useState } from "react";
import { Button, Icon, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Form, redirect, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import meses from "../utilidades/meses";

export default function PaginaDetalhes() {

    const
        idUsuario = 0, // DEV - O produto final usaria algo como contextProvider - ou talvez exatamente isso 🤔
        navegar = useNavigate(),
        localizacao = useLocation(),
        [ano, mes, dia] = localizacao.pathname.split("/").slice(1, 4).map(s => Number(s)), // "/2023/4/1" => [2023, 4, 1]

        [editado, setEditado] = useState(false),
        [texto, setTexto] = useState(""),
        [podeDeletar, setPodeDeletar] = useState(false);

    let
        textoInicial = useRef("");

    function digitar(e) {

        if (e.target.value !== textoInicial.current) {
            setEditado(true);
            setTexto(e.target.value);
        } else {
            setEditado(false);
            setTexto(textoInicial.current);
        }

    }

    function deletarEntrada() {

        const id = document.querySelector("#id").value;

        axios
            .delete(`http://localhost:1165/entradas/${id}`)
            .then(() => {
                alert(`Entrada do dia ${dia < 10 ? "0" + dia : dia}/${mes < 10 ? "0" + mes : mes}/${ano} excluída com sucesso.`)
                navegar(`/${ano}/${mes}`);
            })

    }

    useEffect(() => {

        const url = `http://localhost:1165/entradas?usuarioId=${idUsuario}&ano=${ano}&mes=${mes - 1}&dia=${dia}`;

        axios.get(url)
            .then((entrada) => {
                if (entrada.data.length > 0) {
                    document.querySelector("#id").value = entrada.data[0].id;
                    textoInicial.current = entrada.data[0].conteudo;
                    setTexto(entrada.data[0].conteudo);
                    setPodeDeletar(true);
                }
            });

    }, [ano, mes, dia]);

    return <>

        <Typography variant="h5" sx={{ mt: 2 }}>
            <IconButton onClick={() => navegar(-1)}>
                <Icon>arrow_back</Icon>
            </IconButton>{dia === 1 ? "1º" : dia} de {meses(ano)[mes - 1].nome} de {ano}
        </Typography>

        <Form method="POST" name="entrada" id="entrada">
            <Stack direction="column" justifyContent="space-between" spacing={1} justifyItems="stretch" sx={{ p: 2, height: '100%' }}>
                <input type="hidden" name="id" id="id" />
                <input type="hidden" name="usuarioId" value={idUsuario} />
                <input type="hidden" name="dia" value={dia} />
                <input type="hidden" name="mes" value={mes - 1} />
                <input type="hidden" name="ano" value={ano} />
                <TextField id="conteudo" name="conteudo" label="Conteúdo" fullWidth multiline sx={{ lineHeight: 1.5, mb: 2 }} onChange={digitar} value={texto} />
                <Button type="submit" variant="contained" disabled={!editado}>Salvar</Button>
                <Button type="button" variant="contained" disabled={!podeDeletar} color="error" onClick={deletarEntrada}>Deletar</Button>
            </Stack>
        </Form>

    </>;
}

export async function atualizarEntrada({ request, params }) {

    const
        formData = await request.formData(),
        dados = Object.fromEntries(formData);

    console.log("Dados: ");
    console.log("id:" + dados.id);
    console.log("usuarioId: " + dados.usuarioId);
    console.log("dia: " + dados.dia);
    console.log("mes: " + dados.mes);
    console.log("ano: " + dados.ano);
    console.log("conteudo: " + dados.conteudo);


    (dados.id === ""

        ? axios.post(`http://localhost:1165/entradas/`, dados) // Nova entrada na data especificada

        : axios.patch(`http://localhost:1165/entradas/${dados.id}`, { conteudo: dados.conteudo }) // Atualização de entrada já existente

    ).then(() => {

        const msg = (dados.id === "" ? "criada" : "atualizada"),
            mesNmb = Number(dados.mes) + 1,
            mesTxt = (  mesNmb < 10 ? "0" + mesNmb : mesNmb  );

        alert(`Entrada do dia ${dados.dia < 10 ? "0" + dados.dia : dados.dia}/${mesTxt}/${dados.ano} ${msg} com sucesso!`)

    });

    return redirect(`/${dados.ano}/${Number(dados.mes) + 1}`);

}