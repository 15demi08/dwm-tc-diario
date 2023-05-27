import { anoReal } from "./anos";

export default function meses( ano ){

    const dia1Mar = new Date( ano !== null ? ano : anoReal() , 2, 1);

    dia1Mar.setDate(dia1Mar.getDate() - 1);

    return  [
        { nome: "Janeiro", dias: 31 },
        { nome: "Fevereiro", dias: dia1Mar.getDate() },
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
    ];

}

export const mesReal = () => new Date().getMonth();