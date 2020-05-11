const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const SinhVien = mongoose.model('SinhVien');

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

router.get('/profile/:mssv', async (req, res) => {
    const mssv=req.params.mssv;
    console.log(mssv);
    const sinhvien = await SinhVien.findOne({mssv});
    console.log(sinhvien);
    return res.send(sinhvien);
})

router.post('/profile/:mssv', async (req, res) => {
    const mssv=req.params.mssv;
    const {hovaten, malop, tinhtranghoc,noisinh,ngaysinh,dantoc,gioitinh,sdt,email,cmnd,diachi } = req.body;
    try{
        const sinhvien = await SinhVien.findOne({mssv});
        console.log(sinhvien);
        sinhvien.hovaten=hovaten;
        sinhvien.malop=malop;
        sinhvien.tinhtranghoc=tinhtranghoc;
        sinhvien.noisinh=noisinh;
        sinhvien.ngaysinh=ngaysinh;
        sinhvien.dantoc=dantoc;
        sinhvien.gioitinh=gioitinh;
        sinhvien.sdt=sdt;
        sinhvien.email=email;
        sinhvien.cmnd=cmnd;
        sinhvien.diachi=diachi;

        await sinhvien.save();
        res.send({ notification: 'Success!' });
        return res.send(sinhvien);

    }
    catch(err){
        return res.status(422).send(err.message);
    }
})
module.exports = router;