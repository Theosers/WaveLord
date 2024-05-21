const adminModel = require('../models/adminModel');
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
                    
                    responseReturn(res, 401, {error: 'Invalid password'});
                
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

    getUser = async (req, res) => {
        const { role, id } = req;

        try {
            if (role === 'admin') {
                const user = await adminModel.findById(id)
                responseReturn(res, 200, {userInfo : user });
            }
            else {
                console.log('Seller Info');
                
            }
        } catch (err) {
            console.log(err.message);
            responseReturn(res, 500, {error: err.message});
        }

    } // End of getUser
}
module.exports = new authControllers()