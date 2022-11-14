import axios from "axios";
import Image from "next/image";
import { ReactNode, useContext } from "react";

import MetamaskAlert from "components/MetamaskAlert";
import NetworkAlert from "components/NetworkAlert";
import Footer from "components/Layout/Footer";
import Navbar from "components/Layout/Navbar";
import { Web3AppContext } from "context/Web3";
import { hasConnectsHistory } from "./utils";
import { GameContext } from "context/Game";
import { useRouter } from "next/router";

import background from "../../../public/assets/bg_base.jpeg"

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { query } = useRouter();
  const { connectsHistory } = useContext(GameContext);
  const { provider, mmInstalled, currAccount, isBSC, connectAccount } =
    useContext(Web3AppContext);

  const handleConnect = () => {
    if (!provider || !!currAccount) return;

    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (!accounts.length || typeof connectAccount === "undefined") return;

        if (!hasConnectsHistory(connectsHistory, accounts[0])) {
          axios.post("/api/connects/create", {
            addr: accounts[0],
            referrer_code: query.ref || "",
          });
        }
        connectAccount(accounts[0]);
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <Navbar currAccount={currAccount} handleConnect={handleConnect} />
      <div className="relative">
        <Image
          src={background}
          placeholder="blur"
          objectPosition="center"
          objectFit="cover"
          layout="fill"
        />
        <div className="bg-radial z-[1] relative">
          <main className="min-h-screen relative z-[2]">
            {mmInstalled === false && <MetamaskAlert />}
            {mmInstalled === true && isBSC === true && <NetworkAlert />}
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
