    function showModal(content, title = '温馨提示', suc = () => {
    }) {
        wx.showModal({
            title: title,
            content: content,
            success(res) {
                suc(res)
            },
            confirmColor: "#1677FF",
        })
    }

    function formatCode(i) {
        if (i.length<4){
            let a = i
            let n = 4-i.length
            for (let j = 0; j < n; j++) {
                a = "0"+a
            }
            return a
        }
        return i
    }

    function isEmpty(string) {
        if (typeof (string) == 'undefined' || string == null || string == '') {
            return true;
        } else {
            return false;
        }
    }

module.exports = {
    isEmpty,
    showModal,
    formatCode
}
