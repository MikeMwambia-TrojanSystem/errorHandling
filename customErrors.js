/*
Custom Errors : - 
You can create custom error by subclassing native error constructors or use a code property
These aren't mutually exclusive
Use of a code property
*/

function doTask (amount) {
    if(typeof amount !== 'number') throw new TypeError('amount must be a number')
    if(amount <= 0) throw new RangeError('amount must be greater than zero')
    if(amount % 2) {
        //Custom error
        const err = Error('amount must be even')
        err.code = 'ERR_MUST_BE_EVEN'
        throw err
    }
    return amount / 2
}

doTask(3) //prints amount must be even


/*
We can also use inheritance to create a custom error instance
In the same class add code also so both methods are not mutually exclusive
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

//Above error class can be instatiated like below : - 
new OddError('amount') //Prints amount must be even

function doTask(amount) {
    if(typeof amount !== 'number') throw new TypeError('amount must be a number')
    if(amount <= 0) throw new RangeError('amount must be greater than zero')
    if(amount % 2) throw new OddError('amount')
    return amount / 2
}

doTask(3) //thows amount must be even

