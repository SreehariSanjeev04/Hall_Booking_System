const User = require('../database/Schema/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.createUser = async(req, res) => {
    try {
        const {username, password, rollNumber} = req.body;
        if(!username || !password || !rollNumber) {
            return res.status(400).json({
                success: false,
                message: 'All fields must be provided'});
        } else {
            const userExists = await User.findOne({rollNo : rollNumber});
            if(userExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Roll Number already exists'});
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new User({
                    username: username,
                    password: hashedPassword,
                    rollNo: rollNumber
                });
                await user.save();
                res.status(201).json({
                    success: true,
                    message: "User successfully created.",
                });
            }
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message});
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password, rollNumber } = req.body;
        if (!username || !password || !rollNumber) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields must be provided' });
        }

        const user = await User.findOne({ rollNo: rollNumber });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        jwt.sign({ id: user._id, rollNumber: user.rollNo, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                token: token,
                user: {
                    id: user._id,
                    username: user.username,
                    rollNo: user.rollNo,
                }
            });
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: err.message });
    }
};

exports.checkValidUser = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Kindly Login.' });
        } else {
            return res.status(200).json({ success: true, message: 'Token is valid.' });
        }
    });
}