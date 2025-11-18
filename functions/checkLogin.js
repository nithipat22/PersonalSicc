const userModels = require("../models/users");

// จำลองฐานข้อมูลในหน่วยความจำ
let users = [
    { username: 'admin', password: '1234' },
];

// ฟังก์ชันเช็คล็อกอิน
async function checkLogin(username, password) {
    if (!username || !password) {
        return { status: 400, message: "กรุณากรอกข้อมูลให้ครบ" };
    }

    const user = await userModels.checkAuthLogin({ username, password });

    if (!user) {
        return { status: 401, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" };
    }

    return { status: 200, message: "เข้าสู่ระบบสำเร็จ" };
}

// ฟังก์ชันสมัครสมาชิก
async function registerUser(username, password) {
    if (!username || !password) {
        return { status: false, message: "กรุณากรอกข้อมูลให้ครบ" };
    }

    const exists = await userModels.findByColumn("username", username);
    if (exists) {
        return { status: false, message: "ชื่อผู้ใช้มีอยู่แล้ว" };
    }

    users.push({ username, password });
    return { status: true, message: "สมัครสมาชิกสำเร็จ" };
}

// ฟังก์ชันรีเซ็ตรหัสผ่าน
function resetPassword(username, password, newpassword) {
    if (!username || !password || !newpassword) {
        return { status: 400, message: "กรุณากรอกข้อมูลให้ครบ" };
    }

    const user = users.find(u => u.username === username);

    if (!user) {
        return { status: 404, message: "ไม่พบข้อมูลผู้ใช้" };
    }

    if (user.password !== password) {
        return { status: 401, message: "รหัสผ่านเดิมไม่ถูกต้อง" };
    }

    user.password = newpassword;

    return {
        status: 200,
        message: "เปลี่ยนรหัสผ่านสำเร็จ"
    };
}

// ฟังก์ชันลบผู้ใช้
function deleteUser(username, password) {
    if (!username || !password) {
        return { status: 400, message: "กรุณากรอกข้อมูลให้ครบ" };
    }

    const index = users.findIndex(u => u.username === username && u.password === password);

    if (index === -1) {
        return { status: 404, message: "ไม่พบข้อมูลผู้ใช้" };
    }

    users.splice(index, 1);

    return {
        status: 200,
        message: "ลบผู้ใช้สำเร็จ"
    };
}
// ฟังก์ชันดึงผู้ใช้ทั้งหมด
function getAllUsers() {
    return { status: 200, users };
}

// ฟังก์ชันดึงผู้ใช้ทีละคน
function getUser(username) {
    const user = users.find(u => u.username === username);

    if (!user) {
        return { status: 404, message: "ไม่พบข้อมูลผู้ใช้" };
    }

    return { status: 200, user };
}

module.exports = {
    checkLogin,
    registerUser,
    resetPassword,
    deleteUser,
    getUser,
    getAllUsers,
};
