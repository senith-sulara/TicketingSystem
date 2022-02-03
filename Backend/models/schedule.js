class Schedule {
  constructor(id, busNumber, driver, depature, destination, time) {
    this.id = id;
    this.busNumber = busNumber;
    this.driver = driver;
    this.depature = depature;
    this.destination = destination;
    this.time = time;
  }
}

module.exports = Schedule;
