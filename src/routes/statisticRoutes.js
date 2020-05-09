const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const SinhVien = mongoose.model('SinhVien');

const router = express.Router();

router.get('/sinhvien', async (req, res) => {
    const sinhvien = await SinhVien.find();
    return res.send(sinhvien);
})

module.exports = router;