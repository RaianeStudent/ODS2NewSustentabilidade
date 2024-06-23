const listaDados = document.getElementById('lista-dados')
let dadosAnteriores = localStorage.getItem('dados');
if (dadosAnteriores.length > 0) {
    dadosAnteriores = eval(dadosAnteriores)
    dadosAnteriores.forEach((item, i) => {
        const itemDados = document.createElement('li');
        itemDados.textContent = `${item.id} - ${item.dataAtual} - ${item.nome} - ${item.email}`;
        itemDados.appendChild(criarBotaoExcluir(i));
        listaDados.appendChild(itemDados);
    });
}

function guardaFormulario() {
    let dadosAnteriores = localStorage.getItem('dados') || []
    dadosAnteriores = eval(dadosAnteriores)
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const dataAtual = new Date().toLocaleDateString()
    let id = 1
    if(dadosAnteriores.length > 0){
        id = dadosAnteriores[dadosAnteriores.length - 1]?.id + 1
    }
    const novoCadastro = {
        id: id,
        dataAtual: dataAtual,
        nome: nome,
        email: email
    }
    dadosAnteriores.push(novoCadastro)
    localStorage.setItem('dados', JSON.stringify(dadosAnteriores))
    window.location.reload()
}

function excluirItem(indice) {
    let dadosAnteriores = []
    dadosAnteriores = localStorage.getItem('dados');
    dadosAnteriores = eval(dadosAnteriores)
    dadosAnteriores.splice(indice, 1)
    localStorage.setItem('dados', JSON.stringify(dadosAnteriores))
    window.location.reload()
}

function criarBotaoExcluir(indice) {
    const botao = document.createElement('button');
    botao.textContent = 'Excluir';
    botao.addEventListener('click', () => excluirItem(indice));
    return botao;
}

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
}

function limparLocalStorage() {
    localStorage.clear();
    const listaDados = document.getElementById('lista-dados');
    listaDados.innerHTML = '';
}

function pesquisarPorNome() {
    const nomePesquisado = document.getElementById('pesquisaNome').value;
    let dadosAnteriores = localStorage.getItem('dados');
    dadosAnteriores = eval(dadosAnteriores)
    const dadosPesquisados = dadosAnteriores.filter((item) => item.nome.toUpperCase().includes(nomePesquisado.toUpperCase()))
    if (dadosPesquisados.length > 0) {
        listaDados.innerHTML = '';
        dadosPesquisados.forEach((item, i) => {
            const itemDados = document.createElement('li');
            itemDados.textContent = `${item.id} - ${item.dataAtual} - ${item.nome} - ${item.email}`;
            itemDados.appendChild(criarBotaoExcluir(i));
            listaDados.appendChild(itemDados);
        });
    }
    else {
        alert("Nenhum cadastro encontrado.")
    }

}