const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const user = new User({ email, password, role });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token, role });
    }
    catch (err) {
        return res.status(422).send(err.message);
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password!' })
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ error: 'Email not found' });
    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token, role: user.role });
    }
    catch (err) {
        return res.status(422).send({ error: 'Invalid password' });
    }
})


router.post('/resetpassword', async (req, res) => {
    const { email, oldpassword, newpassword } = req.body;

    if (!email || !oldpassword || !newpassword) {
        return res.status(422).send({ error: 'Must provide email, old-new password' })
    }

    if (newpassword === oldpassword)
        return res.status(422).send({ error: 'New password must be different from the old password!' })

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ error: 'Email not found' });
    }

    try {
        await user.comparePassword(oldpassword);
        user.password = newpassword;
        await user.save();
        res.send({ notification: 'Success!' });
    }
    catch (err) {
        return res.status(422).send({ error: 'Invalid old password' });
    }
})

module.exports = router;