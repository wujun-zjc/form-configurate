var dialogSelectEdit = $("div.dialog-select-edit").find("div.dialog-main");
var valueInp = dialogSelectEdit.find("input.value");
var labelInp = dialogSelectEdit.find("input.label");
var saveOptionBtn = dialogSelectEdit.find("div.option-edit").find("button.save");
var optionContainer = componentsDialog.find("div.component-option-container").clone();

var optionTitle = null;
var label = "";
var value = "";
var selected = "";
var optionJson = [];
var optionDefaultJson = [{
    label: "-- 请选择 --",
    value: "",
    selected: "selected"
}, {
    label: "选项一",
    value: "",
    selected: ""
}, {
    label: "选项二",
    value: "",
    selected: ""
}, {
    label: "选项三",
    value: "",
    selected: ""
}];

function openOptionDialog(e, type) {
    openDialog(type);
    optionJson = $(e.currentTarget).data("optionJson");
    optionJson = optionJson ? optionJson : optionDefaultJson;
    
    dialogSelectEdit.find("div.container.active").html("");
    for (var i = 0; i < optionJson.length; i++) {
        var defaultOption = componentsDialog.find("div.component-option").clone();
        optionTitle = defaultOption.find("div.option-title");
        optionTitle.html(optionJson[i][0]);
        optionTitle.data("value", optionJson[i][1]);
        // 默认选项
        optionJson[i][2] == "selected" ? optionTitle.data("selected", "selected") : optionTitle.data("selected", "");
        optionJson[i][2] == "selected" ? optionTitle.next().addClass("option-selected-default") : false;

        dialogSelectEdit.find("div.container.active").append(defaultOption);
    }
    // 激活第一个option
    dialogSelectEdit.find("div.option").first().click();
}

function editOption(e) {
    // 模拟点击 只有target
    var target = $(e.currentTarget ? e.currentTarget : e.target);

    if (target.hasClass("active")) {
        return;
    }
    activeOption(e);

    optionTitle = target.find("div.option-title");

    label = optionTitle.html();
    // 默认请选择 不可修改 只能删除 value=""
    labelInp.val(label);
    label == "-- 请选择 --" ? valueInp.parent().hide().prev().find("input").prop("disabled", true) : valueInp.parent().show().prev().find("input").removeProp("disabled");
    // 都可以聚焦
    // labelInp.get(0).focus();
    labelInp.focus();

    value = optionTitle.data("value");
    valueInp.val(value);
    // value 默认= label
    // valueInp.val(value ? value : label == "-- 请选择 --" ? "" : label);
}

function activeOption(e) {
    var target = $(e.currentTarget ? e.currentTarget : e.target);
    target.addClass("active").siblings().removeClass("active").find("div.active").removeClass("active");
}

function deleteOption(e) {
    stopPropagation(e);
    var e = $(e.currentTarget);
    if (e.parent().siblings().length < 2) {
        alert("至少要有两个选项!");
        return;
    }
    e.parent().next().length ? e.parent().next().click() : e.parent().prev().click();
    e.parent().remove();
}


function addOption() {
    var defaultOption = componentsDialog.find("div.component-option").clone();
    dialogSelectEdit.find("div.container.active").append(defaultOption);
    defaultOption.click();
}

function saveOption() {
    // TODO 应先判断 不能与相同的 label 和 value
    label = labelInp.val();
    value = valueInp.val();
    optionTitle.html(label);
    optionTitle.data("value", value);
    // optionTitle.data("value", value ? value : label == "-- 请选择 --" ? "" : label);

    // 阻止form提交跳转
    return false;
}

function selectedOption(e) {
    stopPropagation(e);
    var e = $(e.currentTarget ? e.currentTarget : e.target);
    e.addClass("option-selected-default").parent().siblings().find("div.option-selected").removeClass("option-selected-default");
    e.prev().data("selected", "selected").parent().siblings().find("div.option-title").data("selected", "");
}

function completeOptions() {
    var complete = true;
    optionJson = [];
    dialogSelectEdit.find("div.option").each(function (index) {

        label = $(this).find("div.option-title").html();
        value = $(this).find("div.option-title").data("value");
        selected = $(this).find("div.option-title").data("selected");
        selected = selected ? selected : "";
        // value = value ? value : label == "-- 请选择 --" ? "" : label;
        if (!label || (!value && label != "-- 请选择 --")) {
            $(this).click();
            saveOptionBtn.click();
            complete = false;
            return false;
        }

        optionJson[index] = [
            label,
            value,
            selected
        ];

    })
    if (complete) {
        if (optionJson.length < 2) {
            alert("至少要有两个选项!");
            return;
        }
        // 将 选项数据 存到 弹窗按钮
        rightSelect.find("button.button-open-dialog").data("optionJson", optionJson);

        closeDialog();
    }
}


function initDialog(type) {
    switch (type) {
        case "dialog-select-edit":

            // 初始化option拖拽
            // dragula([document.getElementsByClassName("option-container")]);无效,必须id
            // dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);
            dragula([document.getElementById("option-container")]);
            // 激活第一个option
            dialogSelectEdit.find("div.option").first().click();

            break;

        default:
            break;
    }
}



$(function () {

    // 初始化option拖拽
    // dragula([document.getElementsByClassName("option-container")]);无效,必须id
    // dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);
    dragula([document.getElementById("option-container")]);
    // 激活第一个option
    dialogSelectEdit.find("div.option").first().click();
})