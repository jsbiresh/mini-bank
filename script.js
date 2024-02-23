'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (currMov, index) {
    const type = currMov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          <div class="movements__value">${currMov}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(function (acc, curr) {
    return acc + curr;
  }, 0);
  setTimeout(function () {
    labelBalance.textContent = `${balance} €`;
  }, 800);
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (account) {

  const incomes = account.movements
    .filter(function (curr) {
      return curr > 0;
    })
    .reduce(function (acc, curr) {
      return acc + curr;
    }, 0);
  labelSumIn.textContent = `${incomes} €`;
  const outcomes = account.movements
    .filter(function (curr) {
      return curr < 0;
    })
    .reduce(function (acc, curr) {
      return acc + curr;
    }, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const interest = account.movements
    .filter(function (curr) {
      return curr > 0;
    })
    .map(function (deposit) {
      return (deposit * account.interestRate) / 100;
    })
    .filter(function (interest, index, arr) {
      // console.log(arr);
      return interest >= 1;
    })
    .reduce(function (acc, curr) {
      return acc + curr;
    }, 0);
  // labelSumInterest.textContent = Math.trunc(Number(interest));
  labelSumInterest.textContent = interest.toFixed(2);

};
// calcDisplaySummary(account1.movements);

// computing usernames
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(currVal => currVal[0])
      .join('');
  });
};

createUsernames(accounts);

// Event Handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // prevent the page from loading.
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value) ) {
    
    // Display UI and Message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display Movements
    displayMovements(currentAccount.movements);

    // Display balance
    calcDisplayBalance(currentAccount.movements);

    // Display Summary
    // calcDisplaySummary(currentAccount.movements);    
    calcDisplaySummary(currentAccount);    
  }
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

// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));

// const x = [...arr.slice(2, 4)];
// console.log(x);

// arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(-1)[0]);

// console.log('----------------------------------');

// for (let item of arr) console.log(item);

// console.log('----------------------------------');

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const dummy = [];
// let sum = 0;

// let ar = movements.forEach(function (value, index, array) {
//   console.log(value, index, array, this);
//   sum += value;
//   dummy.push(value);
// });

// console.log(dummy);
// console.log(sum);

// console.log('------------------');

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((val, key, map) => {
//   console.log(`${key} => ${val}`);
// });

// ----

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);

//   const dogs = dogsJuliaCorrected.concat(dogsKate);

//   dogs.forEach(function (dog, index) {
//     if (dog >= 3) {
//       console.log(
//         `Dog number ${index + 1} is an adult, and is ${dog} years old.`
//       );
//     } else {
//       console.log(`Dog number ${index + 1} is still a puppy.`);
//     }
//   });
// };
// // checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// // -----------
// // const p = [3, 1, 4, 3, 2];
// // const x = p.map(function(value, index, arr) {
// //   console.log(value, index, arr);
// //   return value * 2;
// // })
// // console.log(x);

// let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // const eurToUsd = 1.1;

// // // const converted = movements.map(function(currValue, index) {
// // //   return Math.trunc(currValue * eurToUsd);
// // // })
// // // arrow function demo, same code
// // const converted = movements.map((currValue) => Math.trunc(currValue * eurToUsd))

// // console.log(movements);
// // console.log(converted);

// console.log(movements);
// const deposits = movements.filter(function(currVal) {
//   return currVal > 0;
// });

// console.log(deposits);

// const withdrawals = movements.filter(function(currVal) {
//   return currVal < 0;
// })
// console.log(withdrawals);

// console.log('--------------------------')
// console.log(movements);
// // const balance = movements.reduce(function(accumulator, currVal, i, array) {
// //   // console.log(accumulator, currVal, i, array)
// //   return accumulator + currVal;
// // }, 0);
// const balance = movements.reduce((accumulator, currVal, i, array) => accumulator + currVal, 0);
// console.log(balance);

// // maximum value of movements
// const max = movements.reduce(function(acc, currVal) {
//   return currVal > acc ? currVal : acc;
// }, movements[0]);
// console.log(max);

// const min = movements.reduce(function(acc, currVal) {
//   return currVal < acc ? currVal : acc;
// }, movements[0])

// console.log(min);

// // coding challenge
// const calcAverageHumanAge = function(ages) {

//   // if dog age is <= 2, then humanAge = 2 * dogAge
//   // if dog age is > 2, then humanAge = 16 + dogAge * 4
//   // first use map
//   const humanAge = ages.map(function(currAge, index) {
//     if (currAge <= 2)
//       return 2 * currAge;
//     else if (currAge > 2)
//       return 16 + (currAge * 4)
//   })
//   console.log(humanAge)

//   // second use filter
//   const adultDogs = humanAge.filter(function(currAge, index) {
//     return currAge > 18;
//   })
//   console.log(adultDogs);

//   // third use reduce
//   // const avgHumanAge = adultDogs.reduce(function(acc, currVal, index) {
//   //   // acc = acc + currVal;
//   //   return (acc + currVal) / (index + 1);
//   // }, 0);
//   const avgHumanAge = adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length;
//   return avgHumanAge;
// }

// // same function above one, but using chaining
// const calcAverageHumanAgeUsingChaining = function(ages) {

//   // if dog age is <= 2, then humanAge = 2 * dogAge
//   // if dog age is > 2, then humanAge = 16 + dogAge * 4
//   // first use map

//   const avgHumanAge = ages.map(function(currAge, index) {
//     if (currAge <= 2)
//       return 2 * currAge;
//     else if (currAge > 2)
//       return 16 + (currAge * 4)
//   })
//   .filter(function(currAge) {
//     return currAge >= 18
//   })
//   .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   return avgHumanAge;
// }

// const firstDataSet = calcAverageHumanAgeUsingChaining([5, 2, 4, 1, 15, 8, 3]);
// const secondDataSet = calcAverageHumanAgeUsingChaining([16, 6, 10, 5, 6, 1, 4]);
// console.log(firstDataSet, secondDataSet);

// let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // console.log(movements)
// // const findDemo = movements.find(function(curr, index) {
// //   return curr < 0;
// // })
// // console.log(findDemo);

// console.log(accounts);
// let account = accounts.find(function(account) {
//   return account.owner === 'Jessica Davis';
// })
// console.log(account);

// account = '';
// for (let acc of accounts) {
//   if (acc.owner === 'Jessica Davis') account = acc;
// }
// console.log('got it', account)
