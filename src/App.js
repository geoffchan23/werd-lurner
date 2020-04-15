import React, { useState } from 'react'
import WordLister from './WordLister'
import ListSelector from './ListSelector'
import './App.scss'
//https://www.npmjs.com/package/bad-words

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || []
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [localStorageKey, value]);
  return [value, setValue];
};

const importedLists = [{
  name: 'Easy words',
  list: [
    { value: 'cat', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Nyan_cat_250px_frame.PNG/220px-Nyan_cat_250px_frame.PNG' },
    { value: 'dog', img: 'https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-superJumbo.jpg' },
    { value: 'poo', img: 'https://dazedimg-dazedgroup.netdna-ssl.com/1000/azure/dazed-prod/1120/0/1120288.jpg' },
  ]
}]

function App() {
  const [myLists, setMyLists] = useStateWithLocalStorage('myLists')
  const [currentList, setCurrentList] = useState(undefined)

  function handleListComplete() {
    setCurrentList(undefined)
  }

  function handleListSelection(selectedList) {
    setCurrentList(selectedList)
  }

  function handleNewListCreated(list) {
    const newMyLists = [...myLists]
    newMyLists.push(list)
    setMyLists(newMyLists)
  }

  return (
    <div className="App">
      { !currentList && <ListSelector onSelected={handleListSelection} list={myLists} onNewListCreated={handleNewListCreated} />}
      { currentList && <WordLister
        wordList={currentList}
        onListComplete={handleListComplete}
      /> }
    </div>
  )
}

export default App
