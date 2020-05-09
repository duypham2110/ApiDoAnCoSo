const express = require('express');
const mongoose = require('mongoose');
const ThongBao = mongoose.model('ThongBao');
const SinhVien = mongoose.model('SinhVien');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/notification', async (req, res) => {
    if (!req.body.id) {
        const { title,content } = req.body;
        if (req.user.role != 'AD')
            return res.status(422).send({ error: 'Invalid role!' });

        try {
            const thongbao = new ThongBao({title, content, author: req.user.email });
            await thongbao.save();
            res.send({ notification: 'Success!' });
        }
        catch (err) {
            return res.status(422).send(err.message);
        }
    }
    else {
        const { id,title, content } = req.body;

        if (req.user.role != 'AD')
            return res.status(422).send({ error: 'Invalid role!' });

        const thongbao = await ThongBao.findOne({ id });
        if (!thongbao)
            return res.status(422).send('Cant find notification');

        try {
             thongbao.title=title;
             thongbao.content=content;
            await thongbao.save();
            res.send({ notification: 'Update Success!' });
        }
        catch (err) {
            return res.status(422).send(err.message);
        }
    }
});

router.get('/notification', async (req, res) => {
    const thongbao = await ThongBao.find();

    return res.send(thongbao);
})

router.delete('/notification', async (req, res) => {
    const { id } = req.body;

    const thongbao = await ThongBao.findOne({ id });
    if (!thongbao)
        return res.status(422).send('Cant find notification');

    try {
        const thongbao = await ThongBao.deleteOne({ id });
        return res.status(200).send('Success!');
    }

    catch (err) {
        return res.status(422).send(err);
    }
})

module.exports = router;