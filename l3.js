// let rectangle = {
//     length:2,
//     breadth:5,

//     draw:function(){
//         console.log(`drawing rectangle`)
//     }

// }

// function createRectangle(len,bre){
//     return rectangle ={
//         length:len,
//         breadth:bre,
//         draw:function(){
//             console.log('drawing rectangle')
//         }
//     }
// }

// let rectangleObj1 = createRectangle(8,7);

// let rectObj2 =createRectangle(99,44);


// let rectangle ={
//     length:5,
//     breadth:8
// };

// //for in loop
// for(let key in rectangle){
//     console.log(key,rectangle[key]);

// }





//assing cloning


// let c ={value:44};


// let dest = Object.assign({},c)

// console.log(dest);


//iteration cloning

// let src ={value:78979};
// let dest ={};

// for(let key in src ){
//     dest[key]=src[key];
// }

// console.log(dest);






// // spread 
// let src={value:2565455};
// let dest ={...src};

// console.log(dest);



// Lecture--3


// let lastName ='Babbar';

// let firstName = new String('Navaneet');


// let message ='This is my first message';
// let words = message.split(' ');
// console.log(words);

// let high=message.toUpperCase();
// console.log(high);


// ///---TEmplate  Literal

// let letter = 
// `Hello ${lastName},


//  thanks for the Opportunity

//  Regards,
//  Babbar;

// `;

// console.log(letter);

// let date = new Date();
// console.log(date);

// let date2 = new Date(2001,11,25,22);

// console.log(date2);


// //Arrays-- creation of arrays.....

// let number= [1,2,3,4,5];
// console.log(number);

// ///access by indexss
// console.log(number[0]);
// console.log(number[1]);
// console.log(number[2]);
// console.log(number[3]);  

// //Insertion

// //End--
// number.push(55);
// console.log(number);

// //begain

// number.unshift(44);
// console.log(number);

// // Middle

// number.splice(2,0,'a','c','l');
// console.log(number);



// //searching
// //

// console.log(number);
// console.log(number.indexOf('m'));

// if(number.indexOf(5) != -1)
//     console.log("present");

// console.log(number.includes(4));

// // seaching On Object

// let courses = [
    
//     {no:1, naam:'nav'},
//     {no:2, naam:'sharma'}

// ];

// //for searching using find function 

//    let course = courses.find(function(course){
//     return course.naam=='nav';

// })

// console.log(course);


//Iterating an array 

let arr= [10,20,30,40,50,60,70,80,90];

//for of loop 

// for( let value of arr){
//     console.log(value);


// }

//using for each loop
arr.forEach(function(number)
{
    console.log(number);

})


//Filtering an array


let number =[1,2,-5,-9];

let filtered = number.filter( value=>value >=0 );

console.log(filtered);


//mapping array

let numbers =[8,9,10,11];
let items= numbers.map(function(value){
    return 'student_no' + value;

})

console.log(items);







 










