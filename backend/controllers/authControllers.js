const adminModel = require('../models/adminModel');
const sellerModel = require('../models/sellerModel');
const sellerCustomerModel = require('../models/chat/sellerCustomerModel');
const { responseReturn } = require('../utilities/response');
const bcrpty = require('bcrypt');
const { createToken } = require('../utilities/tokenCreate');

class authControllers {
    admin_login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const admin = await adminModel.findOne({ email }).select('+password');
            
            if (admin) {
                const isMatch = await bcrpty.compare(password, admin.password);
                if (isMatch) {
                    const token = await createToken({
                        id: admin._id,
                        role: admin.role
                    });
                    res.cookie('accessToken', token, {
                        expires : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    });
                    responseReturn(res, 200, {token, message: 'Login successful'});
                }
                else {
                    
                    responseReturn(res, 404, {error: 'Invalid password'});
                
                }
            }
            else {
                console.log('Email not found');
                responseReturn(res, 404, {error: 'Email not found'});

            }
        }
        catch (err) {
            responseReturn(res, 500, {error: err.message});
            //res.status(500).json({ error: 'Server error' });
        }
    }
    // End of admin_login
    seller_login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const seller = await sellerModel.findOne({ email }).select('+password');
            
            if (seller) {
                const isMatch = await bcrpty.compare(password, seller.password);
                if (isMatch) {
                    const token = await createToken({
                        id: seller.id,
                        role: seller.role
                    });
                    res.cookie('accessToken', token, {
                        expires : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    });
                    responseReturn(res, 200, {token, message: 'Login successful'});
                }
                else {
                    responseReturn(res, 401, {error: 'Invalid password'});
                }
            }
            else {
                responseReturn(res, 404, {error: 'Email not found'});

            }
        }
        catch (err) {
            responseReturn(res, 500, {error: err.message});
            //res.status(500).json({ error: 'Server error' });
        }
    }
    // End of seller_login

    seller_register = async (req, res) => {
        const { email, name, password } = req.body;
        try {
            const getUser = await sellerModel.findOne({email});
            if (getUser) {
                responseReturn(res, 404, {error: 'Email already exists'});
            }
            else {
                const seller = await sellerModel.create({
                    name,
                    email,
                    password: await bcrpty.hash(password, 10),
                    method: 'menualy',
                    shopInfo: {}
                });
                console.log(seller)
                await sellerCustomerModel.create({
                    myId: seller.id
                });

                const token = await createToken({
                    id: seller.id, role: seller.role
                });
                res.cookie('accessToken', token, {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                });

                responseReturn(res, 201, {message: 'Register Successfull'});
            }
        } catch (err) {
            responseReturn(res, 500, {error: 'Internal server error'});
        }
 
    } // End of seller_register 

    getUser = async (req, res) => {
        console.log('coucou from server')
        const { role, id } = req;

        try {
            if (role === 'admin') {
                const user = await adminModel.findById(id)
                responseReturn(res, 200, {user : user });
            }
            else {
                const seller = await sellerModel.findById(id)
                responseReturn(res, 200, {user : seller });
                
            }
        } catch (err) {
            responseReturn(res, 500, {error: 'Internal server error'});
        }

    } // End of getUser
}
module.exports = new authControllers()
