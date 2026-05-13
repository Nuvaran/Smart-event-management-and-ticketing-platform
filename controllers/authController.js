const bcrypt = require('bcrypt'); 
const User = require('../models/Users');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.redirect('/login'); 

    } catch (error) {
        res.status(500).send("Error registering user: " + error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id;
            req.session.role = user.role;
            
            if (user.role === 'admin') {
                return res.redirect('/admin/dashboard');
            }
            return res.redirect('/'); 
        }
        res.status(401).send("Invalid email or password");
    } catch (err) {
        res.status(500).send("Login error");
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};