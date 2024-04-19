/* grabbing today's date soley for the purpose of using it as an argument
in the date parameter */
const zdate = new Date();

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
  let businessDays = 0;
  //used to increment the TAT to compensate for weekends
  let tatCount = 0;
  //The number for each day of the week 0 = Sunday, 6 = Saturday
  let currentDay = 0;

  //changes TAT in business days based on the argument given
  switch (caseType) {
    case "modelless": businessDays = 7;
      break;
    case "traditional": businessDays = 10;
      break;
    case "complex": businessDays = 18;
  }

   /* increments through each day and adds more days to account for
   weekends */
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
  }
  if (deliveryDate.getDay() == 0) {
   deliveryDate = new Date(date.setDate(date.getDate() + 1 ));
  }

  return `The package will arrive in ${tatCount + businessDays} days, on ${deliveryDate.toDateString()}.`;
}

setDeliveryDate(zdate, "complex");
console.log(setDeliveryDate(zdate, "complex"));
