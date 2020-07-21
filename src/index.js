//验证手机号码，通过返回true
import Taro from '@tarojs/taro'
const ENV_TYPE = process.env.TARO_ENV
import moment from 'moment'

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
// 数字千分位分割
export function digitFormat(value) {
    var num = value * 1;
    return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

// 数字千分位分割后的字符转化回去
export function formatStrToDigit(value = '') {
    var valueTmp = parseFloat(value.replace(/,/g, ''));
    return isNaN(valueTmp) ? '' : valueTmp;
}

// 格式化显示银行卡号 （4位空格分割）
export function bankCardNoFormat(value = '') {
    if (!value) {
        value = '';
    }
    value = value.replace(/\D/g, '');
    value = value.replace(/[ ]/g, "");
    return value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 "); //四位数字一组，以空格分割
}

// 格式化显示银行卡号还原回来
export function bankCardNoFormatedToNormal(value = '') {
    return value.replace(/\D/g, '');
}

//将输入的数字转化成中文大写 11=>壹拾壹元整
export function digitToUpperCase(n) {
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    let num = Math.abs(n);
    let s = '';
    fraction.forEach((item, index) => {
        s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(/零./, '');
    });
    s = s || '整';
    num = Math.floor(num);
    for (let i = 0; i < unit[0].length && num > 0; i += 1) {
        let p = '';
        for (let j = 0; j < unit[1].length && num > 0; j += 1) {
            p = digit[num % 10] + unit[1][j] + p;
            num = Math.floor(num / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }

    return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

// 获取指定日期对应的星期日
export function getWeekday(date) {
    let weekdayStr = '';
    const weekdayMap = ['', '一', '二', '三', '四', '五', '六', '日'];

    const days = moment(date).diff(moment(), 'days') + 1;
    const currentWeekday = moment().weekday();
    const dateWeekday = moment(date).weekday();

    if (currentWeekday + days < 7) {
        weekdayStr = `本周${weekdayMap[dateWeekday]}`;
    } else if (currentWeekday + days > 7 && currentWeekday + days < 14) {
        weekdayStr = `下周${weekdayMap[dateWeekday]}`;
    }

    return weekdayStr;
}

// 百分比数字显示
export function numToPercent(val) {
    if (val === null || typeof val === 'undefined' || isNaN(Number(val))) {
        return '';
    }

    if (parseFloat(val) === 0) {
        return '0.00%';
    }

    let str = `${val * 10000 / 100}`;

    if (str.indexOf('.') !== -1) {
        str = str + '0000';
    } else {
        str = str + '.0000';
    }

    const dotIndex = str.indexOf('.');

    return `${str.substring(0, dotIndex + 3)}%`;
}

// 小数点后两位切割
export function numCutDigital(val) {
    if (!val) {
        return '';
    }
    const str = Math.floor(parseFloat(val) * 100) / 100;
    return `${str}`;
}

// 根据身份证号获取男女
export function getSexFromIdCard(val) {
    if (!val) {
        return '';
    }
    const val17 = val.slice(16, 17);
    if (val17.slice(16, 17) * 1 % 2) {
        return 'man';
    } else {
        return 'woman';
    }
}
//兼容H5和小程序的复制
export function copy(value) {
    if ("h5" === ENV_TYPE) {
        const systemInfo = Taro.getSystemInfoSync()
        if (systemInfo.model.indexOf("iPhone") > -1 || systemInfo.system.indexOf("iOS") > -1) {
            try {
                /**
                 * ios中不能复制属性值，只能复制文本元素节点；
                 * （解决方案：可以把文字颜色设成背景色就能达到隐藏看不见的效果不影响显示）；
                 */
                let el = document.createElement('input');
                el.value = value;//要复制的内容
                el.style.opacity = '0';
                document.body.appendChild(el);
                let editable = el.contentEditable;
                let readOnly = el.readOnly;
                el.contentEditable = true;
                el.readOnly = false;
                const range = document.createRange();
                range.selectNodeContents(el);
                let sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                el.setSelectionRange(0, 999999);
                el.contentEditable = editable;
                el.readOnly = readOnly;
                document.execCommand('copy');
                el.blur();
                Taro.showToast({
                    title: '内容已复制',
                    duration: 1500
                })
            } catch (e) {
                Taro.showToast({
                    title: e.toString(),
                    duration: 3000
                })
            }

        } else {
            let aux = document.createElement("input");
            aux.readonly = "readonly";
            aux.value = value;
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
            Taro.showToast({
                title: '内容已复制',
                duration: 1500
            })
        }
    } else {
        Taro.setClipboardData({
            data: value,
            success: function (res) {
                Taro.getClipboardData({
                    success: function (res) {
                        Taro.showToast({
                            title: '内容已复制',
                            duration: 1500
                        })
                    }
                })
            }
        })
    }
}