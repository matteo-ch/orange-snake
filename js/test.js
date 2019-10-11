var x = document.createElement('div');
var y = document.createElement('div');

function toCelsius() {
    return (5/9) * (77-32);
  }
  x.innerHTML = toCelsius();


  function toCelsius() {
    return (5/9) * (77-32);
  }
  y.innerHTML = toCelsius;

  document.body.appendChild(x)
  document.body.appendChild(y)


  // &&
  // ||

  // ===
  // ==
  // !==
  // !=
  // !
 // <
 // >
 // >=
 // <=

  const number1 = 2;
  const number2 = 6;


  if (number1 == number2) {
    // both are the same
  } else {
    // they are not the same
  }


  if (number1 < number2 && number1 > 0) {
    // beide stimmen, deshalb ist das Resultat der Überprüfung "Wahr"
  }

  if (number1 > number2 || number2 > 5 || number1 < 0)  {
    // mindestens 1 stimmt, deshalb ist das Resultat der Überprüfung "Wahr"
  }


  const number3 = '5'
  const number4 = 5;

  if (number3 == number4) {
    // ja das stimmt
  }

  if (number3 === number4) {
    // stimmt nicht, weil der Datentyp nicht gleich ist.
  }


if (number3 !== number4) {
  // wahr, weil der Datentyp nicht übereinstimmt
}

if (number3 != number4) {
  // falsch, weil der Wert gleicht ist, auch wenn der Datentyp nicht übereinstimmt
}




// Objects

const myObject = {
  myNumber: 7,
  myText: 'hello world',
  myArray: [

  ],
  mySecondObject: {
    myNumber: 8
  }
}

const number = myObject.mySecondObject.myNumber
const number = myObject.myNumber


const coordinates = {
  x: 1,
  y: 3
}


// Arrays

// Array -> liste mit einträgen

const numbers = [
  1,
  2,
  3
]


const objects = [
  {
    a: 'test',
    b: 7
  },
  {
    a: 'pipapo',
    b: 9
  }
]

const pipapo = objects[0]

const arrays = [
  [
    1,
    2,
    3
  ],
  [
    4,
    5,
    6
  ]
]


