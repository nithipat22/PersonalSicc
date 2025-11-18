const userModels = require("../models/users");

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
};

async function checkLogin(username, password) {
  if (!username || !password) {
    return { status: 400, message: "กรุณากรอกข้อมูลให้ครบ" };
  }

  const user = await userModels.checkAuthLogin({ username, password });

  if (!user) {
    return { status: 401, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" };
  }

  return { status: 200, message: "เข้าสู่ระบบสำเร็จ", user: sanitizeUser(user) };
}

async function registerUser({ username, password, fullname, email, role }) {
  if (!username || !password || !fullname || !email) {
    return { status: 400, message: "กรุณากรอกข้อมูลให้ครบ" };
  }

  const exists = await userModels.findByColumn("username", username);
  if (exists) {
    return { status: 409, message: "ชื่อผู้ใช้มีอยู่แล้ว" };
  }

  const user = await userModels.create({ username, password, fullname, email, role });
  return { status: 201, message: "สมัครสมาชิกสำเร็จ", user: sanitizeUser(user) };
}

async function resetPassword(username, password, newpassword) {
  if (!username || !password || !newpassword) {
    return { status: 400, message: "กรุณากรอกข้อมูลให้ครบ" };
  }

  const user = await userModels.checkAuthLogin({ username, password });

  if (!user) {
    return { status: 401, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" };
  }

  await userModels.update(user.user_id, { password: newpassword });

  return {
    status: 200,
    message: "เปลี่ยนรหัสผ่านสำเร็จ",
  };
}

async function deleteUser(username, password) {
  if (!username || !password) {
    return { status: 400, message: "กรุณากรอกข้อมูลให้ครบ" };
  }

  const user = await userModels.findByColumn("username", username);

  if (!user) {
    return { status: 404, message: "ไม่พบข้อมูลผู้ใช้" };
  }

  if (user.password !== password) {
    return { status: 401, message: "รหัสผ่านไม่ถูกต้อง" };
  }

  const deleted = await userModels.deleteById(user.user_id);

  if (!deleted) {
    return { status: 500, message: "ไม่สามารถลบผู้ใช้ได้" };
  }

  return {
    status: 200,
    message: "ลบผู้ใช้สำเร็จ",
    user: sanitizeUser(user),
  };
}

async function getAllUsers() {
  const users = await userModels.findAll();
  return { status: 200, users: users.map(sanitizeUser) };
}

async function getUser(username) {
  if (!username) {
    return { status: 400, message: "กรุณาระบุชื่อผู้ใช้" };
  }

  const user = await userModels.findByColumn("username", username);

  if (!user) {
    return { status: 404, message: "ไม่พบข้อมูลผู้ใช้" };
  }

  return { status: 200, user: sanitizeUser(user) };
}

async function updateUser(id, data = {}) {
  if (!id) {
    return { status: 400, message: "กรุณาระบุผู้ใช้" };
  }

  const allowed = {};
  ["username", "password", "fullname", "email", "role"].forEach((field) => {
    if (typeof data[field] !== "undefined") {
      allowed[field] = data[field];
    }
  });

  if (!Object.keys(allowed).length) {
    return { status: 400, message: "ไม่มีข้อมูลสำหรับอัปเดต" };
  }

  const updatedUser = await userModels.update(id, allowed);

  if (!updatedUser) {
    return { status: 404, message: "ไม่พบข้อมูลผู้ใช้" };
  }

  return { status: 200, message: "อัปเดตผู้ใช้สำเร็จ", user: sanitizeUser(updatedUser) };
}

module.exports = {
  checkLogin,
  registerUser,
  resetPassword,
  deleteUser,
  getUser,
  getAllUsers,
  updateUser,
};
