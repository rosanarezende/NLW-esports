import { useEffect, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";

import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const mockedGames: Game[] = [
    {
      id: "1",
      title: "Advertisement",
      bannerUrl: "/image-1.png",
      _count: {
        ads: 0,
      }
    },
    {
      id: "2",
      title: "Advertisement 2",
      bannerUrl: "/image-2.png",
      _count: {
        ads: 1,
      }
    },
    {
      id: "3",
      title: "Advertisement 3",
      bannerUrl: "/image-3.png",
      _count: {
        ads: 2,
      }
    },
    {
      id: "4",
      title: "Advertisement 4",
      bannerUrl: "/image-5.png",
      _count: {
        ads: 3,
      }
    },
    {
      id: "5",
      title: "Advertisement 5",
      bannerUrl: "/image-6.png",
      _count: {
        ads: 4,
      }
    },
    {
      id: "6",
      title: "Advertisement 6",
      bannerUrl: "/image-7.png",
      _count: {
        ads: 5,
      }
    }
  ]
  // const [games, setGames] = useState<Game[]>([]);

  // useEffect(() => {
  //   axios('http://localhost:3333/games').then(response => {
  //     setGames(response.data);
  //   });
  // }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {/* {games.map(game => { */}
        {mockedGames.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
