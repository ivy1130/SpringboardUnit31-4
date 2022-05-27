const fs = require('fs')
const axios = require('axios').default

const cat = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('There is an error', err)
            process.exit(1)
        }
        console.log(data)
    })
}

const webCat = async (webPath) => {
    try {
        const res = await axios.get(webPath)
        console.log(res.data)
    }
    catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const input = process.argv[2]
if (input.includes('http')) {
    webCat(input)
}
else {
    cat(input)
}