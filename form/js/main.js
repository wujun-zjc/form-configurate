// var app = angular.module('app',[]);
// app.controller('ctrl',function($scope){
//     // var html = document.html.html();

// })

var viewMain = $("div#view-main");
var footerButton = viewMain.find("div.footer-button");

var templatesDialog = $("div.dialog-templates");
var dialogMain = templatesDialog.find("div.dialog-main");

var rightMain = $("div.right-main");
var rightArea = rightMain.find("div.right-area");
var rightInput = rightMain.find("div.right-input");
var rightSelect = rightMain.find("div.right-select");
var rightMultiSelect = rightMain.find("div.right-multi-select");
// var rightMultiSelect = rightMain.find("div.right-linkage-select");
var rightRadio = rightMain.find("div.right-radio");
var rightCheckbox = rightMain.find("div.right-checkbox");
var rightTextarea = rightMain.find("div.right-textarea");
var rightDate = rightMain.find("div.right-date");
var rightTable = rightMain.find("div.right-table");
var rightColumn = rightMain.find("div.right-column");
var rightButtonSubmit = rightMain.find("div.right-button-submit");
var rightAdress = rightMain.find("div.right-adress");
var rightTimeRange = rightMain.find("div.right-time-range");

var componentsDialog = $("div.dialog-components");

var viewMainClone = null;

// 存储当前属性         no use
var pageSubmitUrl = "";
var areaCurrentAttr = "";
var inputCurrentAttr = {};




function openDialog(type) {
    // $("div.dialog." + type).fadeIn();
    $("div.dialog." + type).show();
    // $("div.dialog." + type).css("display", "block");
    // 初始化弹窗
    // initDialog(type);
}

function closeDialog() {
    $("div.dialog").fadeOut();
    // $("div.dialog").css("display", "none");
}

// left    列表打开折叠
function openCloseLeft(e) {
    $(e.currentTarget).find(".title-icon").toggleClass("icon-close");
    $(e.currentTarget).next().slideToggle();
    // $(e.currentTarget).next().toggleClass("height");
}

