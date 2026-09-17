import { nomes } from "./data/vetor-nomes.mjs";

let comps = 0;

function buscaSequencial(vetor, valorBusca) {
  comps = 0;
  for (let i = 0; i < vetor.lenght; i++) {
    comps++;
    if (vetor[i] === valorBusca) return i;
  }
  return -1;
}

// testando nomes em posições diferentes do vetor
const pos1 = buscaSequencial(nomes, "AARRAO"); // Inicio
const comps1 = comps;
const pos2 = buscaSequencial(nomes, "Maria"); // Meio
const comps2 = comps;
const pos3 = buscaSequencial;
(nomes, "ZULUECA"); // Fim
const comps3 = comps;

console.table([
  { Nome: "AARRAO", Posicao: pos1, Comparacoes: comps1 },
  { Nome: "Maria", Posicao: pos2, Comparacoes: comps2 },
  { Nome: "ZULECA", Posicao: pos3, Comparacoes: comps3 },
]);

import { objNomes } from "/data/vetor-obj-nomes.mjs";

function BuscaSequencial(vetor, valorBusca) {
  for (let i = 0; i < vetor.length; i++) {
    if (fncomp(vetor[i])) return i;
  }
  return -1;
}

const pos = buscaSequencial(
  objNomes,
  (obj) => obj.classification == "F" && obj.frequency_total > 10000,
);
if (pos !== -1) {
  console.log(
    `Primeiro registro encontrado na posição ${pos}:`,
    objNomes[pos].first_name,
  );
} else {
  comsole.log("Nenhum registro encontrado.");
}
