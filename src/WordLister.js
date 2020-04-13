import React, { useState } from 'react'
import Worder from './Worder'
import Arrow from './images/arrow-clip-art-trendy-6.png'

export default function WordLister({ 
  wordList,
  onListComplete,
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [nextWordButtonDisabled, setNextWordButtonDisabled] = useState(true)

  function nextWord() {
    if (currentWordIndex === wordList.list.length-1) {
      onListComplete()
    } else {
      setCurrentWordIndex(currentWordIndex + 1)
      setNextWordButtonDisabled(true)
    }
  }

  function handleCurrentOnComplete() {
    setNextWordButtonDisabled(false)
  }

  return (<div className='WordLister'>
    <div className='container' style={{ transform: 'translateX(-' + (100 * currentWordIndex) + 'vw)' }}>
      { wordList.list.map(word => (
        <Worder word={word} onComplete={handleCurrentOnComplete} extraLetters={3} key={word.value} />
      ))}
    </div>
    <button className='nextWord' onClick={nextWord} style={{ display: nextWordButtonDisabled ? 'none' : 'block'}}>
      <img src={Arrow} alt='arrow' />
    </button>
  </div>)
}