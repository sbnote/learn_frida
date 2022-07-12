Java.perform(() => {
    // 打印View的ID（可与Hook findViewById结合判断）
    const idClass = Java.use("com.sbnote.andfly.R$id");
    console.log(idClass.edit_text.value);  // 2131230897

    // 看有哪些字段
    console.log(Object.keys(idClass));

    const activityClass = Java.use("android.app.Activity");
    activityClass.findViewById.implementation = function(a) {
        console.log("call findViewById() viewId = " + a);
        return this.findViewById(a);
    }

    const viewClass = Java.use("android.view.View");
    viewClass.setOnClickListener.implementation = function(a) {
        console.log("call setOnClickListener() viewId = ", this.getId());
        return this.setOnClickListener(a);
    }

});
