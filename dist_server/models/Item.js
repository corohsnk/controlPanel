"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    user: { name: { type: String, required: true },
        _id: { type: String, required: true }
    },
    status: { type: String, required: true },
    createdAt: Date
});
itemSchema.pre("save", async function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});
exports.Item = mongoose_1.model('Item', itemSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9tb2RlbHMvSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVDQUFtRDtBQUduRCxNQUFNLFVBQVUsR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDMUIsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO0lBQ3BDLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztRQUNyQyxHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7S0FDcEM7SUFDTCxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7SUFDdEMsU0FBUyxFQUFFLElBQUk7Q0FDbEIsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxXQUFVLElBQUk7SUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNELElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUM7QUFFVSxRQUFBLElBQUksR0FBRyxnQkFBSyxDQUFhLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElJdGVtIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9JSXRlbSc7XG5pbXBvcnQgeyBEb2N1bWVudCwgU2NoZW1hLCBtb2RlbCB9IGZyb20gJ21vbmdvb3NlJztcbmludGVyZmFjZSBJSXRlbU1vZGVsIGV4dGVuZHMgSUl0ZW0sIERvY3VtZW50IHt9XG5cbmNvbnN0IGl0ZW1TY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgICBuYW1lOiB7dHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZX0sXG4gICAgdXNlcjoge25hbWU6IHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcbiAgICAgICAgICBfaWQ6IHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlfVxuICAgICAgICB9LFxuICAgIHN0YXR1czoge3R5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWV9LFxuICAgIGNyZWF0ZWRBdDogRGF0ZVxufSk7XG5pdGVtU2NoZW1hLnByZShcInNhdmVcIiwgYXN5bmMgZnVuY3Rpb24obmV4dCkge1xuICAgIGlmICghdGhpcy5jcmVhdGVkQXQpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVkQXQgPSBuZXcgRGF0ZSgpOyAgICAgICAgXG4gICAgfSAgICAgIFxuICAgIG5leHQoKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgSXRlbSA9IG1vZGVsPElJdGVtTW9kZWw+KCdJdGVtJywgaXRlbVNjaGVtYSk7XG4iXX0=