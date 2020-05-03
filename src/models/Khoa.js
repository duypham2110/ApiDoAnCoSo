const mongoose = require('mongoose');

const khoaSchema = mongoose.Schema({
    MaKhoa: {
        type: String,
        unique: true,
        required: true
    },
    TenKhoa: {
        type: String
    }
});

mongoose.model('Khoa',khoaSchema);