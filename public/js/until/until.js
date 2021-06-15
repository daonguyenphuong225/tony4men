const queryVietnamese = (str) => {
    let AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ", "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"
    ];
    AccentsMap.forEach(item => {
        for (let i = 0; i < item.length; i++) {
            if (str.indexOf(item[i]) !== -1 && str.indexOf(item) === -1) {
                str = str.split('');
                str[str.indexOf(item[i])] = `[${item}]`;
                str = str.join('');
            }
        }
    });
    return str;
}

module.exports = {
    fullTextSearch: function (str) {
        return new RegExp(queryVietnamese(str), 'gi')
    }
}

