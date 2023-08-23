import Address from "./adress";

export default class Customer {
    
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get rewardPoints() {
        return this._rewardPoints;
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }
        if (this._name.length === 0) {
            throw new Error('Name is required');
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    isActive() {
        return this._active;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error('Adrress is mandatory to activate customer');
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    Address() {
        return this.Address.toString();
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    setAddress(address: Address) {
        this._address = address;
    }
}