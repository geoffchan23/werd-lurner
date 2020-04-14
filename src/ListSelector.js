import React, { useState, useRef, useEffect } from 'react'
import Arrow from './images/arrow-clip-art-trendy-6.png'

const newListInitialState = {name: '', list: []}
const newListItemInitialState = {value: '', img: ''}

export default function ListSelector({
  onSelected,
  list,
  onNewListCreated,
}) {
  const [addListMode, setAddListMode] = useState(false)
  const [newList, setNewList] = useState(newListInitialState)
  const [newListItem, setNewListItem] = useState(newListItemInitialState)
  const [imgResults, setImgResults] = useState([])
  const [showImageSearch, setShowImageSearch] = useState(false)
  const listNameInput = useRef(null)
  const newWordInput = useRef(null)
  const newWordURLInput = useRef(null)

  function findImage() {
    (async function() {
      const results = await (await fetch(`http://kid-friendly-image-search.com/?q=${newListItem.value}`).json())
      setImgResults(results)
    })()
  }

  function addWord() {
    const newNewList = {...newList}
    newNewList.list.push(newListItem)
    setNewList(newNewList)
    setNewListItem(newListItemInitialState)
    newWordInput.current.select()
  }

  function deleteWord(index) {
    let newNewList = {...newList}
    newNewList.list = newNewList.list.filter((l, i) => i !== index)
    setNewList(newNewList)
  }

  function handleNewListCreated() {
    newListInitialState.list = []
    setNewList(newListInitialState)
    setNewListItem(newListItemInitialState)
    onNewListCreated(newList)
    setAddListMode(false)
  }

  return (<div className='ListSelector'>
    <h2>{addListMode ? 'Create' : 'Select'} a Word List</h2>
    { !addListMode && <div className='lists-container'>
      { list.length && list.map((wordList, index) => (
        <div className='list' onClick={() => onSelected(wordList)} key={JSON.stringify(wordList)}>
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
      { addListMode && <button className='back-btn' onClick={() => setAddListMode(false)}>
        <span>Back</span>
        <img src={Arrow} alt='arrow' />
      </button> }

      { newList.list.length !== 0 && <button className='create-btn' onClick={handleNewListCreated}>
        <span>Create</span>
        <img src={Arrow} alt='arrow' />
      </button> }

      <input 
        value={newList.name} 
        onChange={(e) => setNewList({...newList, name: e.target.value})} 
        onKeyPress={(e) => (e.key === 'Enter' && newWordInput.current.select())}
        placeholder='Give the list a name' 
      />
      
      <ul className='list-preview'>
        <li className='item-adder'>
          <input 
            value={newListItem.value} 
            onChange={(e) => setNewListItem({...newListItem, value: e.target.value})} 
            placeholder='Add a new word'
            onKeyPress={(e) => (e.key === 'Enter' && newWordURLInput.current.select())}
            ref={newWordInput}
          />
          <input 
            value={newListItem.img} 
            onChange={(e) => setNewListItem({...newListItem, img: e.target.value})} 
            placeholder='Image URL'
            onKeyPress={(e) => (e.key === 'Enter' && addWord())}
            ref={newWordURLInput}
          />
          <div className='action-btns'>
            <button onClick={() => setShowImageSearch(true)}>Search Images</button>
            <button onClick={addWord}>Add</button>
          </div>
        </li>

        { newList.list.length !== 0 && newList.list.map((listItem, index) => (
          <li key={JSON.stringify(listItem)}>
            <span><span className='number'>{index+1}</span> {listItem.value}</span>
            <img src={listItem.img} alt={listItem.value} />
            <button className='delete' onClick={() => deleteWord(index)}>x</button>
          </li>
        ))}
      </ul>

      {/* <div className='image-search'>
        <div className='image-results'>
          { imgResults.map(img => <img src={img.src} />)}
        </div>
      </div> */}
    </div> }
  </div>)
}