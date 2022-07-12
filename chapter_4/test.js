Java.perform(()=>{

    // 打印调用栈
    function showStack() {
        var stack = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new());
        console.log(stack);
    }

    showStack();

    //  打印数据
    const ByteString = Java.use("com.android.okhttp.okio.ByteString");

    function toBase64(data) {
        console.log(ByteString.of(data).base64()); 
    }
    
    function toHex(data) {
        console.log(ByteString.of(data).hex());
    }

    function toUtf8 (data) {
        console.log(ByteString.of(data).utf8());
    }

    toBase64([48, 49, 50, 51, 52]);  // MDEyMzQ=
    toHex([48, 49, 50, 51, 52]);  // 3031323334
    toUtf8([48, 49, 50, 51, 52]);  // 01234

    // // Error: update(): has more than one overload, use .overload(<signature>) to choose from:
    // //     .overload('byte')
    // //     .overload('java.nio.ByteBuffer')
    // //     .overload('[B')
    // //     .overload('[B', 'int', 'int')

    // const messageDigest = Java.use("java.security.MessageDigest");
    // messageDigest.update.overload('[B').implementation = function(data) {
    //     const algorithm = this.getAlgorithm();
    //     console.log(`hook update() algorithm = ${algorithm}`)
    //     toUtf8(data);
    //     toHex(data);
    //     toBase64(data);
    //     return this.update(data);
    // }

    // // Error: digest(): has more than one overload, use .overload(<signature>) to choose from:
    // //     .overload()
    // //     .overload('[B')
    // //     .overload('[B', 'int', 'int')
    // messageDigest.digest.overload().implementation = function() {
    //     const algorithm = this.getAlgorithm();
    //     console.log(`hook digest() algorithm = ${algorithm}`)
    //     const result = this.digest();
    //     toUtf8(result);
    //     toHex(result);
    //     toBase64(result);
    //     showStack();
        
    //     return result;
    // }


    // const mac = Java.use("javax.crypto.Mac");

    // // Error: init(): has more than one overload, use .overload(<signature>) to choose from:
    // //     .overload('java.security.Key')
    // //     .overload('java.security.Key', 'java.security.spec.AlgorithmParameterSpec')
    // mac.init.overload("java.security.Key").implementation = function(key) {
    //     const algorithm = this.getAlgorithm();
    //     console.log(`hook init() algorithm = ${algorithm}`)
    //     const keyBytes = key.getEncoded();
    //     toUtf8(keyBytes);
    //     toHex(keyBytes);
    //     toBase64(keyBytes);
    //     return this.init(key);
    // } 

    // // .overload('byte')
    // // .overload('java.nio.ByteBuffer')
    // // .overload('[B')
    // // .overload('[B', 'int', 'int')
    // mac.update.overload("[B").implementation = function(data) {
    //     const algorithm = this.getAlgorithm();
    //     console.log(`hook update() algorithm = ${algorithm}`)
    //     toUtf8(data);
    //     toHex(data);
    //     toBase64(data);
    //     return this.update(data);
    // }

    // // Error: doFinal(): has more than one overload, use .overload(<signature>) to choose from:
    // //     .overload()
    // //     .overload('[B')
    // //     .overload('[B', 'int')
    // mac.doFinal.overload('[B').implementation = function() {
    //     const algorithm = this.getAlgorithm();
    //     console.log(`hook digest() algorithm = ${algorithm}`)
    //     const result = this.doFinal();
    //     toUtf8(result);
    //     toHex(result);
    //     toBase64(result);
    //     return result;
    // }    

    const signature = Java.use("java.security.Signature");

    // Error: update(): has more than one overload, use .overload(<signature>) to choose from:
    //     .overload('byte')
    //     .overload('java.nio.ByteBuffer')
    //     .overload('[B')
    //     .overload('[B', 'int', 'int')
    signature.update.overload('[B', 'int', 'int').implementation = function(data, start, length) {
        const algorithm = this.getAlgorithm();
        console.log(`hook update() algorithm = ${algorithm}`)
        toUtf8(data);
        toHex(data);
        toBase64(data);
        return this.update(data, start, length);
    }

    // Error: sign(): has more than one overload, use .overload(<signature>) to choose from:
    //     .overload()
    //     .overload('[B', 'int', 'int')
    signature.sign.overload().implementation = function() {
        const algorithm = this.getAlgorithm();
        console.log(`hook sign() algorithm = ${algorithm}`)
        const result = this.sign();
        toUtf8(result);
        toHex(result);
        toBase64(result);
        return result;
    }

})