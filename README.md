1. What is the difference between var, let, and const?
Ans: 
var: It can be redeclared, reassignd and hoisted. ex: 
var x = 1;
var x = 2;
x = 3;
console.log(x); //3

let: It cannot be redeclared in the same scope, but it can be reassigned. It is block scoped. ex:
let x = 1;
x = 10;
console.log(x); //10

const: It cannot be redeclared or reassigned. It is block scoped.ex:
const x = 1;
const x = 12; //error
x = 10;//error
console.log(x); //1

2. What is the spread operator (...)?
Ans:
The spread operator is a syntex of js which is used to separate the elements of array and object.ex:
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log(arr2); //[1, 2, 3, 4]

3. What is the difference between map(), filter(), and forEach()?
Ans:
map():It runs loop on every elemets of an array and returns new array. The original array does not change.ex:
const arr = [1, 2, 3];
const mul = arr.map(a => a*2);
console.log(mul); //[2, 4, 6]
console.log(arr); //[1, 2, 3]

filter():It runs loop on every elemets of an array and returns new array. It is used when need to select specific element.ex:
const arr = [1, 2, 3];
const even = arr.filter(num => num % 2 === 0);
console.log(even); //[2, 4]

forEach():It runs loop on every elemets of an array. It does not returns new array. It used to update DOM.

4. What is an arrow function?
Ans:
An arrow function is a syntex of function declaretion. The characteristics of arrow function is: 
- does not need function keyword.
- if the exprassion is once then no need to return.

5. What are template literals?
Ans:
Template literals or backtick is a special quote which  is used to write html code into .js file. 
