const getWeekDay = (date) => {
  let daysArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = new Date(date);
  return daysArray[day.getDay()];
};

console.log(getWeekDay(Date.now()));
console.log(getWeekDay(new Date(2020, 9, 22)));


const getAmountDaysToNewYear = () => {
  let today = new Date();
  let newYear = new Date(2023, 0, 1);
  let sec = Math.abs(newYear - today) / 1000;
  return Math.floor(sec / (60 * 60 * 24));
};
console.log(getAmountDaysToNewYear());


const birthday17 = new Date(2004, 12, 29);
const birthday15 = new Date(2006, 12, 29);
const birthday22 = new Date(2000, 9, 22);

const getApproveToPass = (param) => {
  const today = new Date(2022, 0, 1);
  let diffTime = Math.abs(param - today);
  let diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let diffMonth = Math.floor(diffDay / 30);
  let diffYear = Math.ceil(diffDay / 365);

  const adulthoodYear = 18;
  const adulthoodMonth = adulthoodYear * 12;

  if (diffYear >= adulthoodYear) {
    console.log("Hello adventurer, you may pass!");
  } else if (diffMonth < adulthoodMonth && adulthoodMonth - diffMonth < 12) {
    console.log(
      "Hello adventurer, you are to young for this quest wait for few more months!"
    );
  } else {
    console.log(
      `Hello adventurer, you are to young for this quest wait for 3 years more!`
    );
  }
};

getApproveToPass(birthday17);
getApproveToPass(birthday15);
getApproveToPass(birthday22);

const elementDiv = 'tag="div" class="main" style={width: 50%;} value="Hello World!"';
const elementP = 'tag="p" class="text" style={color: #aeaeae;} value="Aloha!"';
const transformStringToHtml = (str) => {
  let a = str.replace('tag="', '<').replace('"', '');
  let tag = a.split(' ')[0].replace('<', '');
  let b = a.replace('{', '"').replace('}', '">').replace(' value="', '').replace(/"$/, `</${tag}>`);
  console.log(b);
}
transformStringToHtml(elementP);
transformStringToHtml(elementDiv);

const isValidIdentifier = (str) => {
  if (!/(?:\b[_a-zA-Z]|\B\$)[_$a-zA-Z0-9]*/g.test(str) || !/^[^<>*%!:&\\]*$/g.test(str)) {
    console.log("false");
  } else {
    console.log("true");
  }
};

isValidIdentifier("myVar!"); 
isValidIdentifier("myVar$"); 
isValidIdentifier("myVar_1"); 
isValidIdentifier("1_myVar"); 

const testStr = "My name is John Smith. I am 27.";
const capitalize = (str) => {
  if (typeof str === "string") {
    console.log(str.replace(/\b\w/g, (c) => c.toUpperCase()));
  } else {
    return "";
  }
};
capitalize(testStr);


const isValidPassword = (str) => {
  if (str.length < 8) {
    console.log("false (too short)");
  } else if (!/\d/.test(str)) {
    console.log("false (no numbers)");
  } else if (!/[a-z]/.test(str)) {
    console.log("false (no lowercase letter)");
  } else if (!/[A-Z]/.test(str)) {
    console.log("false (no uppercase letter)");
  } else if (/[^0-9a-zA-Z]/.test(str)) {
    return false;
  } else {
    console.log("true");
  }
};

isValidPassword("agent007");
isValidPassword("AGENT007");
isValidPassword("AgentOOO");
isValidPassword("Age_007");
isValidPassword("Agent007");


const bubbleSort = (arr) => {
  for (let n = 0; n < arr.length; n++) {
    for (let i = 0; i < arr.length - 1 - n; i++) {
      if (arr[i] > arr[i + 1]) {
        const buff = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = buff;
      }
    }
  }
  return arr;
};
console.log(bubbleSort([7, 5, 2, 4, 3, 9]));

const inventory = [
  { name: "milk", brand: "happyCow", price: 2.1 },
  { name: "chocolate", brand: "milka", price: 3 },
  { name: "beer", brand: "hineken", price: 2.2 },
  { name: "soda", brand: "coca-cola", price: 1 },
];

const sortByItem = (obj) => {
  obj.array.sort((a, b) => a[obj.item] > b[obj.item] ? 1 : -1);
  return obj.array;
};

console.log(sortByItem({ item: "name", array: inventory }));
