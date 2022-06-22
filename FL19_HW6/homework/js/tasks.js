// write your code here
//=================1st Task===================
const arr = ['1', '2', '4', '5'];
function getMaxEvenElement(array) {
    const getEven = array.reduce((p, c) => {
        if (c % 2 === 0) {
            p.push(c);
        }
        return  [...p];
    }, []);
    return Math.max(...getEven);
}
console.log(getMaxEvenElement(arr));
//====================2nd Task================
let a = 3;
let b = 5;
[a, b] = [b, a];
console.log(a);
console.log(b);
//====================3rd Task================
function getValue(value) {
    let v = value ?? '-';
    return v;  
}
console.log(getValue(0));
console.log(getValue(4));
console.log(getValue('someText'));
console.log(getValue(null));
console.log(getValue(undefined));
//====================4th Task===================
const arrayOfArrays = [
    ['name', 'Dan'],
    ['age', '21'],
    ['city', 'Lviv'],
];
function getObjFromArray(arrays) {
    let userObj = {};
    arrays.forEach(array => {
       userObj[array[0]] = array[1];
    });
    return userObj; 
} 
console.log(getObjFromArray(arrayOfArrays));
//========================5th Task=========================
const obj1 = {
    name: 'Nick'
};
function addUniqueId(object) {
    let id;    
    object[id] = Symbol();
    return object;
}
console.log(addUniqueId(obj1));
console.log(addUniqueId({name: 'Buffy'}));
console.log(Object.keys(obj1).includes('id'));
//========================6th Task=========================
const oldObj = {
    name: 'willow',
    details: {
        id: 1,
        age: 47,
        university: 'LNU'
    },
};
function getRegroupedObject(object){
    const {name, details:{id, age, university}} = object;
    const fullName = name;
    const newObj = {university, user:{age, fullName, id}};
    return newObj;
}
console.log(getRegroupedObject(oldObj));
//========================7th Task=========================
const array = [2, 3, 4, 2, 4, 'a', 'c', 'a'];
function getArrayWithUniqueElements(array) {
    return [...new Set(array)];
}
console.log(getArrayWithUniqueElements(array));
//========================8th Task=========================
const phoneNumber = '0123456789';

function hideNumber(string) {
    const lastDigits = string.slice(-4);
    return lastDigits.padStart(string.length, '*');
}
console.log(hideNumber(phoneNumber));
//========================9th Task=========================
function isRequired() {
    throw new Error('b is required')
}
function add(a = isRequired(), b = isRequired()) {
    return a + b;
}
console.log(add(2, 3));
console.log(add(2));
//========================10th Task========================
function * generatorObj() {
    yield 'I';
    yield 'love';
    yield 'EPAM'
  }
  for (let value of generatorObj()) {
    console.log(value);
  }

