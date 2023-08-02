import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
            rel="preload"
            href="/fonts/SuisseIntl/SuisseIntl-Regular.woff2"
            as="font"
            type="font/woff"
            crossOrigin=""
        />
        <link
            rel="preload"
            href="/fonts/SuisseIntl/SuisseIntl-RegularItalic.woff2"
            as="font"
            type="font/woff"
            crossOrigin=""
        />
        <link
            rel="preload"
            href="/fonts/SuisseIntl/SuisseIntl-Bold.woff2"
            as="font"
            type="font/woff"
            crossOrigin=""
        />
        <link
            rel="preload"
            href="/fonts/SuisseIntl/SuisseIntl-BoldItalic.woff2"
            as="font"
            type="font/woff"
            crossOrigin=""
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="portal-root"></div>
      </body>
    </Html>
  )
}