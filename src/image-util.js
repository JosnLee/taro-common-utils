const ENV_TYPE = process.env.TARO_ENV
import Taro from '@tarojs/taro'
import lrz from 'lrz'

/**
 * 选择文件后并压缩，返回压缩后的文件的base64
 * @param maxFileSize 压缩后的文件的最大值K  例如1500代表的是压缩后最大不超过1500k
 * @param sizeType 图片源默认['original', 'compressed']，原图和压缩图
 * @param sourceType 图片源默认['album', 'camera']，默认图库和照片
 * @returns {PromiseLike<T> | Promise<T>}
 */
function chooseImage(maxFileSize = 1500, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera']) {
    const params = {
        count: 1, // 默认9
        sizeType: sizeType ,// 可以指定",原图还",压缩图，默认二者都有
        sourceType: sourceType,
    }
    return Taro.chooseImage(params).then((res) => {
        const fileSize = res.tempFiles[0].size / 1024
        let quality = (maxFileSize / fileSize) > 1 ? 0.7 : (maxFileSize / fileSize) // 小于400k不压缩
        const filePath = res.tempFilePaths[0]
        if (ENV_TYPE === 'h5') {
            // h5方式的压缩用lrz
            return lrz(filePath, {quality: quality}).then((res1) => {
                return {
                    base64Str: `${res1.base64.replace(/^data:image\/\w+;base64,/, "")}`,
                    fieldName: `${new Date().getTime()}.png`

                }
            })
        } else {
            const fileParams = {
                src: filePath,
                quality: quality * 10,
            }
            return Taro.compressImage(fileParams).then((smallRes) => {
                const base64 = Taro.getFileSystemManager().readFileSync(smallRes.tempFilePath, 'base64')
                return {
                    base64Str: `${base64.replace(/^data:image\/\w+;base64,/, "")}`,
                    fieldName: `${new Date().getTime()}.png`
                }
            })
        }
    })
}

/**
 * 压缩图片
 * @param filePath 文件路径
 * @param quality 研所的比例
 * @returns {PromiseLike<{fileName: string, base64: string}> | Promise<{fileName: string, base64: string}>}
 */

function compressImage(filePath, quality = 0.4) {
    if (ENV_TYPE === 'h5') {
        // h5方式的压缩用lrz
        return lrz(filePath, {quality: quality}).then((res1) => {
            return {
                base64: `${res1.base64.replace(/^data:image\/\w+;base64,/, "")}`,
                fileName: `${new Date().getTime()}.png`

            }
        })
    } else {
        const fileParams = {
            src: filePath,
            quality: quality * 10,
        }
        return Taro.compressImage(fileParams).then((smallRes) => {
            const base64 = Taro.getFileSystemManager().readFileSync(smallRes.tempFilePath, 'base64')
            return {
                base64: `${base64.replace(/^data:image\/\w+;base64,/, "")}`,
                fileName: `${new Date().getTime()}.png`
            }
        })
    }
}

export default {compressImage,chooseImage}