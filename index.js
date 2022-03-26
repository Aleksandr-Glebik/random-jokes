// const url = 'https://api.icndb.com/jokes'

const mainText = document.querySelector('.main-text')
const mainTextAuthor = document.querySelector('.main-text-author')
const btnMain = document.querySelector('.btn-main')
const img = document.querySelector('.main-img')

btnMain.addEventListener('click', getData)
btnMain.addEventListener('click', addAnimation)

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

getData()

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
    setTimeout(() => {
        img.classList.remove('active')
        mainText.classList.remove('active-text')
        mainTextAuthor.classList.remove('active-text')
    }, 600)
}