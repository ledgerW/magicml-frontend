import { useRouter } from 'next/router'

import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SearchRadio from "../components/SearchRadio";
import { useAppContext } from "../libs/contextLib";
import {
  cardHint, textHint,
  validateForm,
  handleTextSearch, handleCardNameSearch
} from "../libs/formSearchLib";


export default function Home() {
  const router = useRouter()

  let meta = {
    'title': 'MagicML: MTG Tools, Powered by Machine Learning',
    'keywords': 'Magic: The Gathering, MTG, MTG Arena, Magic Card Search, Magic Cards',
    'description': 'Magic: The Gathering card search powered by Natural Language Processing',
    'canonical': 'https://magicml.com',
    'image': 'https://magicml.com/logo512.png'
  }

  const {
    isLoading,
    formSearch, setFormSearch,
    radioValue
  } = useAppContext()
  

  // View
  return (
    <div>
      <CustomHead {...meta}/>
      <div className="HomePageMain">
        <Header></Header>
        <div className="HomePageTitle">
          <h2>Find cards with similar functionality</h2>
          <h5><b>Magic: The Gathering</b> card search powered by Natural Language Processing</h5>
        </div>
        <div className="HomeSearchBar container">
          <div className="SearchRadio">
            <SearchRadio/>
          </div>
          <SearchBar
            handleSubmit={
              radioValue==='text' ? 
              handleTextSearch(router, formSearch) :
              handleCardNameSearch(router, formSearch)
            }
            isLoading={isLoading}
            validateForm={validateForm(formSearch)}
            hint={
              radioValue==='text' ? 
              textHint : 
              cardHint
            }
            search={formSearch}
            setSearch={setFormSearch}
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}