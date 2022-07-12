// for (let module of Process.enumerateModules()) {
//     console.log(`Process.enumerateModules() = ${module.name}`);
// }

// var module = Process.findModuleByName("libxiaojianbang.so");
// var exports = module.enumerateExports();
// for (let e of exports) {
//     console.log(JSON.stringify(e));
// }

// var funcAddr = Module.findExportByName("libxiaojianbang.so", "Java_com_xiaojianbang_ndk_NativeHelper_add");
// console.log(`funcAddr = ${funcAddr}`);

// Interceptor.attach(funcAddr, {
//     onEnter: function(args) {
//         console.log(args[0]);  // 0x7590ee0460  // JNIEnv*
//         console.log(args[1]);  // 0x7fd52e2ab4  // jclass
//         console.log(args[2]);  // 0x5
//         console.log(this.context.x3.toInt32());  // 6
//         console.log(args[4]);  // 0x7
//     },
//     onLeave: function(retval) {
//         console.log(retval.toInt32());  // 18
//         console.log(this.context.x0);  // 0x12
//     }
// });

// var soAddr = Module.findBaseAddress("libxiaojianbang.so");
// var data = hexdump(soAddr, {length: 16, header: false});
// console.log(data);
// // 7578ff8000  7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00  .ELF............

var soAddr = Module.findBaseAddress("libxiaojianbang.so");
var funcAddr = soAddr.add(0x1ACC);
Interceptor.attach(funcAddr, {
    onEnter: function(args) {
        console.log(args[0]);  // 0x7590ee0460  // JNIEnv*
        console.log(args[1]);  // 0x7fd52e2ab4  // jclass
        console.log(args[2]);  // 0x5
        console.log(this.context.x3.toInt32());  // 6
        console.log(args[4]);  // 0x7
        console.log(hexdump(args[0]));
    },
    onLeave: function(retval) {
        console.log(retval.toInt32());  // 18
        console.log(this.context.x0);  // 0x12
    }
});

