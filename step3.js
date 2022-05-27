const fs = require('fs')
const axios = require('axios').default

const cat = (input, output) => {
    fs.readFile(input, 'utf8', (err, data) => {
        if (err) {
            console.log('There is an error', err)
            process.exit(1)
        }
        if (output) {
            writeFile(data, output)
        }
        else {
            console.log(data)
        }
    })
}

const webCat = async (input, output) => {
    try {
        const res = await axios.get(input)
        if (output) {
            writeFile(res.data, output)
        }
        else {
            console.log(res.data)
        }
    }
    catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const writeFile = async (input, output) => {
    fs.writeFile(output, input, 'utf8', (err) => {
        if (err) {
            console.log(error)
            process.exit(1)
        }
        console.log(input)
    })
}


let input
let output

if (process.argv[2] === '--out') {
  output = process.argv[3];
  input = process.argv[4];
} else {
  input = process.argv[2];
}

if (input.includes('http')) {
  webCat(input, output);
} else {
  cat(input, output);
}