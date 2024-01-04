addEventListener('load', function (){
    carregar()
    calcularTudo()
})



const ul = document.getElementById('criar-abaixo')

const popup = document.getElementById('popup-entrada')

var fluxo = []

var categorias = {
    'shopping': '../../assets/img/Entrada.png',
    'transporte':  '../../assets/img/Entrada.png',
}

function adicionarTransacao(){
    const inputNome = document.getElementById('input-nome')
    const inputValor = document.getElementById('input-valor')
    const inputTipo = document.getElementById('input-tipo')

    if(inputNome.value == '' || inputValor.value === ''){
        alert('Preencha todos os campos...')
    }else{
        fluxo.unshift({
            nome: inputNome.value,
            valores: inputValor.value,
            tipo: inputTipo.value,
            categoria: "shopping",
    })
    console.log(fluxo[0])
    fecharPopup()
    salvar()
    }
}

function adicionarCategoria(){

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
    inserirTransacao(transacao.nome, transacao.valores, transacao.tipo, i, transacao.categoria)
    })

}

function inserirTransacao(nome, valor, tipo, i){
    const li = document.createElement('li')

    nome = nome.substring(0,13);
    valor = valor.substring(0,7)

        li.innerHTML = `
        <div class="transacoes-${tipo}" id="transacao-${i}">
                    <div class="fundo-transacao-01">
                        <img src="../../assets/img/${tipo}.png" alt="">
                        <div>
                            <p class="nome-transacao">${nome}</p> 
                            <p class="sub">Compra</p>
                        </div>
                        <div>
                        <button onclick="popupEntrada('alterar', ${i}, '${nome}', '${valor}')" class="icone-lix"> <img src="../../assets/img/caneta.svg"></button>
                        </div>
                    </div>
                    <div class="fundo-transacao-02">
                        <p class="valor-transacao">R$${valor}</p>
                        <button onclick="remove(${i})" class="icone-lix"> <img src="../../assets/img/lixo.svg"></button>
                    </div>
                </div>`


    ul.appendChild(li)
}

function remove(index){
    fluxo.splice(index, 1)
    salvar()

}


function popupEntrada(tipoBotao, index, nome, valor){

    const div = document.createElement('div')
    div.classList.add('background-popup')

  

    div.innerHTML = `
        <p>Adicionar Valor</p>
        <input id="input-nome" type="text" value="${nome}" placeholder="Insira um valor">
        <input id="input-valor" type="number" value="${valor}" placeholder="Insira um valor">
        <select name="input-tipo" id="input-tipo">
            <option>Entrada</option>
            <option>Saída</option>
        </select>
        <input type="hidden" id="input-tipo" value="Entrada"></input>
        <input onclick="adicionarTransacao()" type="button" value="Adicionar Transação" id="botao-adicionar">
        <input onclick="alterarDados(${index})" type="button" value="Alterar Dados" id="botao-alterar">
        <button onclick="fecharPopup()" id="cancelar">Cancelar</button>
    `
    
    popup.appendChild(div)
    if(tipoBotao == "adicionar"){
        document.getElementById('botao-adicionar').style.display = 'flex'
        }else{
        document.getElementById('botao-alterar').style.display = 'flex'
        }
    document.getElementById('popup-entrada').style.display = 'flex'
        
}   

function fecharPopup(){
    popup.innerHTML = ""

    document.getElementById('popup-entrada').style.display = 'none'
}


function alterarDados(index){
    const inputNome = document.getElementById('input-nome')
    const inputValor = document.getElementById('input-valor')
    const inputTipo = document.getElementById('input-tipo')

    if(inputNome.value == '' || inputValor.value === ''){
        alert('Preencha todos os campos...')
    }else{
        fluxo[index].nome = inputNome.value
        fluxo[index].valores = inputValor.value
        fluxo[index].tipo = inputTipo.value
    }
    console.log(fluxo[index])

    fecharPopup()
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
}