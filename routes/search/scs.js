var express = require('express');
var router = express.Router();
const fs = require('fs')
const platform = require('../util/platform')
const path = require('../util/filepath')
const readline = require('readline');
const readLine1 = require('linebyline')
/* GET home page.
* 获取各个分支节点的文件，主类，次类，文件名称
* */
router.post('/', function (req, res, next) {
    let ra = req.body.ra
    let de = req.body.de
    let radius = Number(req.body.radius)
    let allPath = new path.allPath(platform('1'), 'ac_n30.dat').getPath()
    const readLine = readline.createInterface({
        input: fs.createReadStream(allPath)
    });

    console.log(req.body)
    readLine.on('line', line => {
        let raDegree = Number(line.substring(0, 3))
        let raMinute = Number(line.substring(4, 6))
        let raSecond = Number(line.substring(7, 13))
        let raLine = (((raSecond / 60).toFixed(3) + raMinute) / 60).toFixed(3) + raDegree
        let deDegree = Number(line.substring(14, 17))
        let deMinute = Number(line.substring(18, 20))
        let deSecond = Number(line.substring(21, 26))
        let deLine = (((deSecond / 60).toFixed(3) + deMinute) / 60).toFixed(3) + deDegree
        let r = Math.acos(Math.sin(deLine) * Math.sin(de) + Math.cos(deLine) * Math.cos(de) * Math.cos(raLine - ra))
        if (Number(r) < radius) {
            // console.log(raLine,deLine,r)
            console.log(line)
        }
        // console.log(line)

    })

});

module.exports = router;
