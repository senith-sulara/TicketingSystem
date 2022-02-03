class Token {
    constructor(id, amount, cardNumber, cvv, expireDate,
        status) {
            this.id = id;
            this.amount = amount;
            this.cardNumber = cardNumber;
            this.cvv = cvv;
            this.expireDate = expireDate;
            this.status = status;
    }
}

module.exports = Token;