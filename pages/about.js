import React from "react";

import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function About() {
  let meta = {
    'title': 'MagicML - About',
    'keywords': 'Magic: The Gathering, MTG, MTG Arena, Magic Card Search, Magic Cards',
    'description': 'Magic: The Gathering card search powered by Natural Language Processing',
    'canonical': 'https://magicml.com/about',
    'image': '/logo512.png'
  };

  return (
    <div>
      <CustomHead {...meta}/>
      <div className="BasicPage">
        <Header>
        </Header>
        <div className="HomePageTitle">
          <h2>About</h2>
        </div>
        <div className="BasicText">
          <div className="container">
            <p>Hi, I'm Ledger, the maker of MagicML.</p>
            <p>
              I'm an ML Engineer by day, <b>not</b> a front-end developer, so please excuse the lack of aesthetic and UX.
              They'll get better as time goes by, hopefully.  Actually, I'm not even that great of an engineer either, so just 
              go ahead and excuse everything about this site that's no good.
            </p>
            <p>
              MagicML is something fun for me to do in my spare time, and
              because I like playing Magic. Additional improvements and features are on the way, but
              I also have kids and a wife and a day job and other interests, so... :).
            </p>
            <p>
              To all 9 of
              the active users, feel free to contact me (<b>ledger@magicml.com</b> or <b>@magicml2</b>) with feature requests,
              bugs, or screenshots of your craziest Arena win (hey, maybe that'll be the next feature
              - the badass-arena-win-screenshot-wall) (man, remember when the facebook feed was called your wall?).
            </p>
            <p>
              ... in any event, the intent is that this site becomes a usefull tool for building decks or whatever, and
              bridges some of the gaps that may exist in card search that depends on structured data - namely, the ability 
              to search by meaning or functionality in the unstructured text.  To that end, MagicML employs a natural language
              model (a neural network) to represent the card text as a high dimensional vector, and then uses the normalized
              distances between card vectors as a measure of similarity. It's not perfect, but I hope you'll agree it's not bad.
            </p>
            <p>
              Lastly, MagicML is currently only populated with cards in MTG Arena.  The rest of the cards will be added soon.
            </p>
          </div> 
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}