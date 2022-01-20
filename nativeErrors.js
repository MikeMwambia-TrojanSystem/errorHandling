/*
There're six other native errors that inherit from base Error constructor,these are : 
SyntaxError
RangeError
ReferenceError
TypeError
URIError
*/

function doTask(amount){
    if(typeof amount !== 'number') throw new TypeError('amount must be a number')
    if(amount <= 0) throw new RangeError('amount must be greater than zero') 
    return amount / 2
}

doTask(-1) //Throws range error 

doTask('This is supposed to be a number') //Throws type error
