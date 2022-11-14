import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { _APP_NAME } from "shared/constants";

interface NavbarProps {
  currAccount: string | null;
  handleConnect(): void;
}

const Navbar = ({ currAccount, handleConnect }: NavbarProps) => {
  return (
    <nav className="bg-shades-1 w-full border-b border-shades-3">
      <div className="container">
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center">
            <div className="w-2 h-2 relative">
              <Image src={"/assets/logo.png"} layout="fill" />
            </div>
            <span className="ml-0-5 font-bold">{_APP_NAME}</span>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={handleConnect}
              className="btn btn--dark btn--rounded btn--flex-center"
            >
              {currAccount === null ? (
                <>
                  <span>Connect MetaMask</span>
                  <div className="hidden sm:block relative w-3 h-2 ml-0-5">
                    <img className="absolute top-[-7px] bottom-0 right-[-8px] p-0-25" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png?20220831120339" />
                  </div>
                </>
              ) : (
                "Connected"
              )}
              {currAccount !== null && <ConnectionBadge />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const ConnectionBadge = () => {
  return (
    <span className="h-[1.40rem] w-[1.40rem] rounded-[50%] ml-0-45 flex items-center justify-center bg-inherit">
      <CheckCircleIcon className="w-full h-full text-green-600" />
    </span>
  );
};

export default Navbar;
