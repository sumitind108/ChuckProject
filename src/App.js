import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'https://api.chucknorris.io/jokes/random';

function App() {
  const [joke, setJoke] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchRandomJoke();
  }, []);

  const fetchRandomJoke = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const data = response.data;
      setJoke(data.value);
      setCategory(data.category);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCategoryChange = async (selectedCategory) => {
    try {
      const url = `${API_BASE_URL}?category=${selectedCategory}`;
      const response = await axios.get(url);
      const data = response.data;
      setJoke(data.value);
      setCategory(data.category);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Chuck Norris Jokes</h1>
        <div className="joke-card">
          <p className="category">{category}</p>
          <p className="joke">{joke}</p>
          <div className="category-buttons">
            {[
              'animal',
              'career',
              'celebrity',
              'dev',
              'explicit',
              'fashion',
              'food',
              'history',
              'money',
              'movie',
              'music',
              'political',
              'religion',
              'science',
              'sport',
              'travel',
            ].map((category) => (
              <button
                className="category-button"
                key={category}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <button className="button" onClick={fetchRandomJoke}>
            Random Joke
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
