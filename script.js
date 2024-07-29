'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//  TITLE:  BANKIST APP

//  TITLE: Project: Bankist App

//  NOTE: This is live on bankist.netlify.app

//  NOTE:  Data
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

//  NOTE:  Elements
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

//  NOTE: Implementing Sorting and Displaying Movements

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  //  NOTE: In order to implement sort, we need to make a copy first (using slice) so that we don't manipulate the original array. Slice is better than spread here because we want to continue chaining after the copy is made.
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    }. ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//  NOTE: Printing Account Balance

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//  NOTE: Displaying Summary on bottom of account page

//  NOTE: Displaying Money In

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumIn.textContent = `${incomes}€`;

  //  NOTE: Displaying Money Out

  const withdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, withdrawal) => acc + withdrawal);
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;

  //  NOTE: Displaying Interest

  //  NOTE: The way interest works here is every time you make a deposit, it gains 1.2% interest.

  // const interest = movements
  //   .filter(mov => mov > 0)
  //   .map(deposit => (deposit * 1.2) / 100)
  //   .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest}€`;

  //  NOTE: Now let's say the bank makes a new rule that it will only give interest if the interest amount is at least 1€. Copying the code directly above and replicating below with the updated rule.

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//  NOTE: Conputing Usernames

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  //  NOTE: Display Movements
  displayMovements(acc.movements);

  //  NOTE: Display Balance
  calcDisplayBalance(acc);

  //  NOTE: Display Summary
  calcDisplaySummary(acc);
};

//  TITLE: Implementing Login

//  NOTE: Event Handlers

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //  NOTE: Prevents form from from reloading the page. (the preventDefault()).
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //  NOTE: Display UI and Welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    //  NOTE: Clear Input Fields
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    //  NOTE: Update UI
    updateUI(currentAccount);
  } else {
    labelWelcome.textContent = `Incorrect Login Credentials`;

    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();
    inputLoginUsername.blur();
  }
});

//  TITLE: Implementing Transfers

//  NOTE: Without preventDefault(), everytime you click the arrow to transfer money, the page would reload.

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  //  NOTE: Make sure there is enough money in the account and make sure you're trasnferring more than 0.
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //  NOTE: Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //  NOTE: Update UI
    updateUI(currentAccount);
  }
});

//  TITLE: Requesting a Loan

//  NOTE: Our bank has a rule which says it only grants a loan which there is a deposit with at least 10% of the loan request amount.

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //  NOTE: Add movement
    currentAccount.movements.push(amount);

    //  NOTE: Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

//  TITLE: The FindIndex Method

//  TITLE: Deleting an Account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    //  NOTE: Delete Account
    accounts.splice(index, 1);

    //  NOTE: Hide UI
    containerApp.style.opacity = 0;
  }
});

inputCloseUsername.value = inputClosePin.value = '';

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
