class User {
    constructor(id, eid, name, email, address, contact,
        password) {
            this.id= id;
            this.eid = eid;
            this.name = name;
            this.email = email;
            this.address = address;
            this.contact = contact;
            this.password = password;
    }
}

module.exports = User;