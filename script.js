'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Abdul Mannan Khan',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Hammad Fasih',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Arslan Aziz',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Ahmad Abbas  Quazi',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const updateUI = function (acc) {
  //display movements
  displayMovements(acc.movements);
  //display balance
  calcDisplayBalance(acc);
  //display summary
  calcDisplaySummary(acc);
};

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const moves = sort ? movements.slice().sort((a, b) => a - b) : movements;

  moves.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.trunc(interest)}€`;
};
const creatUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(i => i[0])
      .join('');
  });
};
creatUsername(accounts);
//Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Prevent from auto reloading when clicl(prevent form from submitting)
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI & message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //clearing fileds
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiversAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiversAccount &&
    currentAccount.balance >= amount &&
    receiversAccount?.username !== currentAccount.username
  ) {
    //Doing transfer
    currentAccount.movements.push(-amount);
    receiversAccount.movements.push(amount);
    //update UI
    updateUI(currentAccount);
  }
  //clear fields
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    //delete account
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
  inputCloseUsername.blur();
  inputClosePin.blur();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    //Pass movement
    currentAccount.movements.push(loanAmount);
    //update UI
    updateUI(currentAccount);
    //Clear fileds
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  }
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//SLICE
const testArr = ['1', '2', '3', '4', '5', '6'];
const testArr2 = ['12', '11', '10', '9', '8', '7'];
// console.log(testArr.slice(2));
// console.log(testArr.slice(2, -2));
// console.log(testArr.slice(2, -2));
// console.log(testArr.slice(-1));
// console.log(testArr.slice(3, -2));
// console.log(testArr.slice(3, -2));
// //creating copy of an array using slice
// console.log(testArr.slice());
// //coping array using spread operator
// console.log([...testArr]);

// //SPLICE
// //splice actually mutate original array
// //.splice(startingElemeny, NoOfElementsToDelete)
// const a = testArr.splice(2, 3);
// console.log(testArr);

// // //REVERSE
testArr2.reverse();
// // console.log(testArr2);

// //CONCAT
const letters = testArr.concat(testArr2);
// console.log(letters);
// //ALternate to concat
// console.log([...testArr, ...testArr2]);

// //JOIN
// console.log(letters.join(' - '));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// //FOR OF LOOP
// console.log('----FOR OF----');
// // for (const movement of movements) {
// for (const [index, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1}: You Deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1}: You Withdraw ${Math.abs(movement)}`);
//   }
// }
// //FOR EACH LOOP
// console.log('----FOR EACH----');
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1}: You Deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1}: You Withdraw ${Math.abs(movement)}`);
//   }
// });

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
// //FOR EACH ON MAPS
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

//FOR EACH ON SET
const currenciesUnique = new Set([
  'USD',
  'EUR',
  'GBP',
  'USD',
  'EUR',
  'GBP',
  'USD',
]);
// currenciesUnique.forEach(function (value, _, set) {
//   console.log(`${value}: ${value}`);
// });

///////////////////////////////////////////////////
// //CODING CHALLENGE 1
// const testData1Julia = [3, 5, 2, 12, 7];
// const testData1Kate = [4, 1, 15, 8, 3];

// const testData2Julia = [9, 16, 6, 8, 3];
// const testData2Kate = [10, 5, 6, 1, 4];

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice(1);
//   dogsJuliaCorrected.splice(-2);

//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   dogs.forEach(function (value, index) {
//     const type = value >= 3 ? 'adult' : 'puppy🐶';
//     console.log(
//       `Dog number ${index + 1} is an ${type},and is ${value} years old`
//     );
//   });
// };
// checkDogs(testData1Julia, testData1Kate);
// checkDogs(testData2Julia, testData2Kate);

///////////////////////////////////////////
// //CODING CHALLENGE 2
// const calcAAverageHumanAge = function (ages) {
//   const dogsHumanAge = ages.map(function (age) {
//     if (age <= 2) {
//       return 2 * age;
//     } else return 16 + age * 4;
//   });
//   console.log(`Average Human age: ${dogsHumanAge}`);
//   const dogsAbove18 = dogsHumanAge.filter(function (age) {
//     return age >= 18;
//   });
//   console.log(`Dogs above 18 years: ${dogsAbove18}`);

//   const avgAge = dogsAbove18.reduce(function (acc, age, i, arr) {
//     acc = acc + age / arr.length;
//     return acc;
//   }, 0);
//   console.log(`Average Age: ${avgAge}`);
// };
// calcAAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// console.log('----------------');
// calcAAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

/////////////////////////////////////////////////
// //CODING CHALLENGE 3
// const calcAverageHumanAge = arr => {
//   const avg = arr
//     .map(age => {
//       if (age <= 2) {
//         return 2 * age;
//       } else {
//         return 16 + age * 4;
//       }
//     })
//     .filter(age => {
//       return age >= 18;
//     })
//     .reduce((acc, age, i, arr) => {
//       return acc + age / arr.length;
//     }, 0);
//   return avg;
// };
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

///////////////////////////////////
// //MAP
// const usdToInr = 75.11;
// const movementsInr = movements.map(function (mov) {
//   return mov * usdToInr;
// });
// console.log(movements);
// console.log(movementsInr);

// //Same thing using FOR OF Loop
// const movementsInrFor = [];
// for (const mov of movements) movementsInrFor.push(mov * usdToInr);
// console.log(movementsInrFor);

// //Map example again with arrow function
// const movementsInrArr = movements.map(mov => mov * usdToInr);
// console.log(movementsInrArr);

// //more practise of map
// const movementsDescription = movements.map(
//   (mov, index) =>
//     `Movement ${index + 1}: You ${mov > 0 ? 'deposited' : 'withdrawal'} ${mov}`
// );
// console.log(movementsDescription);

//////////////////////////////////
// //FILTER
// console.log(movements);
// const deposit = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposit);

// //same example using FOR OF Loop
// const depositFor = [];
// for (const mov of movements) {
//   if (mov > 0) {
//     depositFor.push(mov);
//   }
// }
// console.log(depositFor);

// //small challenge
// const withdrawal = movements.filter(function (mov) {
//   return mov < 0;
// });
// console.log(withdrawal);

///////////////////////////////////////
// //REDUCE
// const balance = movements.reduce(function (acc, value, index, array) {
//   console.log(`Iteration ${index + 1}: ${acc}`);
//   return acc + value;
// }, 0);
// console.log(balance);

// //Same thing using For Of Loop
// let balanceFor = 0;
// for (const mov of movements) {
//   balanceFor += mov;
// }
// console.log(balanceFor);

//MAXIMMUM VALUE USING REDUCE
// //JONAS METHOD
// const max = movements.reduce(function (acc, value) {
//   if (acc > value) return acc;
//   else return value;
// }, movements[0]);
// console.log(max);

//MY METHOD
// const max = movements.reduce((acc, value) => {
//   if (acc < value) {
//     acc = value;
//   }
//   return acc;
// }, movements[0]);
// console.log(max);

/////////////////////////////////////
// //Chaining (PIPELINE)
// const eurToUsd = 1.1;

// const totalDepositUsd = Math.trunc(
//   movements
//     .filter(mov => mov > 0)
//     .map(mov => mov * eurToUsd)
//     .reduce((acc, mov) => acc + mov)
// );
// console.log(totalDepositUsd);

////////////////////////////////////
// //FIND METHOD
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// const account = accounts.find(acc => acc.owner === 'Abdul Mannan Khan');
// console.log(account);

// //same thing using FOR OF Loop
// let data = {};
// for (const acc of accounts) {
//   if (acc.owner === 'Abdul Mannan Khan') {
//     console.log(acc);
//     data = acc;
//   }
// }
// console.log(data);

/////////////////////////////////////////
// //SOME METHOD
// console.log(movements);
// console.log(movements.some(mov => mov > 1300));

// //Includes method only check Equality
// console.log(movements.includes(1300));
// //Some method check CONDITION
// console.log(movements.some(mov => mov > 5000));

///////////////////////////
// //EVERY METHOD
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// //SEPERATE CALLBACK
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

/////////////////////////
// //FLAT METHOD
// const arr = [[1, 2, 3], 4, 5, [6, 7, 8, 9]];
// console.log(arr.flat());

// const arrDeep = [[1, [2, 3]], 4, 5, [6, [7, 8], 9]];
// console.log(arrDeep.flat(2));

///////////////////////////////////////
//
// //FLAT EXAMPLE - CALCULATE OVERALL BALANCE
// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// //FLAT-MAP (it goes only one level deep)
// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance2);

/////////////////////////////////////////
//SORT METHOD
//STRINGS (Will be sorted in ascending order alphabetically)
// const table2 = ['Abdul Mannan', 'Arslan', 'Zaib', 'Hammad'];
// console.log(table2.sort());

//SORTING OF NUMBERS
// console.log(movements);
// //sort will convert numbers into strings and then convert but thats
// //not we want
// console.log(movements.sort());

// //SORT METHOD with CAll back function
// // return < 0, A , B (Keep order)
// // return > 0, B , A (Switch order)
// console.log(movements);
// //Ascending Order
// // movements.sort((a, b) => {
// //   if (a > b) {
// //     return 1;
// //   }
// //   if (a < b) {
// //     return -1;
// //   }
// // });
// movements.sort((a, b) => a - b);
// console.log(movements);
// //Descending Order
// // movements.sort((a, b) => {
// //   if (a > b) {
// //     return -1;
// //   }
// //   if (a < b) {
// //     return 1;
// //   }
// // });
// movements.sort((a, b) => b - a);
// console.log(movements);

/////////////////////////////////
// //FILL METHOD
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// arr.fill(1, 2, 6); //arr.fill(parameter to fill, starting position, ending position)
// console.log(arr);

// const arr2 = new Array(4);
// console.log(arr2);
// arr2.fill(3);
// console.log(arr2);
// arr2.fill(0, 1, 3);
// console.log(arr2);

/////////////////////////////////////
// //Array.from method
// const x = Array.from({ length: 10 }, () => 1);
// console.log(x);
// const y = Array.from({ length: 10 }, (_, index) => index + 1);
// console.log(y);

// //100 Dice roll generated randonly in Array
// const z = Array.from({ length: 100 }, (_, i) =>
//   Math.trunc(Math.random() * 6 + 1)
// );
// console.log(z);

// //////////////////////////////////
// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);
// });

/////////////////////////////////
//CODING CHALLENGE 4
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// //1
// dogs.forEach(function (dog) {
//   dog.recomFood = Math.trunc(dog.weight ** 0.75 * 28);
// });

// console.log(dogs);
// //2
// const sarahDog = dogs.find(dog => {
//   if (dog.owners.includes('Sarah')) {
//     return dog;
//   }
// });
// console.log(sarahDog);
// console.log(
//   `Sarah dogs is eating too ${
//     sarahDog.curFood > sarahDog.recomFood ? 'much.' : 'little.'
//   }`
// );
// //3
// const ownerEatTooMuch = dogs
//   .filter(dog => dog.curFood > dog.recomFood)
//   .flatMap(dog => dog.owners);
// console.log(ownerEatTooMuch);
// const ownerEatTooLittle = dogs
//   .filter(dog => dog.curFood < dog.recomFood)
//   .flatMap(dog => dog.owners);
// console.log(ownerEatTooLittle);
// //
// console.log(`${ownerEatTooMuch.join(' and ')}'s eat too much.`);
// console.log(`${ownerEatTooLittle.join(' and ')}'s eat too little.`);
// //5
// const exactFood = dogs.some(dog => {
//   dog.curFood === dog.recomFood;
// });
// console.log(exactFood);
// // //6
// // Being within a range 10% above and below the recommended portion means:
// // current > (recommended * 0.90) && current < (recommended *
// // 1.10).
// const checkEatingOk = dog =>
//   dog.curFood > dog.recomFood * 0.9 && dog.curFood < dog.recomFood * 1.1;
// console.log(dogs.some(checkEatingOk));
// //7
// console.log(dogs.filter(checkEatingOk));
// //8
// const dogsSorted = dogs.slice().sort((a, b) => a.recomFood - b.recomFood);
// console.log(dogsSorted);
