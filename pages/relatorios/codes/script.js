addEventListener('load', function (){
    carregar();
    calcularTudo();
})

var fluxo = []

function carregar(){
    fluxo = JSON.parse(localStorage.getItem('transacoes')) || [];
}


//Calcular

function calcularTudo(){
    let ganho = 0
    let gasto = 0

    let ganhoArray = fluxo.filter(dado => dado.tipo === 'Entrada').map(especifico => parseFloat(especifico.valores)) 
    let gastoArray = fluxo.filter(dado => dado.tipo === 'Saída').map(especifico => parseFloat(especifico.valores)) 

    ganho = ganhoArray.length > 0 ? ganhoArray.reduce((a, b) => a + b) : 0;
    gasto = gastoArray.length > 0 ? gastoArray.reduce((a, b) => a + b) : 0;

    total = ganho - gasto

    let porcentagem = 0 

    if(ganho > gasto){
        porcentagem = gasto / ganho * 100
    }

    document.getElementById('valor-recebido').innerHTML = ganho.toLocaleString('pt-BR', {style: 'decimal',minimumFractionDigits: 2,maximumFractionDigits: 2});
    document.getElementById('valor-gasto').innerHTML = gasto.toLocaleString('pt-BR', {style: 'decimal',minimumFractionDigits: 2,maximumFractionDigits: 2});
    document.getElementById('valor-restante').innerHTML = total.toLocaleString('pt-BR', {style: 'decimal',minimumFractionDigits: 2,maximumFractionDigits: 2});
    document.getElementById('porcetagem-gasto').innerHTML = porcentagem.toFixed(0)

    graficoPorcentagem(gasto, ganho, total, porcentagem)
    
}


function graficoPorcentagem(gasto, ganho){
    const config = {
        type: 'doughnut',  // Gráfico de pizza redondo
        data: {
            datasets: [{
                data: [gasto, ganho],
                backgroundColor: ['#7000FF', '#B880FF'],  // Cores para os setores
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,  // Para garantir que o gráfico seja redondo
        },
    };
    const ctx = document.getElementById('meuGrafico').getContext('2d');
        new Chart(ctx, config);
    
}