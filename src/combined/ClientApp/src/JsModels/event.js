"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventModel = /** @class */ (function () {
    function EventModel(date, location, description, mainImage, title, donationTarget, id) {
        this.date = date !== null && date !== void 0 ? date : new Date();
        this.title = title !== null && title !== void 0 ? title : "";
        this.location = location !== null && location !== void 0 ? location : "";
        this.description = description !== null && description !== void 0 ? description : "";
        this.mainImage = mainImage !== null && mainImage !== void 0 ? mainImage : "";
        this.title = title !== null && title !== void 0 ? title : '';
        this.donationTarget = donationTarget !== null && donationTarget !== void 0 ? donationTarget : 0;
        this.id = id !== null && id !== void 0 ? id : -1;
    }
    return EventModel;
}());
exports.default = EventModel;
//# sourceMappingURL=event.js.map