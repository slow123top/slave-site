var express = require('express');
var router = express.Router();
const fs = require('fs')
const rootPath = require('./util/platform')
/* GET home page.
* 获取各个分支节点的文件，主类，次类，文件名称
* */


router.get('/', function (req, res, next) {
    let fileClass = []
    let temp = []
    let host = req.headers.host
    let siteName = host.substring(0, host.indexOf(':'))
    // let starPath = platform() + 'Catalog'
    // let filePath = platform() + 'file'
    // let spectrumPath = platform() + 'spectrum'
    new Promise(function (resolve, reject) {
        fs.readdir(rootPath('1'), (err, files) => {
            if (err) {
                reject(err)
            } else {
                temp.splice(0, temp.length)
                files.forEach((item) => {
                    temp.push(item.substring(item.indexOf('.') + 1))
                })
                temp = [...new Set(temp)]
                temp.forEach((item) => {
                    fileClass.push({
                        mainType: '1',
                        subType: item,
                        address: siteName
                    })
                })
                resolve()
            }
        })
    })
        .then(function () {
            return new Promise(function (resolve, reject) {
                fs.readdir(rootPath('2'), (err, files) => {
                    if (err) {
                        reject(err)
                    } else {
                        temp.splice(0, temp.length)
                        files.forEach((item) => {
                            temp.push(item.substring(item.indexOf('.') + 1))
                        })
                        temp = [...new Set(temp)]
                        temp.forEach((item) => {
                            fileClass.push({
                                mainType: '2',
                                subType: item,
                                address: siteName
                            })
                        })
                        resolve()
                    }
                })
            })
        })
        .then(function () {
            return new Promise(function (resolve, reject) {
                fs.readdir(rootPath('3'), (err, files) => {
                    if (err) {
                        reject(err)
                    } else {
                        temp.splice(0, temp.length)
                        files.forEach((item) => {
                            temp.push(item.substring(item.indexOf('.') + 1))
                        })
                        temp = [...new Set(temp)]
                        temp.forEach((item) => {
                            fileClass.push({
                                mainType: '3',
                                subType: item,
                                address: siteName
                            })
                        })
                        res.json({
                            status: 'SUCCESS',
                            message: '文件获取成功',
                            data: fileClass
                        })
                    }
                })
            })
        })
        .catch((e) => {
            res.json({
                status: 'ERROR',
                message: e
            })
        })
});

module.exports = router;
