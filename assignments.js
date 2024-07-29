'use strict';
/*
//  TITLE: Coding Challenge 1:

Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3] 
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]


const juliaData1 = [3, 5, 2, 12, 7];
const kateData1 = [4, 1, 15, 8, 3];

const juliaData2 = [9, 16, 6, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const copyJuliaData1 = juliaData1.slice(1, 3);
  const dogArray = copyJuliaData1.concat(kateData1);
  console.log(dogArray);

  console.log('-----TEST DATA 1-----');

  dogArray.forEach(function (dog, i) {
    if (dog > 2) {
      console.log(`Dog number ${i + 1} is an adult and is ${dog} years old.`);
    } else {
      console.log(`Dog number ${i + 1} is a puppy and is ${dog} years old.`);
    }
  });

  console.log('-----TEST DATA 2-----');

  const copyJuliaData2 = juliaData2.slice(1, 3);
  const dogArray2 = copyJuliaData2.concat(kateData2);
  console.log(dogArray2);

  dogArray2.forEach(function (dog, i) {
    if (dog > 2) {
      console.log(`Dog number ${i + 1} is an adult and is ${dog} years old.`);
    } else {
      console.log(`Dog number ${i + 1} is a puppy and is ${dog} years old.`);
    }
  });
};

checkDogs();

//  TITLE: Coding Challenge 2

//  NOTE: My Code first try

//  NOTE: Could not get the calcCorrect to produce the correct number.
// const ages = [5, 2, 4, 1, 15, 8, 3];
// const ages = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = ages.map(function (dogAge) {
//   // Calc Human Age
//   if (dogAge <= 2) {
//     let humanAge = 2 * dogAge;
//     return humanAge;
//   } else {
//     let humanAge = 16 + dogAge * 4;
//     return humanAge;
//   }
// });
// console.log(calcAverageHumanAge);

// //Remove dogs younger than 18
// const dogsFiltered = calcAverageHumanAge.filter(function (dogAge) {
//   return dogAge >= 18;
// });

// console.log(dogsFiltered);

// //Calc Human Age

// const calcCorrect = dogsFiltered.reduce(
//   (acc, currentIndex) => (acc + currentIndex) / dogsFiltered.length,
//   dogsFiltered[0]
// );

// console.log(calcCorrect);

//  NOTE: My Code second try

const calcAverageHumanAge = function (ages) {
  const humanAgeArr = ages.map(dogAge =>
    dogAge > 2 ? 16 + dogAge * 4 : 2 * dogAge
  );

  const filteredHumanArr = humanAgeArr.filter(function (dogAge) {
    return dogAge >= 18;
  });

  const averageAge =
    filteredHumanArr.reduce((acc, currentIndex) => acc + currentIndex, 0) /
    filteredHumanArr.length;

  return averageAge;
  //   console.log(averageAge / filteredHumanArr.length);
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

//  TITLE: Coding Challenge 3

//  NOTE: Different way of calculating average:

//  NOTE: (2 + 3)/2 = 2.5. OR 2/2 + 3/2 = 2.5

// const averageAge = filteredHumanArr.reduce(
//     (acc, currentIndex, i, arr) => acc + currentIndex / arr.length,
//     0
//   );

// const ages = [5, 2, 4, 1, 15, 8, 3];
const ages = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = ages
  .map(eachAge => (eachAge > 2 ? 16 + eachAge * 4 : 2 * eachAge))
  .filter(dogAge => dogAge >= 18)
  .reduce(
    (dogAge, currentIndex, i, arr) => dogAge + currentIndex / arr.length,
    0
  );

console.log(calcAverageHumanAge);
*/

//  TITLE: Coding Challenge 4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.

dogs.forEach(function (eachObject) {
  eachObject.recommendedFood = Math.trunc(eachObject.weight ** 0.75 * 28);
});

// 2.

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

if (dogSarah.curFood > dogSarah.recommendedFood) {
  console.log("Sarah's dog is overeating.");
} else if (dogSarah.curFood < dogSarah.recommendedFood) {
  console.log("Sarah's dog is undereating.");
} else {
  ("Sarah's dog is eating the right amount.");
}

// 3.

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooLittle);

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);

// 4.

console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little.`);

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much.`);

// 5.

console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6.

const checkEating = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

console.log(dogs.some(checkEating));

// 7.

const okayAmount = dogs.filter(checkEating);

console.log(...okayAmount);

// 8.

const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogsSorted);
