# 扩展Taro 的前端公共方法集合


## 安装

npm i taro-util-service

## 使用
```bash
import {validateMobile,validateCardId,digitFormat} from 'taro-util-serive'

### 验证手机号
validateMobile(phoneNo)  返回 true or false

### 验证身份证号码
validateCardId(cardNo)  返回 true or false

### 验证身份证号码(规则是验证name包含至少2个汉字)
validateChineseName(name)  返回 true or false

### 数字转换成千分割 2,0000
digitFormat(number)  返回格式化后的值

### 数字千分位分割后的字符转化回去
formatStrToDigit(numberStr)  返回格式化后的数字

### 格式化显示银行卡号 （4位空格分割）
bankCardNoFormat(bankCardId)  返回格式化后的字符

### 格式化显示银行卡号 （4位空格分割）
bankCardNoFormatedToNormal(bankCardIdStr)  返回格式化后的真实的银行卡号码


### 将输入的数字转化成中文大写 11=>壹拾壹元整
digitToUpperCase(number)  返回格式化后的人民币大些字符

### 获取指定日期对应的星期
getWeekday(date)  返回星期一星期二等


### 百分比数字显示 0.23=>23.00%
numToPercent(nuber)  返回

### 小数点后两位切割 1.234=>1.23
numCutDigital(nuber)  返回 1.234=>1.23

### 根据身份证号获取男女
getSexFromIdCard(idCard)  返回 man/woman

### 兼容H5和小程序的复制
copy(value)


```