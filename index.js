// Import stylesheets
import "./style.css";
import "./css/bootstrap.css";
import "./js/bootstrap.js";

(function(w) {
  var tabela = document.getElementById("tabela_de_aulas");
  var cadastrarAula = document.getElementById("cadastro_de_aulas");
  var cadastrarDisc = document.getElementById("cadastro_de_disciplina");
  var cadastrarProf = document.getElementById("cadastro_de_professores");

  var count = 2;
  var click = 1;
  var qtd = 0;

  var cadastroaula = function() {
    tabela.style.display = "none";
    cadastrarAula.style.display = "block";
  };

  var retornarTabela = function() {
    cadastrarAula.style.display = "none";
    tabela.style.display = "block";
  };

  var cadastrarDiscipli = function() {
    cadastrarAula.style.display = "none";
    cadastrarDisc.style.display = "block";
  };

  var retornarCadastroAula = function() {
    cadastrarDisc.style.display = "none";
    cadastrarProf.style.display = "none";
    cadastrarAula.style.display = "block";
  };

  var cadastrodeprofessores = function() {
    cadastrarAula.style.display = "none";
    cadastrarProf.style.display = "block";
  };

  var ativarDisciplinaCadastrada = function() {
    var nome = document.getElementById("nomeDisci");
    var descricao = document.getElementById("nomeDescri");
    var selecioneDisciplina = document.getElementById("disciplina");

    var vetorDisciplina = [];

    vetorDisciplina.push(nome.value);

    var i = 0;
    while (i < vetorDisciplina.length) {
      var option = new Option(vetorDisciplina[i], vetorDisciplina[i]);
      selecioneDisciplina.add(option);
      i++;
    }

    cadastrarDisc.style.display = "none";
    cadastrarAula.style.display = "block";

    nome.value = null;
    descricao.value = null;
  };

  var ativarProfessorCadastrado = function() {
    var nome = document.getElementById("nomeProf");
    var cpf = document.getElementById("cpfProf");
    var email = document.getElementById("emailProf");
    var telefone = document.getElementById("telefoneProf");
    var endereco = document.getElementById("enderecoProf");
    var especializacao = document.getElementById("EspecializacaoProf");
    var selecioneProfessor = document.getElementById("professor");

    var vetorProfessor = [];
    var vetorCpf = [];

    vetorProfessor.push(nome.value);
    vetorCpf.push(cpf.value);

    if (testarCpf(cpf.value)) {
      var i = 0;
      while (i < vetorProfessor.length) {
        var opcao = new Option(vetorProfessor[i], vetorProfessor[i]);
        selecioneProfessor.add(opcao);
        i++;
      }
    } else {
      alert("CPF não Valido");
    }

    cadastrarProf.style.display = "none";
    cadastrarAula.style.display = "block";

    nome.value = null;
    cpf.value = null;
    email.value = null;
    telefone.value = null;
    endereco.value = null;
    especializacao.value = null;
  };

  function testarCpf(strcpf) {
    var soma = 0;
    var resto;

    if (strcpf == "00000000000") return false;

    for (var i = 1; i <= 9; i++) {
      soma = soma + parseInt(strcpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strcpf.substring(9, 10))) return false;
    soma = 0;
    for (var i = 1; i <= 10; i++) {
      soma = soma + parseInt(strcpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strcpf.substring(10, 11))) return false;
    return true;
  }

  var adicionarAluno = function() {
    var tabeladosalunos = document.getElementById("alunosTabela");
    var elementosDiv = document.createElement("div");

    count = count + 1;

    if (qtd < 13) {
      tabeladosalunos.appendChild(elementosDiv);
      elementosDiv.innerHTML =
        `<<div class="row" id="` +
        (count - 1) +
        `">
                    <div class="col-md-1">
                      <label>Id:</label>
                      <input type="number" class="form-control" placeholder="Id" name="idAluno` +
        (count - 1) +
        `" id="idAluno` +
        (count - 1) +
        `" value="` +
        count +
        `">
                    </div>
                    <div class="col-md-2">
                      <label>Nome: </label>
                      <input type="text" class="form-control" placeholder="Nome Completo" name="nameAluno` +
        (count - 1) +
        `" id="nameAluno` +
        (count - 1) +
        `">
                    </div>
                    <div class="col-md-2">
                      <label>CPF:</label>
                      <input type="number" class="form-control" placeholder="CPF" name="cpfAluno` +
        (count - 1) +
        `" id="cpfAluno` +
        (count - 1) +
        `">
                    </div>
                    <div class="col-md-2">
                      <label> Endereço: </label>
                      <input type="text" class="form-control" placeholder="Endereço" name="enderecoAluno` +
        (count - 1) +
        `" id="enderecoAluno` +
        (count - 1) +
        `">
                    </div>
                    <div class="col-md-2">
                      <label> Telefone: </label>
                      <input type="number" class="form-control" placeholder="Telefone" name="telefoneAluno` +
        (count - 1) +
        `" id="telefoneAluno` +
        (count - 1) +
        `">
                    </div>
                    <div class="col-md-2">
                      <label> Email: </label>
                      <input type="email" class="form-control" placeholder="email" name="emailAluno` +
        (count - 1) +
        `" id="emailAluno` +
        (count - 1) +
        `">
                    </div>
                  </div>`;
      qtd++;
    }
  };

  var cadastroDeAulas = function() {
    var dadosDaTabela = [];
    var dados = [];
    var disciplina = document.getElementById("disciplina");
    var professor = document.getElementById("professor");
    var tabelaAula = document.getElementById("tabelaDeAulas");

    dados.push(disciplina.value);
    dados.push(professor.value);
    disciplina.value = "selected";
    professor.value = "selected";

    var i = 0;
    while (i < count) {
      var name = document.getElementById("nameAluno" + i);
      var cpf = document.getElementById("cpfAluno" + i);
      var endereco = document.getElementById("enderecoAluno" + i);
      var telefone = document.getElementById("telefoneAluno" + i);
      var email = document.getElementById("emailAluno" + i);

      if (testarCpf(cpf.value)) {
        dados.push(name.value);
      } else {
        alert("CPF não Valido");
      }
      name.value = null;
      cpf.value = null;
      endereco.value = null;
      telefone.value = null;
      email.value = null;
      i++;
    }

    dadosDaTabela.push(dados);

    var tabelaProfessor = null;
    var tabelaDisciplina = null;
    var tabelaAlunos = [];

    tabelaDisciplina = dadosDaTabela[0][0];
    tabelaProfessor = dadosDaTabela[0][1];

    var k = 0;
    while (k < count) {
      tabelaAlunos.push(dadosDaTabela[0][k + 2]);
      k++;
    }

    var novaTabela = document.createElement("tr");
    tabelaAula.appendChild(novaTabela);
    novaTabela.innerHTML =
      "<tr>" +
      "<td>" +
      click +
      "</td>" +
      "<td>" +
      tabelaProfessor +
      "</td>" +
      "<td>" +
      tabelaDisciplina +
      "</td>" +
      "<td>" +
      tabelaAlunos +
      "</td>" +
      "</tr>";

    click = click + 1;
    count = 2;

    cadastrarAula.style.display = "none";
    tabela.style.display = "block";
  };

  (w.cadastroaula = cadastroaula),
    (w.retornarTabela = retornarTabela),
    (w.cadastrarDiscipli = cadastrarDiscipli),
    (w.retornarCadastroAula = retornarCadastroAula),
    (w.cadastrodeprofessores = cadastrodeprofessores),
    (w.ativarDisciplinaCadastrada = ativarDisciplinaCadastrada),
    (w.ativarProfessorCadastrado = ativarProfessorCadastrado),
    (w.adicionarAluno = adicionarAluno),
    (w.cadastroDeAulas = cadastroDeAulas);
})(window);
