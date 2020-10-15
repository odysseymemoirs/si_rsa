const bigInt = require("big-integer");

const { stb, bts } = require("./helpers");


function RSA(data) {

    const p = 13

    const q = 29

    const mod = p * q

    console.log('p = ', p, 'q = ', q, 'mod = ', mod)


    const euler = eulerFunction(p, q)

    console.log('euler = ', euler)

    const e = exponent(euler)

    console.log('exponent = ', e)

    const publicKey = { e, mod }

    const d = find_d(e, euler)

    const privateKey = { d, mod }

    console.log({ publicKey, privateKey })

    let byteText = stb(data)

    const encryptedData = []

    byteText.map((word, i) => {

        encryptedData[i] = encrypt(parseInt(word), publicKey)
    })

    console.log('data to encrypt', data)

    console.log('encryptedData', encryptedData)

    const decryptedData = []

    encryptedData.map((word, i) => {

        decryptedData[i] = decrypt(word, privateKey)
    })


    decryptedData.map((word, i) => {


        console.log('decryptedData', bts(word.toString()))
    })
}

function encrypt(data, publicKey) {

    return (bigInt(data).pow(publicKey.e).mod(publicKey.mod)).toJSNumber()
}

function decrypt(data, privateKey) {

    return (bigInt(data).pow(privateKey.d).mod(privateKey.mod)).toJSNumber()

}

function find_d(e, euler) {

    let i = 1
    while (1) {
        if (((i * e) % euler) === 1) {
            return i
        }
        i++
    }
}

function eulerFunction(p, q) {

    return (p - 1) * (q - 1)
}

function exponent(euler) {

    // 1. e должно быть < euler(12)     =  1 2 3 4 5 6 7 8 9 10 11 
    // 2. e простое число               =  2 3 5 7 11 
    // 3. e взаимно простое с euler     =  5 7 11

    return (isPrime(euler)[0]) // 5 7 11 возмем первое число (5)
}

const isPrime = euler => {

    let expArr = []

    for (let i = 2; i < euler; i++) {
        if (isPrime2(i))
            if (gcd(euler, i) === 1)
                expArr.push(i)
    }
    return expArr
}

const isPrime2 = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
    return num > 1;
}

var gcd = (a, b) => {
    if (!b) {
        return a;
    }

    return gcd(b, a % b);
}


RSA('hello again')



