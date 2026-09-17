import { nomes as nomesOrdenados } from "./vetor-nomes.mjs";
import { objNomes } from "./vetor-obj-nomes.mjs";
import { objMotoristas } from "./motoristas-obj-desord.mjs";
import { nomes as nomesDesord } from "./nomes-desord.mjs";
import { performance } from "node:perf_hooks";

console.log("=== Revisão do 1º Bimestre - Estruturas de Dados II ===\n");

// -----------------------------------------------------------------------------
// Bloco 1: Algoritmos de Busca
// -----------------------------------------------------------------------------
console.log("Bloco 1.1 - Busca sequencial com contagem de comparações");

function buscaSequencialComContagem(vetor, valorBusca) {
  let comparacoes = 0;

  for (let i = 0; i < vetor.length; i++) {
    comparacoes++;
    if (vetor[i] === valorBusca) {
      return { posicao: i, comparacoes };
    }
  }

  return { posicao: -1, comparacoes };
}

const nomes = nomesOrdenados;
const nomeInicio = nomes[0];
const nomeMeio = nomes[Math.floor(nomes.length / 2)];
const nomeFinal = nomes[nomes.length - 1];

console.log("Busca do início:", buscaSequencialComContagem(nomes, nomeInicio));
console.log("Busca do meio:", buscaSequencialComContagem(nomes, nomeMeio));
console.log("Busca do final:", buscaSequencialComContagem(nomes, nomeFinal));

console.log(`\nRelação entre posição e comparações:`);
console.log(
  "- Melhor caso: o elemento está no início, então a busca termina com poucas comparações.",
);
console.log(
  "- Pior caso: o elemento está no final ou não existe, então ela percorre quase todo o vetor.",
);
console.log(
  "- Caso médio: cresce linearmente com a quantidade de elementos, ou seja, O(n).",
);

console.log("\nBloco 1.2 - Busca sequencial genérica em vetor de objetos");

function buscaSequencialObj(vetor, fnComp) {
  for (let i = 0; i < vetor.length; i++) {
    if (fnComp(vetor[i])) return i;
  }
  return -1;
}

const fnComp = (obj) =>
  obj.classification === "F" && obj.frequency_total > 100000;
const posObj = buscaSequencialObj(objNomes, fnComp);

if (posObj >= 0) {
  console.log("first_name encontrado:", objNomes[posObj].first_name);
} else {
  console.log("Nenhum registro encontrado.");
}

console.log(
  "\nBloco 1.3 - Busca binária: por que a ordenação é pré-requisito?",
);

console.log(
  "A busca binária exige vetor ordenado porque ela descarta metade do espaço de busca a cada passo.",
);
console.log(
  "Se o vetor estiver desordenado, o meio pode apontar para um valor que não representa a região correta,",
);
console.log(
  "fazendo o algoritmo ignorar elementos válidos ou até retornar uma posição falsa.",
);
console.log(
  "Exemplo: vetor [9, 1, 5, 2, 8] com busca do valor 5. O algoritmo assume ordem e divide em partes,",
);
console.log(
  "mas, ao trabalhar com uma sequência desordenada, ele pode escolher um ponto médio que não ajuda a comparar corretamente.",
);

function buscaBinariaComps(vetor, fnComp) {
  let ini = 0;
  let fim = vetor.length - 1;
  let comps = 0;

  while (fim >= ini) {
    comps++;
    const meio = Math.floor((ini + fim) / 2);
    const resultado = fnComp(vetor[meio]);

    if (resultado === 0) {
      return { posicao: meio, comparacoes: comps };
    }

    if (resultado > 0) {
      ini = meio + 1;
    } else {
      fim = meio - 1;
    }
  }

  return { posicao: -1, comparacoes: comps };
}

const valorBuscaGroup = "ALEXANDRE";
const resBinaria = buscaBinariaComps(objNomes, (valorMeio) => {
  if (valorMeio.group_name === valorBuscaGroup) return 0;
  if (valorBuscaGroup > valorMeio.group_name) return 1;
  return -1;
});

console.log(
  "Busca binária em objNomes por group_name = ALEXANDRE:",
  resBinaria,
);

// -----------------------------------------------------------------------------
// Bloco 2: Recursividade
// -----------------------------------------------------------------------------
console.log("\nBloco 2.1 - Fibonacci: iterativo x recursivo");

