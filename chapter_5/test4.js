// var soAddr = Module.findBaseAddress("libxiaojianbang.so");
// var funcAddr = soAddr.add(0x1ACC);
// Interceptor.attach(funcAddr, {
//     onEnter: function(args) {
//         args[2] = ptr(100);  // 修改参数值，注：要加ptr转成NativePointer类型
//         console.log(args[2].toInt32());
//         console.log(this.context.x2.toInt32());
//     },
//     onLeave: function(retval) {
//         console.log(retval.toInt32());
//         console.log(this.context.x0);
//         retval.replace(200);  // 修改返回值
//     }
// });


// var module = Process.findModuleByName("libxiaojianbang.so");
// var exports = module.enumerateExports();
// for (let e of exports) {
//     console.log(JSON.stringify(e));
// }

function stringToBytes(str) {
    return hexToBytes(stringToHex(str));
}

function stringToHex(str) {
    return str.split("").map(function(c) {
        return ("0" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join("");
}

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes;
}

var funcAddr = Module.findExportByName("libxiaojianbang.so", "_Z9MD5UpdateP7MD5_CTXPhj");
Interceptor.attach(funcAddr, {
    onEnter: function(args) {
        console.log(hexdump(args[1], {length: 16}));  // 字符串
        console.log(args[2].toInt32());  // 字符串长度
        if (args[1].readCString() == "xiaojianbang") {
            let newStr = "xiaojian\0";
            args[1].writeByteArray(stringToBytes(newStr));
            args[2] = ptr(newStr.length - 1);
            console.log(hexdump(args[1], {length: 16}));  // 字符串
            console.log(args[2].toInt32());  // 字符串长度
        }
    },
    onLeave: function(retval) {
    }
});