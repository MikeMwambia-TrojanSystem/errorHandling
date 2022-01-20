/*
One way to think about exceptions and rejections is that 
exceptions occur in sychronous operations and rejections occur in asynchronous operations
*/
function doTask(amount) {
    return new Promise((resolve,reject)=>{
        if((typeof amount !== 'number')){
            reject(new TypeError('amount must be a number'))
            return
        }
        if(amount <= 0) {
            reject(new RangeError('amount must be greater than zero'))
            return
        }
        if(amount % 2){
            reject(new OddError('amount'))//Custom error
        }
        resolve(amount/2)
    })
}

doTask(3).then((result)=>{
    console.log('result',result)
})
.catch((err)=>{ //Refer to tryandCatch for code assignments
    if (err.code === 'ERR_AMOUNT_MUST_BE_NUMBER') {
        console.error('wrong type')
      } else if (err.code === 'ERRO_AMOUNT_MUST_EXCEED_ZERO') {
        console.error('out of range')
      } else if (err.code === 'ERR_MUST_BE_EVEN') {
        console.error('cannot be odd')
      } else {
        console.error('Unknown error', err)
      }
})

