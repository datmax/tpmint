import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head title="Token Prophet alpha pass.">
        <meta name="description" content="Mint your TP Alpha pass." />
        <meta property="og:title" content="TokenProphet Alpha pass | mint" />
        <meta property="og:description" content="Mint your TP Alpha pass." />
        <meta
          property="og:image"
          content="'https://ipfs.io/ipfs/QmQ5hdtibJzY71xcEQMRuL1yoi25bhdzopYiaTQWtBbQYV/TokenProphetAlpha.mp4';"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
