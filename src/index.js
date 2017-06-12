const ipfsAPI = require('ipfs-api')

// IPFS Gateway
// https://ipfs.infura.io 
// IPFS RPC
// https://ipfs.infura.io:5001 

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

    addFromURL(url) {
        return new Promise((resolve, reject) => {
            this.ipfs.util.addFromURL(url, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }

    writeObject(obj) {
        let buffer = new Buffer(JSON.stringify(obj))
        return new Promise((resolve, reject) => {
            this.ipfs.add(buffer, (err, res) => {
                if (err || !res) {
                    reject(err)
                }
                resolve(res[0].path)
            })
        })
    }

    readObject(path) {
    
        return new Promise((resolve, reject) => {
            this.ipfs.cat(path, (err, stream) => {
                if (err) {
                    reject(err)
                }
                let data = ''
                stream.on('data', (d) => {
                    data = data + d
                })
                stream.on('end', () => {
                    let obj = JSON.parse(data)
                    resolve(obj)
                })
            })
        })
    }

}

module.exports = new TransmuteIpfs()