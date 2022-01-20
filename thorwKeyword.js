/*
An error is basically built by use of throw keyword
*/

function doTask (amount) {
    if(typeof amount !== 'number') throw new Error('amount must be a number')
    return amount / 2
}

doTask('here is some invalid input'); 
/*
The program will crash and throw print amount must be a number
*/

