const express = require('express');
const mongoose = require('mongoose');
const ThongBao = mongoose.model('ThongBao');
const requireAuth=require('../middlewares/requireAuth');

const router = express.Router();

router.post('/dangthongbao',requireAuth,  async (req, res) => {
    const { noidung } = req.body;

    if (req.user.role != 'AD')
        return res.status(422).send({ error: 'Invalid role!' });

    try {
        const thongbao = new ThongBao({noidung, nguoidang:req.user.email });
        await thongbao.save();
        res.send({ notification: 'Success!' });
        }
    catch (err) {
        return res.status(422).send(err.message);
    }
});

router.get('/xemthongbao',requireAuth,async (req,res)=>{
    const thongbao=await ThongBao.find();
    
    return res.send(thongbao);
})

module.exports = router;