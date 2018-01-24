var express = require('express');
var router = express.Router();
const fs = require('fs')
const os = require('os')
const platform = require('./util/platform')
/* GET home page.
* 获取各个分支节点的文件，主类，次类，文件名称
* */

let fileClass = []
router.post('/', function (req, res, next) {
    let mainType = req.body.mainType
    let subType = req.body.subType
    console.log(req.body)
    let files = []
    fs.readdir(platform(mainType), (err, data) => {
        if (err) {
            res.json({
                status: 'ERROR',
                message: '获取此类文件失败'
            })
        } else {
            files = [...data.filter((item) => {
                return item.substring(item.indexOf('.') + 1) === subType
            })]
            res.json({
                status: 'SUCCESS',
                message: '成功获取此类文件',
                data: files
            })
        }
    })
});

module.exports = router;
