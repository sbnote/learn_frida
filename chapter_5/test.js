// 根据名称获取模块
var module = Process.findModuleByName("libmmv8.so");
console.log(JSON.stringify(module));
// {
//     "name": "libmmv8.so",
//     "base": "0x7619527000",
//     "size": 16572416,
//     "path": "/data/app/com.tencent.mm-Atxu_ei2EzylIw_4s-kx4A==/lib/arm64/libmmv8.so"
// }

// 根据地址获取模块
var module1 = Process.findModuleByAddress(module.base)
console.log(JSON.stringify(module));
// {
//     "name": "libmmv8.so",
//     "base": "0x7619527000",
//     "size": 16572416,
//     "path": "/data/app/com.tencent.mm-Atxu_ei2EzylIw_4s-kx4A==/lib/arm64/libmmv8.so"
// }

// 根据地址获取内存范围，可用来查看某段区域的基址、大小、权限等。
var range = Process.findRangeByAddress(module.base);
console.log(JSON.stringify(range));
// {
//     "base": "0x7619527000",
//     "size": 15958016,
//     "protection": "r-x",
//     "file": {
//         "path": "/data/app/com.tencent.mm-Atxu_ei2EzylIw_4s-kx4A==/lib/arm64/libmmv8.so",
//         "offset": 0,
//         "size": 0
//     }
// }

console.log(`Process.id = ${Process.id}`);  // 14960
console.log(`Process.arch = ${Process.arch}`);  // arm64
console.log(`Process.platform = ${Process.platform}`);  // linux
console.log(`Process.pageSize = ${Process.pageSize}`);  // 4096
console.log(`Process.pointerSize = ${Process.pointerSize}`);  // 8
console.log(`Process.getCurrentThreadId() = ${Process.getCurrentThreadId()}`);  // 16140

// 枚举所有模块
for (let module of Process.enumerateModules()) {
    console.log(`Process.enumerateModules() = ${module.name}`);
}
