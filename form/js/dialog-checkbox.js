var dialogCheckboxEdit = $("div.dialog-checkbox-edit").find("div.dialog-main");
var valueInpCheckbox = dialogCheckboxEdit.find("input.value");
var labelInpCheckbox = dialogCheckboxEdit.find("input.label");
var saveCheckboxBtn = dialogCheckboxEdit.find("div.option-edit").find("button.save");
var checkboxContainer = componentsDialog.find("div.component-checkbox-container").clone();

var checkboxTitle = null;
var labelCheckbox = "";
var valueCheckbox = "";
var selectedCheckbox = "";
var checkboxJson = [];

function openCheckboxDialog(e, type) {
    openDialog(type);
    checkboxJson = $(e.currentTarget).data("checkboxJson");
    // 修改过选项   才替换选项内容
    if (checkboxJson.length > 1) {
        dialogCheckboxEdit.find("div.container.active").html("");
        for (var i = 0; i < checkboxJson.length; i++) {
            var defaultCheckbox = componentsDialog.find("div.component-checkbox-default").clone();
            checkboxTitle = defaultCheckbox.find("div.option-title");
            checkboxTitle.html(checkboxJson[i][0]);
            checkboxTitle.data("value", checkboxJson[i][1]);
            // 默认选项
            checkboxJson[i][2] == "selected" ? checkboxTitle.data("selected", "selected") : checkboxTitle.data("selected", "");
            checkboxJson[i][2] == "selected" ? checkboxTitle.next().addClass("option-selected-default") : false;

            dialogCheckboxEdit.find("div.container.active").append(defaultCheckbox);
        }
        // 激活第一个option
        dialogCheckboxEdit.find("div.option").first().click();
        // 未修改过选项    还原    防止修改后点击其他
    } else {
        dialogCheckboxEdit.find("div.container.active").html(checkboxContainer.html());
        // 激活第一个option 并使其成为默认选项
        dialogCheckboxEdit.find("div.option").first().click().find("div.option-selected").click();
    }
}

function editCheckbox(e) {
    // 模拟点击 只有target
    var target = $(e.currentTarget ? e.currentTarget : e.target);

    if (target.hasClass("active")) {
        return;
    }
    activeCheckbox(e);

    checkboxTitle = target.find("div.option-title");

    labelCheckbox = checkboxTitle.html();
    // 默认 checkbox
    labelInpCheckbox.val(labelCheckbox);
    // 都可以聚焦
    // labelInpCheckbox.get(0).focus();
    labelInpCheckbox.focus();

    valueCheckbox = checkboxTitle.data("value");
    // value 默认= label
    // valueInpCheckbox.val(value);
    valueInpCheckbox.val(valueCheckbox);
}

function activeCheckbox(e) {
    var target = $(e.currentTarget ? e.currentTarget : e.target);
    target.addClass("active").siblings().removeClass("active").find("div.active").removeClass("active");
}

function deleteCheckbox(e) {
    stopPropagation(e);
    var e = $(e.currentTarget);
    if (e.parent().siblings().length < 2) {
        alert("至少要有两个选项!");
        return;
    }
    e.parent().next().length ? e.parent().next().click() : e.parent().prev().click();
    e.parent().remove();
}


function addCheckbox() {
    var defaultCheckbox = componentsDialog.find("div.component-checkbox-default").clone();
    dialogCheckboxEdit.find("div.container.active").append(defaultCheckbox);
    defaultCheckbox.click();
}

function saveCheckbox() {
    // TODO 应先判断 不能与相同的 label 和 value
    labelCheckbox = labelInpCheckbox.val();
    valueCheckbox = valueInpCheckbox.val();
    checkboxTitle.html(labelCheckbox);
    checkboxTitle.data("value", valueCheckbox);

    // 阻止form提交跳转
    return false;
}

function selectCheckbox(e) {
    stopPropagation(e);
    var e = $(e.currentTarget ? e.currentTarget : e.target);
    e.toggleClass("option-selected-default");
    if (e.hasClass("option-selected-default")) {
        e.prev().data("selected", "selected");
        return;
    }
    
    e.prev().data("selected", "");
}

function completeCheckbox() {
    var complete = true;
    checkboxJson = [];
    dialogCheckboxEdit.find("div.option").each(function (index) {

        labelCheckbox = $(this).find("div.option-title").html();
        valueCheckbox = $(this).find("div.option-title").data("value");
        selectedCheckbox = $(this).find("div.option-title").data("selected");
        selectedCheckbox = selectedCheckbox ? selectedCheckbox : "";
        if (!labelCheckbox || !valueCheckbox) {
            $(this).click();
            saveCheckboxBtn.click();
            complete = false;
            return false;
        }

        checkboxJson[index] = [
            labelCheckbox,
            valueCheckbox,
            selectedCheckbox
        ];

    })
    if (complete) {
        if (checkboxJson.length < 2) {
            alert("至少要有两个选项!");
            return;
        }
        // 将 选项数据 存到 弹窗按钮
        rightCheckbox.find("button.button-open-dialog").data("checkboxJson", checkboxJson);

        closeDialog();
    }
}



$(function () {

    // 初始化option拖拽
    // dragula([document.getElementsByClassName("option-container")]);无效,必须id
    // dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);
    dragula([document.getElementById("checkbox-container")]);
    // 激活第一个option
    dialogCheckboxEdit.find("div.option").first().click();
})