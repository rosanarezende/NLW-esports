// Para importar assim, no package.json, deve-se adicionar o seguinte: "type": "module" 
// (mais pra frente vamos rancar pq não será necessário - com TS)
import express from "express";

const app = express();

app.get("/ads", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Add 1",
      description: "Add 1 description",
      price: 100,
    },
    {
      id: 2,
      name: "Add 2",
      description: "Add 2 description",
      price: 200,
    },
    {
      id: 3,
      name: "Add 3",
      description: "Add 3 description",
      price: 300,
    },
    {
      id: 4,
      name: "Add 4",
      description: "Add 4 description",
      price: 400,
    },
  ]);
});

app.listen(3333, () => {
  console.log("Server started on port 3333");
});

/*
================================================================
Usaremos TypeScript para criar um servidor com Node.js
É um JS do JS: um JS com mais recursos
É um JavaScript com tipagem estática: define qual o formato esperado da informação
, o que ajuda a evitar erros
// interface Ad {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
// }

================================================================
Para funcionar com o TS, é necessário instalar:
=== typescript
npm install typescript -D
=== @types/express -D: serve para ter a tipagem do express, pq o express não possue 
um suporte nativo ao TS
npm install @types/express -D 
=== ts-node-dev: serve para executar o typescript sem precisar compilar o código 
(ficar matando o servidor e iniciando novamente)
npm install ts-node-dev -D

E também criar o arquivo tsconfig.json
npx tsc --init

================================================================
No tsconfig.json faremos algumas configurações:
"module": "ES2020" => o build ainda não intende o import 
---- mas vamos mudar de volta pra CommonJS quando instalar o tsnd
"rootDir": "./src" => de onde o código será compilado
"outDir": "./build" => para onde o código será compilado
"moduleResolution": "node" => para que o TS entenda que estamos usando o node

dentro do package.json, adicionar o seguinte:
"scripts": {
  "dev": "tsnd src/server.ts"
}
-- nem preciso mais da pasta build

================================================================
"strict": true  => para que o TS seja mais rigoroso
"esModuleInterop": true => para que o typescript entenda o import/export


dentro do package.json, adicionar o seguinte:
"scripts": {
  "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
}

Para executar o projeto, basta executar o comando:
npm run dev
*/
