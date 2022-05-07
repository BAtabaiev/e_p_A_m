// #1
function calculateSum(arr) {
  let total = 0;
  for(let i in arr){
      total += arr[i];
  }
  return total;
}

console.log(calculateSum([1,2,3,4,5])); //15

// #2
function isTriangle(a, b, c) {
    return (a + b > c) && (a + c > b) && (b + c > a);
}

console.log(isTriangle(5,6,7)); //true
console.log(isTriangle(2,9,3)); //false

// #3
function isIsogram(word) {
    return !word.match(/([a-z]).*\1/i);
}

console.log(isIsogram('Dermatoglyphics')); //true
console.log(isIsogram('abab')); //false

// #4
function isPalindrome(word) {
    return word == word.split('').reverse().join('');
}

console.log(isPalindrome('Dermatoglyphics')); //false
console.log(isPalindrome('abbabba')); //true

// #5
function showFormattedDate(dateObj) {
    let date = new Date(dateObj);
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${day} of ${month}, ${year}`;
}

console.log(showFormattedDate(new Date('05/12/22'))); //'12 of May, 2022'

// #6
const letterCount = (str, letter) => {
let count = 0;
for(let i = 0; i < str.length; i++){
    if(str.charAt(i) == letter){
        count += 1;
    }
}
    return count;
}
console.log(letterCount('abbaba', 'b')); //3

// #7
function countRepetitions(arr) {
    let counts = {};
    for(let i of arr){
        counts[i] = counts[i] ? counts[i] + 1 : 1;
    }
    return counts;
}

console.log(countRepetitions(['banana', 'apple', 'banana'])); // { banana: 2, apple: 1 }

// #8
function calculateNumber(arr) {
    return parseInt(arr.join(''), 2);
}

console.log(calculateNumber([0, 1, 0, 1])); //5
console.log(calculateNumber([1, 0, 0, 1])); //9