// 打开元素对应属性编辑栏
function openAttr(e) {
    stopPropagation(e);

    if ($(e.currentTarget).hasClass("active")) {
        return;
    }

    // 置空 之前输入的属性      no use
    // rightMain.find("button.clear").click();
    // document.getElementById("form").reset();

    // 展示目前属性

    //  编辑区域标题
    if ($(e.currentTarget).hasClass("edit")) {
        viewMain.find("div.active").removeClass("active");
        $(e.currentTarget).closest("div.form-area").addClass("active");
        // rightArea.removeClass("none").siblings().addClass("none");
        rightArea.animate({
            "width": "260px"
        }).addClass("right-active").siblings().animate({
            "width": 0
        }).removeClass("right-active");

        areaCurrentAttr = $(e.currentTarget).parent().siblings("span.area-title").text();
        rightArea.find("input.text").val(areaCurrentAttr);
        return;
    }

    // 先视觉选中   区域通过button打开
    active(e);

    var e = $(e.currentTarget);

    // 通用     动画 和 字段
    // console.log(e.prop("class"));
    // console.log(e.prop("class").split(" "));
    // console.log(e.prop("class").split(" ")[1].split("-")[1]);
    // var secondClass = e.prop("class").split(" ")[1].split("-")[1];

    // 列表内 则 不要 字段
    if (e.parent().is("td")) {
        rightMain.find("input.text").removeProp('required').parent().hide();
    } else {
        rightMain.find("input.text").prop('required', true).parent().show();
    }

    if (e.hasClass("component-input")) {
        // rightInput.removeClass("none").siblings().addClass("none");
        rightInput.animate({
            "width": "260px"
        }).addClass("right-active").siblings().animate({
            "width": 0
        }).removeClass("right-active");


        var text = e.find("span.span-text").text();

        e = e.find("input");

        var id = e.prop("id");
        var name = e.prop("name");
        var placeholder = e.prop("placeholder");
        var disabled = e.prop("disabled");
        var url = e.data("url");
        var required = e.prop("required");

        rightInput.find("input.text").val(text);
        rightInput.find("input.id").val(id);
        rightInput.find("input.name").val(name);
        rightInput.find("input.placeholder").val(placeholder);

        // 是否隐藏,是否必选    url
        disabled == true ? rightInput.find("div.url-component").show().find('select.url-input').prop('required', true) : rightInput.find("div.url-component").hide().find('select.url-input').removeProp('required');

        // 选中对应值
        // disabled == true ? rightInput.find("input[name=disabled][value='true']").prop("checked", true) : rightInput.find("input[name=disabled][value='false']").prop("checked", true);
        // url ? rightInput.find("select.url-input").val(url) : rightInput.find("select.url-input").val('');
        // required == true ? rightInput.find("input[name=required][value='true']").prop("checked", true) : rightInput.find("input[name=required][value='false']").prop("checked", true);

        // 优化写法
        rightInput.find("input[name=readOnly][value='" + (disabled == true) + "']").prop("checked", true);
        rightInput.find("select.url-input").val(url ? url : "");
        rightInput.find("input[name=required][value='" + (required == true) + "']").prop("checked", true);

        // 存好属性,以便重置
        inputCurrentAttr = {
            text: text,
            id: id,
            name: name,
            placeholder: placeholder,
        };


    } else if (e.hasClass("component-select")) {
        // rightSelect.removeClass("none").siblings().addClass("none");
        rightSelect.animate({
            "width": "260px"
        }).addClass("right-active").siblings().animate({
            "width": 0
        }).removeClass("right-active");


        var text = e.find("span.span-text").text();

        e = e.find("select");

        var id = e.prop("id");
        var name = e.prop("name");
        var readOnly = e.prop("disabled");
        var required = e.prop("required");
        var url = e.data("url");
        var optionType = e.data("optionType");
        var optionsUrl = e.data("optionsUrl");
        var optionJson = [];

        rightSelect.find("input.text").val(text);
        rightSelect.find("input.id").val(id);
        rightSelect.find("input.name").val(name);

        // if (readOnly == true) {
        //     // 选中对应值   只读/输入
        //     rightSelect.find("input[name=readOnly][value='true']").prop("checked", true);
        //     // 是否隐藏,是否必选    url-select  // 选中对应值   url-select
        //     rightSelect.find("div.url-component").show().find('select.url-select').prop('required', true).val(url);
        // } else {
        //     rightSelect.find("input[name=readOnly][value='false']").prop("checked", true);
        //     rightSelect.find("div.url-component").hide().find('select.url-select').removeProp('required').val('');
        // }
        // 优化写法
        rightSelect.find("input[name=readOnly][value='" + (readOnly == true) + "']").prop("checked", true);
        readOnly == true ? rightSelect.find("div.url-component").show().find('select.url-select').prop('required', true).val(url) : rightSelect.find("div.url-component").hide().find('select.url-select').removeProp('required').val('');

        if (optionType == "static" || !optionType) {
            // 选中对应值   选项类型 固定/加载
            rightSelect.find("input[name=optionType][value='static']").prop("checked", true);
            // 是否隐藏,是否必选    url-select
            rightSelect.find("div.option-edit-component").show();
            rightSelect.find("div.option-url-component").hide().find('select.url-options').removeProp('required');

            // 将options数据转为optionJson存在 编辑选项 按钮
            var opitons = e.find("option");
            opitons.each(function (index) {
                var label = $(this).html();
                var value = $(this).val();
                var selected = $(this).prop("selected") ? "selected" : "";
                optionJson.push([label, value, selected]);
            });
            rightSelect.find("button.button-open-dialog").data("optionJson", optionJson);
            // 选中对应值   url-options
            rightSelect.find("select.url-options").val("");
        } else {
            // 选中对应值   选项类型 固定/加载
            rightSelect.find("input[name=optionType][value='load']").prop("checked", true);
            // 是否隐藏,是否必选    url-options     // 选中对应值   url-options
            rightSelect.find("div.option-edit-component").hide();
            rightSelect.find("div.option-url-component").show().find('select.url-options').prop('required', true).val(optionsUrl);
        }

        // // 是否必填
        // required == true ? rightSelect.find("input[name=required][value='true']").prop("checked", true) : rightSelect.find("input[name=required][value='false']").prop("checked", true);
        // 优化写法
        rightSelect.find("input[name=required][value='" + (required == true) + "']").prop("checked", true);

    } else if (e.hasClass("component-multi-select")) {
        // rightSelect.removeClass("none").siblings().addClass("none");
        rightMultiSelect.animate({
            "width": "260px"
        }).addClass("right-active").siblings().animate({
            "width": 0
        }).removeClass("right-active");


        var text = e.find("span.span-text").text();

        e = e.find("select");

        var id = e.prop("id");
        var name = e.prop("name");
        var readOnly = e.prop("readOnly");
        var required = e.prop("required");
        var url = e.data("url");
        var optionType = e.data("optionType");
        var optionsUrl = e.data("optionsUrl");
        var optionJson = [];

        rightMultiSelect.find("input.text").val(text);
        rightMultiSelect.find("input.id").val(id);
        rightMultiSelect.find("input.name").val(name);

        // if (readOnly == true) {
        //     // 选中对应值   只读/输入
        //     rightMultiSelect.find("input[name=readOnly][value='true']").prop("checked", true);
        //     // 是否隐藏,是否必选    url-select  // 选中对应值   url-select
        //     rightMultiSelect.find("div.url-component").show().find('select.url-select').prop('required', true).val(url);
        // } else {
        //     rightMultiSelect.find("input[name=readOnly][value='false']").prop("checked", true);
        //     rightMultiSelect.find("div.url-component").hide().find('select.url-select').removeProp('required').val('');
        // }
        // 优化写法
        rightMultiSelect.find("input[name=readOnly][value='" + (readOnly == true) + "']").prop("checked", true);
        readOnly == true ? rightMultiSelect.find("div.url-component").show().find('select.url-select').prop('required', true).val(url) : rightMultiSelect.find("div.url-component").hide().find('select.url-select').removeProp('required').val('');

        if (optionType == "static" || !optionType) {
            // 选中对应值   选项类型 固定/加载
            rightMultiSelect.find("input[name=optionType][value='static']").prop("checked", true);
            // 是否隐藏,是否必选    url-select
            rightMultiSelect.find("div.option-edit-component").show();
            rightMultiSelect.find("div.option-url-component").hide().find('select.url-options').removeProp('required');

            // 将options数据转为optionJson存在 编辑选项 按钮
            var opitons = e.find("option");
            opitons.each(function (index) {
                var label = $(this).html();
                var value = $(this).val();
                var selected = $(this).prop("selected") ? "selected" : "";
                optionJson.push([label, value, selected]);
            });
            rightMultiSelect.find("button.button-open-dialog").data("optionJson", optionJson);
            // 选中对应值   url-options
            rightMultiSelect.find("select.url-options").val("");
        } else {
            // 选中对应值   选项类型 固定/加载
            rightMultiSelect.find("input[name=optionType][value='load']").prop("checked", true);
            // 是否隐藏,是否必选    url-options     // 选中对应值   url-options
            rightMultiSelect.find("div.option-edit-component").hide();
            rightMultiSelect.find("div.option-url-component").show().find('select.url-options').prop('required', true).val(optionsUrl);
        }

        // // 是否必填
        // required == true ? rightMultiSelect.find("input[name=required][value='true']").prop("checked", true) : rightMultiSelect.find("input[name=required][value='false']").prop("checked", true);
        // 优化写法
        rightMultiSelect.find("input[name=required][value='" + (required == true) + "']").prop("checked", true);

        rightMultiSelect.find("select").removeProp('required');

    } else if (e.hasClass("component-radio")) {
        // rightRadio.removeClass("none").siblings().addClass("none");
        rightRadio.animate({
            "width": "260px"
        }).addClass("right-active").siblings().animate({
            "width": 0
        }).removeClass("right-active");


        var text = e.find("span.span-text").text();
        var radioJson = [];

        // 将radios数据转为radioJson存在 编辑选项 按钮
        var radios = e.find("div.radio-box");
        radios.each(function (index) {
            var labelRadio = $(this).find("label").html();
            var valueRadio = $(this).find("input").val();
            var selectedRadio = $(this).find("input").prop("checked") ? "selected" : "";
            radioJson.push([labelRadio, valueRadio, selectedRadio]);
        });
        rightRadio.find("button.button-open-dialog").data("radioJson", radioJson);

        e = e.find("input").first();

        // var id = e.prop("id");
        var name = e.prop("name");
        var readOnly = e.prop("readOnly");
        var url = e.data("url");
        var required = e.prop("required");

        rightRadio.find("input.text").val(text);
        // rightRadio.find("input.id").val(id);
        rightRadio.find("input.name").val(name);

        // 是否隐藏,是否必选    url
        readOnly == true ? rightRadio.find("div.url-component").show().find('select.url-radio').prop('required', true) : rightRadio.find("div.url-component").hide().find('select.url-radio').removeProp('required');

        // // 选中对应值
        // readOnly == true ? rightRadio.find("input[name=readOnly][value='true']").prop("checked", true) : rightRadio.find("input[name=readOnly][value='false']").prop("checked", true);
        // url ? rightRadio.find("select.url-radio").val(url) : rightRadio.find("select.url-radio").val('');
        // required == true ? rightRadio.find("input[name=required][value='true']").prop("checked", true) : rightRadio.find("input[name=required][value='false']").prop("checked", true);
        // 优化写法
        rightRadio.find("input[name=readOnly][value='" + (readOnly == true) + "']").prop("checked", true);
        rightRadio.find("select.url-radio").val(url ? url : "");
        rightRadio.find("input[name=required][value='" + (required == true) + "']").prop("checked", true);
    } else if (e.hasClass("component-checkbox")) {
        // rightCheckbox.removeClass("none").siblings().addClass("none");
        rightCheckbox.animate({
            "width": "260px"
        }).addClass("right-active").siblings().animate({
            "width": 0
        }).removeClass("right-active");


        var text = e.find("span.span-text").text();
        var checkboxJson = [];

        // checkbox 编辑选项 按钮
        var checkboxs = e.find("div.checkbox-box");
        checkboxs.each(function (index) {
            var labelCheckbox = $(this).find("label").html();
            var valueCheckbox = $(this).find("input").val();
            var selectedCheckbox = $(this).find("input").prop("checked") ? "selected" : "";
            checkboxJson.push([labelCheckbox, valueCheckbox, selectedCheckbox]);
        });
        rightCheckbox.find("button.button-open-dialog").data("checkboxJson", checkboxJson);

        e = e.find("input").first();

        // var id = e.prop("id");
        var name = e.prop("name");
        var readOnly = e.prop("readOnly");
        var url = e.data("url");
        var required = e.prop("required");

        rightCheckbox.find("input.text").val(text);
        // rightCheckbox.find("input.id").val(id);
        rightCheckbox.find("input.name").val(name);

        // 是否隐藏,是否必选    url
        readOnly == true ? rightCheckbox.find("div.url-component").show().find('select.url-checkbox').prop('required', true) : rightCheckbox.find("div.url-component").hide().find('select.url-checkbox').removeProp('required');

        // // 选中对应值
        // readOnly == true ? rightCheckbox.find("input[name=readOnly][value='true']").prop("checked", true) : rightCheckbox.find("input[name=readOnly][value='false']").prop("checked", true);
        // url ? rightCheckbox.find("select.url-checkbox").val(url) : rightCheckbox.find("select.url-checkbox").val('');
        // required == true ? rightCheckbox.find("input[name=required][value='true']").prop("checked", true) : rightCheckbox.find("input[name=required][value='false']").prop("checked", true);
        // 优化写法
        rightCheckbox.find("input[name=readOnly][value='" + (readOnly == true) + "']").prop("checked", true);
        rightCheckbox.find("select.url-input").val(url ? url : "");
        rightCheckbox.find("input[name=required][value='" + (required == true) + "']").prop("checked", true);
    } else if (e.hasClass("component-textarea")) {
        // rightTextarea.removeClass("none").siblings().addClass("none");
        rightTextarea.animate({
            "width": "260px"
        }).addClass("right-active").siblings().animate({
            "width": 0
        }).removeClass("right-active");


        var text = e.find("span.span-text").text();

        e = e.find("textarea");

        var id = e.prop("id");
        var name = e.prop("name");
        var placeholder = e.prop("placeholder");
        var readOnly = e.prop("disabled");
        var required = e.prop("required");
        var rows = e.attr("rows");
        var maxlength = e.attr("maxlength");
        var url = e.data("url");

        rightTextarea.find("input.text").val(text);
        rightTextarea.find("input.id").val(id);
        rightTextarea.find("input.name").val(name);
        rightTextarea.find("input.placeholder").val(placeholder);
        rightTextarea.find("input.rows").val(rows);
        rightTextarea.find("input.maxlength").val(maxlength);

        // 是否隐藏,是否必选    url
        readOnly == true ? rightTextarea.find("div.url-component").show().find('select.url-textarea').prop('required', true) : rightTextarea.find("div.url-component").hide().find('select.url-textarea').removeProp('required');

        // // 选中对应值
        // readOnly == true ? rightTextarea.find("input[name=readOnly][value='true']").prop("checked", true) : rightTextarea.find("input[name=readOnly][value='false']").prop("checked", true);
        // url ? rightTextarea.find("select.url-textarea").val(url) : rightTextarea.find("select.url-textarea").val('');
        // required == true ? rightTextarea.find("input[name=required][value='true']").prop("checked", true) : rightTextarea.find("input[name=required][value='false']").prop("checked", true);
        // 优化写法
        rightTextarea.find("input[name=readOnly][value='" + (readOnly == true) + "']").prop("checked", true);
        rightTextarea.find("select.url-input").val(url ? url : "");
        rightTextarea.find("input[name=required][value='" + (required == true) + "']").prop("checked", true);

    } else if (e.hasClass("component-date")) {
        // rightDate.removeClass("none").siblings().addClass("none");
        rightDate.animate({
            "width": "260px"
        }).addClass("right-active").siblings().animate({
            "width": 0
        }).removeClass("right-active");


        var text = e.find("span.span-text").text();

        e = e.find("input");

        // var id = e.prop("id");
        var name = e.prop("name");
        var placeholder = e.prop("placeholder");
        var readOnly = e.prop("readOnly");
        var required = e.prop("required");
        var setting = JSON.parse(e.attr("onclick").split("(")[1].split(")")[0]);
        var url = e.data("url");
        var rangeType = e.data("rangeType");
        var defaultDate = e.data("defaultDate");

        rightDate.find("input.text").val(text);
        // rightDate.find("input.id").val(id);
        rightDate.find("input.name").val(name);
        rightDate.find("input.placeholder").val(placeholder);

        // 取值范围 rangeType       .find('select.url-date').prop('required', true)   .find('select.url-date').removeProp('required')
        if (rangeType == "default" || !rangeType) {
            rightDate.find("input[name=dateRange][value='default']").prop("checked", true);
            rightDate.find("div.range-default-component").show().next().hide();
            rightDate.find("div.range-default-component").find("select.defaultDate").val(defaultDate);
        } else {
            rightDate.find("input[name=dateRange][value='manual']").prop("checked", true);
            rightDate.find("div.range-manual-component").show().prev().hide();
            rightDate.find("div.range-manual-component").find("input.start-date").val(setting.minDate).next().val(setting.maxDate);
        }
        // 是否隐藏,是否必选    url
        readOnly == true ? rightDate.find("div.url-component").show().find('select.url-date').prop('required', true) : rightDate.find("div.url-component").hide().find('select.url-date').removeProp('required');

        // // 选中对应值
        // readOnly == true ? rightDate.find("input[name=readOnly][value='true']").prop("checked", true) : rightDate.find("input[name=readOnly][value='false']").prop("checked", true);
        // url ? rightDate.find("select.url-date").val(url) : rightDate.find("select.url-date").val('');
        // required == true ? rightDate.find("input[name=required][value='true']").prop("checked", true) : rightDate.find("input[name=required][value='false']").prop("checked", true);

        // 优化写法
        rightDate.find("input[name=readOnly][value='" + (readOnly == true) + "']").prop("checked", true);
        rightDate.find("select.url-input").val(url ? url : "");
        rightDate.find("input[name=required][value='" + (required == true) + "']").prop("checked", true);




    } else if (e.hasClass("component-table")) {
        // rightButtonSubmit.removeClass("none").siblings().addClass("none");
        rightTable.animate({
            "width": "260px"
        }).addClass("right-active").siblings().animate({
            "width": 0
        }).removeClass("right-active");

        // e = e.find("table");
        rightTable.find("div.operate-type").hide();
        rightTable.find("input[value='false']").prop("checked", true);

        e.find(".table-special").each(function () {
            if ($(this).hasClass("table-add-row")) {
                rightTable.find("input[name=hasAdd][value='true']").prop("checked", true);
            } else if ($(this).hasClass("table-check")) {
                rightTable.find("input[name=hasCheck][value='true']").prop("checked", true);
            } else if ($(this).hasClass("table-remarks")) {
                rightTable.find("input[name=hasRemarks][value='true']").prop("checked", true);
            } else if ($(this).hasClass("table-operation")) {
                rightTable.find("input[name=hasOperate][value='true']").prop("checked", true);
                rightTable.find("div.operate-type").show();

                rightTable.find("input[name=operate]").removeAttr("checked");
                var operationType = $(this).data("operationType");
                // 默认有 删除
                if (!operationType) {
                    // rightTable.find("input[name=operate][value='delete']").prop("checked", true);
                    // return;
                    operationType = ["delete"];
                }
                for (var i = 0; i < operationType.length; i++) {
                    rightTable.find("input[name=operate][value='" + operationType[i] + "']").prop("checked", true);
                }
            }
        });

    } else if (e.hasClass("component-adress")) {
        rightAdress.animate({
            "width": "260px"
        }).addClass("right-active").siblings().animate({
            "width": 0
        }).removeClass("right-active");

        var text = e.find("span.span-text").text();
        rightAdress.find("input.text").val(text);
    } else if (e.hasClass("component-time-range")) {
        rightTimeRange.animate({
            "width": "260px"
        }).addClass("right-active").siblings().animate({
            "width": 0
        }).removeClass("right-active");

        var text = e.find("span.span-text").text();
        rightTimeRange.find("input.text").val(text);
    } else if (e.hasClass("button-submit")) {
        // rightButtonSubmit.removeClass("none").siblings().addClass("none");
        rightButtonSubmit.animate({
            "width": "260px"
        }).addClass("right-active").siblings().animate({
            "width": 0
        }).removeClass("right-active");


        pageSubmitUrl = footerButton.find("button.submit").data("pageSubmitUrl");
        rightButtonSubmit.find("input.text").val(pageSubmitUrl);
    } else {
        // rightMain.find("div.right-component").addClass("none");
        rightMain.find("div.right-component").animate({
            "width": 0
        });
    }
}

