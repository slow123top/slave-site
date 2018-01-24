var express = require('express');
var router = express.Router();
let http = require('http')
const qs = require('querystring')
const multer = require('multer')
const fs = require('fs')
const bf = require('buffer')
const rootPath = require('./util/platform')
/* GET users listing. */

let upload = multer({
    dest: './upload/'
})
router.post('/', upload.array('file'), function (req, res, next) {
    let mainType = req.query.mainType
    let filesArr = req.files
    console.log(filesArr)
    filesArr.forEach(item => {
        new Promise((resolve, reject) => {
            fs.readFile(`./upload/${item.filename}`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        }).then((param) => {
            fs.writeFile(`${rootPath(mainType)}/${item.originalname}`, param, err => {
                if (err) {
                    console.log(err)
                } else {
                    fs.unlinkSync(`./upload/${item.filename}`)
                    console.log('文件写入成功')
                }
            })
        }).catch((e) => {
            console.log(e)
        })

    })
    res.json({
        status: 'SUCCESS',
        message: '上传成功'
    })
});

module.exports = router;
