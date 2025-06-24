import bcrypt from "bcryptjs";
import db from "../models/index";
import { raw } from "body-parser";
import { where } from "sequelize";

const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === `1` ? true : false,
                roleId: data.roleId,

            })
            resolve('Sign in Successful');
        } catch (error) {
            reject(error);
        }
    });
    // console.log(`Data from services `);
    // console.log(data);
    // console.log(hashPasswordFromBcrypt);
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
}
let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (error) {
            reject(error);
        }
    })
}
let getUserInFoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    })
}
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    hashUserPassword: hashUserPassword,
    getAllUsers: getAllUsers,
    getUserInFoById: getUserInFoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}