
class OddError extends Error {
    constructor (varname = ''){
        super(varname + ' must be even ')
    }
    get name () { 
        return 'OddError [' + this.code +']' 
    }
}

/*
Instead of using instanceof to determine Error type you can use code 
Utility function to add error code below
*/
function codify (err,code){
    err.code = code;
    return err;
}


/*
Update the doTask function to use codify
*/
function doTask(amount) {
    if(typeof amount != 'number') throw codify(
        new TypeError('amount must be a number'),'ERR_AMOUNT_MUST_BE_NUMBER'
    )

    if(amount <= 0) throw codify(
        new RangeError('amount must be greater than zero'),'ERR_AMOUNT_MUST_EXCEED_ZERO'
    )

    if(amount % 2) throw codify(
        new OddError('amount'),'ERR_MUST_BE_EVEN')

    return amount/2
}

/*
Async always returns a promise
Async/Await syntax always supports try/catch of rejections.
*/

async function run(){
    //Adopts a syntantic sugar approach
    try {
        const result = await doTask(3)
        console.log('result',result);
    }catch(err){
        if (err instanceof TypeError) {
            console.error('wrong type')
          } else if (err instanceof RangeError) {
            console.error('out of range')
          } else if (err.code === 'ERR_MUST_BE_EVEN') {
            console.error('cannot be odd')
          } else {
            console.error('Unknown error', err)
          }
    }
}

run();

/*
The only difference, other than wrapping the try/catch in an async function, is that we await doTask(3) 
so that the async function can handle the promise automatically. 
Since 3 is an odd number, the promise returned from doTask will call reject with our custom OddError 
and the catch block will identify the code property and then output cannot be odd:
Using async keyword we can basically turn a syschronous function to async
*/


async function doTask(amount){
    if(typeof amount !== 'number') throw new TypeError('amount must be a number')
    if(typeof amount <= 0) throw new RangeError('amount must be greater than zero')
    if(amount % 2) throw new OddError('amount')
    const result = await asyncFetchResult(amount)
    return result //This can be an error with reject or resolve here you can capture operational errors
}





