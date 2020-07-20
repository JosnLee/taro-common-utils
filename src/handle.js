import Taro from '@tarojs/taro'
const ENV_TYPE = process.env.TARO_ENV

// 处理ios input失去焦点键盘的问题
 function blurHandle() {
    if (ENV_TYPE === 'h5') {
        setTimeout(() => {
            let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100)
    }
}


//兼容H5和小程序的复制
 function copy(value) {
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
export  default {
    blurHandle,
    copy
}
