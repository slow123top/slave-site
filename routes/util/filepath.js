const os = require('os')

class RootPath {
    constructor(root) {
        this.root = root
    }
}

class StarPath extends RootPath {
    constructor(root, fileName) {
        super(root)
        this.fileName = fileName
    }

//  获取星表路径
    getStarPath() {
        return this.root + 'Catalog' + this.fileName
    }
}

class FilePath extends RootPath {
    constructor(root, fileName) {
        super(root)
        this.fileName = fileName
    }

//    获取文献路径
    getFilepath() {
        return this.root + 'file' + this.fileName
    }
}

class SpectrumPath extends RootPath {
    constructor(root, fileName) {
        super(root)
        this.fileName = fileName
    }

//    获取光谱路径
    getSpectrumPath() {
        return this.root + 'spectrum' + this.fileName
    }
}

//统一获取文件路径
class AllPath extends RootPath {
    constructor(root, fileName) {
        super(root)
        this.fileName = fileName
    }

    getPath() {
        return `${this.root}${os.platform() === 'win32' ? '\\' : '/'}${this.fileName}`
    }
}

module.exports = {
    starPath: StarPath,
    filePath: FilePath,
    spectrumPath: SpectrumPath,
    allPath: AllPath
}