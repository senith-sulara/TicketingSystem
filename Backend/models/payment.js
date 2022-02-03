class Payment {

  constructor(id, fromTo, whereTo, expireDate, name, amount, cardNumber, cvv) {
    this.id = id;
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expireDate = expireDate;
    this.fromTo = fromTo;
    this.whereTo = whereTo;
    this.name = name;
    this.amount = amount;
  }
}

module.exports = Payment;
