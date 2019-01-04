// common.js

// 生成页面所需 function
function openClose(e) {
    $(e.currentTarget).toggleClass("icon-close");
    $(e.currentTarget).parent().next().slideToggle();
}














// 阻止冒泡
function stopPropagation(e) {
    if (e && e.stopPropagation) {
        e.stopPropagation();
    } else {
        window.event.cancelBubble = true;
    }
}


function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
}

function test() {

    // console.log("前天："+GetDateStr(-2));
    // console.log("昨天："+GetDateStr(-1));
    // console.log("今天："+GetDateStr(0));
    // console.log("明天："+GetDateStr(1));
    // console.log("后天："+GetDateStr(2));
    // console.log("大后天："+GetDateStr(3));

    // var myDate = new Date();
    // myDate.toLocaleDateString();//可以获取当前日期 2017/5/21
    // myDate.toLocaleTimeString(); //可以获取当前时间 上午1:16:16
    // myDate.toLocaleString( ); //获取当天日期与时间 2017/5/21 上午1:16:16

    // 扩展：
    // myDate.getYear(); //获取当前年份(2位)
    // myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    // myDate.getMonth(); //获取当前月份(0-11,0代表1月)
    // myDate.getDate(); //获取当前日(1-31)
    // myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
    // myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
    // myDate.getHours(); //获取当前小时数(0-23)
    // myDate.getMinutes(); //获取当前分钟数(0-59)
    // myDate.getSeconds(); //获取当前秒数(0-59)
    // myDate.getMilliseconds(); //获取当前毫秒数(0-999)

}

// javascript 获取所有参数列表
function getUrlParams() {
    var paramsStr = window.location.search.substr(1);
    if (paramsStr != "") {
        var plist = paramsStr.split("&");
        var paramsList = {};
        for (var i = 0; i < plist.length; i++) {
            paramsList[plist[i].split("=")[0]] = plist[i].split("=")[1];
        }
        return paramsList;
    }
    return {}; // 返回参数值
}

// 提示框
function popup(txt, target){
    target = target ? target : "body";
	if(target == 'body'){
		var _obj=$('<div class="toast-tips" style="position:fixed;left:47%;top:300px;padding:0 25px;height:48px;line-height: 48px;border-radius:4px;text-align: center;font-size: 14px;color:#fff;background: rgba(0,0,0,0.7);z-index:999">' + txt + '</div>');
	} else {
		var _obj=$('<div class="toast-tips" style="position:absolute;left:50%;top:50%;width:126px;margin:-24px 0 0 -82px;padding:10px 20px;border-radius:4px;text-align: center;font-size: 14px;color:#fff;background: rgba(0,0,0,0.7);z-index:999">' + txt + '</div>');
	}
    $(target).append(_obj); 
    setTimeout(function(){
        $('.toast-tips').remove()
    },2000)
}

// main.js

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

var componentsDialog = $("div.dialog-components");

var viewMainClone = null;

// 存储当前属性         no use
var pageSubmitUrl = "";
var areaCurrentAttr = "";
var inputCurrentAttr = {};


