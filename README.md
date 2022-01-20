# errorHandling
Processes and mechanisms of handling errors in Node Js

Kind of Errors : - 
Very broadly speaking errors can be divided into two main groups : - 
1. Operational errors
2. Developer errors

Operational errors are errors that are caused by factors or issues that fall outside the development scope
e.g Network failure

Developer error are errors that occur when a developer makes a mistake for example invalid input.
In this situation the program should crash with an error message to help the developer correct his mistake

Typically , an input error is dealt with by using the throw keyword : 

Always throw an error from the error object
Error is the native constructor for generating an error object.
To create an error, call new Error and pass a string as a message:

There are six other native errors constructors that inherit from base Error constructor , these are : 

EvalError

SyntaxError

RangeError

ReferenceError

TypeError

URIError

You create custome errors by subclassing native error constructors or use a code property

In sychronous function you use try and catch 

In a asychronous function you use .catch()  handler to handle the error after a .then() or try and catch also

In promises you use reject() 

To build a custom error you call the native costructor with arguments new Error('Error message')
