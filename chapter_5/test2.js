var module = Process.findModuleByName("libmmv8.so");

// 枚举模块的导入表
var imports = module.enumerateImports();
console.log(JSON.stringify(imports[0]));
// {
//     "type": "function",
//     "name": "pthread_rwlock_wrlock",
//     "module": "/system/lib64/libc.so",
//     "address": "0x76daac4cd0"
// }

// 枚举模块的导出表
var exports = module.enumerateExports();
console.log(JSON.stringify(exports[0]));
// {
//     "type": "function",
//     "name": "_ZN2v88internal8GCTracer5StartENS0_16GarbageCollectorENS0_23GarbageCollectionReasonEPKc",
//     "address": "0x7619ac4520"
// }

// 枚举模块的符号表
module = Process.findModuleByName("libart.so");
var symbols = module.enumerateSymbols();
for (let symbol of symbols) {
    if (symbol.name.indexOf("CheckJNI") == -1 && symbol.name.indexOf("RegisterNatives") != -1) {
        console.log(JSON.stringify(symbol));
        console.log(`RegisterNatives.addr = ${symbol.address}`);
    }
}


