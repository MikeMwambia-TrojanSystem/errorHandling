/*
Synchronous Error Propagation
We can convert async function to sync functions simply by removing async keyword
*/
class OddError extends Error {
    constructor (varName = '') {
        super(varName + ' must be even ')
        this.code = 'ERR_MUST_BE_EVEN'
    }
    get name () {
        return 'OddError [' + this.code + ']'
    }
}

function codify (err,code){
    err.code = code
    return err
}

function doTask(amount){
    if(typeof amount !== 'number') throw  codify(
        new TypeError('amount must be a number'),
        'ERR_AMOUNT_MUST_BE_NUMBER'
    )

    if(amount <= 0) throw codify(
        new RangeError('amount must be greater than zero'),
        'ERR_AMOUNT_MUST_EXCEED_ZERO'
    )

    if(amount % 2) throw new OddError('amount')

    //To demostrate error propagation
    throw Error('some other error')
    return amount/2
}

function run () {
    try{
        const result = doTask(4)
        console.log('result',result)
    }catch(err){
        if (err.code === 'ERR_AMOUNT_MUST_BE_NUMBER') {
            throw Error('wrong type')
          } else if (err.code === 'ERRO_AMOUNT_MUST_EXCEED_ZERO') {
            throw Error('out of range')
          } else if (err.code === 'ERR_MUST_BE_EVEN') {
            throw Error('cannot be odd')
          } else {
            throw err
          }
    }
}

try{
    run()
}catch(err){
    console.error('Error caught',err);
}

/*
In the above code doTask throws an error when the input is valid so we can show the error propagation
The error doesn't correspond to any of the known errors and it's because of this that it is rethrown
This causes the promise returned from run() to reject and invoke the catch handler which is attached to it
*/
