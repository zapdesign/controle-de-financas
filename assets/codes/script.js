addEventListener('load', function (){
    carregar()
    calcularTudo()
})


const ul = document.getElementById('criar-abaixo')

var fluxo = []


function carregar(){
    ul.innerHTML = ""

    fluxo = JSON.parse(localStorage.getItem('transacoes')) || [];  
    if(fluxo.length == 0) {
        document.getElementById('ultima-transacao').innerText = 'Suas transações apareceram aqui...'
        ul.style.display = "none"
    }
    fluxo.forEach((transacao, i) => {
    inserirTransacao(transacao.nome, transacao.valores, transacao.tipo, i)
    })

}

function inserirTransacao(nome, valor, tipo, i){
    const li = document.createElement('li')

    if(i < 3){
        li.innerHTML = `
        <div class="transacoes" id="transacao-${i}">
                    <div class="fundo-transacao">
                        <img src="assets/img/icone padrão.png" alt="">
                        <div>
                            <p id="nome-transacao">${nome}</p>
                            <p id="sub">Compra</p>
                        </div>
                    </div>
                        <p id="valor-transacao">R$${valor}</p>
                </div>    `
    ul.appendChild(li)
    }


}

function remove(index){
    fluxo.splice(index, 1)
    salvar()

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

    document.getElementById('valor-restante').innerHTML = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}