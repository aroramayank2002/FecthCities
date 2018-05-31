// node .\conf\Data.js
// Configuration file to create user data
// Here are the listed decisions for how user data is created.
// Gender is equally distributed.
/* Age distribution:
    https://www.indexmundi.com/sweden/age_structure.html
   Age structure:
   // 0-14  : 20%
   // 15-24 : 10%
   // 25-54 : 40%
   // 55-64 : 10%
   // 65-90 : 20%
*/
/* Income distribution
    https://globaltrends2030.files.wordpress.com/2012/07/leemason-fig11.png
   Mean income: 70,000 $
     0-14  : 0
     15-24 : 50% of mean (20% variation)
     25-35 : 75% of mean (25% variation)
     35-55 : 100% of mean (50% variation)
     55-65 : 75% of mean (25% variation)
     65-90 : 50% of mean (20% variation)
     >90 : 25% of mean (20% variation)
*/

const TOTAL_USERS_TO_CREATE = 100000;
const MEAN_INCOME_USD = 70000;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntR(min, max) {
  let diff = max - min;
  return min+ Math.floor(Math.random() * Math.floor(diff));
}

function getNextAge(){
    let age = undefined;
    let randNumber = getRandomInt(100);
    // console.log(`rand: ${randNumber}`);

    if(randNumber >=0 && randNumber <20){
      age = getRandomIntR(1,14);
    }else if(randNumber >=20 && randNumber <30){
      age = getRandomIntR(15,24);
    }else if(randNumber >=30 && randNumber <70){
      age = getRandomIntR(25,54);
    }else if(randNumber >=70 && randNumber <80){
      age = getRandomIntR(55,64);
    }else if(randNumber >=80){
      age = getRandomIntR(65,90);
    }
    if(age === 0){
      age = 1;
    }
    return age;
}

function getNextAnnualSalaryInUSD(age){
    let sal = undefined;
    let factor = 0.00;
    let variation = 0.00;

    if(age >=0 && age <15){
      factor = 0.00;
      variation = 0.00;
    }else if(age >=15 && age <25){
      factor = 0.50;
      variation = getRandomInt(20)/100;
    }else if(age >=25 && age <35){
      factor = 0.75;
      variation = getRandomInt(25)/100;
    }else if(age >=35 && age <55){
      factor = 1.00;
      variation = getRandomInt(50)/100;
    }else if(age >=55 && age <65){
      factor = 0.75;
      variation = getRandomInt(25)/100;
    }else if(age >=65 && age <=90){
      factor = 0.50;
      variation = getRandomInt(20)/100;
    }else if(age >=90){
      factor = 0.25;
      variation = getRandomInt(20)/100;
    }
    sal = MEAN_INCOME_USD*factor + MEAN_INCOME_USD*variation;
    return sal;
}

// let ages = [5,10,13,15,18,19,24,32,45,47,56,65,75,80,95,100];
//
// for(let i=0;i<100; i++){
//   let age = getNextAge();
//   console.log(`${i}: ${age},  ${getNextAnnualSalaryInUSD(age)}`);
// }

// console.log(`random:  ${getRandomInt(200)}`);

let counter = 0;
for(let i=0;i<10; i++){
  let age = getNextAge();
  console.log(`${i}: ${age},  ${getNextAnnualSalaryInUSD(age)}`);
  // console.log(`${i}: ${age}`);
}
