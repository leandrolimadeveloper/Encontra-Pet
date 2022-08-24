import multer from 'multer'
import path from 'path'

// const upload2 = multer(
//     fileFilter = function (req, file, cb) {
//         if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
//             return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG'))
//         }

//         return cb(null, true)
//     },

//     storage = multer.diskStorage({
//         destination: path.resolve(__dirname, '..', '..', 'uploads'),
//         filename: (req, file, cb) => {
//             const ext = path.extname(file.originalname)
//             const name = path.basename(file.originalname)

//             cb(null, `${name}-${Date.now()}-${ext}`)
//         }
//     })
// )

// export default {
//     fileFilter: (req, file, cb) => {
//         if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
//             return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG'))
//         }

//         return cb(null, true)
//     },

//     storage: multer.diskStorage({
//         destination: path.resolve(__dirname, '..', '..', 'uploads'),
//         filename: (req, file, cb) => {
//             const ext = path.extname(file.originalname)
//             const name = path.basename(file.originalname)

//             cb(null, `${name}-${Date.now()}-${ext}`)
//         }
//     })
// }

export default {
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG'))
            // cb(new Error('Invalid file type'))
        }
    },

    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname)

            cb(null, `${name}-${Date.now()}-${ext}`)
        }
    })
}
