/*
Custom error class 
*/
class OddError extends Error {
    constructor (varname = ''){
        super(varname + ' must be even ')
        this.code = 'ERR_MUST_BE_EVEN'
    }
    get name () { 
        return 'OddError [' + this.code +']' 
    }
}

/*
Try and catch enables us to handle errors for different situations
*/
function doTask (amount) {
    if(typeof amount !== 'number') throw new TypeError('amount must be a number')
    if(amount <= 0) throw new RangeError('amount must be greater than zero')
    if(amount % 2) {
        //Custom error
        const err = new OddError('amount must be even')
        err.code = 'ERR_MUST_BE_EVEN'
        throw err
    }
    return amount / 2
}

//Use as : 
try {
    let result = doTask(4)
    console.log('result',result);
}catch (err){
    console.log(err);
}

//Rather than jogging the error we can determine the error type and handle it accordingly
try {
    let result = doTask(3)
    console.log('result',result)
}catch(err){
    if(err instanceof TypeError){
        console.error('wrong type');
    }else if(err instanceof RangeError){
        console.error('out of range');
    }else if (err instanceof OddError){//Notice this
        console.error('cannot be odd');
    } else {
        console.error('Unkown error',err);
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

    if(amount % 2) throw new OddError('amount')

    return amount/2
}

/*
Finally we can use code code to check the error type
Now erroneously calling result as a function will cause the error checks to reach the final else branch in the catch block:
*/

try {
    const result = doTask(4)
    result() //This is an error result is a number
    console.log('result', result)
  } catch (err) {
    if (err.code === 'ERR_AMOUNT_MUST_BE_NUMBER') {
      console.error('wrong type')
    } else if (err.code === 'ERRO_AMOUNT_MUST_EXCEED_ZERO') {
      console.error('out of range')
    } else if (err.code === 'ERR_MUST_BE_EVEN') {
      console.error('cannot be odd')
    } else {
      console.error('Unknown error', err)
    }
  }

  /*
  NB : - Try and catch cannot be used in a function that willb e executed sometime in the future
  for example in a setTimeout function
  */


 // WARNING: NEVER DO THIS:
try {
    setTimeout(() => {
      const result = doTask(3)
      console.log('result', result)
    }, 100)
  } catch (err) {
    if (err.code === 'ERR_AMOUNT_MUST_BE_NUMBER') {
      console.error('wrong type')
    } else if (err.code === 'ERRO_AMOUNT_MUST_EXCEED_ZERO') {
      console.error('out of range')
    } else if (err.code === 'ERR_MUST_BE_EVEN') {
      console.error('cannot be odd')
    } else {
      console.error('Unknown error', err)
    }
  }

  //DO THIS LIKE BELOW :

  setTimeout(() => {
    try {
      const result = doTask(3)
      console.log('result', result)
    } catch (err) {
      if (err.code === 'ERR_AMOUNT_MUST_BE_NUMBER') {
        console.error('wrong type')
      } else if (err.code === 'ERRO_AMOUNT_MUST_EXCEED_ZERO') {
        console.error('out of range')
      } else if (err.code === 'ERR_MUST_BE_EVEN') {
        console.error('cannot be odd')
      } else {
        console.error('Unknown error', err)
      }
    }
  }, 100)
  