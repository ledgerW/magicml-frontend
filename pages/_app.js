import Head from 'next/head'
import { ContextWrapper } from "../libs/contextLib";
import reportWebVitals from '../reportWebVitals';
import { Amplify } from 'aws-amplify';
import config from '../config';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'


Amplify.configure({
  API: {
    endpoints: [
      {
        name: "similarity",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});


function App({ Component, pageProps }) {
  return (
    <div className="App">
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YPT8GR3GJV"></script>
        <script type="text/javascript" src="/analytics.js"></script>

        <script
          data-ad-client="ca-pub-5926615178155367"
          async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
        </script>

        <meta content="text/html; charset=UTF-8" name="Content-Type" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        
        <link rel="manifest" href="/manifest.json" />
        
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossorigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href={"https://fonts.googleapis.com/css2?family=IM+Fell+English&display=swap"} rel="stylesheet" />
        <title>MagicML</title>
      </Head>
      <ContextWrapper>
        <Component {...pageProps}/>
      </ContextWrapper>
    </div>
  ) 
}

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);