function fibonacciIterativo(n) {
  if (n <= 1) return n;

  let anterior = 0;
  let atual = 1;

  for (let i = 2; i <= n; i++) {
    const proximo = anterior + atual;
    anterior = atual;
    atual = proximo;
  }

  return atual;
}

function fibonacciRecursivo(n) {
  if (n <= 1) return n;
  return fibonacciRecursivo(n - 1) + fibonacciRecursivo(n - 2);
}

for (const n of [10, 20, 35]) {
  console.time(`fibIterativo-${n}`);
  fibonacciIterativo(n);
  console.timeEnd(`fibIterativo-${n}`);

  console.time(`fibRecursivo-${n}`);
  fibonacciRecursivo(n);
  console.timeEnd(`fibRecursivo-${n}`);
  console.log("---");
}

console.log(
  "Observação: a versão recursiva cresce muito mais rápido porque cada chamada gera duas ramificações.",
);
console.log(
  "Isso cria sobreposição de subproblemas e repete cálculos, então a complexidade fica muito maior que a iterativa.",
);

console.log("\nBloco 2.2 - Soma recursiva dos elementos de um vetor");

function somaVetor(vetor, i = 0) {
  // condição de saída: quando i chega ao fim do vetor
  if (i >= vetor.length) return 0;

  // caso recursivo: soma o elemento atual e chama a função para o próximo índice
  return vetor[i] + somaVetor(vetor, i + 1);
}

const vetorNumeros = [2, 4, 6, 8, 10];
console.log("Soma recursiva:", somaVetor(vetorNumeros));

// -----------------------------------------------------------------------------
// Bloco 3: Ordenação, Métodos Simples
// -----------------------------------------------------------------------------
console.log("\nBloco 3.1 - Bubble sort: melhor caso, pior caso e caso médio");

function bubbleSortInstrumentado(vetor) {
  let pass = 0;
  let comps = 0;
  let trocas = 0;

  let trocou;
  do {
    pass++;
    trocou = false;

    for (let i = 0; i < vetor.length - 1; i++) {
      comps++;
      if (vetor[i] > vetor[i + 1]) {
        [vetor[i], vetor[i + 1]] = [vetor[i + 1], vetor[i]];
        trocou = true;
        trocas++;
      }
    }
  } while (trocou);

  return { pass, comps, trocas };
}

const vetorOrdenado = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const vetorDecrescente = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const vetorAleatorio = [8, 3, 9, 1, 5, 7, 2, 6, 4, 10];

const tabelaBubble = [
  { caso: "ordenado", dados: bubbleSortInstrumentado([...vetorOrdenado]) },
  {
    caso: "decrescente",
    dados: bubbleSortInstrumentado([...vetorDecrescente]),
  },
  { caso: "aleatório", dados: bubbleSortInstrumentado([...vetorAleatorio]) },
];

console.table(
  tabelaBubble.map((item) => ({
    caso: item.caso,
    pass: item.dados.pass,
    comps: item.dados.comps,
    trocas: item.dados.trocas,
  })),
);

console.log(
  "Conclusão: o melhor caso faz poucas trocas; o pior caso exige muitas passagens e trocas.",
);
console.log(
  "O caso médio fica entre os dois, e a ordem do vetor influencia diretamente o trabalho do algoritmo.",
);

console.log("\nBloco 3.2 - Selection sort por data de cadastro");

function paraComparable(dataTexto) {
  const [dia, mes, ano] = dataTexto.split("/");
  return Number(`${ano}${mes.padStart(2, "0")}${dia.padStart(2, "0")}`);
}

function selectionSortPorData(vetor) {
  const copia = [...vetor];

  for (let posSel = 0; posSel < copia.length - 1; posSel++) {
    let posMenor = posSel;

    for (let i = posSel + 1; i < copia.length; i++) {
      const atual = paraComparable(copia[i].vigencia_do_cadastro);
      const menor = paraComparable(copia[posMenor].vigencia_do_cadastro);

      if (atual < menor) {
        posMenor = i;
      }
    }

    if (posMenor !== posSel) {
      [copia[posSel], copia[posMenor]] = [copia[posMenor], copia[posSel]];
    }
  }

  return copia;
}

const motoristasOrdenadosData = selectionSortPorData(objMotoristas);
console.log("Primeiros 5 registros por vigencia_do_cadastro:");
console.log(motoristasOrdenadosData.slice(0, 5));
console.log("Últimos 5 registros por vigencia_do_cadastro:");
console.log(motoristasOrdenadosData.slice(-5));

