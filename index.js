// const url = 'https://api.icndb.com/jokes'
import i18Obj from './translate.js';

const mainText = document.querySelector('.main-text')
const mainTextAuthor = document.querySelector('.main-text-author')
const btnMain = document.querySelector('.btn-main')
const img = document.querySelector('.main-img')
const headerBlock = document.querySelector('.header-block')
const headerText = document.querySelector('.header-text')

let lang = 'en'

// btnMain.addEventListener('click', getData)
btnMain.addEventListener('click', addAnimation)
headerBlock.addEventListener('click', setLanguages)

async function getData() {
    const url = 'https://type.fit/api/quotes'
    try {
        const res = await fetch(url)
        const data = await res.json()
        // console.log(data)
        getRandomObj(data)
    } catch(err) {
        displayError(err)
    }
}
// getData()

setTimeout(() => {
    if (lang === 'en') {
        addListenerForEnText()
        getData()
    } else if (lang === 'ru') {
        addListenerForRuText()
        getQuotes()
    }
}, 100)



function displayText(value) {
    mainText.textContent = `"${value.text}"`
    mainTextAuthor.textContent = value.author
}

function getRandomObj(data) {
    // console.log('data', data)
    let ind = Math.round(Math.random() * (data.length))
    // console.log('ind', ind);
    let randomObj = data[ind]
    if (randomObj.author === null) {
        getRandomObj(data)
    } else {
        // console.log('randomObj', randomObj)
        displayText(randomObj)
    }
}

function displayError(err) {
    // console.log('err', err);
    mainText.textContent = `Sorry, try again, error: ${err}"`
    mainTextAuthor.textContent = `Sorry, try again!`
}

function addAnimation() {
    img.classList.add('active')
    mainText.classList.add('active-text')
    mainTextAuthor.classList.add('active-text')
    headerText.classList.add('active-title')
    setTimeout(() => {
        img.classList.remove('active')
        mainText.classList.remove('active-text')
        mainTextAuthor.classList.remove('active-text')
        headerText.classList.remove('active-title')
    }, 600)
}

// console.log('i18Obj', i18Obj);
// console.log('Object.keys(i18Obj)', Object.keys(i18Obj))
// console.log('Object.keys(i18Obj)', Object.values(i18Obj))

function setLanguages(event) {
    if (event.target.classList.contains('btn-languages')) {
        let laguage = event.target.textContent
        // console.log('laguage', laguage);
        if (laguage === 'en') {
            lang = 'en'
            // console.log('i18Obj', i18Obj[lang]);
            getTranslate(i18Obj[lang])
            console.log('lang', lang);
            addListenerForEnText()
        } else if (laguage === 'ru') {
            lang = 'ru'
            // console.log('i18Obj', i18Obj[lang]);
            getTranslate(i18Obj[lang])
            console.log('lang', lang);
            addListenerForRuText()
        }
    }
}

function getTranslate(obj) {
    let allElementsWithDataAttr = document.querySelectorAll('[data-i18]')
    allElementsWithDataAttr.forEach((el) => {
        if (Object.keys(obj).includes(el.dataset.i18)) {
            el.textContent = ''
            el.textContent = obj[el.dataset.i18]
        }
    })
}

async function getQuotes() {
    const quotes = 'quotes.json';
    const res2 = await fetch(quotes);
    const data2 = await res2.json();
    // console.log(data2);
    getRandomObj(data2)
}

// getQuotes()

function addListenerForEnText() {
    btnMain.removeEventListener('click', getQuotes)
    btnMain.addEventListener('click', getData)
}

function addListenerForRuText() {
    btnMain.removeEventListener('click', getData)
    btnMain.addEventListener('click', getQuotes)
}

