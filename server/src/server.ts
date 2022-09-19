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
*/

// Para importar assim, no package.json, deve-se adicionar o seguinte: "type": "module" 
// (mais pra frente vamos rancar pq não será necessário - com TS)
import express, { response } from "express";

import cors from 'cors';

/*
Precisamos criar um banco de dados para persistir os dados da nossa aplicação
Escolhemos um banco relacional - com dados estruturados: Prisma
*/
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const app = express();


// simulando get
const mockedAdds = [
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
]
app.get("/adsmocked", (req, res) => {
  res.json(mockedAdds);
});


app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ['query'],
});


//======= CASOS DE USO
// como o usuario vai se relacionar com a nossa aplicacao
// cada caso de usu acaba virando 1 rota (nesse nosso exemplo bem simplificado)

interface Ad {
  id:              string
  gameId:          string
  name:            string
  yearsPlaying:    number
  discord:         string
  weekDays:        string
  hourStart:       number
  hourEnd:         number
  useVoiceChannel: boolean
  createdAt:       Date
}

const formatAdInformation = (ad: Ad) => {
  return {
    ...ad,
    weekDays: ad.weekDays.split(','),
    hourStart: convertMinutesToHourString(ad.hourStart),
    hourEnd: convertMinutesToHourString(ad.hourEnd),
  }
}


// 0 - Listagem de adds
app.get('/ads', async (req, res) => {
  const ads = await prisma.ad.findMany()

  res.json(ads.map(formatAdInformation));
})

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

// 1 - Listagem de games
app.get('/games', async (request, response) => {
  const games: Game[] = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });

  return response.json(games);
});

// 2 - Publicar novo anuncio
app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  const ad: Ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  })

  return response.status(201).json(ad);
});


// 3 - Listagem de anuncios com base no game
app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;

  const ads: Ad[] = await prisma.ad.findMany({
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return response.json(ads.map(formatAdInformation));
});


// 4 - Buscar discord pelo id do anúncio
// (mostrar o discord da pessoa só quando ela clicar em conectar)
app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const result = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })
  const { discord } = result

  return response.json(discord)
});


app.listen(3333, () => {
  console.log("Server started on port 3333");
});
