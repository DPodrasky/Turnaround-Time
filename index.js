/* grabbing today's date soley for the purpose of using it as an argument
in the date parameter */
const zdate = new Date();


//sets a TAT is business days depending on the type of case
let setTatInBusinessDays = function (caseType) {
  let businessDays = 0;

  switch (caseType) {
    case "modelless": businessDays = 7;
      break;
    case "traditional": businessDays = 10;
      break;
    case "complex": businessDays = 18;
  }

  return businessDays;
}

/* if the delivery is estimated for a weekend, this function pushes it to Monday.
it begins by  adding days so that calculations are correct for business days
estimated TAT. */

let avoidWeekends = function (businessDays, nextDate, currentDay, tatCount, deliveryDate, date ) {

  for (let i = 0; i < businessDays; i++ ) {
    nextDate = new Date(date.setDate(date.getDate() + 1));
    currentDay = nextDate.getDay();

    if (currentDay == 6 || currentDay == 0) {
      tatCount++;
    }

  }

  /* provides final delivery date */
  deliveryDate = new Date(date.setDate(date.getDate() + tatCount));

  /* if delivery is calculated to land on a weekend, at this point,
  these if statements force the calculated delivery date to fall on Monday */
  if (deliveryDate.getDay() == 6) {
    deliveryDate = new Date(date.setDate(date.getDate() + 2 ));
    tatCount += 2;
  }
  if (deliveryDate.getDay() == 0) {
   deliveryDate = new Date(date.setDate(date.getDate() + 1 ));
    tatCount += 1;
  }
  return `The package will arrive in ${tatCount + businessDays} days, on ${deliveryDate.toDateString()}.`;
}


/* *** Main Function *** */
/* caseType would give a TAT of 7 - 18 business days depending on the type of
case. The string argument choices are "modelless", "traditional", "complex" */
function setDeliveryDate (today, caseType) {
  //setting today's date
  let date = new Date();
  //used to increment the date by 1
  let nextDate = 0;
  /*The delivery date based on our turnaround time in business days
  and taking into account weekends*/
  let deliveryDate = 0;
  //our TAT in business days
  let businessDays = setTatInBusinessDays(caseType);
  //used to increment the TAT to compensate for weekends
  let tatCount = 0;
  //The number for each day of the week 0 = Sunday, 6 = Saturday
  let currentDay = 0;


  return avoidWeekends(businessDays, nextDate, currentDay, tatCount, deliveryDate, date );
}


//zdate is a variable the inputs today's date automatically for this function
/* you can change the TAT in business days by choosing between 3 categories of
cases: "modelless", "traditional", and "complex" */
console.log(setDeliveryDate(zdate, "modelless"));
