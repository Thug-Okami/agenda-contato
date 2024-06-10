const exibeContatos = () => {
    const tabela = document.getElementById('idTabelaContatos');
    const tbody = document.querySelector('tbody');

    tbody.innerHTML = `
    <tr>
        <th>Nome</th>
        <th>Contato</th>
        <th>E-mail</th>
        <th>Excluir</th>
        <th>Editar</th>
    </tr>`
    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];

    contatos.forEach((contato, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
        <tr>
            <td>${contato.nome}</td>
            <td>${contato.telefone}</td>
            <td>${contato.email}</td>
            <td><button class="btnExcluir" onclick="deletaContato(${index})"><i class="fa fa-trash"></i></button></td>
            <td><button class="btnEditar" onclick="editaContato(${index})"><i class="fa fa-edit"></i></button></td>
        </tr>`
    });
}

const addContato = (event) => {
    event.preventDefault();
    let form = document.getElementById('idContatoForm');
    let nome = document.getElementById("idNome").value.trim();
    let sobrenome= document.getElementById("idSobrenome").value.trim();
    let telefone = document.getElementById('idTel').value.trim();
    let tipoTel = document.getElementById('idTelTipo').value.trim();
    let email = document.getElementById('idEmail').value.trim();
    let camposVazios = [];

    if(nome == ''){
        camposVazios.push(`Nome`)
    }
    if(sobrenome == ''){
        camposVazios.push("Sobrenome")
    }
    if(telefone == ''){
        camposVazios.push("Telefone")
    }
    if(tipoTel == ''){
        camposVazios.push("telTipo")
    }
    if(email == ''){
        camposVazios.push("Email")
    }else{

    const contato = {
        nome: nome,
        sobrenome: sobrenome,
        telefone: telefone,
        tipoTel: tipoTel,
        email: email
    }

    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

    contatos.push(contato)
    localStorage.setItem('contatos', JSON.stringify(contatos));
   
    if (nome == '' || sobrenome == '' || telefone == '' || tipoTel == '' || email == '')
        alert('Faltou coisa irmão' + camposVazios);


    console.log(`Novo Contato Adicionado
    nome: ${nome}
    sobrenome: ${sobrenome}
    tel: ${telefone}
    email: ${email}`);

    form.reset();
    exibeContatos();
    }
}

const cancelaForm = (event) => {
    event.preventDefault();
    document.getElementById('idContatoForm').reset();
}

const deletaContato = (index) => {
    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    contatos.splice(index, 1);

    localStorage.setItem('contatos', JSON.stringify(contatos));
    exibeContatos();
}

const editaContato = (index) => {
    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    const contato = contatos[index];

    document.getElementById('idNome').value = contato.nome;
    document.getElementById('idSobrenome').value = contato.sobrenome;
    document.getElementById('idTel').value = contato.telefone;
    document.getElementById('idTelTipo').value = contato.tipoTel;
    document.getElementById('idEmail').value = contato.email;

    const atualizaContato = (event) => {
        event.preventDefault();

    contato.nome = document.getElementById("idNome").value.trim();
    contato.sobrenome= document.getElementById("idSobrenome").value.trim();
    contato.telefone = document.getElementById('idTel').value.trim();
    contato.tipoTel = document.getElementById('idTelTipo').value.trim();
    contato.email = document.getElementById('idEmail').value.trim();

    upContato = JSON.stringify(contatos);
    localStorage.setItem('contatos', upContato);

    exibeContatos();
    document.getElementById('idContatoForm').reset()

    document.querySelector('.btnSalvar').removeEventListener('click', atualizaContato);
    document.querySelector('.btnSalvar').addEventListener('click', addContato);
    }
document.querySelector('.btnSalvar').removeEventListener('click', addContato);
document.querySelector('.btnSalvar').addEventListener('click', atualizaContato)
}

const buscaContato = () => {
    const barraPesquisa = document.getElementById('idPesquisa').value.trim().toLowerCase();
    const tabela = document.getElementById('idTabelaContatos');
    const linhas = tabela.getElementsByTagName('tr');
    const quantidadeLinhas = linhas.length;

    for (let i=0; i < quantidadeLinhas; i++){
        const celulas = linhas[i].getElementsByTagName('td');
        const quantidadeCelulas = celulas.length;
        let busca = false;

        for (let j = 0; j < quantidadeCelulas; j++){
            const textoCelulas = celulas[j].textContent.toLocaleLowerCase();
            if(textoCelulas.includes(barraPesquisa)){
                busca = true
                break;
            }
        }
        busca ? linha[i].style.display = '' : linhas[i].style.display = 'none';
    }
}

const init = () =>{
    document.querySelector('.btnSalvar').addEventListener('click', addContato);
    document.querySelector('.btnCancelar').addEventListener('click', cancelaForm);
    document.getElementById('idPesquisa').addEventListener('input', buscaContato);
    exibeContatos();
}

init();