var express = require('express');
var router = express.Router();
const fs = require('fs')
const os = require('os')
const platform = require('./util/platform')
const path = require('./util/filepath')
const qs = require('querystring')
/* GET home page.
* 获取各个分支节点的文件，主类，次类，文件名称
* */

let fileClass = []
router.post('/', function (req, res, next) {
    let reqBody = req.body
    let mainType = reqBody.mainType
    let files = reqBody.files
    if (typeof files === 'string') {
        files = Array.of(files)
    }
    console.log(typeof files)
    files.forEach((item) => {
        let allPath = new path.allPath(platform(mainType), item).getPath()
        // console.log(files)
        fs.unlink(allPath, err => {
                if (err) {
                    console.log('删除失败')
                    res.json({
                        status: 'ERROR',
                        message: `${item}文件删除出现异常，请重试`
                    })
                } else {
                    console.log(files.indexOf(item), files.length)
                    if (files.indexOf(item) === files.length - 1) {
                        res.json({
                            status: 'SUCCESS',
                            message: '您所选中的文件删除成功'
                        })
                    }
                }

            }
        )
    })
    // res.json({
    //     status: 'SUCCESS',
    //     message: '删除成功'
    // })

});

module.exports = router;
