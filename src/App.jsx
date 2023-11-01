/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './App.css'
import { Gallery, ISearchBar } from './components'

function App() {
  const [inputText, setInputText] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  function handleSearchButton() {
    setIsSearch(true)
  }
  return (
    <div className='box'>
      <ISearchBar inputText={inputText} onInputText={setInputText} 
                  onSearchChange={handleSearchButton}/>
      <Gallery inputText={inputText} onInputTextChange={setInputText}
              isSearch={isSearch} onIsSearchChange={setIsSearch} />
      {
        console.log(isSearch)
      }
    </div>
  )
}

export default App;
