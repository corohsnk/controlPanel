"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
const bcrypt = require("../../services/bcrypt");
async function findByEmail(email) {
    return await User_1.User.findOne({ email: email });
}
exports.findByEmail = findByEmail;
async function findById(id) {
    return await User_1.User.findById(id);
}
exports.findById = findById;
async function list(filter) {
    return await User_1.User.find(filter);
}
exports.list = list;
async function saveUser(user) {
    const newUser = new User_1.User(user);
    return await newUser.save();
}
exports.saveUser = saveUser;
async function deleteUser(id) {
    return await User_1.User.findByIdAndRemove(id);
}
exports.deleteUser = deleteUser;
async function updateUser(user) {
    return await User_1.User.findOne({ _id: user._id }, async (err, doc) => {
        return await Object.assign(doc, user).save();
    });
}
exports.updateUser = updateUser;
async function changePassword(user) {
    return await User_1.User.findOne({ email: user.email }, async (err, doc) => {
        doc.password = await bcrypt.hash(user.newPassword);
        doc.save();
    });
}
exports.changePassword = changePassword;
async function lastInserts() {
    return await User_1.User.find({}, 'name').sort('-createdAt').limit(5);
}
exports.lastInserts = lastInserts;
async function selectCount() {
    return await User_1.User.count({});
}
exports.selectCount = selectCount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9hZG1pbi9yZXBvc2l0b3JpZXMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUF5QztBQUV6QyxnREFBZ0Q7QUFFekMsS0FBSyxzQkFBc0IsS0FBYTtJQUMzQyxNQUFNLENBQUMsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUZELGtDQUVDO0FBRU0sS0FBSyxtQkFBbUIsRUFBVTtJQUNyQyxNQUFNLENBQUMsTUFBTSxXQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFGRCw0QkFFQztBQUVNLEtBQUssZUFBZSxNQUFXO0lBQ25DLE1BQU0sQ0FBQyxNQUFNLFdBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUZELG9CQUVDO0FBRU0sS0FBSyxtQkFBbUIsSUFBVztJQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDaEMsQ0FBQztBQUhELDRCQUdDO0FBRU0sS0FBSyxxQkFBcUIsRUFBVTtJQUN2QyxNQUFNLENBQUMsTUFBTSxXQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUZELGdDQUVDO0FBRU0sS0FBSyxxQkFBcUIsSUFBVztJQUN6QyxNQUFNLENBQUMsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3pELE1BQU0sQ0FBQyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQUpELGdDQUlDO0FBRU0sS0FBSyx5QkFBeUIsSUFBUztJQUMxQyxNQUFNLENBQUMsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzlELEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFMRCx3Q0FLQztBQUVNLEtBQUs7SUFDUixNQUFNLENBQUMsTUFBTSxXQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFGRCxrQ0FFQztBQUVNLEtBQUs7SUFDUixNQUFNLENBQUMsTUFBTSxXQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFGRCxrQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvVXNlcic7XG5pbXBvcnQgeyBJVXNlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVVzZXInO1xuaW1wb3J0ICogYXMgYmNyeXB0IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JjcnlwdCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kQnlFbWFpbChlbWFpbDogc3RyaW5nKSA6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIGF3YWl0IFVzZXIuZmluZE9uZSh7ZW1haWw6IGVtYWlsfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kQnlJZChpZDogbnVtYmVyKSA6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIGF3YWl0IFVzZXIuZmluZEJ5SWQoaWQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGlzdChmaWx0ZXI6IGFueSkgOiBQcm9taXNlPElVc2VyW10+IHsgICBcbiAgIHJldHVybiBhd2FpdCBVc2VyLmZpbmQoZmlsdGVyKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVVc2VyKHVzZXI6IElVc2VyKSA6IFByb21pc2U8SVVzZXI+IHsgICAgXG4gICAgY29uc3QgbmV3VXNlciA9IG5ldyBVc2VyKHVzZXIpOyAgICBcbiAgICByZXR1cm4gYXdhaXQgbmV3VXNlci5zYXZlKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVVc2VyKGlkOiBzdHJpbmcpIDogUHJvbWlzZTxhbnk+IHsgXG4gICAgcmV0dXJuIGF3YWl0IFVzZXIuZmluZEJ5SWRBbmRSZW1vdmUoaWQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlcih1c2VyOiBJVXNlcikgOiBQcm9taXNlPGFueT4geyAgIFxuICAgcmV0dXJuIGF3YWl0IFVzZXIuZmluZE9uZSh7X2lkOnVzZXIuX2lkfSwgYXN5bmMgKGVyciwgZG9jKSA9PiB7ICAgICAgICBcbiAgICAgICByZXR1cm4gYXdhaXQgT2JqZWN0LmFzc2lnbihkb2MsIHVzZXIpLnNhdmUoKTtcbiAgICB9KVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hhbmdlUGFzc3dvcmQodXNlcjogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gYXdhaXQgVXNlci5maW5kT25lKHtlbWFpbDogdXNlci5lbWFpbH0sIGFzeW5jIChlcnIsIGRvYykgPT4ge1xuICAgICAgICBkb2MucGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaCh1c2VyLm5ld1Bhc3N3b3JkKTtcbiAgICAgICAgZG9jLnNhdmUoKTtcbiAgICB9KVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGFzdEluc2VydHMoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gYXdhaXQgVXNlci5maW5kKHt9LCAnbmFtZScpLnNvcnQoJy1jcmVhdGVkQXQnKS5saW1pdCg1KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdENvdW50KCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIGF3YWl0IFVzZXIuY291bnQoe30pO1xufSJdfQ==