function openDialog(type) {
    $("div.dialog." + type).fadeIn();
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
        // viewMain.find("div.form-area.active").find("div.active").removeClass("active");
        $(e.currentTarget).closest("div.form-area").addClass("active").siblings().removeClass("active");
        // rightArea.removeClass("none").siblings().addClass("none");
        rightArea.animate({
            "width": "260px"
        }).siblings().animate({
            "width": 0
        });

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
        }).siblings().animate({
            "width": 0
        });


        var text = e.find("span.span-text").text();

        e = e.find("input");

        var id = e.prop("id");
        var name = e.prop("name");
        var placeholder = e.prop("placeholder");
        var readOnly = e.prop("readOnly");
        var url = e.data("url");
        var required = e.prop("required");

        rightInput.find("input.text").val(text);
        rightInput.find("input.id").val(id);
        rightInput.find("input.name").val(name);
        rightInput.find("input.placeholder").val(placeholder);

        // 是否隐藏,是否必选    url
        readOnly == true ? rightInput.find("div.url-component").show().find('select.url-input').prop('required', true) : rightInput.find("div.url-component").hide().find('select.url-input').removeProp('required');

        // 选中对应值
        // readOnly == true ? rightInput.find("input[name=readOnly][value='true']").prop("checked", true) : rightInput.find("input[name=readOnly][value='false']").prop("checked", true);
        // url ? rightInput.find("select.url-input").val(url) : rightInput.find("select.url-input").val('');
        // required == true ? rightInput.find("input[name=required][value='true']").prop("checked", true) : rightInput.find("input[name=required][value='false']").prop("checked", true);

        // 优化写法
        rightInput.find("input[name=readOnly][value='" + (readOnly == true) + "']").prop("checked", true);
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
        }).siblings().animate({
            "width": 0
        });


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
        }).siblings().animate({
            "width": 0
        });


        var text = e.find("span.span-text").text();

        e = e.find("select");

        // var id = e.prop("id");
        var name = e.prop("name");
        var readOnly = e.prop("readOnly");
        var required = e.prop("required");
        var url = e.data("url");
        var optionType = e.data("optionType");
        var optionsUrl = e.data("optionsUrl");
        var optionJson = [];

        rightMultiSelect.find("input.text").val(text);
        // rightMultiSelect.find("input.id").val(id);
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



    } else if (e.hasClass("component-radio")) {
        // rightRadio.removeClass("none").siblings().addClass("none");
        rightRadio.animate({
            "width": "260px"
        }).siblings().animate({
            "width": 0
        });


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
        }).siblings().animate({
            "width": 0
        });


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
        }).siblings().animate({
            "width": 0
        });


        var text = e.find("span.span-text").text();

        e = e.find("textarea");

        var id = e.prop("id");
        var name = e.prop("name");
        var placeholder = e.prop("placeholder");
        var readOnly = e.prop("readOnly");
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
        }).siblings().animate({
            "width": 0
        });


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
        }).siblings().animate({
            "width": 0
        });

        // e = e.find("table");
        rightTable.find("div.operate-type").hide();
        rightTable.find("input[value='false']").prop("checked", true);

        e.find(".table-special").each(function () {
            if ($(this).hasClass("table-add-row")) {
                rightTable.find("input[name=hasAdd][value='true']").prop("checked", true);
            }
            else if($(this).hasClass("table-check")){
                rightTable.find("input[name=hasCheck][value='true']").prop("checked", true);
            }
            else if($(this).hasClass("table-remarks")){
                rightTable.find("input[name=hasRemarks][value='true']").prop("checked", true);
            }
            else if($(this).hasClass("table-operation")){
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
                    rightTable.find("input[name=operate][value='"+operationType[i]  +"']").prop("checked", true);
                }
            }
        });

    } else if (e.hasClass("button-submit")) {
        // rightButtonSubmit.removeClass("none").siblings().addClass("none");
        rightButtonSubmit.animate({
            "width": "260px"
        }).siblings().animate({
            "width": 0
        });    


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

    if (type == "area") {
        var text = rightArea.find("input.text").val();
        viewMain.find("div.form-area.active").find("span.area-title").text(text);
    } else if (type == "input") {
        var text = rightInput.find("input.text").val();
        var id = rightInput.find("input.id").val();
        var name = rightInput.find("input.name").val();
        var placeholder = rightInput.find("input.placeholder").val();
        var url = rightInput.find("select.url-input").val();
        var readOnly = rightInput.find("input[name=readOnly]:checked").val();
        var required = rightInput.find("input[name=required]:checked").val();

        viewMain.find("div.form-component.active").find("span.span-text").text(text);
        required == "true" ? viewMain.find("div.form-component.active").find("span.span-required").html("*") : viewMain.find("div.form-component.active").find("span.span-required").html("");
        var activeInputComponent = viewMain.find("div.form-component.active").find("input");
        activeInputComponent.prop("id", id);
        activeInputComponent.prop("name", name);
        activeInputComponent.prop("placeholder", placeholder);

        readOnly == "true" ? activeInputComponent.prop("readOnly", true) : activeInputComponent.removeProp("readOnly");
        readOnly == "true" ? activeInputComponent.data("url", url) : activeInputComponent.data("url", "");

        required == "true" ? activeInputComponent.prop("required", true) : activeInputComponent.removeProp("required");

    } else if (type == "select") {
        var text = rightSelect.find("input.text").val();
        var id = rightSelect.find("input.id").val();
        var name = rightSelect.find("input.name").val();
        var url = rightSelect.find("select.url-select").val();
        var optionsUrl = rightSelect.find("select.url-options").val();
        var readOnly = rightSelect.find("input[name=readOnly]:checked").val();
        var optionType = rightSelect.find("input[name=optionType]:checked").val();
        var required = rightSelect.find("input[name=required]:checked").val();

        var activeSelectComponent = viewMain.find("div.form-component.active").find("select");

        if (optionType == "static") {
            var optionJson = rightSelect.find("button.button-open-dialog").data("optionJson");
            if (!optionJson || optionJson.length <= 1) {
                alert("请先编辑选项!");
                return false;
            }
            activeSelectComponent.html("");
            for (var i = 0; i < optionJson.length; i++) {
                // var optionDom = $("<option value='"+optionJson[i][1]+"'>"+optionJson[i][0]+"</option>");
                activeSelectComponent.append($("<option value='" + optionJson[i][1] + "'" + optionJson[i][2] + ">" + optionJson[i][0] + "</option>"));
            }
            activeSelectComponent.data("optionsUrl", "");
            activeSelectComponent.data("optionType", "static");
        } else {
            activeSelectComponent.data("optionsUrl", optionsUrl);
            activeSelectComponent.data("optionType", "load");
        }

        viewMain.find("div.form-component.active").find("span.span-text").text(text);
        required == "true" ? viewMain.find("div.form-component.active").find("span.span-required").html("*") : viewMain.find("div.form-component.active").find("span.span-required").html("");
        activeSelectComponent.prop("id", id);
        activeSelectComponent.prop("name", name);

        readOnly == "true" ? activeSelectComponent.prop("readOnly", true) : activeSelectComponent.removeProp("readOnly");
        readOnly == "true" ? activeSelectComponent.data("url", url) : activeSelectComponent.data("url", "");

        required == "true" ? activeSelectComponent.prop("required", true) : activeSelectComponent.removeProp("required");
    } else if (type == "radio") {
        var text = rightRadio.find("input.text").val();
        // var id = rightRadio.find("input.id").val();
        var name = rightRadio.find("input.name").val();
        var url = rightRadio.find("select.url-radio").val();
        var readOnly = rightRadio.find("input[name=readOnly]:checked").val();
        var required = rightRadio.find("input[name=required]:checked").val();

        var activeRadioComponent = viewMain.find("div.form-component.active");

        var radioJson = rightRadio.find("button.button-open-dialog").data("radioJson");
        for (var i = 0; i < radioJson.length; i++) {
            if (!radioJson[i][0] || !radioJson[i][1] || radioJson.length < 2) {
                alert("请先编辑选项!");
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
        for (var i = 0; i < checkboxJson.length; i++) {
            if (!checkboxJson[i][0] || !checkboxJson[i][1] || checkboxJson.length < 2) {
                alert("请先编辑选项!");
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

        readOnly == "true" ? activeTextareaComponent.prop("readOnly", true) : activeTextareaComponent.removeProp("readOnly");
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
                activeTableComponent.find("th.th-count").length?activeTableComponent.find("td.table-special.table-add-row").removeClass("table-special table-add-row").empty():lastEmptyTr.remove();
            }

        } else {
            if (hasAdd == "true") {
                if (activeTableComponent.find("th.th-count").length) {
                    lastEmptyTr.children().first().addClass("table-special table-add-row").append($("<button type='button' class='add-row'>新增</button>"));
                }else{
                    // 先生成对应长度 tr
                    var newAddTr = $("<tr class='last-empty-tr'></tr>");
                    var tableLength = lastEmptyTr.children().length;
                    for(var i = 0 ; i < tableLength; i ++){
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
                }else{
                    $(this).children().first().before($("<td><input type='checkbox' class='checkbox'></td>'"));
                }
            });
            if (lastEmptyTr.hasClass("last-empty-tr")){
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
            for(var i=0;i<operateType.length;i++){
                operateButtons.append($("<button type='button' class='"+operateType[i]+"-row' onclick='"+operateType[i]+"Row(event)'></button>"));
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
                    $(this).children().last().after($("<th class='table-special table-operation'>操作</th>").data("operationType",operateType));
                } else {
                    if (lastEmptyTr.hasClass("last-empty-tr") && i == activeTableComponent.find("tr").length-1) {
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
                        if (hasAdd == "true" && i == activeTableComponent.find("tr").length-1) {
                            $(this).children().last().before($("<td></td>"));
                        } else {
                            $(this).children().last().before("<td><div class='form-component component-input'><input type='text' placeholder='备注' disabled></div></td>");
                        }
                    }
                });
            }else{
                activeTableComponent.find("tr").each(function (i) {
                    if (i == 0) {
                        $(this).children().last().after($("<th class='table-special table-remarks'>备注</th>"));
                    } else {
                        if (hasAdd == "true" && i == activeTableComponent.find("tr").length-1) {
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
            }else{
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
                countTd.html("合计 ").append($("<input class='count risk-process' type='text'>"));
            } else if (hasCount == "false") {
                if (activeThComponent.hasClass("th-count") && activeThComponent.closest("table").find("th.th-count").length == 1) {
                    countTd.parent().remove();
                }
                activeThComponent.removeClass("th-count");
            }
        } else {
            if (hasCount == "true") {
                activeThComponent.addClass("th-count");
                // 先生成对应长度 tr
                var newAddTr = $("<tr class='last-empty-tr'></tr>");
                var tableLength = lastEmptyTr.children().length;
                for(var i = 0 ; i < tableLength; i ++){
                    newAddTr.append("<td></td>");
                }
                lastEmptyTr.after(newAddTr);
                var countTd = lastEmptyTr.next().children().eq(activeThComponent.index());
                countTd.empty().html("合计 ").append($("<input class='count risk-process' type='text'>"));
            }
        }

    } else if (type == "submit") {
        pageSubmitUrl = rightButtonSubmit.find("input.text").val();
        footerButton.find("button.submit").data("pageSubmitUrl", pageSubmitUrl);
    }

    // alert("保存成功!");

    // 阻止form提交跳转
    return false;
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



// 编辑列
function editColumn(e) {
    stopPropagation(e);
    rightColumn.animate({
        "width": "260px"
    }).siblings().animate({
        "width": 0
    });

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
    rightColumn.find("input[name=hasCount][value='"+e.hasClass("th-count")+"']").prop("checked", true);

}
// 增加列
function addColumn() {
    var activeTableComponent = viewMain.find("div.form-component.active").find("table").length ? viewMain.find("div.form-component.active").find("table") : viewMain.find("th.active").closest("table");
    var columnIndex = activeTableComponent.find("tr").first().children(":not(th.table-remarks,th.table-operation)").length - 1;
    activeTableComponent.find("tr").each(function (i) {
        if (i == 0) {
            $(this).children().eq(columnIndex).after(componentsDialog.find("th.th-default").clone().click());
        } else {
            if (activeTableComponent.find("td.table-add-row").length && i == activeTableComponent.find("tr").length-1) {
                $(this).children().eq(columnIndex).after($("<td></td>"));
            } else {
                $(this).children().eq(columnIndex).after(componentsDialog.find("td.td-default").clone());
            }
        }
    });
}
// 删除列
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


// // 生成页面所需 function
// function openClose(e) {
//     $(e.currentTarget).toggleClass("icon-close");
//     $(e.currentTarget).parent().next().slideToggle();
// }


// function activeTd(e) {
//     stopPropagation(e);
//     viewMain.find(".active").removeClass("active");
//     $(e.currentTarget).children("div.form-component").click();

// }

function deleteRow() {
    
}
function editRow() {
    
}
function saveRow() {
    
}


$(function () {
    var edit = 1;

    if (edit) {
        // 编辑已存在页面时 
        viewMain.find("div.form-area-head").append("<div class='area-tool'><button class='edit' onclick='openAttr(event)'>编辑区域标题</button><button class='clear' onclick='clearArea(event)'>清空</button><button class='delete' onclick='deleteArea(event)'>删除</button></div>");
        viewMain.find("div.form-component").on("click", openAttr).first().click();
    }else{
        // 直接激活底部按钮,编辑提交地址
        // footerButton.on("click", active).find("div.form-component.button-submit").on("click", openAttr).click().siblings().on("click", openAttr);
        footerButton.find("div.form-component.button-submit").on("click", openAttr).click().siblings().on("click", openAttr);
        rightButtonSubmit.find("input.text").focus();
    }
})

// 完成配置,导出页面
function complete() {
    // if (!pageSubmitUrl) {
    //     $.messager ? $.messager.alert("系统提示", "请选择页面提交路径!", "info") : alert("请选择页面提交路径!");
    //     footerButton.find("div.form-component.button-submit").click();
    //     rightButtonSubmit.find("input.text").focus();
    //     return;
    // }

    // 传生成页面
    viewMainClone = viewMain.clone();
    // 去掉多余class(active,form-component.(input,select)),取消可拖拽
    viewMainClone.find("div.active").removeClass("active");
    viewMainClone.find("div.form-component").removeClass("input").removeClass("select").removeAttr("draggable").removeAttr("ondrop").removeAttr("ondragover").removeAttr("ondragstart");;

    // 去掉多余元素(area-tool)
    viewMainClone.find("div.area-tool").remove();


    // 去掉事件(form-area,form-component)
    viewMainClone.find("div.form-area").off("click");
    viewMainClone.find("div.form-component").off("click");

    console.log(viewMainClone.html());
    

    // 传可编辑页面
    $.ajax({
        url: "http://enterprise-bpic-test.estar-info.com/templates/templates_doEdit.do?method=edit",
        // url: path + "/templates/templates_doEdit.do?method=edit",
        type: "POST",
        data: {
            "html": viewMainClone.html(),
            "insuranceCode": "digital",
            // "insuranceCode": insuranceCode,
            "flowCode": "baoan",
            // "flowCode": flowCode,
            "param": viewMain.html()
        },
        success: function (res) {
        }
    })
}


// 测试用方法

// drag.js

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
            ev.dataTransfer.setData("text", "component");

            // 为了演示 加上特殊class印记 读取时最为单独的对象
            dragDom.addClass("for-the-demonstration");
        }
        if (elementType == "area") {
            var areaTemplate = $(dom).attr("data-template");
            dragDom = dialogMain.find("div." + areaTemplate).clone();
            // 绑定激活方法
            // dragDom.on("click", active).find("div.form-component").on("click", openAttr);
            dragDom.find("div.form-component").on("click", openAttr);
            ev.dataTransfer.setData("text", "area");
            
            // 为了演示 加上特殊class印记 读取时最为单独的对象
            dragDom.find("div.form-component").addClass("for-the-demonstration");
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

// dialog-option.js

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

function openOptionDialog(e, type) {
    openDialog(type);
    optionJson = $(e.currentTarget).data("optionJson");
    // 修改过选项   才替换选项内容
    if (optionJson.length > 1) {
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
        // 未修改过选项    还原    防止修改后点击其他
    } else {
        dialogSelectEdit.find("div.container.active").html(optionContainer.html());
        // 激活第一个option 并使其成为默认选项
        dialogSelectEdit.find("div.option").first().click().find("div.option-selected").click();
    }
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
    // value 默认= label
    // valueInp.val(value);
    valueInp.val(value ? value : label == "-- 请选择 --" ? "" : label);
}

function activeOption(e) {
    var target = $(e.currentTarget ? e.currentTarget : e.target);
    target.addClass("active").siblings().removeClass("active").find("div.active").removeClass("active");
}

function deleteOption(e) {
    stopPropagation(e);
    var e = $(e.currentTarget);
    if(e.parent().siblings().length<2){
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
    optionTitle.data("value", value ? value : label == "-- 请选择 --" ? "" : label);

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
    dialogSelectEdit.find("div.option").each(function (index) {

        label = $(this).find("div.option-title").html();
        value = $(this).find("div.option-title").data("value");
        selected = $(this).find("div.option-title").data("selected");
        selected = selected ? selected : "";
        value = value ? value : label == "-- 请选择 --" ? "" : label;
        if (!label) {
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

// dialog-radio.js

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

// dialog-multi.js

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
var multiJson = [];
var multiDefaultJson = [{
    label: "-- 请选择 --",
    value: "",
    children: [{
        label: "-- 请选择 --",
        value: "",
        children: []
    }]
}, {
    label: "1",
    value: "1",
    children: [{
        label: "11",
        value: "11",
        children: []
    },{
        label: "12",
        value: "12",
        children: []
    }]
}];

var num = 2;

function changeSelectNum() {
    num = numSelect.val();
    // 当前select个数
    var containerNum = dialogMultiSelectEdit.find("div.container:visible").length;
    // dialogMultiSelectEdit.parent().animate({"width":810+(num-2)*257+"px"});
    // dialogMultiSelectEdit.parent().width(810+(num-2)*257+"px");
    if (num > containerNum) {
        dialogMultiSelectEdit.parent().animate({
            "width": 810 + (num - 2) * 257 + "px"
        }, function () {
            // for (var i = 0; i < num - containerNum; i++) {
            //     var newSelect = oneSelect.clone();
            //     newSelect.find("div.select-name").html(containerNum + i + 1);
            //     newSelect.find("div.container").prop("id", "option-container" + (containerNum + i + 1))
            //     optionEditContainer.before(newSelect);
            //     dragula([document.getElementById("option-container" + (containerNum + i + 1))]);
            // }
            dialogMultiSelectEdit.find("div.one-select").each(function (index) {
                if (index < num) {
                    $(this).show();
                    // $(this).remove();
                }
            })
            // 切换后面的options
            changeOptions(dialogMultiSelectEdit.find("div.container.active").children("div.option.active").parent().parent(),dialogMultiSelectEdit.find("div.container.active").children("div.option.active").prop("id"));
        });
    } 
    if (num < containerNum) {
        dialogMultiSelectEdit.find("div.one-select").each(function (index) {
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

function openMultiDialog(e, type) {
    openDialog(type);
    multiJson = $(e.currentTarget).data("multiJson");
    // 修改过选项   才替换选项内容
    if (multiJson.length > 1) {
        dialogMultiSelectEdit.find("div.container.active").html("");
        for (var i = 0; i < multiJson.length; i++) {
            var defaultMulti = componentsDialog.find("div.component-option").clone();
            multiTitle = defaultMulti.find("div.option-title");
            multiTitle.html(multiJson[i][0]);
            multiTitle.data("value", multiJson[i][1]);
            // 默认选项
            multiJson[i][2] == "selected" ? multiTitle.data("selected", "selected") : multiTitle.data("selected", "");
            multiJson[i][2] == "selected" ? multiTitle.next().addClass("option-selected-default") : false;

            dialogMultiSelectEdit.find("div.container.active").append(defaultMulti);
        }
        // 激活第一个option
        dialogMultiSelectEdit.find("div.option").first().click();
        // 未修改过选项    还原    防止修改后点击其他
    } else {
        dialogMultiSelectEdit.find("div.container.active").html(optionContainer.html());
        // 激活第一个option 并使其成为默认选项
        dialogMultiSelectEdit.find("div.option").first().click().find("div.option-selected").click();
    }
}

function editMulti(e) {
    // 模拟点击 只有target
    var target = $(e.currentTarget ? e.currentTarget : e.target);

    if (target.hasClass("active") && target.parent().hasClass("active")) {
        return;
    }

    // 切换后面的options
    changeOptions(target.parent().parent(),target.prop("id"));

    activeMulti(e);

    multiTitle = target.find("div.option-title");

    labelMulti = multiTitle.html();
    // 默认请选择 不可修改 只能删除 value=""
    labelInpMulti.val(labelMulti);
    labelMulti == "-- 请选择 --" ? valueInpMulti.parent().hide().prev().find("input").prop("disabled", true) : valueInpMulti.parent().show().prev().find("input").removeProp("disabled");
    // 都可以聚焦
    // valueInpMulti.get(0).focus();
    labelInpMulti.focus();

    valueMulti = multiTitle.data("value");
    // value 默认= label
    // valueInpMulti.val(valueMulti);
    valueInpMulti.val(valueMulti ? valueMulti : labelMulti == "-- 请选择 --" ? "" : labelMulti);
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
function changeOptions(e,order) {
    // 如果是 默认的 "-- 请选择 --"           indexOf 字符串是否包含  是 则 -1 == true  不是 则 0 == false    所以加!
    if (!order.indexOf("order-0")) {
        e.nextAll().find(".container").children().removeClass("active").hide().parent().find("div.option[id*='order-0']").show().addClass("active");
        return;
    }
    e.next().find(".container").children().removeClass("active").hide().parent().find("div.option[id*='"+order+"']").show().first().addClass("active");
    // 如果有后续选项
    if (e.next().length && e.next().css("display") == "block") {
        // 递归切换    默认选中第一个 所以 order+"-1"
        changeOptions(e.next(),order+"-1");
    }
}

function deleteMulti(e) {
    stopPropagation(e);
    var e = $(e.currentTarget);
    if (e.parent().siblings().length < 2) {
        alert("至少要有两个选项!");
        return;
    }
    e.parent().next().length ? e.parent().next().click() : e.parent().prev().click();
    e.parent().remove();
}


function addMulti() {
    var defaultMulti = componentsDialog.find("div.component-option").clone();
    dialogMultiSelectEdit.find("div.container.active").append(defaultMulti);
    // 改方法   attr("onclick".fn)
    defaultMulti.attr("onclick","editMulti(event)").click();
}

function saveMulti() {
    // TODO 应先判断 不能与相同的 labelMulti 和 value
    labelMulti = labelInpMulti.val();
    valueMulti = valueInpMulti.val();
    multiTitle.html(labelMulti);
    multiTitle.data("value", valueMulti ? valueMulti : labelMulti == "-- 请选择 --" ? "" : labelMulti);

    // 阻止form提交跳转
    return false;
}

function selectedMulti(e) {
    stopPropagation(e);
    var e = $(e.currentTarget ? e.currentTarget : e.target);
    e.addClass("option-selected-default").parent().siblings().find("div.option-selected").removeClass("option-selected-default");
    e.prev().data("selected", "selected").parent().siblings().find("div.option-title").data("selected", "");
}

function completeMultis() {
    var complete = true;
    dialogMultiSelectEdit.find("div.option").each(function (index) {

        labelMulti = $(this).find("div.option-title").html();
        valueMulti = $(this).find("div.option-title").data("value");
        selectedMulti = $(this).find("div.option-title").data("selected");
        selectedMulti = selectedMulti ? selectedMulti : "";
        valueMulti = valueMulti ? valueMulti : labelMulti == "-- 请选择 --" ? "" : labelMulti;
        if (!labelMulti) {
            $(this).click();
            saveMultiBtn.click();
            complete = false;
            return false;
        }

        multiJson[index] = [
            labelMulti,
            valueMulti,
            selectedMulti
        ];

    })
    if (complete) {
        if (multiJson.length < 2) {
            alert("至少要有两个选项!");
            return;
        }
        // 将 选项数据 存到 弹窗按钮
        rightSelect.find("button.button-open-dialog").data("multiJson", multiJson);

        closeDialog();
    }
}



$(function () {

    // 初始化option拖拽
    // dragula([document.getElementsByClassName("option-container")]);无效,必须id
    // dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);
    dragula([document.getElementById("option-container1")]);
    dragula([document.getElementById("option-container2")]);
    dragula([document.getElementById("option-container3")]);
    dragula([document.getElementById("option-container4")]);
    dragula([document.getElementById("option-container5")]);
    // 激活第一个option
    dialogMultiSelectEdit.find("div.option").first().click();
})

// dialog-checkbox.js

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