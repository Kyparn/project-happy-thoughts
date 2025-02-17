import React, { useState } from 'react'
import { API_URL } from 'utils/API'

const Form = ({ thought, setThought }) => {
  const [newThought, setNewThought] = useState('')
  const [counter, setCounter] = useState(0)

  const newThoughtChange = (e) => {
    setNewThought(e.target.value)
    setCounter(e.target.value.length)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newThought }),
    }
    fetch(API_URL, options)
      .then((response) => response.json)
      .then((data) => setThought([data, ...thought]))

    setNewThought('')
    setCounter(0)
  }

  return (
    <>
      <section className="main-container">
        <form onSubmit={onFormSubmit}>
          <label htmlFor="newThought"> Write a happy thought </label>
          <textarea
            className={
              counter < 6 || counter > 140 ? 'no-words' : 'word-counter'
            }
            type="text"
            rows="5"
            id="newThought"
            value={newThought}
            onChange={newThoughtChange}
            placeholder="Write a happy thought"
          />
          <div className="main-container-lowerpart">
            <p> {140 - counter} / 140 characters left</p>
            <button
              className="happy-button"
              type="submit"
              disabled={newThought.length < 6 || newThought.length > 140}
            >
              {' '}
              <span role="img" aria-label="hearts">
                ❤️
              </span>{' '}
              Send Happy Thought{' '}
              <span role="img" aria-label="hearts">
                ❤️
              </span>{' '}
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Form
