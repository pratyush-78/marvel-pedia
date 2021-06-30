import './App.css';
import Header from './components/Header'
import CharacterTable from './components/CharacterTable'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Search from './components/Search'


//  ts=1
//  public key = c67d8060027d7a49395356885e7e4034
// hash = c4eccdb7f03edeb93f3068013174a401


const hash = "c4eccdb7f03edeb93f3068013174a401"

function App() {
  const [items, setItems] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetch = async () => {
      if (query === '') {
        // checking if favorites array is empty or does not exist
        if (localStorage.getItem('favorites') === '[]' || !localStorage.getItem('favorites')) {
          localStorage.setItem('favorites', '[]')
          const result = await axios(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=c67d8060027d7a49395356885e7e4034&hash=${hash}`)
          console.log(result.data.data.results)
          setItems(result.data.data.results)
          setLoading(false)
        } else {
          let favorite = JSON.parse(localStorage.getItem('favorites'))
          setItems(favorite)
          setLoading(false)
        }


      } else {
        const result = await axios(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=c67d8060027d7a49395356885e7e4034&hash=${hash}`)
        console.log(result.data.data.results)
        setItems(result.data.data.results)
        setLoading(false)
      }

    }

    fetch()
  }, [query])

  return (
    <div className="container">
      <Header />
      <Search search={(q) => setQuery(q)}></Search>
      <CharacterTable items={items} isLoading={isLoading} />
    </div>
  );
}

export default App;