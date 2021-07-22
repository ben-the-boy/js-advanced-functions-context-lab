/* Your Code Here */
function createEmployeeRecord(employeeData) {
  let employee = {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  };

  return employee;
}

function createEmployeeRecords(data) {
  return data.map(function(employeeData) {
    return createEmployeeRecord(employeeData);
  })
}

function createTimeInEvent(dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  this.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour),
    date: date
  })

  return this
}

function createTimeOutEvent(dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  this.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour),
    date: date
  })

  return this
}

function hoursWorkedOnDate(date) {
  let timeIn = this.timeInEvents.find(e => e.date === date);

  let timeOut = this.timeOutEvents.find(e => e.date === date);

  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
  let hours = hoursWorkedOnDate.call(this, date);

  return this.payPerHour * hours;
}

function findEmployeeByFirstName(records, name) {
  return records.find(employee => employee.firstName === name);
}

function calculatePayroll(records) {
  return records.reduce(function(memo, record) {
    return memo + allWagesFor.call(record);
  }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
