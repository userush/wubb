import Head from "next/head";
import { _APP_NAME } from "shared/constants";

interface SeoProps {
  title: string;
  description: string;
}

const SEO = ({ title, description }: SeoProps) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta charSet="utf-8" />
        <meta property="image" content="/assets/thumbnail.jpg" />
        <meta property="site_name" content={_APP_NAME} />
        <meta property="title" content={`${_APP_NAME} | ${title}`} />
        <meta property="description" content={description} />
        <meta property="og:image" content="/assets/thumbnail.jpg" />
        <meta property="og:site_name" content={_APP_NAME} />
        <meta property="og:title" content={`${_APP_NAME} | ${title}`} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:title" content={`${_APP_NAME} | ${title}`} />
        <meta name="twitter:image" content="/assets/thumbnail.jpg" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta
          name="keywords"
          content="1 dollar game, Binance, Binance smart chain, $1 game, 1$ game, 1$ game binance, bsc, bnb smart chain, play to earn, p2e, pooltogether, wintogether, wintogetherr, crypto lottery, crypto prizes, crypto rewards"
        ></meta>
        <link rel="manifest" href="/site.webmanifest" />
        <title>
          {_APP_NAME} | {title}
        </title>
      </Head>
    </>
  );
};

export default SEO;
