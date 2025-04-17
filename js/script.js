/*
async function buscarCotacao(){
    const moeda = document.getElementById("moeda").value;
    const campoValor = document.getElementById("valor");
    if (!moeda){
        alert("selecione uma Moeda!");
        return;
    }

    try {
        const resposta = await fetch(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.10813/dados/ultimos/1?formato=json`);
        const dados = await resposta.json();
        console.log("Dados da API:", dados);
        const chaveMoeda = `$(moeda)BRl`;
        const cotacao = dados[chaveMoeda].bid;

        campoValor.value = parseFloat(cotacao).toFixed(2);
    } catch (erro) {
        console.error("Erro ao buscar cotação:", erro);
        campoValor.value = "Erro ao carregar";
    }
}
*/

async function buscarCotacao() {
    const moeda = document.getElementById("moeda").value.toUpperCase(); // Garante "USD" ou "EUR"
    const campoValor = document.getElementById("valor");

    if (!moeda) {
        alert("Selecione uma moeda!");
        return;
    }

    try {
        // Usando proxy para evitar CORS (opcional)
        const proxyUrl = "https://api.allorigins.win/raw?url=";
        const apiUrl = `https://economia.awesomeapi.com.br/json/last/${moeda}-BRL`;
        
        const resposta = await fetch(proxyUrl + encodeURIComponent(apiUrl));
        const dados = await resposta.json();
        console.log("Dados da API:", dados); // Depuração

        // Verifica se a moeda existe na resposta
        if (!dados[`${moeda}BRL`]) {
            throw new Error(`Moeda ${moeda} não encontrada`);
        }

        // Formata o valor corretamente
        const cotacao = parseFloat(dados[`${moeda}BRL`].bid).toFixed(2);
        campoValor.value = `R$ ${cotacao}`;
    } catch (erro) {
        console.error("Erro:", erro);
        campoValor.value = "Valor indisponível";
    }
}