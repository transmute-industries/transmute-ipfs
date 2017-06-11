var assert = require('assert');

let TI = require('./index')

describe('TransmuteIpfs', () => {

    describe('#init()', () => {
        it('should use infura by default', () => {
            TI.init()
            assert.equal(TI.config.host, 'ipfs.infura.io');
        });
        it('should support local ipfs node', () => {
            TI.init({
                host: 'localhost',
                port: '5001',
                options: {
                    protocol: 'http'
                }
            })
            assert.equal(TI.config.host, 'localhost');
        });
    });

    // https://github.com/ipfs/js-ipfs-api#utility-functions
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
        });
    });

});