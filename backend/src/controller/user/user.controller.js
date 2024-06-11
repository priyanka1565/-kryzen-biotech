const User = require("../../model/user.model");
const { validateIndianMobileNumber, validateEmail } = require("../../helper/helper");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const signUpUser = [
    async (req, res) => {
        try {
            const request = req?.body;
            let user_name = null;
            let user_mobile = null;
            let user_email = null;
            let user_password = null;
            let user_code = null;
            if (Object.keys(request).length > 0) {
                user_name = request?.user_name;
                user_mobile = request?.user_mobile;
                user_email = request?.user_email;
                user_password = request?.user_password;
                user_code = request?.user_code;
                // validate mobile and email 
                if (user_mobile !== null) {
                    if (!validateIndianMobileNumber(user_mobile)) return res.json({ status: "failed", message: "Invalid mobile number", data: [] })
                }
                if (user_email !== null) {
                    if (!validateEmail(user_email)) return res.json({ status: "failed", message: "Invalid email address", data: [] })
                }
                let payload = {
                    user_name,
                    user_email,
                    user_code,
                    user_mobile,
                    user_password
                }
                if (Object.keys(payload).length > 0) {
                    const add_user = await User.create(payload);
                    if (add_user) {
                        return res.json({ status: "success", message: "User signup successfully", data: [] })
                    }
                    else {
                        return res.json({ status: "failed", message: "Unable to signup user", data: [] })
                    }
                }
            }
        }
        catch (err) {
            return res.json({ status: "failed", message: "Unable to signup user", data: [] })
        }
    }
];

const loginUser = [
    async (req, res) => {
        try {
            const request = req?.body;
            let user_password = null;
            let user_code = null;
            if (Object.keys(request).length > 0) {
                user_password = request?.user_password;
                user_code = request?.user_code;
                // find data in db with user code and user password 
                let db_data = await User.find({ user_code: user_code, user_password: user_password });
                if (db_data && db_data.length > 0) {
                    // generate token with the help user code 
                    const jwt_payload = { db_data };
                    const secrete = process.env.JWT_SECRETE;
                    const jwt_expired = {
                        expiresIn: process.env.JWT_EXPIRED
                    }
                    const token = jwt.sign(jwt_payload, secrete, jwt_expired);
                    return res.json({ status: "sucess", message: "User login successfully", data: token });
                }
                else {
                    return res.json({ status: "failed", message: "User not found please signup", data: [] })
                }
            }
        }
        catch (err) {
            return res.json({ status: "failed", message: "Unable to login user", data: [] })
        }
    }
]

module.exports = {
    signUpUser,
    loginUser
}