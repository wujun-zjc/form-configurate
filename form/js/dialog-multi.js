var dialogMultiSelectEdit = $("div.dialog-multi-select-edit").find("div.dialog-main");
var valueInpMulti = dialogMultiSelectEdit.find("input.value");
var labelInpMulti = dialogMultiSelectEdit.find("input.label");
var optionEditContainer = dialogMultiSelectEdit.find("div.option-edit");
var saveMultiBtn = dialogMultiSelectEdit.find("div.option-edit").find("button.save");
var oneSelect = componentsDialog.find("div.one-select").clone();
var numSelect = dialogMultiSelectEdit.find("select.select-num");

var multiTitle = null;
var labelMulti = "";
var valueMulti = "";
var selectedMulti = "";
var multiJson = {};
var multiDefaultJson = {
    num: 2,
    data: [{
        label: "-- 请选择 --",
        value: "",
        selected: "selected",
        children: [{
            label: "-- 请选择 --",
            value: "",
            selected: "selected",
        }]
    }, {
        label: "1",
        value: "",
        selected: "",
        children: [{
            label: "11",
            value: "",
            selected: "",
        }, {
            label: "12",
            value: "",
            selected: "",
        }]
    }]
};


function openMultiDialog(e, type) {
    openDialog(type);
    multiJson = $(e.currentTarget).data("multiJson");
    multiJson = multiJson ? multiJson : multiDefaultJson;
    numSelect.val(multiJson.num).change();
    dialogMultiSelectEdit.find("div.container").html("");
    for (var i = 0; i < multiJson.data.length; i++) {
        dialogMultiSelectEdit.find("div.container").removeClass("active").first().addClass("active");
        addMulti("order-" + i, multiJson.data[i]);
    }
}

// var num = 2;
function changeSelectNum() {
    var num = numSelect.val();
    // 当前select个数
    var containerNum = dialogMultiSelectEdit.find("div.container:visible").length;
    // dialogMultiSelectEdit.parent().animate({"width":810+(num-2)*257+"px"});
    // dialogMultiSelectEdit.parent().width(810+(num-2)*257+"px");
    if (num > containerNum) {
        dialogMultiSelectEdit.parent().animate({
            "width": 810 + (num - 2) * 257 + "px"
        }, function() {
            // for (var i = 0; i < num - containerNum; i++) {
            //     var newSelect = oneSelect.clone();
            //     newSelect.find("div.select-name").html(containerNum + i + 1);
            //     newSelect.find("div.container").prop("id", "option-container" + (containerNum + i + 1))
            //     optionEditContainer.before(newSelect);
            //     dragula([document.getElementById("option-container" + (containerNum + i + 1))]);
            // }
            dialogMultiSelectEdit.find("div.one-select").each(function(index) {
                    if (index < num) {
                        $(this).show();
                        // $(this).remove();
                    }
                })
                // 切换后面的options
            changeOptions(dialogMultiSelectEdit.find("div.container.active").children("div.option.active").parent().parent(), dialogMultiSelectEdit.find("div.container.active").children("div.option.active").prop("id"));
        });
    }
    if (num < containerNum) {
        dialogMultiSelectEdit.find("div.one-select").each(function(index) {
            if (index + 1 > num) {
                $(this).hide();
                // $(this).remove();
            }
        })
        dialogMultiSelectEdit.parent().animate({
            "width": 810 + (num - 2) * 257 + "px"
        });
    }


}

function editMulti(e) {
    // 模拟点击 只有target
    var target = $(e.currentTarget ? e.currentTarget : e.target);

    if (target.hasClass("active") && target.parent().hasClass("active")) {
        return;
    }

    // 切换后面的options
    changeOptions(target.parent().parent(), target.prop("id"));

    activeMulti(e);

    multiTitle = target.find("div.option-title");

    labelMulti = multiTitle.text();
    // 默认请选择 不可修改 只能删除 value=""
    labelInpMulti.val(labelMulti);
    labelMulti == "-- 请选择 --" ? valueInpMulti.parent().hide().prev().find("input").prop("disabled", true) : valueInpMulti.parent().show().prev().find("input").removeProp("disabled");
    // 都可以聚焦
    // valueInpMulti.get(0).focus();
    labelInpMulti.focus();

    valueMulti = multiTitle.data("value");
    valueInpMulti.val(valueMulti);
    // value 默认= label
    // valueInpMulti.val(valueMulti ? valueMulti : labelMulti == "-- 请选择 --" ? "" : labelMulti);
}