// -----------------------------------------------------------------------------
// Bloco 4: Ordenação por Divisão e Conquista
// -----------------------------------------------------------------------------
console.log("\nBloco 4.1 - Merge sort com critério de desempate");

function comparaMotorista(a, b) {
  const porRazao = a.razao_social.localeCompare(b.razao_social);
  if (porRazao !== 0) return porRazao < 0;
  return a.nome_motorista.localeCompare(b.nome_motorista) < 0;
}

let divisoes = 0;
let juncoes = 0;

function mergeSortComCritério(vetor, fnComp) {
  if (vetor.length < 2) return vetor;

  divisoes++;
  const meio = Math.floor(vetor.length / 2);
  const esquerda = mergeSortComCritério(vetor.slice(0, meio), fnComp);
  const direita = mergeSortComCritério(vetor.slice(meio), fnComp);

  let i = 0;
  let j = 0;
  const resultado = [];

  while (i < esquerda.length && j < direita.length) {
    juncoes++;
    if (fnComp(esquerda[i], direita[j])) {
      resultado.push(esquerda[i]);
      i++;
    } else {
      resultado.push(direita[j]);
      j++;
    }
  }

  while (i < esquerda.length) resultado.push(esquerda[i++]);
  while (j < direita.length) resultado.push(direita[j++]);

  return resultado;
}

const motoristasMerge = mergeSortComCritério(
  [...objMotoristas],
  comparaMotorista,
);
console.log("Quantidade de divisões:", divisoes);
console.log("Quantidade de junções:", juncoes);
console.log("Primeiros 5 motoristas ordenados por razão social + nome:");
console.log(motoristasMerge.slice(0, 5));

console.log("\nBloco 4.2 - Quick sort: pivô no início do vetor");

