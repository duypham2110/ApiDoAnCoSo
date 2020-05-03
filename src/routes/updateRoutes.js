const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const ThongTinCaNhan = mongoose.model('ThongTinCaNhan');

const router = express.Router();


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