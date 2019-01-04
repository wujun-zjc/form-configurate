var dialogRadioEdit = $("div.dialog-radio-edit").find("div.dialog-main");
var valueInpRadio = dialogRadioEdit.find("input.value");
var labelInpRadio = dialogRadioEdit.find("input.label");
var saveRadioBtn = dialogRadioEdit.find("div.option-edit").find("button.save");
var radioContainer = componentsDialog.find("div.component-radio-container").clone();

var radioTitle = null;
var labelRadio = "";
var valueRadio = "";
var selectedRadio = "";
var radioJson = [];

function openRadioDialog(e, type) {
    openDialog(type);
    radioJson = $(e.currentTarget).data("radioJson");
    // 修改过选项   才替换选项内容
    if (radioJson.length > 1) {
        dialogRadioEdit.find("div.container.active").html("");
        for (var i = 0; i < radioJson.length; i++) {
            var defaultRadio = componentsDialog.find("div.component-radio-default").clone();
            radioTitle = defaultRadio.find("div.option-title");
            radioTitle.html(radioJson[i][0]);
            radioTitle.data("value", radioJson[i][1]);
            // 默认选项
            radioJson[i][2] == "selected" ? radioTitle.data("selected", "selected") : radioTitle.data("selected", "");
            radioJson[i][2] == "selected" ? radioTitle.next().addClass("option-selected-default") : false;

            dialogRadioEdit.find("div.container.active").append(defaultRadio);
        }
        // 激活第一个option
        dialogRadioEdit.find("div.option").first().click();
        // 未修改过选项    还原    防止修改后点击其他
    } else {
        dialogRadioEdit.find("div.container.active").html(radioContainer.html());
        // 激活第一个option 并使其成为默认选项
        dialogRadioEdit.find("div.option").first().click().find("div.option-selected").click();
    }
}

function editRadio(e) {
    // 模拟点击 只有target
    var target = $(e.currentTarget ? e.currentTarget : e.target);

    if (target.hasClass("active")) {
        return;
    }
    activeRadio(e);

    radioTitle = target.find("div.option-title");

    labelRadio = radioTitle.html();
    // 默认 radio
    labelInpRadio.val(labelRadio);
    // 都可以聚焦
    // labelInpRadio.get(0).focus();
    labelInpRadio.focus();

    valueRadio = radioTitle.data("value");
    // value 默认= label
    // valueInpRadio.val(value);
    valueInpRadio.val(valueRadio);
}

function activeRadio(e) {
    var target = $(e.currentTarget ? e.currentTarget : e.target);
    target.addClass("active").siblings().removeClass("active").find("div.active").removeClass("active");
}

function deleteRadio(e) {
    stopPropagation(e);
    var e = $(e.currentTarget);
    if(e.parent().siblings().length<2){
        alert("至少要有两个选项!");
        return;
    }
    e.parent().next().length ? e.parent().next().click() : e.parent().prev().click();
    e.parent().remove();
}


function addRadio() {
    var defaultRadio = componentsDialog.find("div.component-radio-default").clone();
    dialogRadioEdit.find("div.container.active").append(defaultRadio);
    defaultRadio.click();
}

function saveRadio() {
    // TODO 应先判断 不能与相同的 label 和 value
    labelRadio = labelInpRadio.val();
    valueRadio = valueInpRadio.val();
    radioTitle.html(labelRadio);
    radioTitle.data("value", valueRadio);

    // 阻止form提交跳转
    return false;
}

function selectRadio(e) {
    stopPropagation(e);
    var e = $(e.currentTarget ? e.currentTarget : e.target);
    e.addClass("option-selected-default").parent().siblings().find("div.option-selected").removeClass("option-selected-default");
    e.prev().data("selected", "selected").parent().siblings().find("div.option-title").data("selected", "");
}

function completeRadio() {
    var complete = true;
    radioJson = [];
    dialogRadioEdit.find("div.option").each(function (index) {

        labelRadio = $(this).find("div.option-title").html();
        valueRadio = $(this).find("div.option-title").data("value");
        selectedRadio = $(this).find("div.option-title").data("selected");
        selectedRadio = selectedRadio ? selectedRadio : "";
        if (!labelRadio||!valueRadio) {
            $(this).click();
            saveRadioBtn.click();
            complete = false;
            return false;
        }

        radioJson[index] = [
            labelRadio,
            valueRadio,
            selectedRadio
        ];

    })
    if (complete) {
        if (radioJson.length < 2) {
            alert("至少要有两个选项!");
            return;
        }
        // 将 选项数据 存到 弹窗按钮
        rightRadio.find("button.button-open-dialog").data("radioJson", radioJson);

        closeDialog();
    }
}



$(function () {

    // 初始化option拖拽
    // dragula([document.getElementsByClassName("option-container")]);无效,必须id
    // dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);
    dragula([document.getElementById("radio-container")]);
    // 激活第一个option
    dialogRadioEdit.find("div.option").first().click();
})