function quickSortPivoInicio(vetor, ini = 0, fim = vetor.length - 1) {
  if (fim <= ini) return;

  const pivo = vetor[ini];
  let i = ini + 1;
  let j = fim;

  while (i <= j) {
    while (i <= fim && vetor[i] <= pivo) i++;
    while (j >= ini && vetor[j] > pivo) j--;

    if (i < j) {
      [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
    }
  }

  [vetor[ini], vetor[j]] = [vetor[j], vetor[ini]];

  quickSortPivoInicio(vetor, ini, j - 1);
  quickSortPivoInicio(vetor, j + 1, fim);
}

const vetorDryRun = [5, 3, 8, 1, 9, 2];
const vetorCopia = [...vetorDryRun];
quickSortPivoInicio(vetorCopia);
console.log("Quick sort com pivô no início:", vetorCopia);

console.log("Dry run original (pivô no fim): [5, 3, 8, 1, 9, 2]");
console.log(
  "1) escolhe 2 como pivô; move valores menores à esquerda e maiores à direita.",
);
console.log(
  "2) continua recursivamente nas sub-regiões à esquerda e à direita do pivô.",
);
console.log("Dry run modificado (pivô no início): [5, 3, 8, 1, 9, 2]");
console.log(
  "1) pivô = 5; compara os demais com 5 e reordena a faixa em torno dele.",
);
console.log("2) depois repete a mesma ideia nas sub-regiões.");

// -----------------------------------------------------------------------------
// Bloco 5: Síntese Comparativa
// -----------------------------------------------------------------------------
console.log("\nBloco 5.1 - Corrida de desempenho entre quatro algoritmos");

function bubbleSortInstrumentadoGeral(vetor) {
  let pass = 0;
  let comps = 0;
  let trocas = 0;

  let trocou;
  do {
    pass++;
    trocou = false;

    for (let i = 0; i < vetor.length - 1; i++) {
      comps++;
      if (vetor[i] > vetor[i + 1]) {
        [vetor[i], vetor[i + 1]] = [vetor[i + 1], vetor[i]];
        trocas++;
        trocou = true;
      }
    }
  } while (trocou);

  return { pass, comps, trocas };
}

function selectionSortInstrumentado(vetor) {
  let pass = 0;
  let comps = 0;
  let trocas = 0;

  for (let posSel = 0; posSel < vetor.length - 1; posSel++) {
    pass++;
    let posMenor = posSel;

    for (let i = posSel + 1; i < vetor.length; i++) {
      comps++;
      if (vetor[i] < vetor[posMenor]) {
        posMenor = i;
      }
    }

    if (posMenor !== posSel) {
      [vetor[posSel], vetor[posMenor]] = [vetor[posMenor], vetor[posSel]];
      trocas++;
    }
  }

  return { pass, comps, trocas };
}

let mergeDivisoes = 0;
let mergeJuncoes = 0;

function mergeSortInstrumentado(vetor) {
  if (vetor.length < 2) return vetor;

  mergeDivisoes++;
  const meio = Math.floor(vetor.length / 2);
  const esquerda = mergeSortInstrumentado(vetor.slice(0, meio));
  const direita = mergeSortInstrumentado(vetor.slice(meio));

  const resultado = [];
  let i = 0;
  let j = 0;

  while (i < esquerda.length && j < direita.length) {
    mergeJuncoes++;
    if (esquerda[i] <= direita[j]) {
      resultado.push(esquerda[i]);
      i++;
    } else {
      resultado.push(direita[j]);
      j++;
    }
  }

  while (i < esquerda.length) resultado.push(esquerda[i++]);
  while (j < direita.length) resultado.push(direita[j++]);

  return resultado;
}

let quickPass = 0;
let quickComps = 0;
let quickTrocas = 0;

function quickSortInstrumentado(vetor, ini = 0, fim = vetor.length - 1) {
  if (fim <= ini) return;

  quickPass++;
  const pivo = vetor[ini];
  let i = ini + 1;
  let j = fim;

  while (i <= j) {
    while (i <= fim && vetor[i] <= pivo) {
      quickComps++;
      i++;
    }
    while (j >= ini && vetor[j] > pivo) {
      quickComps++;
      j--;
    }

    if (i < j) {
      [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
      quickTrocas++;
    }
  }

  [vetor[ini], vetor[j]] = [vetor[j], vetor[ini]];
  quickTrocas++;

  quickSortInstrumentado(vetor, ini, j - 1);
  quickSortInstrumentado(vetor, j + 1, fim);
}

function medirAlgoritmo(label, fn) {
  const original = [...nomesDesord];
  const inicio = performance.now();
  const resultado = fn(original);
  const fimTempo = performance.now();

  return { label, tempoMs: Number((fimTempo - inicio).toFixed(3)), resultado };
}

const comparacao = [
  {
    algoritmo: "bubble sort",
    tempoMs: (() => {
      const entrada = [...nomesDesord];
      const inicio = performance.now();
      const stats = bubbleSortInstrumentadoGeral(entrada);
      const fim = performance.now();
      return { tempoMs: Number((fim - inicio).toFixed(3)), ...stats };
    })(),
  },
  {
    algoritmo: "selection sort",
    tempoMs: (() => {
      const entrada = [...nomesDesord];
      const inicio = performance.now();
      const stats = selectionSortInstrumentado(entrada);
      const fim = performance.now();
      return { tempoMs: Number((fim - inicio).toFixed(3)), ...stats };
    })(),
  },
  {
    algoritmo: "merge sort",
    tempoMs: (() => {
      mergeDivisoes = 0;
      mergeJuncoes = 0;
      const entrada = [...nomesDesord];
      const inicio = performance.now();
      mergeSortInstrumentado(entrada);
      const fim = performance.now();
      return {
        tempoMs: Number((fim - inicio).toFixed(3)),
        divisoes: mergeDivisoes,
        juncoes: mergeJuncoes,
      };
    })(),
  },
  {
    algoritmo: "quick sort",
    tempoMs: (() => {
      quickPass = 0;
      quickComps = 0;
      quickTrocas = 0;
      const entrada = [...nomesDesord];
      const inicio = performance.now();
      quickSortInstrumentado(entrada);
      const fim = performance.now();
      return {
        tempoMs: Number((fim - inicio).toFixed(3)),
        pass: quickPass,
        comps: quickComps,
        trocas: quickTrocas,
      };
    })(),
  },
];

console.table(
  comparacao.map((item) => ({
    algoritmo: item.algoritmo,
    tempoMs: item.tempoMs.tempoMs ?? item.tempoMs,
    pass: item.tempoMs.pass ?? "-",
    comps: item.tempoMs.comps ?? item.tempoMs.divisoes ?? "-",
    trocas: item.tempoMs.trocas ?? item.tempoMs.juncoes ?? "-",
  })),
);

console.log(
  "Conclusão: o merge sort e o quick sort costumam ser bem mais rápidos em grandes entradas, enquanto",
);
console.log(
  "o bubble sort e o selection sort têm desempenho pior na prática, o que está alinhado com a complexidade teórica.",
);

console.log("\nFim da revisão.");
