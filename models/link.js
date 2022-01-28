class link {
    constructor(newName, newLink) {
        this._name = newName;
        this._link = newLink;
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
    get link() {
        return this._link;
    }
    set link(newLink) {
        this._link = newLink;
    }
}

module.exports = link;