

新增组件

    1. html left => left-components-main      新增 form-component     配置 自定义属性 data-component="component-input"   拖动源

    2. html dialog-components => components   新增 form-component     配置 自定义属性 对应类名 component-input            实际生成元素

    3. html right => right-main               新增 right-component    配置 属性编辑栏类名 right-input                     可编辑属性

    4. js   main.js => openAttr()             else if (e.hasClass("component-input"))                                   打开属性编辑栏

    5. js   main.js => saveAttribution()      if (type == "input")                                                      保存属性



新增模板

    1. left => left-templates-main            新增 form-component     配置 自定义属性 data-template="area-default"       拖动源

    2. dialog-components => dialog-main       新增 form-area          配置 自定义属性 对应类名 area-default               实际生成元素




TODO

    alert 都应判断并改为 $.messager.alert                              if($.messager) {$.messager.alert} else {alert}

    各种保存完成时应给与提示 $.messager.show                            if($.messager) {$.messager.show}

    input select 属性 disabled 切换应变化 background                   但是有 readonly 和 disabled 的细节 还没确认

    各种选项编辑,应该判断不能有相同的 label 和 value

    表格 增加行    radio 同 anem    会互相影响

    multi-select add

    备注 无法删除

    drag.js        去掉         // 为了演示 加上特殊class印记 读取时最为单独的对象

    检查 name   可以提示 哪个已有元素用了此 name    


