import React from "react";
import { NextSeo } from 'next-seo';


export default function CustomHead(props) {
  if (props.dynamic) {
    return (
      <NextSeo
        title={props.title.concat(" - ", props.id)}
        description={'Top 3: '.concat(props.top3Sims.join(', '))}
        canonical={"https://magicml.com/similarity".concat("/", props.id)}
        openGraph={{
          url: "https://magicml.com/similarity".concat("/", props.id),
          title: props.title.concat(" - Similars - ", props.id),
          description: 'Top 3: '.concat(props.top3Sims.join(', ')),
          images: [
            {
              url: props.searchImageURLs.art_crop,
              alt: props.id,
            }
          ],
          site_name: 'MagicML',
        }}
        twitter={{
          handle: '@magicml2',
          site: '@magicml2',
          cardType: 'summary',
        }}
      />
    )
  } else {
    return (
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          url: props.canonical,
          title: props.title,
          description: props.description,
          images: [
            {
              url: props.image,
              alt: props.title,
            }
          ],
          site_name: 'MagicML',
        }}
        twitter={{
          handle: '@magicml2',
          site: '@magicml2',
          cardType: 'summary',
        }}
      />
    )
  }
}