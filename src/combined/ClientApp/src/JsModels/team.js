"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Team = /** @class */ (function () {
    function Team(name, description, mainImage, owenerId, eventId, id, donationTarget, isPublic) {
        this.id = id !== null && id !== void 0 ? id : -1;
        this.name = name;
        this.description = description;
        this.mainImage = mainImage;
        this.ownerID = owenerId;
        this.eventID = eventId;
        this.donationTarget = donationTarget;
        this.isPublic = isPublic;
    }
    return Team;
}());
exports.default = Team;
//# sourceMappingURL=team.js.map