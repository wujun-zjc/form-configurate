/**
 *  拖拽功能
 * 
 * 
 */




// 变量用于储存抓取的元素
var dragDom = null;

// actionType: 动作类型(是拖动新增元素还是移动位置)   elementType:元素类型(被拖动的元素) 
// ondragstart 选取拖动目标要做的处理,这里保存抓取的目标元素    
function dragStart(ev, dom, actionType, elementType) {
    // 阻止 drag 事件冒泡( th ==> component)
    stopPropagation(ev);
    // console.log("actionType: " + actionType + "," + "elementType: " + elementType)

    if (actionType == "move") {
        if (elementType == "component") {
            dragDom = $(dom);
            ev.dataTransfer.setData("text", "component");
        }
        if (elementType == "area") {
            dragDom = $(dom).parent();
            ev.dataTransfer.setData("text", "area");
        }
        if (elementType == "th") {
            // click active
            dragDom = $(dom);
            // data 设置 index
            ev.dataTransfer.setData("text", dragDom.index());
        }
        // ev.dataTransfer.effectAllowed = 'all'; 
    }
    if (actionType == "insert") {
        if (elementType == "component") {
            var componentType = $(dom).attr("data-component");
            // 第一个      table 有多个 componentType
            dragDom = componentsDialog.find("div." + componentType).first().clone();;
            // 绑定激活方法
            dragDom.on("click", openAttr);
            if (componentType == "component-table") dragDom.find("div.form-component").on("click", openAttr);
            
            ev.dataTransfer.setData("text", "component");

            // // 为了演示 加上特殊class印记 读取时作为单独的对象
            // dragDom.addClass("for-the-demonstration");
        }
        if (elementType == "area") {
            var areaTemplate = $(dom).attr("data-template");
            dragDom = dialogMain.find("div." + areaTemplate).clone();
            // 绑定激活方法
            // dragDom.on("click", active).find("div.form-component").on("click", openAttr);
            dragDom.find("div.form-component").on("click", openAttr);
            ev.dataTransfer.setData("text", "area");
            
            // // 为了演示 加上特殊class印记 读取时作为单独的对象
            // dragDom.find("div.form-component").addClass("for-the-demonstration");
        }
    }
    // ev.dataTransfer.setData("text/html", divdom.innerHTML);
}

// ondragover 当拖动链接等有默认事件的元素时，要在ondragover事件中用ev.preventDefault()阻止默认事件。否则drop事件不会触发。
function dragOver(ev) {
    ev.preventDefault();
}

// ondrop 拖到目的地放下之后要做的处理,这里将抓取的目标元素放到放置的目标元素前面
function drop(ev, dom, actionType, elementType) {
    // 阻止drop事件冒泡( component ==> area-main ==> view-main)
    stopPropagation(ev);

    // console.log("actionType: " + actionType + "," + "elementType: " + elementType)
    ev.preventDefault();
    // if (dragDom.get(0) == dom || dragDom.find(dom).length) {
    if (dragDom.get(0) == dom) {
        return;
    }
    var dragData = ev.dataTransfer.getData("text");
    if (elementType == "component" && dragData == "component") {
        // if (actionType == "move") {
        $(dom).before(dragDom);
        // }
        // if (actionType == "insert") {
        //     $(dom).before(dragDom);
        // }
    }
    // 往area-main里拖area      drop-dom 可能是 area-main 也可能是 component
    else if (elementType == "component" && dragData == "area") {
        $(dom).parent().parent().after(dragDom);
    }
    // 往area-main里拖area      drop-dom 可能是 area-main 也可能是 component
    else if (elementType == "area-main" && dragData == "area") {
        $(dom).parent().after(dragDom);
    }
    else if (elementType == "area" && dragData == "area" && dragDom[0] != $(dom).parent()[0]) {
        // 拖放同区域,a.before(a),直接消失      dragDom != $(dom).parent()   $(dom).parent() 有 prevObject;
        $(dom).parent().before(dragDom);
    }
    else if (elementType == "area" && dragData == "component") {
        $(dom).next().append(dragDom);
    }
    else if (elementType == "area-main" && dragData == "component") {
        $(dom).append(dragDom);
    }
    else if (elementType == "view-main" && dragData == "area") {
        // $(dom).append(dragDom);
        footerButton.before(dragDom);
    }
    // 移动列表 列
    else if (elementType == "th" && dragData != "area" && dragData != "component" && dragDom.closest("table").get(0) == $(dom).closest("table").get(0)) {
        var tdIndex = $(dom).index();
        $(dom).closest("table").find("tr").each(function () {
            $(this).children().eq(tdIndex).before($(this).children().eq(dragData));
        })
    }
    // 往列表 td 内 拖 组件 
    else if (elementType == "td" && dragData == "component" && !dragDom.hasClass("component-table") && !dragDom.hasClass("component-textarea")) {
        // 先去掉不用的属性
        dragDom.removeAttr("draggable").removeAttr("ondrop").removeAttr("ondragover").removeAttr("ondragstart");
        dragDom.children("div.input-title").remove();
        $(dom).html(dragDom);
    }
    // 拖拽不生效情况(component => view-main ...) 不需要激活
    else {
        return;
    }
    // ev.dataTransfer.dropEffect = 'move'; 

    // 激活被放置元素
    // dragDom.trigger("click");
    dragDom.click();
}