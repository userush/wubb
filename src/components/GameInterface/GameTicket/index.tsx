import Image from "next/image";
import { Fragment, useState } from "react";
import { Listbox, Transition, Tab } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import {
  TicketProgressBarProps,
  TicketButtonsProps,
  TicketProps,
} from "./types";
import {
  tokenImageTransformer,
  toUSDCurrencyString,
  progressPercent,
} from "./utils";
import { classNames } from "shared/utils";
import { ACP_AMOUNT, _tokens } from "./constants";

const GameTicket = ({
  title,
  cover,
  content,
  disabled,
  minParticipants,
  currParticipants,
  handleClick,
}: TicketProps) => {
  return (
    <Tab.Panel
      className={classNames(
        "w-full bg-shades-1 border-shades-3",
        "border rounded-lg relative shadow-lg"
      )}
    >
      <div className="flex flex-col md:flex-row items-center">
        <div
          className={classNames(
            "min-h-[320px] lg:w-[350px] md:w-[250px] w-full",
            "md:self-stretch flex items-center justify-center relative",
            "after:overlay overflow-hidden rounded-t-lg",
            "md:rounded-l-lg md:rounded-tr-none"
          )}
        >
          <Image src={cover} layout="fill" objectFit="cover" />
          <div
            className={classNames(
              "absolute flex items-center justify-center left-0",
              "top-0 w-full h-full uppercase font-bold z-10",
              "whitespace-pre text-center text-xl"
            )}
          >
            {title}
          </div>
        </div>
        <div className="lg:p-2 p-1-45 py-2 flex flex-col justify-between self-stretch w-full lg:w-3/5">
          <div>
            <h1 className="text-shades-10 font-bold mb-0-75 text-1xl">
              {content.heading}
            </h1>
            <p className="text-shades-6 mb-0-45">{content.intro}</p>
            <ul className="text-shades-6">
              <li className="mb-0-45">{content.winOutcome}</li>
              <li className="mb-0-45">{content.loseOutcome}</li>
            </ul>
          </div>
          <div className="pt-1 pb-1">
            <span className="text-shades-10 font-bold mb-0-5 inline-block text-base">
              Entry Price
            </span>
            <div className="flex items-end">
              <span className="block text-shades-10 font-bold text-md">
                {toUSDCurrencyString(content.entryPrice)}
              </span>
              <span className="block text-shades-6 line-through ml-1 text-md">
                {toUSDCurrencyString(content.prevPrice)}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between py-0-75">
            <div>
              <span className="text-shades-10 font-bold mb-0-5 block text-base">
                Minimum Participants
              </span>
              <span className="text-shades-6 mb-0-5 block text-md">
                ≥ {minParticipants}
              </span>
            </div>
            <div className="v-seperator mr-1-75 h-auto lg:h-full lg:mr-0" />
            <div>
              <span className="text-shades-10 font-bold mb-0-5 block text-base">
                Current Participants
              </span>
              <span className="text-shades-6 mb-0-5 block text-md">
                ~ {currParticipants + ACP_AMOUNT}
              </span>
            </div>
          </div>
          <div className="py-0-75">
            <TicketProgressBar
              minParticipants={minParticipants}
              currParticipants={currParticipants}
            />
          </div>
          <div className="pt-0-75 flex flex-col-reverse md:flex-row items-stretch">
            <TicketButtons handleClick={handleClick} disabled={disabled} />
          </div>
        </div>
      </div>
    </Tab.Panel>
  );
};

const TicketProgressBar = ({
  minParticipants,
  currParticipants,
}: TicketProgressBarProps) => {
  return (
    <div className="w-full h-0-5 bg-shades-3 rounded">
      <div
        style={{
          width: `${progressPercent(
            minParticipants,
            currParticipants + ACP_AMOUNT
          )}%`,
        }}
        className="h-0-5 bg-amber-500 rounded"
      />
    </div>
  );
};

const TicketButtons = ({ disabled, handleClick }: TicketButtonsProps) => {
  const [selected, setSelected] = useState(_tokens[0]);
  return (
    <>
      <button
        disabled={disabled}
        onClick={() => handleClick(selected.address, selected.decimals)}
        className={`btn--rounded w-full md:w-1/2 ${
          disabled ? "btn" : "btn btn--light"
        }`}
      >
        Play Now
      </button>
      <div className="block self-stretch w-full mb-1 md:mb-0 md:w-1/2 md:ml-1">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative w-full h-full">
            <Listbox.Button
              className={classNames(
                "cursor-pointer relative h-full w-full btn btn--dark",
                "btn--rounded pl-1 pr-2-75 text-left font-bold"
              )}
            >
              <div className="flex truncate text-shades-9 items-center">
                <span className="text-sm font-normal">pay with </span>
                <span className="ml-0-45">{selected.name}</span>
                <div className="relative w-1-5 h-1-5 ml-0-45">
                  <Image
                    src={`/assets/${selected.name.toLowerCase()}.png`}
                    layout="fill"
                  />
                </div>
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-0-5">
                <ChevronUpDownIcon
                  className="h-1-5 w-1-5 text-shades-7"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={classNames(
                  "absolute mt-1 max-h-60 w-full overflow-auto rounded-lg",
                  "bg-shades-1 border-shades-3 py-1 text-base shadow-lg ring-1",
                  "ring-shades-3 ring-opacity-5 focus:outline-none sm:text-sm"
                )}
              >
                {_tokens.map((token, tokenIdx) => (
                  <Listbox.Option
                    key={tokenIdx}
                    className={({ active }) =>
                      `relative select-none py-1 px-1-25 mx-1 rounded cursor-pointer ${
                        active ? "bg-amber-100 text-amber-900" : "text-shades-9"
                      }`
                    }
                    value={token}
                  >
                    {({ selected }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={`block truncate w-3 ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {token.name}
                          </span>
                          <div className="relative w-2 h-2">
                            <Image
                              src={tokenImageTransformer(token.name)}
                              layout="fill"
                            />
                          </div>
                        </div>
                        {selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-1 text-amber-600">
                            <CheckIcon
                              className="h-1-45 w-1-45"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </>
  );
};

export default GameTicket;
