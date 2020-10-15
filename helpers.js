module.exports = {

    stb: (str, spaceSeparatedOctets = 0) => {
        let strarr = []
        for (let i = 0; i < str.length; i++) {

            strarr.push(str.charCodeAt(i).toString())
        }
        return strarr
    },

    bts: str => {
        str = str.replace(/\s+/g, "");
        str = str.match(/.{1,8}/g).join(" ");

        var newBinary = str.split(" ");
        var binaryCode = [];

        for (i = 0; i < newBinary.length; i++) {
            binaryCode.push(String.fromCharCode(parseInt(newBinary[i])));
        }

        return binaryCode.join("");
    },

};
