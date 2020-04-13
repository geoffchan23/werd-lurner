import React, { useState } from 'react'

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

function getRandomLetter() {
  console.log('getRandomLetter')
  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

function addRandomLetters(lettersArr, count=3) {
  console.log('addRandomLetters')
  if (count === 0) return lettersArr
  const tmpLettersArr = [...lettersArr]

  for (let i = 0; i < count; i++) {
    const letter = getRandomLetter()
    if (!tmpLettersArr.includes(letter)) {
      tmpLettersArr.push(letter)
    } else {
      i--
    }
  }
  return tmpLettersArr
}

function shuffle(array) {
  console.log('shuffle')
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getInitialLetterOptions(letters, extraLetters) {
  return () => {
    let initialLetterOptions = addRandomLetters([...letters], extraLetters)
    initialLetterOptions = shuffle(initialLetterOptions)
    initialLetterOptions = initialLetterOptions.map((letter, index) => ({ index, value: letter, selected: false }))
    return initialLetterOptions
  }
}

function textToSpeech(text) {
	// get all voices that browser offers
	var available_voices = window.speechSynthesis.getVoices();
	// this will hold an english voice
	var english_voice = '';
	// find voice by language locale "en-US"
	// if not then select the first voice
	for(var i=0; i<available_voices.length; i++) {
		if(available_voices[i].lang === 'en-US') {
			english_voice = available_voices[i];
			break;
		}
	}
	if(english_voice === '')
		english_voice = available_voices[0];
	// new SpeechSynthesisUtterance object
	var utter = new SpeechSynthesisUtterance();
	utter.rate = 1.5;
	utter.pitch = 0.6;
	utter.text = text;
	utter.voice = english_voice;
	// event after text has been spoken
	utter.onend = function() {
	}
	// speak
	window.speechSynthesis.speak(utter);
}

export default function Worder({
  word,
  onComplete,
  extraLetters,
}) {
  const [letters, setLetters] = useState(word.value.split(''))
  const [letterOptions, setLetterOptions] = useState(getInitialLetterOptions(letters, extraLetters))
  const [lines, setLines] = useState(word.value.split('').map(letter => ({ value: letter, found: false })))
  const [wordComplete, setWordComplete] = useState(false)

  function handleLetterClick(letter) {
    textToSpeech(letter.value)
    if (letters[0] !== letter.value && letters.includes(letter.value)) return
    if (letter.selected) return

    if (letters[0] === letter.value) {
      const newLetters = [...letters]
      newLetters.shift()
      setLetters(newLetters)
      
      let lineLetterFound = false
      setLines(lines.map(line => {
        if (line.value === letter.value && !lineLetterFound && !line.found) {
          lineLetterFound = true
          return {...line, found: true}
        } else {
          return {...line}
        }
      }))

      if (newLetters.length === 0) {
        setWordComplete(true)
        textToSpeech(word.value)
        onComplete()
      }
    }
    // Set the letter as selected
    const newLetterOptions = letterOptions.map(l => ({...l, selected: l.selected || l.index === letter.index }))
    setLetterOptions(newLetterOptions)
  }
  return (<div className='Worder'>
    <div className='content'>
      <div className='img-container'>
        <img className='word-img' src={word.img} alt={word.value} />
      </div>
      <div className='lines'>
        { lines.map((line, index) => (
          <span key={'line' + line.value + index} className='line'>
            { line.found && line.value }
          </span>
        ))}
      </div>
      <div className='letters'>
        { letterOptions.map((letter, index) => (
          <span key={'line' + letter.value + index} className={'letter' + (letter.selected ? ' selected' : '')} onClick={() => handleLetterClick(letter)}>
            { letter.value }
          </span>
        ))}
      </div>
    </div>
  </div>)
}