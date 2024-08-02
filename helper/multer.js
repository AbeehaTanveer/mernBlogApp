'use strict';
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads"); // Make sure the destination folder exists
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + ' ' + file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" || file.mimetype === "image/png" 
    ) {
        cb(null, true);
    } else {
        cb(null, error); 
    }
};

const upload = multer({
    storage: storage,
    fileFilter: filefilter
});

module.exports = { upload };
