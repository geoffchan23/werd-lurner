import React, { useState } from 'react'
import WordLister from './WordLister'
import ListSelector from './ListSelector'
import './App.scss'

function App() {
  const [currentList, setCurrentList] = useState(undefined)

  function handleListComplete() {
    setCurrentList(undefined)
  }

  function handleListSelection(selectedList) {
    setCurrentList(selectedList)
  }

  return (
    <div className="App">
      { !currentList && <ListSelector onSelected={handleListSelection} />}
      { currentList && <WordLister
        wordList={currentList}
        onListComplete={handleListComplete}
      /> }
    </div>
  )
}

export default App
