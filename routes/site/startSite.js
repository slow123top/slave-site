var express = require('express');
var router = express.Router();
const childProcess = require('child_process')
/* GET home page.
* 获取各个分支节点的文件，主类，次类，文件名称
* */

let fileClass = []
router.post('/', function (req, res, next) {
    console.log(req)
    childProcess.execSync('forever stop ../../bin/www');
    res.json({
        status: 'SUCCESS',
        message: '您所选中的文件删除成功'
    })
})

module.exports = router;
