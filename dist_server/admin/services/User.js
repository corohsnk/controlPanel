"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository = require("../repositories/User");
const Utils = require("../../utils/utils");
const bcrypt = require("../../services/bcrypt");
const service_1 = require("../../errors/service");
const mongoose = require("mongoose");
const user_1 = require("../validators/user");
const token = require("../middlewares/auth-service");
async function list(filter) {
    try {
        filter = JSON.parse(filter);
    }
    catch (e) {
        throw new service_1.ServiceError('parameter-not-expected');
    }
    if (!filter.name) {
        delete filter.name;
    }
    if (!filter.role) {
        delete filter.role;
    }
    if (!filter.createdAt) {
        delete filter.createdAt;
    }
    return await UserRepository.list(await Utils.addLike(filter));
}
exports.list = list;
async function findByEmail(email) {
    return await UserRepository.findByEmail(email);
}
exports.findByEmail = findByEmail;
async function findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id))
        throw new service_1.ServiceError('invalid-object-id');
    return await UserRepository.findById(id);
}
exports.findById = findById;
async function saveUser(user) {
    await user_1.validate(user);
    const alreadyExists = await UserRepository.findByEmail(user.email);
    if (alreadyExists)
        throw new service_1.ServiceError('user-already-created');
    return await UserRepository.saveUser(user);
}
exports.saveUser = saveUser;
async function deleteUser(id) {
    if (!mongoose.Types.ObjectId.isValid(id))
        throw new service_1.ServiceError('invalid-object-id');
    return await UserRepository.deleteUser(id);
}
exports.deleteUser = deleteUser;
async function updateUser(user) {
    await user_1.validate(user);
    const alreadyExists = await UserRepository.findById(user._id);
    if (!alreadyExists)
        throw new service_1.ServiceError('user-not-found');
    return await UserRepository.updateUser(user);
}
exports.updateUser = updateUser;
async function changePassword(data) {
    if (!data.email || !data.password || !data.newPassword)
        throw new service_1.ServiceError('object-invalid');
    const user = await findByEmail(data.email);
    await bcrypt.compare(user.password, data.password);
    await UserRepository.changePassword(data);
    user.password = await bcrypt.hash(data.newPassword);
    return await token.generateToken(user);
}
exports.changePassword = changePassword;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9hZG1pbi9zZXJ2aWNlcy9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXVEO0FBRXZELDJDQUEyQztBQUMzQyxnREFBZ0Q7QUFDaEQsa0RBQW9EO0FBQ3BELHFDQUFxQztBQUNyQyw2Q0FBOEM7QUFDOUMscURBQXFEO0FBRTlDLEtBQUssZUFBZSxNQUFXO0lBQ2xDLElBQUksQ0FBQztRQUNELE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsTUFBTSxJQUFJLHNCQUFZLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsRUFBRSxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNkLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsRUFBRSxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNkLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsRUFBRSxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNuQixPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDNUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUUsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQXBCRCxvQkFvQkM7QUFDTSxLQUFLLHNCQUFzQixLQUFhO0lBQzNDLE1BQU0sQ0FBQyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUZELGtDQUVDO0FBQ00sS0FBSyxtQkFBbUIsRUFBVTtJQUNyQyxFQUFFLENBQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUFDLE1BQU0sSUFBSSxzQkFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFckYsTUFBTSxDQUFDLE1BQU0sY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBSkQsNEJBSUM7QUFFTSxLQUFLLG1CQUFtQixJQUFXO0lBQ3RDLE1BQU0sZUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXJCLE1BQU0sYUFBYSxHQUFHLE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFbkUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQUMsTUFBTSxJQUFJLHNCQUFZLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUVsRSxNQUFNLENBQUMsTUFBTSxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFSRCw0QkFRQztBQUVNLEtBQUsscUJBQXFCLEVBQVU7SUFDdkMsRUFBRSxDQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFBQyxNQUFNLElBQUksc0JBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRXJGLE1BQU0sQ0FBQyxNQUFNLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDL0MsQ0FBQztBQUpELGdDQUlDO0FBRU0sS0FBSyxxQkFBcUIsSUFBVztJQUN4QyxNQUFNLGVBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVyQixNQUFNLGFBQWEsR0FBRyxNQUFNLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTlELEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQUMsTUFBTSxJQUFJLHNCQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUU3RCxNQUFNLENBQUMsTUFBTSxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFSRCxnQ0FRQztBQUVNLEtBQUsseUJBQXlCLElBQVM7SUFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFBQyxNQUFNLElBQUksc0JBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRWpHLE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUzQyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFbkQsTUFBTSxjQUFjLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVwRCxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFaRCx3Q0FZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFVzZXJSZXBvc2l0b3J5IGZyb20gJy4uL3JlcG9zaXRvcmllcy9Vc2VyJztcbmltcG9ydCB7IElVc2VyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JVXNlcic7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5pbXBvcnQgKiBhcyBiY3J5cHQgZnJvbSAnLi4vLi4vc2VydmljZXMvYmNyeXB0JztcbmltcG9ydCB7IFNlcnZpY2VFcnJvciB9IGZyb20gJy4uLy4uL2Vycm9ycy9zZXJ2aWNlJztcbmltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IHZhbGlkYXRlIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy91c2VyJztcbmltcG9ydCAqIGFzIHRva2VuIGZyb20gJy4uL21pZGRsZXdhcmVzL2F1dGgtc2VydmljZSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsaXN0KGZpbHRlcjogYW55KSB7IFxuICAgIHRyeSB7XG4gICAgICAgIGZpbHRlciA9IEpTT04ucGFyc2UoZmlsdGVyKTsgXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgU2VydmljZUVycm9yKCdwYXJhbWV0ZXItbm90LWV4cGVjdGVkJyk7IFxuICAgIH0gIFxuICAgIFxuICAgIGlmKCFmaWx0ZXIubmFtZSkge1xuICAgICAgICBkZWxldGUgZmlsdGVyLm5hbWU7XG4gICAgfVxuXG4gICAgaWYoIWZpbHRlci5yb2xlKSB7XG4gICAgICAgIGRlbGV0ZSBmaWx0ZXIucm9sZTtcbiAgICB9XG5cbiAgICBpZighZmlsdGVyLmNyZWF0ZWRBdCkge1xuICAgICAgICBkZWxldGUgZmlsdGVyLmNyZWF0ZWRBdDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXdhaXQgVXNlclJlcG9zaXRvcnkubGlzdCggYXdhaXQgVXRpbHMuYWRkTGlrZShmaWx0ZXIpKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kQnlFbWFpbChlbWFpbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGF3YWl0IFVzZXJSZXBvc2l0b3J5LmZpbmRCeUVtYWlsKGVtYWlsKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kQnlJZChpZDogbnVtYmVyKSB7XG4gICAgaWYoIW1vbmdvb3NlLlR5cGVzLk9iamVjdElkLmlzVmFsaWQoaWQpKSB0aHJvdyBuZXcgU2VydmljZUVycm9yKCdpbnZhbGlkLW9iamVjdC1pZCcpOyAgXG5cbiAgICByZXR1cm4gYXdhaXQgVXNlclJlcG9zaXRvcnkuZmluZEJ5SWQoaWQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVVzZXIodXNlcjogSVVzZXIpIHtcbiAgICBhd2FpdCB2YWxpZGF0ZSh1c2VyKTtcblxuICAgIGNvbnN0IGFscmVhZHlFeGlzdHMgPSBhd2FpdCBVc2VyUmVwb3NpdG9yeS5maW5kQnlFbWFpbCh1c2VyLmVtYWlsKTtcblxuICAgIGlmIChhbHJlYWR5RXhpc3RzKSB0aHJvdyBuZXcgU2VydmljZUVycm9yKCd1c2VyLWFscmVhZHktY3JlYXRlZCcpO1xuICAgIFxuICAgIHJldHVybiBhd2FpdCBVc2VyUmVwb3NpdG9yeS5zYXZlVXNlcih1c2VyKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVVzZXIoaWQ6IHN0cmluZykge1xuICAgIGlmKCFtb25nb29zZS5UeXBlcy5PYmplY3RJZC5pc1ZhbGlkKGlkKSkgdGhyb3cgbmV3IFNlcnZpY2VFcnJvcignaW52YWxpZC1vYmplY3QtaWQnKTtcblxuICAgIHJldHVybiBhd2FpdCBVc2VyUmVwb3NpdG9yeS5kZWxldGVVc2VyKGlkKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVVzZXIodXNlcjogSVVzZXIpIHtcbiAgICBhd2FpdCB2YWxpZGF0ZSh1c2VyKTtcblxuICAgIGNvbnN0IGFscmVhZHlFeGlzdHMgPSBhd2FpdCBVc2VyUmVwb3NpdG9yeS5maW5kQnlJZCh1c2VyLl9pZCk7XG5cbiAgICBpZiAoIWFscmVhZHlFeGlzdHMpIHRocm93IG5ldyBTZXJ2aWNlRXJyb3IoJ3VzZXItbm90LWZvdW5kJyk7XG5cbiAgICByZXR1cm4gYXdhaXQgVXNlclJlcG9zaXRvcnkudXBkYXRlVXNlcih1c2VyKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoYW5nZVBhc3N3b3JkKGRhdGE6IGFueSkge1xuICAgIGlmICghZGF0YS5lbWFpbCB8fCAhZGF0YS5wYXNzd29yZCB8fCAhZGF0YS5uZXdQYXNzd29yZCkgdGhyb3cgbmV3IFNlcnZpY2VFcnJvcignb2JqZWN0LWludmFsaWQnKTtcbiAgICBcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgZmluZEJ5RW1haWwoZGF0YS5lbWFpbCk7XG5cbiAgICBhd2FpdCBiY3J5cHQuY29tcGFyZSh1c2VyLnBhc3N3b3JkLCBkYXRhLnBhc3N3b3JkKTtcblxuICAgIGF3YWl0IFVzZXJSZXBvc2l0b3J5LmNoYW5nZVBhc3N3b3JkKGRhdGEpO1xuICAgIFxuICAgIHVzZXIucGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChkYXRhLm5ld1Bhc3N3b3JkKTtcbiAgICBcbiAgICByZXR1cm4gYXdhaXQgdG9rZW4uZ2VuZXJhdGVUb2tlbih1c2VyKTtcbn0iXX0=