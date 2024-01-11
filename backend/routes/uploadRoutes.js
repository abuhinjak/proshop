import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

function fileFilter(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage
})

router.post('/', (req, res) => {
    upload.single('image')(req, res, (err) => {
        if(err) {
            return res.status(400).send(`Error: ${err}`);
        }
        res.status(200).send({
            message: 'Image uploaded successfully',
            image: `/${req.file.path}`
        });
    })
})

export default router;