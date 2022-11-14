import { Tab } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { GameContext } from "context/Game";
import { useContext } from "react";
import { toast } from "react-toastify";
import { HOST_NAME } from "shared/constants";
import { classNames } from "shared/utils";
import { IGameDashboardProps, IGameDashboardBodyItemProps } from "./types";

const GameDashboard = ({
  currAccount,
  handleClaim,
  handleCopyToClipboard,
}: IGameDashboardProps) => {
  const { playerData } = useContext(GameContext);
  return (
    <Tab.Panel
      className={classNames(
        "w-full pt-1 lg:py-0-5 bg-shades-1 min-h-[350px] shadow-lg",
        "border-shades-3 border rounded-lg px-0 lg:px-1",
        !currAccount ? "flex flex-col items-center justify-center" : "flex"
      )}
    >
      {!currAccount || !playerData ? (
        <GameDashboardNotice />
      ) : (
        <GameDashboardBody
          currAccount={currAccount}
          handleClaim={handleClaim}
          handleCopyToClipboard={handleCopyToClipboard}
        />
      )}
    </Tab.Panel>
  );
};

const GameDashboardBody = ({
  currAccount,
  handleClaim,
  handleCopyToClipboard,
}: IGameDashboardProps) => {
  const { playerParticipations, playerRewards, playerData, gameID } =
    useContext(GameContext);

  const onClaim = () => {
    if (!!gameID) {
      handleClaim(playerRewards! + playerData!.referred);
    } else {
      toast.error("Game not complete yet");
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="row w-full">
        <div className="lg:col-5 col-12">
          <div className="py-1 flex flex-col h-full justify-center">
            <div className="mb-1">
              <GameDashboardBodyItem
                title="Your Connected Address"
                value={currAccount!}
                handleCopyToClipboard={handleCopyToClipboard}
              />
            </div>
            <div className="mb-1">
              <GameDashboardBodyItem
                title="Your Referral Link"
                value={`${HOST_NAME}?ref=${playerData!.referral_code}`}
                handleCopyToClipboard={handleCopyToClipboard}
              />
            </div>
            <p className="text-md text-shades-7 mx-0-25 mb-1">
              You win 1$ worth of BUSD for each new player you referred + a fee
              discount for your next participation, your won tokens are
              claimable after the game winner announcement.
            </p>
          </div>
        </div>
        <div className="lg:col-7 col-12">
          <div className="py-1 px-0-25 h-full w-full font-[monospace]">
            <div
              className={classNames(
                "bg-black flex flex-col h-full",
                "justify-between rounded-lg w-full"
              )}
            >
              <div className="py-0-5 px-1-75 flex items-end">
                <span
                  className={classNames(
                    "block font-semibold text-[12em]",
                    "leading-none text-shades-8"
                  )}
                >
                  {playerParticipations}
                </span>
                <span className="block text-md ml-1 mb-1-75">
                  / current game participations
                </span>
              </div>
              <div className="px-1 pb-1-25">
                <table
                  className={classNames(
                    "table-auto w-full border",
                    " border-shades-2 rounded-lg lg:mt-auto"
                  )}
                >
                  <tbody>
                    <tr>
                      <td
                        className={classNames(
                          "p-0-75 lg:p-1 border-b border-shades-2",
                          " text-shades-10 font-semibold"
                        )}
                      >
                        Claimable amount
                      </td>
                      <td className="p-0-75 lg:p-1 border-b border-shades-2">
                        {playerData!.referred + playerRewards!}
                      </td>
                      <td className="p-0-75 lg:p-1 border-b border-shades-2">
                        <button
                          disabled={playerRewards! < 1}
                          className={classNames(
                            "btn btn--sm ",
                            `${
                              playerRewards! < 1 ? "btn--muted" : "btn--light"
                            }`
                          )}
                          onClick={onClaim}
                        >
                          Claim
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-0-75 lg:p-1 text-shades-10 font-semibold">
                        Your referrals so far
                      </td>
                      <td className="p-0-75 lg:p-1 ">{playerData!.referred}</td>
                      <td
                        aria-hidden
                        className={classNames(
                          "p-0-75 lg:p-1 pointer-events-none",
                          "[&>span]:text-xl text-center"
                        )}
                      >
                        {playerData!.referred > 0 ? (
                          <span>😍</span>
                        ) : (
                          <span>😔</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameDashboardNotice = () => {
  return (
    <div
      className={classNames(
        "border-red-800 py-0-5 px-1-25 rounded-lg bg-red-600",
        "w-fit text-center md:mx-auto flex items-center mx-1-25"
      )}
    >
      <div
        className={classNames(
          "mr-1 flex h-2-5 w-2-5 flex-shrink-0 items-center",
          "justify-center rounded-full bg-red-100"
        )}
      >
        <ExclamationTriangleIcon
          className="h-1-75 w-1-75 text-red-600"
          aria-hidden="true"
        />
      </div>
      <p className="text-left">You need to connect your wallet in order to access your dashboard</p>
    </div>
  );
};

const GameDashboardBodyItem = ({
  title,
  value,
  handleCopyToClipboard,
}: IGameDashboardBodyItemProps) => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-0-5 ml-0-45">{title}</h3>
      <div
        className={classNames(
          "lg:w-fit py-0-45 px-1 bg-black rounded-lg",
          "border border-shades-2 flex items-center",
          "w-full lg:justify-start justify-between"
        )}
      >
        <span
          className={classNames(
            "block text-md text-shades-7 pointer-events-none",
            "whitespace-nowrap text-ellipsis overflow-hidden"
          )}
        >
          {value}
        </span>
        <button
          onClick={() => handleCopyToClipboard(value)}
          className={classNames(
            "bg-shades-1 h-1-75 w-1-75 rounded-full",
            "flex items-center justify-center ml-1",
            "cursor-pointer hover:bg-shades-2"
          )}
        >
          <ClipboardDocumentCheckIcon
            className="h-1-25 w-1-25 text-shades-10"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default GameDashboard;
