// 数字千分位分割
import moment from 'moment'

function digitFormat(value) {
    var num = value * 1;
    return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

// 数字千分位分割后的字符转化回去
function formatStrToDigit(value = '') {
    var valueTmp = parseFloat(value.replace(/,/g, ''));
    return (isNaN(valueTmp) ? '' : valueTmp);
}

// 格式化显示银行卡号 （4位空格分割）
 function bankCardNoFormat(value = '') {
    if (!value) {
        value = ''
    }
    value = value.replace(/\D/g, '');
    value = value.replace(/[ ]/g, "")
    return value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");//四位数字一组，以空格分割
}

// 格式化显示银行卡号还原回来
 function bankCardNoFormatedToNormal(value = '') {
    return value.replace(/\D/g, '');
}

//将输入的数字转化成中文大写 11=>壹拾壹元整
 function digitToUpperCase(n) {
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    let num = Math.abs(n);
    let s = '';
    fraction.forEach((item, index) => {
        s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(
            /零./,
            '',
        );
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

    return s
        .replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
}

// 获取指定日期对应的星期日
 function getWeekday(date) {
    let weekdayStr = ''
    const weekdayMap = ['', '一', '二', '三', '四', '五', '六', '日']

    const days = moment(date).diff(moment(), 'days') + 1
    const currentWeekday = moment().weekday()
    const dateWeekday = moment(date).weekday()

    if ((currentWeekday + days) < 7) {
        weekdayStr = `本周${weekdayMap[dateWeekday]}`
    } else if ((currentWeekday + days) > 7 && (currentWeekday + days) < 14) {
        weekdayStr = `下周${weekdayMap[dateWeekday]}`
    }

    return weekdayStr
}

// 百分比数字显示
 function numToPercent(val) {
    if (val === null || typeof val === 'undefined' || isNaN(Number(val))) {
        return ''
    }

    if (parseFloat(val) === 0) {
        return '0.00%'
    }

    let str = `${(val * 10000 / 100)}`

    if (str.indexOf('.') !== -1) {
        str = str + '0000'
    } else {
        str = str + '.0000'
    }

    const dotIndex = str.indexOf('.')

    return `${str.substring(0, dotIndex + 3)}%`
}

// 小数点后两位切割
 function numCutDigital(val) {
    if (!val) {
        return ''
    }
    const str = Math.floor(parseFloat(val) * 100) / 100
    return `${str}`
}

// 根据身份证号获取男女
 function getSexFromIdCard(val) {
    if (!val) {
        return ''
    }
    const val17 = val.slice(16, 17)
    if (val17.slice(16, 17) * 1 % 2) {
        return 'man'
    } else {
        return 'woman'
    }
}

export default {
    digitFormat,
    formatStrToDigit,
    bankCardNoFormat,
    bankCardNoFormatedToNormal,
    digitToUpperCase,
    getWeekday,
    numToPercent,
    numCutDigital,
    getSexFromIdCard
}