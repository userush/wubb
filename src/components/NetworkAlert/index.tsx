import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Fragment, useRef } from "react";
import { classNames } from "shared/utils";

const NetworkAlert = () => {
  const getBSCNetwork = useRef(null);

  return (
    <Dialog
      as="div"
      static={true}
      open={true}
      className="relative z-10"
      initialFocus={getBSCNetwork}
      onClose={() => {}}
    >
      <div className="fixed inset-0 bg-shades-1 bg-opacity-80 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className={classNames(
            "flex min-h-full items-center justify-center",
            "p-1-5 text-center sm:p-0"
          )}
        >
          <Dialog.Panel
            className={classNames(
              "relative transform overflow-hidden rounded-lg",
              "bg-white text-left shadow-xl transition-all",
              "sm:my-8 sm:w-full sm:max-w-lg"
            )}
          >
            <div className="bg-white px-1 pt-1 pb-2 sm:p-1-5 sm:pb-2">
              <div className="sm:flex sm:items-center">
                <div
                  className={classNames(
                    "mx-auto flex h-5 w-5 flex-shrink-0 items-center",
                    "justify-center rounded-full bg-red-100 sm:mx-0"
                  )}
                >
                  <ExclamationTriangleIcon
                    className="h-3 w-3 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-2 text-center sm:mt-0 sm:ml-1-75 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Wrong Network
                  </Dialog.Title>
                  <div className="mt-0-5">
                    <p className="text-sm text-gray-500">
                      Please switch to Binance Smart Chain Network to be able to
                      use this Dapp.
                    </p>
                    <p className="text-sm text-gray-500">
                      In case you don't have BSC network setup on your Metamask
                      please refer to the official Binance tutorial by clicking
                      "Get BSC Network"
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-shades-9 px-1 py-1-25 sm:flex sm:flex-row-reverse sm:px-2">
              <a
                href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain"
                target="_blank"
                type="button"
                ref={getBSCNetwork}
                className={classNames(
                  "btn btn--rounded btn--light text-center",
                  "focus:outline-none focus:ring-2 focus:ring-shades-3",
                  "focus:ring-offset-2 sm:w-auto"
                )}
              >
                Get BSC Network
              </a>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default NetworkAlert;
