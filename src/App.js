import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const options = [
    { value: '', text: '--Choose a Type--' },
    { value: 'fish', text: 'Fish - 魚' },
    { value: 'sea', text: 'Sea Creatures - 海洋生物' },
    { value: 'bugs', text: 'Bugs - 昆蟲' },
    { value: 'fossils', text: 'Fossils - 化石' },
    { value: 'villagers', text: 'Villagers - 島民' },
    { value: 'art', text: 'Art - 畫作' },
  ]

  const [animalType, setAnimalType] = useState(options[0].value)
  const [container, setContainer] = useState([])

  useEffect(() => {
    const api = axios.create({
      baseURL: 'https://acnhapi.com/v1a/',
    })
    api.get(`/${animalType}`).then((res) => {
      return setContainer(res.data)
    })
  }, [animalType])

  const onChangeTypeHandler = (event) => {
    setAnimalType(event.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className="App">
      <div className="header">
        <h2>
          Animal <strong>Crossing</strong> Data
        </h2>
      </div>
      <form onSubmit={submitHandler}>
        <label>Animal Type</label>
        <select value={animalType} onChange={onChangeTypeHandler}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </form>
      <br />
      <div className="container">
        {container.map((item, idx) => {
          if (animalType === options[1].value || animalType === options[2].value || animalType === options[3].value) {
            return (
              <div className="card" key={idx}>
                <img src={item.image_uri} alt="items" />
                <h3>
                  {item.name['name-USen']} - {item.name['name-TWzh']}
                </h3>
                <p>Month: {item.availability['month-northern']}</p>
                <p>Price: {item.price}</p>
                <p></p>
              </div>
            )
          } else {
            return (
              <div className="card" key={idx}>
                <img src={item.image_uri} alt="items" />
                <h3>
                  {item.name['name-USen']} - {item.name['name-TWzh']}{' '}
                </h3>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default App
