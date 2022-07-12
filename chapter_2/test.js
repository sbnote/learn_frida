Java.perform(() => {
    var obj = Java.use("okhttp3.Request$Builder");
    // HOOK
    obj.build.implementation = function(a) {
        console.log("simba: okhttp3.Request$Builder.build() hooked.");
        return this.build();
    };    

    // HOOK重载的方法
    obj.url.overload('java.lang.String').implementation = function(a) {
        console.log(`simba: okhttp3.Request$Builder.url() hooked. url is ${a}`);
        return this.url(a);
    };

    // HOOK构造方法
    obj.$init.overload().implementation = function() {
        console.log("simba: okhttp3.Request$Builder.$init() hooked.");
        return this.$init();
    };

    // 打印所有重载方法
    console.log(obj.url.overloads);
    console.log(obj.url.overloads.length);

});

// frida -U -f com.sbnote.andfly -l test.js --no-pause

// NOTE: implementation = ()=> {...} 这种形式中，调用原方法，会报“TypeError: not a function”


Java.perform(() => {
    const sbClass = Java.use("java.lang.StringBuilder");
    const sbObj = sbClass.$new("ABC");
    sbObj.append("DEF");
    console.log(sbObj.toString());
});


// Java.perform(() => {
//     // 枚举所有已加载的类
//     const loadedClasses = Java.enumerateLoadedClassesSync();
//     console.log(loadedClasses.join("\n"));
//     for (let loadedClass of loadedClasses) {
//         if (loadedClass === "com.sbnote.andfly.MainActivity") {
//             console.log(loadedClass);
//         }
//     }

//     // 枚举类的所有方法
//     const targetClass = Java.use("com.sbnote.andfly.MainActivity");
//     const methods = targetClass.class.getDeclaredMethods();
//     for (let method of methods) {
//         console.log(method.getName());  // onCreate
//         console.log(method);  // protected void com.sbnote.andfly.MainActivity.onCreate(android.os.Bundle)
//     }    
// });

