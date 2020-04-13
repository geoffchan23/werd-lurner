import React, { useState } from 'react'

const importedLists = [{
  name: 'Easy words',
  list: [
    { value: 'cat', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Nyan_cat_250px_frame.PNG/220px-Nyan_cat_250px_frame.PNG' },
    { value: 'dog', img: 'https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-superJumbo.jpg' },
    { value: 'poo', img: 'https://dazedimg-dazedgroup.netdna-ssl.com/1000/azure/dazed-prod/1120/0/1120288.jpg' },
  ]
}]

const newListInitialState = {name: '', list: []}
const newListItemInitialState = {value: '', img: ''}

export default function ListSelector({
  onSelected,

}) {
  const [myLists, setMyLists] = useState(importedLists)
  const [addListMode, setAddListMode] = useState(false)
  const [newList, setNewList] = useState(newListInitialState)
  const [newListItem, setNewListItem] = useState(newListItemInitialState)
  const [imgResults, setImgResults] = useState([])
  const [showImageSearch, setShowImageSearch] = useState(false)

  function findImage() {
    (async function() {
      const results = await (await fetch(`http://kid-friendly-image-search.com/?q=${newListItem.value}`).json())
      setImgResults(results)
    })()
  }

  function addWord() {

  }

  return (<div className='ListSelector'>
    <h2>{addListMode ? 'Create' : 'Select'} a Word List</h2>
    { !addListMode && <div className='lists-container'>
      { myLists.length && myLists.map((wordList, index) => (
        <div className='list' onClick={() => onSelected(wordList)}>
          <img src={wordList.list[0].img} alt={wordList.list[0].value} />
          <h3>{ wordList.name }</h3>
        </div>
      ))}
      <div className='add-list-btn-container'>
        <button onClick={() => setAddListMode(true)}>
          Add New List
        </button>
      </div>
    </div> }

    { addListMode && <div className='add-list-container'>
      <div className='list-preview'>
        <input value={newList.name} onChange={(e) => setNewList({...newList, name: e.target.value})} placeholder='Give the list a name' />
        
        <li>
          <input 
            value={newListItem.value} 
            onChange={(e) => setNewListItem({...newListItem, value: e.target.value})} 
            placeholder='Add a new word'
            onKeyPress={(e) => (e.key === 'Enter' && findImage())}
          />
          <input 
            value={newListItem.value} 
            onChange={(e) => setNewListItem({...newListItem, value: e.target.value})} 
            placeholder='Image URL'
            onKeyPress={(e) => (e.key === 'Enter' && findImage())}
          />
          <button onClick={addWord}>Add</button>
          <button onClick={() => setShowImageSearch(true)}>Search Images</button>
        </li>

        { newList.list.length !== 0 && newList.list.map(listItem => (
          <li>
            <span>{ listItem.value }</span>
            <img src={listItem.img} alt={listItem.value} />
          </li>
        ))}
      </div>

      {/* <div className='image-search'>
        <div className='image-results'>
          { imgResults.map(img => <img src={img.src} />)}
        </div>
      </div> */}
    </div> }
  </div>)
}