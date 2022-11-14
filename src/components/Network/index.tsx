import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { Web3AppContext } from "context/Web3";
import { useContext } from "react";
import { classNames } from "shared/utils";

const Network = () => {
  const { isBSC } = useContext(Web3AppContext);
  
  return (
    <div
      className={classNames(
        "bg-black text-shades-8 border h-2 my-auto",
        "rounded-lg flex items-center px-0-5 w-fit",
        isBSC ? "border-green-700" : "border-red-700"
      )}
    >
      <span className="block font-medium">Network:</span>
      {isBSC && <ValidNetworkBadge />}
      {!isBSC && <InvalidNetworkBadge />}
    </div>
  );
};

const ValidNetworkBadge = () => {
  return (
    <>
      <span className="block text-md whitespace-nowrap ml-1 text-shades-4">
        Binance Smart Chain
      </span>
      <span className="h-[1.40rem] w-[1.40rem] rounded-[50%] ml-0-45 flex items-center justify-center bg-inherit">
        <CheckCircleIcon className="w-full h-full text-green-600" />
      </span>
    </>
  );
};

const InvalidNetworkBadge = () => {
  return (
    <>
      <span className="block text-md whitespace-nowrap ml-1 text-shades-4">
        Please switch to BSC Network
      </span>
      <span className="h-[1.40rem] w-[1.40rem] rounded-[50%] ml-0-45 flex items-center justify-center bg-inherit">
        <ExclamationTriangleIcon className="w-full h-full text-red-600" />
      </span>
    </>
  );
};

export default Network;
