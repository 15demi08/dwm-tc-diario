export default function anos(){

    const
        anoReal = new Date().getFullYear(),
        anos = [];

    // Últimos dez anos, incluindo anoReal
    for (let i = anoReal; i > (anoReal - 11); i--) {
        anos.push(i);
    }
    
    return anos;
    
}

export const anoReal = () => new Date().getFullYear();