const User = require('../database/Schema/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserValidation = require('../middleware/validation');
exports.createUser = async(req, res) => {
    try {
        const {username, password, rollNo} = req.body;
        if(!username || !password || !rollNo) {
            return res.status(400).json({message: 'All fields must be provided'});
        } else {
            const userExists = await User.findOne({username});
            if(userExists) {
                return res.status(400).json({message: 'Username already exists'});
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new User({
                    username,
                    password: hashedPassword,
                    rollNo
                });
                await user.save();
                jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
                    if(err) throw err;
                    return res.status(201).json({
                        message: "User successfully created.",
                        token: token
                    });
                });
            }
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password, rollNo } = req.body;

        if (!username || !password || !rollNo) {
            return res.status(400).json({ message: 'All fields must be provided' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;

            res.status(200).json({
                message: 'Login successful',
                token: token,
                user: {
                    id: user._id,
                    username: user.username,
                    rollNo: user.rollNo
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};