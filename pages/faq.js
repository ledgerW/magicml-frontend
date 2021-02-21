import React from "react";
import Head from 'next/head'

import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQUnit from "../components/FAQUnit";


export default function About() {
  let meta = {
    'title': 'MagicML - FAQ',
    'keywords': "Magic: The Gathering, MTG, MTG Arena, Magic Card Search, Magic Cards",
    'description': "Magic: The Gathering card search powered by Natural Language Processing"
  };

  let faqs = [
    {
      q: "What is this?",
      a: [
        `This is a textual semantic similarity search tool for Magic cards.
          It retrieves cards that have similar meaning in their text.`
      ]
    },
    {
      q: "How does it work?",
      a: [
        "First: search for a card you want to find similar cards for.",
        `Then: select the card you're looking for, and MagicML will return
        the top 25 most similar cards.`,
        `Then: use the filters, if you want.`
      ]
    },
    {
      q: "Yeah, but how does it work?",
      a: [
        `Oh. It uses a neural network language model to transform the card text
        into a high dimensional vector, encoding the semantic meaning of
        the text. It then uses the normalized euclidean distance between card
        vectors as a measure of similarity.`
      ]
    },
    {
      q: "Where do you get your card data?",
      a: [
        `The card data comes from MTGJSON.`,
        `The basic card search uses the Scryfall API (the card to find similarities for).`,
        `The similarity search is MagicML.`
      ]
    },
    {
      q: "Does MagicML have similarities for every Magic Card?",
      a: [
        `Not yet. At the moment, it only contains cards present in MTG Arena.
        But, the rest of the cards will be added soon.`
      ]
    },
    {
      q: "How are the search results sorted?",
      a: [
        `They're sorted from most similar to least similar.`
      ]
    },
    {
      q: "Why don't some of these cards seem that similar to the searched card?",
      a: [
        `Well, the language model can be improved (and it will be soon).
        Also, some cards are actually fairly unique, and there just isn't a
        very similar card. So, you're seeing the MOST similar, which doesn't
        necessarily mean it's actually similar :(`
      ]
    },
    {
      q: "Can you add this feature?",
      a: [
        `Sure, maybe. Email me at ledger@magicml.com.`,
        `I'll provide a more structured way to handle these soon.`
      ]
    },
    {
      q: "Can you fix this bug?",
      a: [
        `Sure. Thanks for letting me know. Email me at ledger@magicml.com`,
        `I'll provide a more structured way to handle these soon.`
      ]
    },
    {
      q: "What's your MTG Arena rank?",
      a: [
        `Uhh... nothing special :|... like Diamond 2 or 3.`
      ]
    },
    {
      q: "Can I challenge you on MTG Arena?",
      a: [
        `Sure.  lw2134#69223`
      ]
    }
  ]

  return (
    <div>
      <Head>
          <title>{meta.title}</title>
          <meta name="keywords" content={meta.keywords}/>
          <meta name="description" content={meta.description}/>
          <link rel="canonical" href="https://magicml.com/faq"/>
          <meta property="og:type" content="website"></meta>
          <meta name="twitter:card" content="summary"></meta>
          <meta name="twitter:site" content="@magicml2"></meta>
          <meta name="twitter:title" content={meta.title}></meta>
          <meta name="twitter:description" content={meta.description}></meta>
          <meta name="twitter:image" content="/logo512.png"></meta>
      </Head>
      <div className="BasicPage">
        <Header>
        </Header>
        <div className="HomePageTitle">
          <h2>FAQ</h2>
        </div>
        <div className="BasicText">
          <div className="FAQ container">
            <FAQUnit faqs={faqs}></FAQUnit>
          </div> 
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}