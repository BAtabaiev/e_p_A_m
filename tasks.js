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
    return value ?? '-';
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
    arrays.forEach(array => {
        Object.assign
    });
} 
