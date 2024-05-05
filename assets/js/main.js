const form = document.getElementById("form-atividade");
const imgAprovado =
  '<img src="./assets/img/aprovado.png" alt="emoji aprovado" />';
const imgReprovado =
  '<img src="./assets/img/reprovado.png" alt="emoji reprovado" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(
  prompt("Digite a nota mínima para ser aprovado: ")
);

let linhas = "";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  addLinha();
  atualizarTabela();
  atualizaMediaFinal();
});

function addLinha() {
  const inputNomeAtividade = document.getElementById("nome-atividade");
  const inputNotaAtividade = document.getElementById("nota-atividade");

  if (atividades.includes(inputNomeAtividade.value)) {
    alert(`Atividade: ${inputNomeAtividade.value}, já foi inserida!`);
  } else {
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

    let linha = "<tr>";
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${
      inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado
    }</td>`;
    linha += "<tr>";

    linhas += linha;
  }

  inputNomeAtividade.value = "";
  inputNotaAtividade.value = "";
}

function atualizarTabela() {
  const corpoTabela = document.querySelector("tbody");
  corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
  const mediaFinal = calculaMediaFinal().toFixed(2);

  document.getElementById("media-final-valor").innerHTML = mediaFinal;
  document.getElementById("media-final-resultado").innerHTML =
    mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
  let somaNotas = 0;

  for (let i = 0; i < notas.length; i++) {
    somaNotas += notas[i];
  }

  return somaNotas / notas.length;
}