// 激活元素
function active(e) {
    var e = $(e.currentTarget);

    if (e.hasClass("active")) {
        return;
    }
    // if (e.parent().is("td")) {
    //     viewMain.find(".active").removeClass("active");
    //     e.addClass("active").closest("div.form-area").addClass("active");
    //     return;
    // }


    // viewMain.find("th.active").removeClass("active");
    // e.addClass("active").siblings().removeClass("active").find(".active").removeClass("active");

    viewMain.find(".active").removeClass("active");
    e.addClass("active").closest("div.form-area").addClass("active");

    // 事件穿透 先激活元素再激活区域 区域激活时判断内部是否有元素激活     实现元素失焦时关闭属性编辑栏
    if (e.hasClass("form-area") && !e.find("div.active").length) {
        rightArea.siblings().animate({
            "width": 0
        });
        // rightArea.siblings().addClass("none");

        if (rightArea.attr("display") != "none") {
            areaCurrentAttr = e.find("span.area-title").text();
            rightArea.find("input.text").val(areaCurrentAttr);
        }
    }


}

// 保存属性设置
function saveAttribution(type) {

    // 先校验   保存属性设置校验    已取消,由浏览器默认校验代替
    // saveValidate(type);

    // 检测name   仅限有 name 的元素
    if (rightMain.find("div.right-component.right-active").find("input.name").length) {
        var name = rightMain.find("div.right-component.right-active").find("input.name").val();
        // 先检查是否有此 name 元素     再查是否本元素
        if ($("[name="+name+"]").length && !viewMain.find("div.form-component.active").find($("[name=" + name + "]")).length) {
            // $("[name="+newName+"]").
            alert('已存在此name,请重新编辑!');
            rightMain.find("div.right-component.right-active").find("input.name").focus();
            return false;
        }
    }

    if (type == "area") {
        var text = rightArea.find("input.text").val();
        viewMain.find("div.form-area.active").find("span.area-title").text(text);
    } else if (type == "input") {
        var text = rightInput.find("input.text").val();
        // var id = rightInput.find("input.id").val();
        var name = rightInput.find("input.name").val();
        var placeholder = rightInput.find("input.placeholder").val();
        var url = rightInput.find("select.url-input").val();
        var readOnly = rightInput.find("input[name=readOnly]:checked").val();
        var required = rightInput.find("input[name=required]:checked").val();

        viewMain.find("div.form-component.active").find("span.span-text").text(text);
        required == "true" ? viewMain.find("div.form-component.active").find("span.span-required").html("*") : viewMain.find("div.form-component.active").find("span.span-required").html("");
        var activeInputComponent = viewMain.find("div.form-component.active").find("input");
        // activeInputComponent.prop("id", id);
        activeInputComponent.prop("name", name);
        activeInputComponent.prop("placeholder", placeholder);

        readOnly == "true" ? activeInputComponent.prop("disabled", true) : activeInputComponent.removeProp("disabled");
        readOnly == "true" ? activeInputComponent.data("url", url) : activeInputComponent.data("url", "");

        required == "true" ? activeInputComponent.prop("required", true) : activeInputComponent.removeProp("required");

    } else if (type == "select") {
        var text = rightSelect.find("input.text").val();
        // var id = rightSelect.find("input.id").val();
        var name = rightSelect.find("input.name").val();
        var url = rightSelect.find("select.url-select").val();
        var optionsUrl = rightSelect.find("select.url-options").val();
        var readOnly = rightSelect.find("input[name=readOnly]:checked").val();
        var optionType = rightSelect.find("input[name=optionType]:checked").val();
        var required = rightSelect.find("input[name=required]:checked").val();

        var activeSelectComponent = viewMain.find("div.form-component.active").find("select");

        if (optionType == "static") {
            var optionJson = rightSelect.find("button.button-open-dialog").data("optionJson");
            if (!optionJson || optionJson.length < 2) {
                alert("选项尚未完全编辑!");
                return false;
            }
            for (var i = 0; i < optionJson.length; i++) {
                if (!optionJson[i][0] || (!optionJson[i][1] && optionJson[i][0] != "-- 请选择 --")) {
                    alert("选项尚未完全编辑!");
                    return false;
                }
            }
            activeSelectComponent.html("");
            for (var i = 0; i < optionJson.length; i++) {
                // var optionDom = $("<option value='"+optionJson[i][1]+"'>"+optionJson[i][0]+"</option>");
                activeSelectComponent.append($("<option label='"+optionJson[i][0]+"' value='" + optionJson[i][1] + "'" + optionJson[i][2] + ">" + optionJson[i][0] + "</option>"));
            }
            activeSelectComponent.data("optionsUrl", "");
            activeSelectComponent.data("optionType", "static");
        } else {
            activeSelectComponent.data("optionsUrl", optionsUrl);
            activeSelectComponent.data("optionType", "load");
        }

        viewMain.find("div.form-component.active").find("span.span-text").text(text);
        required == "true" ? viewMain.find("div.form-component.active").find("span.span-required").html("*") : viewMain.find("div.form-component.active").find("span.span-required").html("");
        // activeSelectComponent.prop("id", id);
        activeSelectComponent.prop("name", name);

        readOnly == "true" ? activeSelectComponent.prop("disabled", true) : activeSelectComponent.removeProp("disabled");
        readOnly == "true" ? activeSelectComponent.data("url", url) : activeSelectComponent.data("url", "");

        required == "true" ? activeSelectComponent.prop("required", true) : activeSelectComponent.removeProp("required");
    } else if (type == "multi-select") {
        var text = rightMultiSelect.find("input.text").val();
        // var id = rightMultiSelect.find("input.id").val();
        var name = rightMultiSelect.find("input.name").val();
        var url = rightMultiSelect.find("select.url-multi-select").val();
        var optionsUrl = rightMultiSelect.find("select.url-options").val();
        var readOnly = rightMultiSelect.find("input[name=readOnly]:checked").val();
        var optionType = rightMultiSelect.find("input[name=optionType]:checked").val();
        var required = rightMultiSelect.find("input[name=required]:checked").val();

        var activeMultiComponent = viewMain.find("div.form-component.active");

        if (optionType == "static") {
            var multiJson = rightMultiSelect.find("button.button-open-dialog").data("multiJson");
            if (!multiJson || multiJson.data.length < 2) {
                alert("选项尚未完全编辑!");
                return false;
            }
            var multiContent = $("<div></div>");
            for (var i = 0 ; i < multiJson.num ; i ++) {
                multiContent.append($("<select class='select-"+(i+1)+"' name='' id='' disabled required></select>"));
            }
            jsonToSelect(multiJson.data,0);
            function jsonToSelect (data ,level) {
                for (var i = 0 ; i < data.length ; i ++) {
                    if ((!data[i].value && data[i].label != "-- 请选择 --") || !data[i].label) {
                        alert("选项尚未完全编辑!");
                        return false;
                    }
                    multiContent.children().eq(level).append($("<option label='"+data[i].label+"' value='"+data[i].value+"' "+data[i].selected+">"+data[i].label+"</option>"));
                    if (data[i].children) jsonToSelect(data[i].children,level+1);
                }
            }
            
            activeMultiComponent.children("select").remove("");
            activeMultiComponent.append(multiContent.html());

            // for (var i = 0; i < multiJson.length; i++) {
            //     // var optionDom = $("<option value='"+multiJson[i][1]+"'>"+multiJson[i][0]+"</option>");
            //     activeMultiComponent.append($("<option value='" + multiJson[i][1] + "'" + multiJson[i][2] + ">" + multiJson[i][0] + "</option>"));
            // }
            // activeMultiComponent.data("optionsUrl", "");
            // activeMultiComponent.data("optionType", "static");
        } else {
            activeMultiComponent.data("optionsUrl", optionsUrl);
            activeMultiComponent.data("optionType", "load");
        }

        viewMain.find("div.form-component.active").find("span.span-text").text(text);
        required == "true" ? viewMain.find("div.form-component.active").find("span.span-required").html("*") : viewMain.find("div.form-component.active").find("span.span-required").html("");
        // activeMultiComponent.prop("id", id);
        activeMultiComponent.prop("name", name);

        readOnly == "true" ? activeMultiComponent.prop("readOnly", true) : activeMultiComponent.removeProp("readOnly");
        readOnly == "true" ? activeMultiComponent.data("url", url) : activeMultiComponent.data("url", "");

        required == "true" ? activeMultiComponent.prop("required", true) : activeMultiComponent.removeProp("required");
    } else if (type == "radio") {
        var text = rightRadio.find("input.text").val();
        // var id = rightRadio.find("input.id").val();
        var name = rightRadio.find("input.name").val();
        var url = rightRadio.find("select.url-radio").val();
        var readOnly = rightRadio.find("input[name=readOnly]:checked").val();
        var required = rightRadio.find("input[name=required]:checked").val();

        var activeRadioComponent = viewMain.find("div.form-component.active");

        var radioJson = rightRadio.find("button.button-open-dialog").data("radioJson");
        if (!radioJson || radioJson.length < 2) {
            alert("选项尚未完全编辑!");
            return false;
        }
        for (var i = 0; i < radioJson.length; i++) {
            if (!radioJson[i][0] || !radioJson[i][1]) {
                alert("选项尚未完全编辑!");
                return false;
            }
        }

        activeRadioComponent.find("span.span-text").text(text);
        required == "true" ? activeRadioComponent.find("span.span-required").html("*") : activeRadioComponent.find("span.span-required").html("");
        activeRadioComponent.find("div.radio-box").remove();
        for (var i = 0; i < radioJson.length; i++) {
            var checked = radioJson[i][2] ? "checked" : "";

            var radio = $("<input type='radio' name='" + name + "' class='radio' id='" + name + i + "' value='" + radioJson[i][1] + "' disabled required " + checked + ">");

            readOnly == "true" ? radio.prop("readOnly", true) : radio.removeProp("readOnly");
            readOnly == "true" ? radio.data("url", url) : radio.data("url", "");
            required == "true" ? radio.prop("required", true) : radio.removeProp("required");

            var label = $("<label for='" + name + i + "'>" + radioJson[i][0] + "</label>");
            var radioBox = $("<div class='radio-box'></div>");

            radioBox.append(radio).append(label);
            activeRadioComponent.append(radioBox);
        }
    } else if (type == "checkbox") {
        var text = rightCheckbox.find("input.text").val();
        // var id = rightCheckbox.find("input.id").val();
        var name = rightCheckbox.find("input.name").val();
        var url = rightCheckbox.find("select.url-checkbox").val();
        var readOnly = rightCheckbox.find("input[name=readOnly]:checked").val();
        var required = rightCheckbox.find("input[name=required]:checked").val();

        var activeCheckboxComponent = viewMain.find("div.form-component.active");

        var checkboxJson = rightCheckbox.find("button.button-open-dialog").data("checkboxJson");
        if (!checkboxJson || checkboxJson.length < 2) {
            alert("选项尚未完全编辑!");
            return false;
        }
        for (var i = 0; i < checkboxJson.length; i++) {
            if (!checkboxJson[i][0] || !checkboxJson[i][1]) {
                alert("选项尚未完全编辑!");
                return false;
            }
        }

        activeCheckboxComponent.find("span.span-text").text(text);
        required == "true" ? activeCheckboxComponent.find("span.span-required").html("*") : activeCheckboxComponent.find("span.span-required").html("");
        activeCheckboxComponent.find("div.checkbox-box").remove();
        for (var i = 0; i < checkboxJson.length; i++) {
            var checked = checkboxJson[i][2] ? "checked" : "";

            var checkbox = $("<input type='checkbox' name='" + name + "' class='checkbox' id='" + name + i + "' value='" + checkboxJson[i][1] + "' disabled required " + checked + ">");

            readOnly == "true" ? checkbox.prop("readOnly", true) : checkbox.removeProp("readOnly");
            readOnly == "true" ? checkbox.data("url", url) : checkbox.data("url", "");
            required == "true" ? checkbox.prop("required", true) : checkbox.removeProp("required");

            var label = $("<label for='" + name + i + "'>" + checkboxJson[i][0] + "</label>");
            var checkboxBox = $("<div class='checkbox-box'></div>");

            checkboxBox.append(checkbox).append(label);
            activeCheckboxComponent.append(checkboxBox);
        }
    } else if (type == "textarea") {
        var text = rightTextarea.find("input.text").val();
        var id = rightTextarea.find("input.id").val();
        var name = rightTextarea.find("input.name").val();
        var placeholder = rightTextarea.find("input.placeholder").val();
        var rows = rightTextarea.find("input.rows").val();
        var maxlength = rightTextarea.find("input.maxlength").val();
        var url = rightTextarea.find("select.url-textarea").val();
        var readOnly = rightTextarea.find("input[name=readOnly]:checked").val();
        var required = rightTextarea.find("input[name=required]:checked").val();

        viewMain.find("div.form-component.active").find("span.span-text").text(text);
        required == "true" ? viewMain.find("div.form-component.active").find("span.span-required").html("*") : viewMain.find("div.form-component.active").find("span.span-required").html("");
        var activeTextareaComponent = viewMain.find("div.form-component.active").find("textarea");
        activeTextareaComponent.prop("id", id);
        activeTextareaComponent.prop("name", name);
        activeTextareaComponent.prop("placeholder", placeholder);
        activeTextareaComponent.attr("rows", rows);
        activeTextareaComponent.attr("maxlength", maxlength);

        readOnly == "true" ? activeTextareaComponent.prop("disabled", true) : activeTextareaComponent.removeProp("disabled");
        readOnly == "true" ? activeTextareaComponent.data("url", url) : activeTextareaComponent.data("url", "");

        required == "true" ? activeTextareaComponent.prop("required", true) : activeTextareaComponent.removeProp("required");
    } else if (type == "date") {
        var text = rightDate.find("input.text").val();
        // var id = rightDate.find("input.id").val();
        var name = rightDate.find("input.name").val();
        var placeholder = rightDate.find("input.placeholder").val();
        var url = rightDate.find("select.url-date").val();
        var dateRange = rightDate.find("input[name=dateRange]:checked").val();
        var readOnly = rightDate.find("input[name=readOnly]:checked").val();
        var required = rightDate.find("input[name=required]:checked").val();

        viewMain.find("div.form-component.active").find("span.span-text").text(text);
        required == "true" ? viewMain.find("div.form-component.active").find("span.span-required").html("*") : viewMain.find("div.form-component.active").find("span.span-required").html("");
        var activeDateComponent = viewMain.find("div.form-component.active").find("input");
        // activeDateComponent.prop("id", id);
        activeDateComponent.prop("name", name);
        activeDateComponent.prop("placeholder", placeholder);

        if (dateRange == "default") {
            var defaultDate = rightDate.find("select.defaultDate").val();
            activeDateComponent.data("rangeType", "default").data("defaultDate", defaultDate);
            switch (defaultDate) {
                case "unlimited":

                    break;
                case "from-tomorrow":
                    activeDateComponent.attr("onclick", 'WdatePicker({"readOnly":true,"minDate":"' + GetDateStr(1) + '"})');
                    break;
                case "as-of-today":
                    activeDateComponent.attr("onclick", 'WdatePicker({"readOnly":true,"maxDate":"' + GetDateStr(0) + '"})');
                    break;
                case "of-one-month":
                    activeDateComponent.attr("onclick", 'WdatePicker({"readOnly":true,"minDate":"' + GetDateStr(-30) + '","maxDate":"' + GetDateStr(0) + '"})');
                    break;
                case "in-one-month":
                    activeDateComponent.attr("onclick", 'WdatePicker({"readOnly":true,"minDate":"' + GetDateStr(0) + '","maxDate":"' + GetDateStr(30) + '"})');
                    break;

                default:
                    break;
            }

        } else {
            activeDateComponent.data("rangeType", "manual");
            var startDate = rightDate.find("input.start-date").val();
            var endDate = rightDate.find("input.end-date").val();

            activeDateComponent.attr("onclick", 'WdatePicker({"readOnly":true,"minDate":"' + startDate + '","maxDate":"' + endDate + '"})');
        }

        readOnly == "true" ? activeDateComponent.prop("readOnly", true) : activeDateComponent.removeProp("readOnly");
        readOnly == "true" ? activeDateComponent.data("url", url) : activeDateComponent.data("url", "");

        required == "true" ? activeDateComponent.prop("required", true) : activeDateComponent.removeProp("required");

    } else if (type == "table") {
        var hasAdd = rightTable.find("input[name=hasAdd]:checked").val();
        var hasCheck = rightTable.find("input[name=hasCheck]:checked").val();
        var hasRemarks = rightTable.find("input[name=hasRemarks]:checked").val();
        var hasOperate = rightTable.find("input[name=hasOperate]:checked").val();

        var activeTableComponent = viewMain.find("div.form-component.active").find("table");
        // 有 合计、新增、选择 其中任何一列时 , 都会有最后的空行
        var lastEmptyTr = activeTableComponent.find("tr").last();

        if (lastEmptyTr.hasClass("last-empty-tr")) {
            if (hasAdd == "true" && !lastEmptyTr.find("td.table-add-row").length) {
                lastEmptyTr.children().first().addClass("table-special table-add-row").append($("<button type='button' class='add-row'>新增</button>"));
            } else if (hasAdd == "false" && lastEmptyTr.find("td.table-add-row").length) {
                activeTableComponent.find("th.th-count").length ? activeTableComponent.find("td.table-special.table-add-row").removeClass("table-special table-add-row").empty() : lastEmptyTr.remove();
            }

        } else {
            if (hasAdd == "true") {
                if (activeTableComponent.find("th.th-count").length) {
                    lastEmptyTr.children().first().addClass("table-special table-add-row").append($("<button type='button' class='add-row'>新增</button>"));
                } else {
                    // 先生成对应长度 tr
                    var newAddTr = $("<tr class='last-empty-tr'></tr>");
                    var tableLength = lastEmptyTr.children().length;
                    for (var i = 0; i < tableLength; i++) {
                        newAddTr.append("<td></td>");
                    }
                    newAddTr.children().first().addClass("table-special table-add-row").append($("<button type='button' class='add-row'>新增</button>"));
                    activeTableComponent.append(newAddTr);
                }
            }


        }

        lastEmptyTr = activeTableComponent.find("tr").last();
        // 选择
        if (hasCheck == "true" && !activeTableComponent.find("th.table-check").length) {
            activeTableComponent.find("tr").each(function (i) {
                if (i == 0) {
                    $(this).children().first().before($("<th class='table-special table-check'><input type='checkbox' class='checkbox check-all'></th>'"));
                    // }else if (hasAdd == "true" && i == activeTableComponent.find("tr").length-1){
                    //     $(this).children().first().before($("<td></td>'"));
                    //     if (activeTableComponent.find("td.table-add-row").length) {
                    //         $(this).children().first().before($(this).children().eq(1));
                    //     }
                } else {
                    $(this).children().first().before($("<td><input type='checkbox' class='checkbox'></td>'"));
                }
            });
            if (lastEmptyTr.hasClass("last-empty-tr")) {
                lastEmptyTr.children().first().empty();
                if (hasAdd == "true") {
                    lastEmptyTr.children().first().before(lastEmptyTr.children().eq(1));
                }
            }
        } else if (hasCheck == "false" && activeTableComponent.find("th.table-check").length) {
            if (hasAdd == "true") {
                lastEmptyTr.children().first().before(lastEmptyTr.children().eq(1));
            }
            activeTableComponent.find("tr").each(function (i) {
                $(this).children().first().remove();
            });
        }

        // 操作         无论要不要 先删
        if (activeTableComponent.find("th.table-operation").length) {
            activeTableComponent.find("tr").each(function (i) {
                $(this).children().last().remove();
            });
        }
        // 要再加
        if (hasOperate == "true") {
            var operateType = [];
            rightTable.find("input[name=operate]").each(function () {
                if ($(this).prop('checked') == true) {
                    operateType.push($(this).val());
                }
            });
            var operateButtons = $("<td></td>");
            for (var i = 0; i < operateType.length; i++) {
                operateButtons.append($("<button type='button' class='" + operateType[i] + "-row' onclick='" + operateType[i] + "Row(event)'></button>"));
                switch (operateType[i]) {
                    case "delete":
                        operateButtons.children().eq(i).html("删除");
                        break;
                    case "edit":
                        operateButtons.children().eq(i).html("编辑");
                        break;
                    case "save":
                        operateButtons.children().eq(i).html("保存");
                        break;

                    default:
                        break;
                }
            }

            activeTableComponent.find("tr").each(function (i) {
                if (i == 0) {
                    $(this).children().last().after($("<th class='table-special table-operation'>操作</th>").data("operationType", operateType));
                } else {
                    if (lastEmptyTr.hasClass("last-empty-tr") && i == activeTableComponent.find("tr").length - 1) {
                        $(this).children().last().after($("<td></td>"));
                    } else {
                        $(this).children().last().after(operateButtons.clone());
                    }
                }
            });

        }

        // 备注
        if (hasRemarks == "true" && !activeTableComponent.find("th.table-remarks").length) {
            if (hasOperate == "true") {
                activeTableComponent.find("tr").each(function (i) {
                    if (i == 0) {
                        $(this).children().last().before($("<th class='table-special table-remarks'>备注</th>"));
                    } else {
                        if (hasAdd == "true" && i == activeTableComponent.find("tr").length - 1) {
                            $(this).children().last().before($("<td></td>"));
                        } else {
                            $(this).children().last().before("<td><div class='form-component component-input'><input type='text' placeholder='备注' disabled></div></td>");
                        }
                    }
                });
            } else {
                activeTableComponent.find("tr").each(function (i) {
                    if (i == 0) {
                        $(this).children().last().after($("<th class='table-special table-remarks'>备注</th>"));
                    } else {
                        if (hasAdd == "true" && i == activeTableComponent.find("tr").length - 1) {
                            $(this).children().last().after($("<td></td>"));
                        } else {
                            $(this).children().last().after("<td><div class='form-component component-input'><input type='text' placeholder='备注' disabled></div></td>");
                        }
                    }
                });
            }
        } else if (hasRemarks == "false" && activeTableComponent.find("th.table-remarks").length) {
            if (hasOperate == "true") {
                activeTableComponent.find("tr").each(function (i) {
                    $(this).children().last().prev().remove();
                });
            } else {
                activeTableComponent.find("tr").each(function (i) {
                    $(this).children().last().remove();
                });
            }
        }

    } else if (type == "column") {
        var text = rightColumn.find("input.column-text").val();
        var hasCount = rightColumn.find("input[name=hasCount]:checked").val();

        var activeThComponent = viewMain.find("th.active");
        var lastEmptyTr = activeThComponent.closest("table").find("tr").last();

        activeThComponent.html(text);

        if (lastEmptyTr.hasClass("last-empty-tr")) {
            var countTd = lastEmptyTr.children().eq(activeThComponent.index());
            countTd.empty();
            if (hasCount == "true") {
                activeThComponent.addClass("th-count");
                countTd.html("合计 ").append($("<input class='count risk-process' type='text' disabled>"));
            } else if (hasCount == "false") {
                if (activeThComponent.hasClass("th-count") && activeThComponent.closest("table").find("th.th-count").length == 1) {
                    countTd.parent().remove();
                }
                activeThComponent.removeClass("th-count");
            }
        } else {
            if (hasCount == "true") {
                activeThComponent.addClass("th-count");
                activeThComponent.parent().next().children().eq(activeThComponent.index()).find("input").addClass("count-part");
                // 先生成对应长度 tr
                var newAddTr = $("<tr class='last-empty-tr'></tr>");
                var tableLength = lastEmptyTr.children().length;
                for (var i = 0; i < tableLength; i++) {
                    newAddTr.append("<td></td>");
                }
                lastEmptyTr.after(newAddTr);
                var countTd = lastEmptyTr.next().children().eq(activeThComponent.index());
                countTd.empty().html("合计 ").append($("<input class='count risk-process' type='text' value='0'>"));
            }
        }

    } else if (type == "adress") {
        var text = rightAdress.find("input.text").val();
        viewMain.find("div.form-component.active").find("span.span-text").text(text);
    } else if (type == "time-range") {
        var text = rightTimeRange.find("input.text").val();
        viewMain.find("div.form-component.active").find("span.span-text").text(text);
    } else if (type == "submit") {
        pageSubmitUrl = rightButtonSubmit.find("input.text").val();
        footerButton.find("button.submit").data("pageSubmitUrl", pageSubmitUrl);
    }

    // alert("保存成功!");
    // window.parent.$.messager.show({
    // 	title:"提示",
    // 	msg:"保存成功！"
    // })

    // 阻止form提交跳转
    return false;
}

