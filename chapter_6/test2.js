
// var soAddr = Module.findBaseAddress("libxiaojianbang.so");
// var funcAddr = soAddr.add(0x16BC);
// var jstr2cstr = new NativeFunction(funcAddr, "pointer", ["pointer", "pointer"]);
// var env = Java.vm.tryGetEnv();
// var jstring = env.newStringUtf("xiaojianbang");
// var retval = jstr2cstr(env.handle, jstring);
// // 或 var retval = jstr2cstr(env, jstring);
// console.log(retval.readCString());  // xiaojianbang

// var dlsymAddr = Module.findExportByName("libdl.so", "dlsym");
// Interceptor.attach(dlsymAddr, {
//     onEnter: function(args) {
//         this.args1 = args[1];
//     },
//     onLeave: function(retval) {
//         console.log(this.args1.readCString(), retval);
//         // Java_com_xiaojianbang_ndk_NativeHelper_md5 0x70e0522f2c
//         // 只输出一次，因为静态注册

//         var module = Process.findModuleByAddress(retval);
//         console.log(JSON.stringify(module));
//         // {
//         //     "name": "libxiaojianbang.so",
//         //     "base": "0x70e0817000",
//         //     "size": 28672,
//         //     "path": "/data/app/com.xiaojianbang.app-X1zWfZoFGYTMn9k8EodlHA==/lib/arm64/libxiaojianbang.so"
//         // }
    
//     } 
// });



var RegisterNativesAddr = null;
var _symbols = Process.findModuleByName("libart.so").enumerateSymbols();
for (var symbol of _symbols) {
    if (symbol.name.indexOf("CheckJNI") == -1 && symbol.name.indexOf("RegisterNatives") != -1) {
        RegisterNativesAddr = symbol.address;  // 0x70f9d4f740
        console.log(`RegisterNativesAddr = ${RegisterNativesAddr}`)
    }
}

if (RegisterNativesAddr != null) {
    console.log('Interceptor.attach...');
    Interceptor.attach(RegisterNativesAddr, {
        onEnter: function(args) {
            var env = Java.vm.tryGetEnv();
            // 获取注册函数所属类名
            // var className = env.getClassName(args[1]);
            // console.log(`className = ${className}`);
            // // 获取注册函数个数
            // var methodCount = args[3].toInt32();
            // console.log(`methodCount = ${methodCount}`);
            // // 获取函数名
            // var methodName = args[2].readPointer().readCString();
            // console.log(`methodName = ${methodName}`);
            // // 获取函数签名
            // var signature = args[2].add(Process.pointerSize).readPointer().readCString();
            // console.log(`signature = ${signature}`);
            // 获取真实函数地址
            var fnPtr = args[2].add(Process.pointerSize*2).readPointer().readCStrinwg();
            console.log(`fnPtr = ${fnPtr}`);
            // 获取对应的模块
            var module = Process.findModuleByAddress(fnPtr);
            console.log(JSON.stringify(module));
            // {
            //     "name": "libxiaojianbang.so",
            //     "base": "0x70e0817000",
            //     "size": 28672,
            //     "path": "/data/app/com.xiaojianbang.app-X1zWfZoFGYTMn9k8EodlHA==/lib/arm64/libxiaojianbang.so"
            // }
        },
        onLeave: function(retval) {
        }
    });
}