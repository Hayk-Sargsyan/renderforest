import fs from 'fs';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        const fileUrl = file.fieldname + '-' + Date.now() +  '.jpg';

        if (fs.existsSync('public/uploads/' + req.user.img)) {
            fs.unlinkSync('public/uploads/' + req.user.img);
        }

        req.user.img = fileUrl;

        cb(null, fileUrl);
    }
});

const upload = multer({storage: storage}).single('avatar');

export default upload;