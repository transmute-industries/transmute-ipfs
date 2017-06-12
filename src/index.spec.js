var assert = require('assert')
let TI = require('./index')

describe('TransmuteIpfs', () => {
    describe('#init()', () => {
        it('should use infura by default', () => {
            TI.init()
            assert.equal(TI.config.host, 'ipfs.infura.io')
        })
        it('should support local ipfs node', () => {
            TI.init({
                host: 'localhost',
                port: '5001',
                options: {
                    protocol: 'http'
                }
            })
            assert.equal(TI.config.host, 'localhost')
        })
    })
    describe('#addFromFs(folderPath, options)', () => {
        before(() => {
            TI.init({
                host: 'localhost',
                port: '5001',
                options: {
                    protocol: 'http'
                }
            })
        })
        it('should add folder to ipfs and return the result', () => {
            return TI.addFromFs('./dist')
                .then((res) => {
                    assert.equal(res[0].path, 'dist/data.json')
                    assert.equal(res[1].path, 'dist/index.html')
                    assert.equal(res[2].path, 'dist')
                })
        })
    })
    describe('#addFromURL(url)', () => {
        before(() => {
            TI.init({
                host: 'localhost',
                port: '5001',
                options: {
                    protocol: 'http'
                }
            })
        })
        it('should add folder to ipfs and return the result', () => {
            return TI.addFromURL('https://vignette3.wikia.nocookie.net/nyancat/images/7/7c/Nyan_gary.gif')
                .then((res) => {
                    assert.equal(res[0].path, 'QmSAKHa2JdKrhmBKrqWrBAtS7ACwofiRAEWzYNbXdssBEe')
                    assert.equal(res[0].hash, 'QmSAKHa2JdKrhmBKrqWrBAtS7ACwofiRAEWzYNbXdssBEe')
                })
        })
    })
    describe('#writeObject(obj)', () => {
        before(() => {
            TI.init({
                host: 'localhost',
                port: '5001',
                options: {
                    protocol: 'http'
                }
            })
        })
        it('should add json object to ipfs and return the path', () => {
            let obj = { cool: 'story...bro' }
            return TI.writeObject(obj)
                .then((path) => {
                    assert.equal(path, 'Qmf4GZbciiPLMTZYLpM88GB2CpopCJszdwybUnnwswkpKE')
                })
        })
    })
    describe('#readObject(path)', () => {
        before(() => {
            TI.init({
                host: 'localhost',
                port: '5001',
                options: {
                    protocol: 'http'
                }
            })
        })
        it('should add json object to ipfs and return the path', () => {
            return TI.readObject('Qmf4GZbciiPLMTZYLpM88GB2CpopCJszdwybUnnwswkpKE')
                .then((obj) => {
                    assert.equal(obj.cool, 'story...bro')
                })
        })
    })
})