function activeMulti(e) {
    var target = $(e.currentTarget ? e.currentTarget : e.target);
    target.addClass("active").siblings().removeClass("active").parent().addClass("active").parent().siblings().find("div.container.active").removeClass("active");
}

function activeContainer(e) {
    var target = $(e.currentTarget ? e.currentTarget : e.target);
    // target.parent().next().addClass("active").parent().siblings().find("div.active").removeClass("active");
    // 不再激活container 
}

// 切换后面的options    e:当前one-select     order:当前id order
function changeOptions(e, order) {
    // 如果是 默认的 "-- 请选择 --"           indexOf 字符串是否包含  是 则 -1 == true  不是 则 0 == false    所以加!
    if (!order.indexOf("order-0")) {
        e.nextAll().find(".container").children().removeClass("active").hide().parent().find("div.option[id*='order-0']").show().addClass("active");
        return;
    }
    e.next().find(".container").children().removeClass("active").hide().parent().find("div.option[id*='" + order + "']").show().first().addClass("active");
    // 如果有后续选项
    if (e.next().length && e.next().css("display") == "block") {
        // 递归切换    默认选中第一个 所以 order+"-1"
        changeOptions(e.next(), order + "-1");
    }
}

function deleteMulti(e) {
    stopPropagation(e);
    var e = $(e.currentTarget);
    if (e.next("div.option-title").text() == "-- 请选择 --") return;
    if (e.parent().siblings(":visible").length < 1 || (e.parent().siblings(":visible").length == 1 && e.parent().siblings(":visible").find("div.option-title").text() == "-- 请选择 --")) {
        alert("至少要有一个选项!");
        return;
    }
    if (confirm("确认删除该选项吗? 后续联动选项将被一起删除!")) {
        e.parent().next().length ? e.parent().next().click() : e.parent().prev().click();
        // e.parent().remove();
        dialogMultiSelectEdit.find("div.option[id*=" + e.parent().prop("id") + "]").remove();
    }
}

function addMulti(initialOrder, json) {
    var activeContainer = dialogMultiSelectEdit.find("div.container.active");
    if (activeContainer.prop("id") != "option-container-1" && activeContainer.children("div.option:visible").length == 1 && activeContainer.children("div.option:visible").children("div.option-title").text() == "-- 请选择 --") return;
    var defaultMulti = componentsDialog.find("div.component-multi-option").clone();
    activeContainer.append(defaultMulti);
    // 当前 select 已增加   通过 container 的 id 判断层级  来增加所有后续 select 的 option
    var orderPrev = activeContainer.prop("id") == "option-container-1" ? "order" : activeContainer.parent().prev("div.one-select").find("div.option.active").prop("id");
    // var order = activeContainer.children("[id*=" + orderPrev + "]").length + 1;
    // // 可能因为删除 而已存在改该 id 的 option      所以 + 1
    var order = 1;
    if (activeContainer.prop("id") == "option-container-1") order -= 1;
    while (activeContainer.find("div#" + orderPrev + "-" + order).length) {
        order++;
    }

    defaultMulti.children("div.option-title").text(json ? json.label : orderPrev + "-" + order).data("value", json ? json.value : "");
    if (json && json.selected) defaultMulti.children("div.option-selected").addClass("option-selected-default");
    if (orderPrev.indexOf("0") != -1) defaultMulti.children("div.option-title").text("-- 请选择 --").next("div.option-selected").addClass("option-selected-default");
    defaultMulti.prop("id", orderPrev + "-" + order);
    // 初始所新增的 option  用来新增完后激活
    var initialOrder = initialOrder ? initialOrder : defaultMulti.prop("id");

    defaultMulti.click();
    if (activeContainer.parent().next("div.one-select").length) {
        if (json && json.children) {
            for (var i = 0; i < json.children.length; i++) {
                activeContainer.parent().next("div.one-select").children("div.container").addClass("active");
                activeContainer.removeClass("active");
                addMulti(initialOrder, json.children[i]);
            }
        } else {
            activeContainer.parent().next("div.one-select").children("div.container").addClass("active");
            activeContainer.removeClass("active");
            addMulti(initialOrder);
        }

    } else {
        dialogMultiSelectEdit.find("div#" + initialOrder).click();
    }
}

