// Handle user login
exports.login = async (req, res) => {
    try {
        const { email, password: passwordFromBody } = req.body; // Renamed for clarity
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).send({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(passwordFromBody, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Incorrect password' });
        }

        const token = generateToken(user._id);
        // Convert to object and remove the password before sending back
        const userObj = user.toObject();
        delete userObj.password;

        res.send({ user: userObj, token });
    } catch (error) {
        res.status(400).send({ message: 'Login failed', error: error.message });
    }
};
