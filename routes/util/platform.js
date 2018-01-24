const os = require('os')

const fileClassToStr = {
    '1': 'Catalog',
    '2': 'file',
    '3': 'spectrum'
}
const rootPath = function (className) {
    return os.platform() === 'win32' ? `C:\\data\\${fileClassToStr[className]}` : `/data/${fileClassToStr[className]}`
}

// module.exports = fileClassToStr
module.exports = rootPath