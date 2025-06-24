import { json } from "body-parser";
import db from "../models/index";
import CRUDServices from "../services/CRUDServices";
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();  //User viet hoa dung voi trong file user.js
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}
let getAboutPage = (req, res) => {
    return res.render('Test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDServices.createNewUser(req.body);
    console.log(message);
    res.send(`post crud from server`);
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUsers();
    return res.render('display-crud.ejs', {
        dataTable: data
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDServices.getUserInFoById(userId);

        return res.render('edit-crud.ejs', {
            user: userData
        });
    } else {
        return res.send('Users not found');
    }
}

let PutCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDServices.updateUserData(data);
    return res.render('display-crud.ejs', {
        dataTable: allUsers
    });
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDServices.deleteUserById(id);
        return res.send('Delete user success');
    } else {
        return res.send('User not found');
    }

}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    PutCRUD: PutCRUD,
    deleteCRUD: deleteCRUD,
}