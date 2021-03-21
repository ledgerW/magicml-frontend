import React from "react";
import Head from 'next/head'


export default function CustomHead(props) {
  if (props.dynamic) {
    return (
      <Head>
          <title>{props.title.concat(" - ", props.id)}</title>
          <meta name="keywords" content={props.keywords.concat(", ", props.id)}/>
          <meta name="description" content={'Top 3: '.concat(props.top3Sims.join(', '))}/>
          <link rel="canonical" href={"https://magicml.com/similarity".concat("/", props.id)} />
          <meta property="og:type" content="website"></meta>
          <meta name="og:type" content="summary"></meta>
          <meta name="twitter:site" content="@magicml2"></meta>
          <meta name="og:title" content={props.title.concat(" - Similars - ", props.id)}></meta>
          <meta name="og:description" content={'Top 3: '.concat(props.top3Sims.join(', '))}></meta>
          <meta name="og:image" content={props.searchImageURLs.art_crop}></meta>
      </Head>
    )
  } else {
    return (
      <Head>
          <title>{props.title}</title>
          <meta name="keywords" content={props.keywords}/>
          <meta name="description" content={props.description}/>
          <link rel="canonical" href="https://magicml.com" />
          <meta property="og:type" content="website"></meta>
          <meta name="og:type" content="summary"></meta>
          <meta name="twitter:site" content="@magicml2"></meta>
          <meta name="og:title" content={props.title}></meta>
          <meta name="og:description" content={props.description}></meta>
          <meta name="og:image" content={props.image}></meta>
      </Head>
    )
  }
}