// 检测name
function checkName(newName) {
    $("name"+newName+"").length;

    // 页面name合集 判断name是否已经存在
    var nameList = [];

    viewMain.find("[name]").each(function () {
        nameList.push($(this).prop("name"));
    })

    var hasBeenUsed = false;
    for (var i = 0; i < nameList.length; i++) {
        // 已存在name 则不可用      

        // chechbox 可以同name
        // if (nameList[i] == newName && !$("[name="+newName+"]").is("input[type==checkbox]")) {
        if (nameList[i] == newName) {

        }
    }
    if (hasBeenUsed) return false;

    nameList.push(newName);
    return true;
}

// 重置属性设置
function resetAttribution(type) {
    if (type == "area") {
        rightArea.find("input.text").val(areaCurrentAttr);
    }
    if (type == "input") {
        rightInput.find("input.text").val(inputCurrentAttr.text);
        rightInput.find("input.id").val(inputCurrentAttr.id);
        rightInput.find("input.name").val(inputCurrentAttr.name);
        rightInput.find("input.placeholder").val(inputCurrentAttr.placeholder);
    }
}

// // 清空属性设置
// function clearAttribution(type) {

// }


//删除页面组件元素
function deleteAttribution() {
    if (confirm("确认删除该组件吗?")) {
        viewMain.find("div.form-component.active").remove();
        rightMain.find("div.right-component").animate({
            "width": 0
        });
    }
}

