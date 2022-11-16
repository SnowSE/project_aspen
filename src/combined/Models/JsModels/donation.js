"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Donation = /** @class */ (function () {
    function Donation(eventID, date, amount, teamID, personID) {
        this.eventID = eventID;
        this.teamID = teamID;
        this.personID = personID !== null && personID !== void 0 ? personID : undefined;
        this.date = date;
        this.amount = amount;
        this.isPledge = false;
        this.id = undefined;
    }
    return Donation;
}());
exports.default = Donation;
//# sourceMappingURL=donation.js.map