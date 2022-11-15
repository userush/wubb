import type { NextPage } from "next";

import Block, { PrizeBlock, PrizeBlockChart } from "components/Block";
import Layout from "components/Layout";
import Debuger from "components/Debuger";
import GameInterface from "components/GameInterface";
import { isProd, PRIZE_AMOUNT_TEXT, TICKET_PRICE } from "shared/constants";
import SEO from "components/SEO";

const Chainprizes: NextPage = () => {
  return (
    <>
      <SEO
        title={`No Lose 1$ Game`}
        description={`WinTogetherr No Lose 1$ Game! Do you have a spare $1.75 lying around? It's worth $500,000 if you win at this game!
        The rules are simple: deposit your currency and get a chance to win up to 500.000,00 in BUSD! You don't need to be an experienced trader or have any special skills—just deposit your coins and get ready for some fun!`}
      />
      <Layout>
        {!isProd && <Debuger />}
        <section className="container pt-2-75 md:pt-3 lg:pt-5">
          <h1 className="text-shades-10 font-extrabold text-2xl mb-0-75">
            No Lose 1 Dollar Game
          </h1>
          <p className="text-shade-9 font-semibold">
            Deposit ${TICKET_PRICE} worth of BUSD or USDT for a chance to win{" "}
            {PRIZE_AMOUNT_TEXT} in BUSD !
          </p>
        </section>
        <section className="container pt-3">
          <GameInterface />
        </section>
        <section className="container pt-2">
          <div className="row">
            <div className="col-12 lg:col-6">
              <PrizeBlock
                title="Prize Funds"
                text="The prizes for each lottery round come from two sources:"
                contents={[
                  {
                    title: "Ticket Purchases",
                    content:
                      "100% of the stable coins and fees paid by players buying tickets each round goes back into the prize pool.",
                  },
                  {
                    title: "Rollovers",
                    content:
                      "After every round, the remaining unclaimed stable coins and funds gathered from fees rolls over into the next round and are redistributed to the prize pool.",
                  },
                ]}
              />
            </div>
            <div className="col-12 lg:col-6 pt-2 lg:pt-0">
              <PrizeBlockChart
                title="Prize Pool Distribution"
                content="List of debits and their prize pool allocation."
                breakdown={[
                  {
                    text: "winner reward",
                    percentage: 30,
                    className: "bg-yellow-500",
                  },
                  {
                    text: "refunds",
                    percentage: 30,
                    className: "bg-yellow-400",
                  },
                  {
                    text: "referrals rewards",
                    percentage: 20,
                    className: "bg-yellow-300",
                  },
                  {
                    text: "locked for next round",
                    percentage: 10,
                    className: "bg-yellow-200",
                  },
                  {
                    text: "marketing",
                    percentage: 5,
                    className: "bg-yellow-100",
                  },
                  {
                    text: "developers",
                    percentage: 5,
                    className: "bg-yellow-50",
                  },
                ]}
              />
            </div>
          </div>
        </section>
        <section className="container pt-2">
          <Block
            title="How to Participate"
            content={[
              "Connect Metamask and click “Play Now” to deposit $1.75 worth of Binance Smart Chain Network BUSD/USDT.",
              "Each time you purchase a ticket there is a BNB fee that should be paid, your first ticket purchase fee is ~ 0.5$, then for each of your next purchases the fee will be increasing by ~0.25$. ( Make sure you have enough BNB to particapte )",
              "Invite New Users to participate the $1 Game to fix your next ticket purchase fee at 0.5$ BNB.",
              "For each new user participating through your referral link you win a 1$ worth of BUSD.",
            ]}
          />
        </section>
        <section className="container pt-2 pb-5">
          <Block
            title="Terms & Conditions"
            content={[
              "Completing “Play Now” will confirm your participation in this activity, upon successful payment of $1 on the product(s) listed on $1 campaign page.",
              "Winner annoucement will only happen if the participants exceed minimum number of participants.",
            ]}
          />
        </section>
      </Layout>
    </>
  );
};

export default Chainprizes;
