const ipfsAPI = require('ipfs-api')
// const through = require('through2')
// const concat = require('concat-stream')

// IPFS Gateway
// https://ipfs.infura.io 
// IPFS RPC
// https://ipfs.infura.io:5001 


// const readFilesFromHashAsync = (hash) => {
//     return ipfs.files.get(hash).then((stream) => {
//         let files = []
//         return new Promise((resolve, reject) => {
//             stream.pipe(through.obj((file, enc, next) => {
//                 file.content.pipe(concat((content) => {
//                     files.push({
//                         path: file.path,
//                         content: content.toString()
//                     })
//                     next()
//                 }))
//             }, () => {
//                 resolve(files)
//             }))
//         })
//     })
// }


class TransmuteIpfs {

    init(config = {
        host: 'ipfs.infura.io',
        port: '5001',
        options: {
            protocol: 'https'
        }
    }) {
        this.config = config
        this.ipfs = ipfsAPI(this.config.host, this.config.port, this.config.options)
    }

    addFromFs(folderPath, options = {
        recursive: true,
        ignore: ['node_modules/**']
    }) {
        return new Promise((resolve, reject) => {
            this.ipfs.util.addFromFs(folderPath, options, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }

}

module.exports = new TransmuteIpfs()