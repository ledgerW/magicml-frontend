import React from "react";
import {Helmet} from "react-helmet";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";


export default function About() {
  let meta = {
    'title': 'MagicML - FAQ',
    'keywords': "Magic: The Gathering, MTG, MTG Arena, Magic Card Search, Magic Cards",
    'description': "Magic: The Gathering card search powered by Natural Language Processing"
  };

  return (
    <div>
      <Helmet>
          <title>{meta.title}</title>
          <meta name="keywords" content={meta.keywords}/>
          <meta name="description" content={meta.description}/>
      </Helmet>
      <div className="BasicPage">
        <Header>
        </Header>
        <div className="HomePageTitle">
          <h2>Coming Soon :)</h2>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}