function saveMulti() {
    // TODO 应先判断 不能有相同的 labelMulti 和 value
    labelMulti = labelInpMulti.val();
    valueMulti = valueInpMulti.val();

    var same = false;
    dialogMultiSelectEdit.find("div.container.active").children("div.option.active").siblings().each(function () {
        if($(this).children("div.option-title").text() == labelMulti){
            alert('不能有相同的选项!');
            labelInpMulti.focus();
            same = true;
            return;
        }
        if ($(this).children("div.option-title").data("value") == valueMulti) {
            alert('不能有相同的值! 与选项( '+$(this).children("div.option-title").text()+' )的值相同!');
            valueInpMulti.focus();
            same = true;
            return;
        }
    })

    if(same)return false;
    
    multiTitle.html(labelMulti);
    multiTitle.data("value", valueMulti ? valueMulti : labelMulti == "-- 请选择 --" ? "" : labelMulti);

    // 阻止form提交跳转
    return false;
}

function selecteMulti(e) {
    stopPropagation(e);
    var e = $(e.currentTarget ? e.currentTarget : e.target);
    e.addClass("option-selected-default").parent().siblings().find("div.option-selected").removeClass("option-selected-default");
    e.prev().data("selected", "selected").parent().siblings().find("div.option-title").data("selected", "");
}


// 获取选项信息 组成josn    一旦有 option 未填写完整 , 点击触发浏览器非空提示 , 然后不停返回 return false , 阻止方法执行
function completeMultis() {
    var options = dialogMultiSelectEdit.find("div.container").first().children("div.option");
    multiJson = { num: dialogMultiSelectEdit.find("div.container:visible").length, data: getoptionJson(options) };

    if (!multiJson.data) {
        return;
    }
    
    console.log(multiJson);
    console.log(JSON.stringify(multiJson));
    rightMultiSelect.find("button.button-open-dialog").data("multiJson", multiJson);
    closeDialog();
}

function getoptionJson(options) {
    var complete = true;
    var orderJson = [];
    options.each(function(i) {
        var optionId = $(this).prop("id");
        orderJson[i] = {
            label: $(this).children("div.option-title").text(),
            value: $(this).children("div.option-title").data("value") ? $(this).children("div.option-title").data("value") : "",
            selected: $(this).children("div.option-selected").hasClass("option-selected-default") ? "selected" : "",
        };
        if (!orderJson[i].label || (!orderJson[i].value && orderJson[i].label != "-- 请选择 --")) {
            $(this).click();
            saveMultiBtn.click();
            complete = false;
            return false;
        }
        if ($(this).closest("div.one-select").next("div.one-select:visible").length) {
            var roderChildren = getoptionJson($(this).closest("div.one-select").next("div.one-select:visible").find("div.option[id*=" + optionId + "]"));
            if (!roderChildren) {
                complete = false;
                return false;
            }
            orderJson[i].children = roderChildren;
        }
    })
    if (!complete) {
        return false;
    }
    return orderJson;
}



$(function() {

    // 初始化option拖拽
    // dragula([document.getElementsByClassName("option-container")]);无效,必须id
    // dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);
    dragula([document.getElementById("option-container-1")]);
    dragula([document.getElementById("option-container-2")]);
    dragula([document.getElementById("option-container-3")]);
    dragula([document.getElementById("option-container-4")]);
    dragula([document.getElementById("option-container-5")]);
    // 激活第一个option
    dialogMultiSelectEdit.find("div.option").first().click();
})