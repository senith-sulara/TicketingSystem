class ForeignPayment {
  constructor(cardNumber, cvv, expireDate, creditOrdebit) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expireDate = expireDate;
    this.creditOrdebit = creditOrdebit;
  }
}

module.exports = ForeignPayment;
