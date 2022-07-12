var env = Java.vm.tryGetEnv();

console.log(JSON.stringify(env));
// {"handle":"0x7590fccfc0","vm":{"handle":"0x7590f1a2c0"}}

console.log(hexdump(env.handle, {length: 32}));
// 0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F  0123456789ABCDEF
// 7590fccfc0  f0 40 d7 90 75 00 00 00 00 a0 ee 90 75 00 00 00  .@..u.......u...
// 7590fccfd0  c0 a2 f1 90 75 00 00 00 00 00 00 00 78 00 00 00  ....u.......x...

// 获取JNIEnv*指针变量指向的内存地址：（方法1）
console.log(hexdump(env.handle.readPointer(), {length: 32}));
// 0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F  0123456789ABCDEF
// 7590d740f0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
// 7590d74100  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................

// 获取JNIEnv*指针变量指向的内存地址：（方法2）
console.log(hexdump(Memory.readPointer(env), {length: 32}));
// 0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F  0123456789ABCDEF
// 7590d740f0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
// 7590d74100  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................

// 获取JNIEnv*指针变量指向的内存地址：（方法3）
console.log(hexdump(ptr(env).readPointer(), {length: 32}));
// 0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F  0123456789ABCDEF
// 7590d740f0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
// 7590d74100  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................


var envAddr = Java.vm.tryGetEnv().handle.readPointer();
var NewStringUTF = envAddr.add(167 * Process.pointerSize);
var NewStringUTFAddr = envAddr.add(167 * Process.pointerSize).readPointer();
console.log(hexdump(NewStringUTF, {length: 32}))
// 0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F  0123456789ABCDEF
// 7590d74628  7c 8d 84 90 75 00 00 00 a4 94 84 90 75 00 00 00  |...u.......u...
// 7590d74638  c8 9b 84 90 75 00 00 00 f4 9b 84 90 75 00 00 00  ....u.......u...

console.log(hexdump(NewStringUTFAddr, {length: 32}))
// 0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F  0123456789ABCDEF
// 7590848d7c  ff 03 03 d1 f9 3b 00 f9 f8 5f 08 a9 f6 57 09 a9  .....;..._...W..
// 7590848d8c  f4 4f 0a a9 fd 7b 0b a9 fd c3 02 91 f3 03 01 aa  .O...{..........

console.log(Instruction.parse(NewStringUTFAddr).toString());
// sub sp, sp, #0xc0


var debsym = DebugSymbol.fromName("strcat");
console.log(JSON.stringify(debsym));
// {"address":"0x76155a06a8","name":"strcat","moduleName":"libc.so","fileName":"","lineNumber":0}

console.log(DebugSymbol.getFunctionByName("JNI_OnLoad"));  // 0x70f63fdd14

console.log(DebugSymbol.findFunctionsNamed("JNI_OnLoad"));
// 0x70f63fdd14,0x70f5bc5730,0x70f5b6b988,0x70f433ebfc,0x70ee29d250,0x70ee219330,0x70ea75edc8,0x70e11c494c

console.log(DebugSymbol.findFunctionsMatching("JNI_OnLoad"));
// 0x70e11c494c,0x70ea75edc8,0x70ee219330,0x70ee29d250,0x70f433ebfc,0x70f5b6b988,0x70f5bc5730,0x70f63fdd14