const mongoose = require('mongoose');

const sinhVienSchema = mongoose.Schema({
    MSSV: {
        type: String,
        unique: true,
        required: true
    },
    Ho: {
        type: String,
        required: true
    },
    Ten: {
        type: String,
        required: true
    },
    MaLop: {
        type: String,
        required: true
    },
    TinhTrangHoc: {
        type: String,
        required: true
    }
});

mongoose.model('SinhVien',sinhVienSchema);