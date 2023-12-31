addEventListener('load', function (){
    carregar()
    calcularTudo()
})

const inputNome = document.getElementById('input-nome')
const inputValor = document.getElementById('input-valor')
const inputTipo = document.getElementById('input-tipo')

const ul = document.getElementById('criar-abaixo')

var fluxo = []


function adicionarTransacao(){
    if(inputNome.value == '' || inputValor.value === ''){
        alert('Preencha todos os campos...')
    }else{
        fluxo.unshift({
            nome: inputNome.value,
            valores: inputValor.value,
            tipo: inputTipo.value,
    })
    fecharPopup()
    limparCampos()
    salvar()
    }
}

function salvar(){
    localStorage.setItem('transacoes', JSON.stringify(fluxo))
    carregar()
    calcularTudo()
}

function carregar(){
    ul.innerHTML = ""

    fluxo = JSON.parse(localStorage.getItem('transacoes')) || [];    
    fluxo.forEach((transacao, i) => {
    inserirTransacao(transacao.nome, transacao.valores, transacao.tipo, i)
    })

}

function inserirTransacao(nome, valor, tipo, i){
    const li = document.createElement('li')

    if(tipo === 'Entrada'){
        li.innerHTML = `
        <div class="transacoes-Entrada" id="transacao-${i}">
                    <div class="fundo-transacao-01">
                        <img src="../../assets/img/entrada padrão.png" alt="">
                        <div>
                            <p class="nome-transacao">${nome}</p>
                            <p class="sub">Compra</p>
                        </div>
                    </div>
                    <div class="fundo-transacao-02">
                        <p class="valor-transacao">R$${valor}</p>
                        <button onclick="remove(${i})" class="icone-lix"> <img src="../../assets/img/lixo.svg"></img></button>
                    </div>
                </div>    `
    }else{
    li.innerHTML = `
        <div class="transacoes-Saida" id="transacao-${i}">
                    <div class="fundo-transacao-01">
                        <img src="../../assets/img/icone padrão.png" alt="">
                        <div>
                            <p class="nome-transacao">${nome}</p>
                            <p class="sub">Compra</p>
                        </div>
                    </div>
                    <div class="fundo-transacao-02">
                        <p class="valor-transacao">- R$${valor}</p>
                        <button onclick="remove(${i})" class="icone-lix"> <img src="../../assets/img/lixo.svg"></img></button>
                    </div>
                </div>    `
    }


    ul.appendChild(li)
}

function remove(index){
    fluxo.splice(index, 1)
    salvar()

}

function limparCampos(){
    inputValor.value = ""
    inputNome.value = ""
}

function popupEntrada(){
    document.getElementById('popup-entrada').style.display = 'flex'
}   

function fecharPopup(){
    document.getElementById('popup-entrada').style.display = 'none'
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

    console.log(ganho, gasto, total)
}