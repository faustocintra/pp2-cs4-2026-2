# Karangos — pp2-cs4-2026-2

Projeto da disciplina de Paradigmas de Programação II, com o conteúdo até a aula de 10/09: CRUD de clientes usando Express, TypeScript, Prisma 7.10.0 e PostgreSQL.

## Executar

Use Node.js 24 e npm. No terminal, a partir da raiz:

```sh
cd back-end
npm ci
```

Crie `back-end/.env` a partir de `back-end/.env.example` e preencha `DATABASE_URL` com a conexão PostgreSQL. O arquivo com credenciais não deve ser versionado. Nesta máquina, a configuração fornecida já foi copiada para o local esperado.

```sh
npm run db:deploy
npm run build
npm run dev
```

A API fica em `http://localhost:8888`. Para executar a versão compilada, use `npm start`. Para visualizar o banco, use `npm run db:studio`.

## API de clientes

| Método | Caminho | Resultado |
| --- | --- | --- |
| GET | `/customers` | Lista ordenada por nome |
| GET | `/customers/:id` | Cliente por ID ou 404 |
| POST | `/customers` | Cria cliente e retorna 201 |
| PUT | `/customers/:id` | Atualiza os campos enviados ou retorna 404 |
| DELETE | `/customers/:id` | Exclui cliente e retorna 204, ou 404 |

O exemplo completo da aula está em [customers.http](back-end/requests/customers.http). Copie o JSON para o EchoAPI, selecione POST e use `http://localhost:8888/customers`. O exemplo já foi inserido neste banco: repeti-lo retorna 409 devido ao documento/e-mail únicos.

O modelo contém todos os campos do PDF, com data de nascimento e complemento opcionais, UF `CHAR(2)` e documento/e-mail únicos. As três migrations das aulas foram recuperadas do histórico e aplicadas. A aplicação segue `route → controller → service → repository → Prisma → PostgreSQL`. Os imports e a configuração TypeScript foram ajustados para execução ESM também após a compilação; o middleware converte erros em respostas JSON.

## Verificação

```sh
npm run typecheck
npm run test:integration
```

O teste de integração usa o banco de `.env`, cria um cliente temporário e remove somente esse registro ao terminar. Verifica criação, consulta individual/listagem, atualização, exclusão, persistência no banco, duplicidade, entrada inválida e recursos inexistentes.

O POST da aula retornou 201 e o GET retornou 200; a evidência está em [post-result.json](docs/post-result.json). O cliente de exemplo foi preservado no banco.

O escopo desta etapa é clientes; o PDF anuncia veículos para aulas posteriores. A implementação local recupera o código das aulas presente no histórico do repositório, removido no último commit, sem alterar as datas dos commits anteriores.

Limitação conhecida: `npm audit` informa quatro alertas altos na árvore de dependências do Prisma 7.10.0 especificado pelo PDF (`deepmerge-ts` e `mysql2`, propagados para Prisma/config). Não foi aplicada a troca incompatível de versão sugerida automaticamente pelo npm.
