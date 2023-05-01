import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head title="Token Prophet alpha pass.">
        <meta name="description" content="Mint your TP Alpha pass." />
        <meta property="og:title" content="Token Prophet Alpha pass | mint" />
        <meta
          property="og:description"
          content="Mint your TP Alpha pass and enter the exclusive Token Prophet community."
        />
        <meta property="og:image" content="'/tplogo.jpg';" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
