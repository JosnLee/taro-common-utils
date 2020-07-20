//验证手机号码，通过返回true
export function validateMobile(value) {
    const regMobile = /^1[3456789]\d{9}$/;
    if (!value || !regMobile.test(value)) {
        return false;
    }
    return true;
}

//验证身份证信息，通过返回true
export function validateCardId(value) {
    const IdNoReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
    if (!value || !IdNoReg.test(value)) {
        return false;
    }
    return true;
}
//验证中国人姓名，通过返回true
export function validateChineseName(value) {
    const nameReg = /^[\u4E00-\u9FA5·]{2,}$/;
    if (!value || !nameReg.test(value)) {
        return false;
    }
    return true;
}

export default {
    validateCardId,
    validateMobile,
    validateChineseName
};