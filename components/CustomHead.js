import React from "react";
import { useRouter } from 'next/router'
import { NextSeo, LogoJsonLd, BreadcrumbJsonLd } from 'next-seo';


export default function CustomHead(props) {
  const router = useRouter()
  const path = router.asPath.split('/')
  console.log(path);

  if (props.dynamic) {
    return (
      <>
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
        <LogoJsonLd
          logo="http://magicml.com/images/logo512.png"
          url="http://magicml.com"
        />
        <BreadcrumbJsonLd
          itemListElements={
            path.slice(1).map((p, idx) => {
              return {
                position: idx+1,
                name: decodeURI(p),
                item: 'https://magicml.com/'.concat(path.slice(1,(1+idx+1)).join('/')),
              }
            })
          }
        />
      </>
    )
  } else {
    return (
      <>
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
        <LogoJsonLd
          logo="http://magicml.com/images/logo512.png"
          url="http://magicml.com"
        />
        <BreadcrumbJsonLd
          itemListElements={
            path.slice(1).map((p, idx) => {
              return {
                position: idx+1,
                name: decodeURI(p),
                item: 'https://magicml.com/'.concat(path.slice(1,(1+idx+1)).join('/')),
              }
            })
          }
        />
      </>
    )
  }
}