// 删除页面区域元素
function deleteArea(e) {
    // if ($(e.currentTarget).parent().parent().parent().hasClass("active")) {
    //     if (confirm("确认删除该区域吗?")) {
    //         viewMain.find("div.form-area.active").remove();
    //     }
    // }
    if (confirm("确认删除该区域吗?")) {
        $(e.currentTarget).parent().parent().parent().remove();
        rightMain.find("div.right-component").animate({
            "width": 0
        });
    }
}

// // 编辑区域标题
// function editArea(e) {
//     var areaTitle = $(e.currentTarget).parent().siblings("span.area-title").html();
// }

// 清空页面区域内元素
function clearArea(e) {
    // if ($(e.currentTarget).parent().parent().parent().hasClass("active")) {
    //     if (confirm("确认清空该区域吗?")) {
    //         viewMain.find("div.form-area.active").find("div.form-area-main").empty();
    //     }
    // }
    if (confirm("确认清空该区域吗?")) {
        $(e.currentTarget).parent().parent().siblings("div.form-area-main").empty();
    }
}

// 完成配置,导出页面
function complete() {
    if (!pageSubmitUrl) {
        $.messager ? $.messager.alert("系统提示", "请选择页面提交路径!", "info") : alert("请选择页面提交路径!");
        footerButton.find("div.form-component.button-submit").click();
        rightButtonSubmit.find("input.text").focus();
        return;
    }

    viewMain.find("div.active").removeClass("active");

    // 传生成页面
    viewMainClone = viewMain.clone();
    // 去掉多余class(active,form-component.(input,select)),取消可拖拽
    viewMainClone.find("div.form-component").removeClass("input").removeClass("select").removeAttr("draggable").removeAttr("ondrop").removeAttr("ondragover").removeAttr("ondragstart");
    viewMainClone.find("div.form-area-head").removeAttr("draggable").removeAttr("ondrop").removeAttr("ondragover").removeAttr("ondragstart").next("div.form-area-main").removeAttr("ondrop").removeAttr("ondragover");
    viewMainClone.find("div.component-table").find("th").removeAttr("draggable").removeAttr("ondrop").removeAttr("ondragover").removeAttr("ondragstart").removeAttr("onclick");
    viewMainClone.find("div.component-table").find("td").removeAttr("ondrop").removeAttr("ondragover");

    // 去掉多余元素(area-tool)
    viewMainClone.find("div.area-tool").remove();

    // 地址去掉 js 生成的选项 distpicker
    viewMainClone.find("div.distpicker").find("select").empty();

    // table 后div
    viewMainClone.find("table").next("div").remove();

    // // 取消不可点击
    // viewMainClone.find("input").removeProp("disabled");
    // viewMainClone.find("select").removeProp("disabled");

    // 去掉事件(form-area,form-component)
    viewMainClone.find("div.form-area").off("click");
    viewMainClone.find("div.form-component").off("click");

    // 传可编辑页面
    $.ajax({
        url: path + "/templates/templates_doEdit.do?method=edit",
        type: "POST",
        data: {
            "html": viewMainClone.html(),
            "processId": processId,
            "taskName": taskName,
            "param": viewMain.html().replace(/[\r\n]/g, "").replace(/\'/g, "\\\'"),
            "urlPath": urlPath,
            "id": id
        },
        success: function (res) {
            window.parent.$.messager.alert("提示", "导出成功！", "info", function () {
                window.parent.$("#tabBar").tabs("close", "设计表单");
            })
        }
    })
}

$(function () {
    var param = "";
    // var param = '                <!-- 实际生成页面内容 -->                                <!-- 页面底部按钮 footer-button -->                <div class="form-area area-default">                    <div class="form-area-head" draggable="true" ondragstart="dragStart(event, this, \'move\', \'area\')" ondragover="dragOver(event)" ondrop="drop(event,this,\'move\',\'area\')">                        <span class="area-title">区域标题</span>                        <div class="area-title-icon icon-open" onclick="openClose(event)"></div>                        <div class="area-tool">                            <button class="edit" onclick="openAttr(event)">编辑区域标题</button>                            <button class="clear" onclick="clearArea(event)">清空</button>                            <button class="delete" onclick="deleteArea(event)">删除</button>                        </div>                    </div>                    <div class="form-area-main" ondragover="dragOver(event)" ondrop="drop(event,this,\'move\',\'area-main\')">                    <div class="form-component component-input for-the-demonstration" draggable="true" ondragstart="dragStart(event, this, \'move\', \'component\')" ondragover="dragOver(event)" ondrop="drop(event,this,\'move\',\'component\')">                <div class="input-title">                    <span class="span-required">*</span>                    <span class="span-text">字段</span>                </div>                <input type="text" name="aaa" id="" placeholder="输入框" disabled="" required="">            </div></div>                </div><div class="form-area footer-button">                    <div class="form-component button-submit">                        <button class="submit">提交</button>                    </div>                    <!-- <div class="form-component button-submit">                        <button class="submit">提交</button>                    </div> -->                </div>            ';

    if (param) {
        // 编辑已存在页面时 
        pageSubmitUrl = "/report/query";
        $("#view-main").html(param);
        footerButton.find("button.submit").data("pageSubmitUrl", pageSubmitUrl);
        //		viewMain.find("div.form-area-head").append("<div class='area-tool'><button class='edit' onclick='openAttr(event)'>编辑区域标题</button><button class='clear' onclick='clearArea(event)'>清空</button><button class='delete' onclick='deleteArea(event)'>删除</button></div>");
        viewMain.find("div.form-component").on("click", openAttr).first().click();

    } else {
        // 直接激活底部按钮,编辑提交地址
        // footerButton.on("click", active).find("div.form-component.button-submit").on("click", openAttr).click().siblings().on("click", openAttr);
        footerButton.find("div.form-component.button-submit").on("click", openAttr).click().siblings().on("click", openAttr);
        rightButtonSubmit.find("input.text").focus();
    }
})



function editColumn(e) {
    stopPropagation(e);
    rightColumn.animate({
        "width": "260px"
    }).addClass("right-active").siblings().animate({
        "width": 0
    }).removeClass("right-active");

    var e = $(e.currentTarget ? e.currentTarget : e.target);

    if (e.hasClass("active")) {
        return;
    }
    // 先激活
    viewMain.find(".active").removeClass("active");
    e.addClass("active").closest("div.form-area").addClass("active");

    var text = e.text();
    rightColumn.find("input.column-text").val(text);

    // e.hasClass("th-count") ? rightColumn.find("input[name=hasCount][value='true']").prop("checked", true) : rightColumn.find("input[name=hasCount][value='false']").prop("checked", true);
    rightColumn.find("input[name=hasCount][value='" + e.hasClass("th-count") + "']").prop("checked", true);

}

function addColumn() {
    var activeTableComponent = viewMain.find("div.form-component.active").find("table").length ? viewMain.find("div.form-component.active").find("table") : viewMain.find("th.active").closest("table");
    var columnIndex = activeTableComponent.find("tr").first().children(":not(th.table-remarks,th.table-operation)").length - 1;
    activeTableComponent.find("tr").each(function (i) {
        if (i == 0) {
            $(this).children().eq(columnIndex).after(componentsDialog.find("th.th-default").clone().click());
        } else {
            if (activeTableComponent.find("td.table-add-row").length && i == activeTableComponent.find("tr").length - 1) {
                $(this).children().eq(columnIndex).after($("<td></td>"));
            } else {
                $(this).children().eq(columnIndex).after(componentsDialog.find("td.td-default").clone());
            }
        }
    });
}

function deletColumn() {
    if (viewMain.find("th.active").closest("table").find("tr").first().children(":not(th.table-check,th.table-remarks,th.table-operation)").length < 3) {
        alert("至少要有两个列!");
        return;
    }
    if (confirm("确认删除该列吗?")) {
        var columnIndex = viewMain.find("th.active").index();
        var activeTableComponent = viewMain.find("th.active").closest("table");

        viewMain.find("th.active").next().click();
        activeTableComponent.find("tr").each(function (i) {

            $(this).children().eq(columnIndex).remove();
        });
    }
}


function deleteRow() {

}

function editRow() {

}

function saveRow() {

}


// 测试用方法



