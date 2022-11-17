"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventModel = /** @class */ (function () {
    function EventModel(date, title, location, description, mainImage, id) {
        this.title = title !== null && title !== void 0 ? title : "";
        this.date = date !== null && date !== void 0 ? date : new Date();
        this.location = location !== null && location !== void 0 ? location : "";
        this.description = description !== null && description !== void 0 ? description : "";
        this.mainImage = mainImage !== null && mainImage !== void 0 ? mainImage : "";
        this.id = id !== null && id !== void 0 ? id : -1;
    }
    return EventModel;
}());
exports.default = EventModel;
//# sourceMappingURL=eventModel.js.map