const birthday = document.querySelector('#birthday');
const calcAge = document.querySelector("#calculate-age");
const res = document.querySelector('#result');
const extraInfo = document.querySelector('#extra-info');

function calAge(e){
  e.preventDefault();
  const birthdayValue = birthday.value;
  if(!birthdayValue.trim()){
    alert('Please enter your birthday');
    res.innerText = 'Your Age';
    extraInfo.innerText = 'Enter your birth date above to calculate your exact age and next birthday.';
    return;
  }
  
  const birthDate = new Date(birthdayValue);
  const currDate = new Date();
  
  // Basic validation that birthDate is not in the future
  if(birthDate > currDate) {
    alert('Birthday cannot be in the future!');
    res.innerText = 'Your Age';
    extraInfo.innerText = 'Enter your birth date above to calculate your exact age and next birthday.';
    return;
  }

  const ageData = getAge(birthDate, currDate);
  const nextBirthdayData = getNextBirthday(birthDate, currDate);

  res.innerText = `You are ${ageData.years} ${ageData.years === 1 ? "year" : "years"} old`;
  
  let extraText = `That's ${ageData.years} years, ${ageData.months} months, and ${ageData.days} days.\n`;
  
  if (ageData.months === 0 && ageData.days === 0) {
      extraText += "🎉 Happy Birthday! 🎂\n";
  } else {
      extraText += `Your next birthday is in ${nextBirthdayData.months} months and ${nextBirthdayData.days} days.`;
  }
  
  extraInfo.innerText = extraText;
}

function getAge(birthDate, currDate){
  let years = currDate.getFullYear() - birthDate.getFullYear();
  let months = currDate.getMonth() - birthDate.getMonth();
  let days = currDate.getDate() - birthDate.getDate();

  if(days < 0){
    months--;
    const prevMonthDir = new Date(currDate.getFullYear(), currDate.getMonth(), 0);
    days += prevMonthDir.getDate();
  }

  if(months < 0){
    years--;
    months += 12;
  }

  return { years, months, days };
}

function getNextBirthday(birthDate, currDate) {
    let nextBday = new Date(currDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    
    // If the birthday has already passed this year, the next birthday is next year
    // Consider dates equal in month independently, check the complete time condition
    // Simply check if current Date (stripped of time) is strictly > nextBday
    const todayStr = currDate.toISOString().split('T')[0];
    const bdayStr = nextBday.toISOString().split('T')[0];
    
    if (todayStr > bdayStr) {
        nextBday.setFullYear(currDate.getFullYear() + 1);
    }

    let months = nextBday.getMonth() - currDate.getMonth();
    let days = nextBday.getDate() - currDate.getDate();

    if(days < 0){
        months--;
        const prevMonthDir = new Date(nextBday.getFullYear(), nextBday.getMonth(), 0);
        days += prevMonthDir.getDate();
    }

    if(months < 0){
        months += 12;
    }

    return { months, days };
}

calcAge.addEventListener("click", calAge);
