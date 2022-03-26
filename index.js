// const url = 'https://api.icndb.com/jokes'
const url = 'https://type.fit/api/quotes'

async function getData() {
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data)
    getRandomObj(data)
}

getData()

function displayText(data) {
    console.log('data', data)
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