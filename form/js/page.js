
$(function () {

    // 表格 新增
    $("div.component-table button.add-row").on("click", function () {
        var tr = $(this).closest("table").find("tr").eq(1).clone(true);
        tr.find("input").val("");
        tr.find("select").val("");
        tr.find("textarea").val("");
        $(this).closest("table").find("tr").last().before(tr);
    })

    // 表格 删除        需要被clone 所以不能给元素绑定 只能给在行内     clone(true) 可以解决
    $("div.component-table button.delete-row").on("click", function () {
        // 如果有合计,先减去当前值
        if ($(this).closest("table").find("input.count").length) {
            var deleteValue = $(this).closest("table").find("input.count").val() - $(this).parent().siblings().find("input.count-money").val();
            $(this).closest("table").find("input.count").val(deleteValue);
        }
        $(this).closest("tr").remove();
    })

    // 表格 全选/反选
    $("input.check-all").on("click", function () {
        console.log($(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(this).closest("table").find("input.checkbox").prop("checked", true);
        } else {
            $(this).closest("table").find("input.checkbox").removeProp("checked");
        }
    })

    // 表格 合计
    $("div.component-table input.count-part").on("keyup", function () {
        var count = 0;
        var trs = $(this).closest("table").find("tr");
        trs.each(function (i) {
            if (i > 0 && i < trs.length - 1) {
                var countNum = $(this).find("input.count-num").length ? $(this).find("input.count-num").val() : 1;
                var countDays = $(this).find("input.count-days").length ? $(this).find("input.count-days").val() : 1;
                var countMoney = $(this).find("input.count-money").length ? $(this).find("input.count-money").val() : 1;
                count += countMoney * 1 * countNum * countDays;
            }
        });
        trs.last().find("input.count").val(count);
    })
})

// 下拉框联动      (下一个select/input, 下一个select的数据, 下一个input的数据)
function linkSelect(nextEle, optionData, inputdata) {
    if (inputdata == undefined) {
        nextEle.empty().append("<option label='-- 请选择 --' value=''>-- 请选择 --</option>").change();
        // 前select置空   数据为空
        if (!optionData) return;
        for (var i = 0; i < optionData.length; i++) {
            nextEle.append("<option label='" + optionData[i].label + "' value='" + optionData[i].value + "'>" + optionData[i].label + "</option>");
        }
    } else {
        nextEle.val(inputdata).keyup();
    }
}



// 联动
var nextList = [];

function changeRiskType(e) {
    var e = e.currentTarget ? $(e.currentTarget) : $(e.target);
    var currentValue = e.val();
    var nextSelect = e.closest("td").next().find("select.risk-num");
    nextList = [];
    nextSelect.empty().append("<option value='' selected> - 请选择 - </option>");
    if (e.closest("td").next().next().find("input").length) {
        e.closest("td").next().next().find("input").val("");
        e.closest("td").next().next().next().find("input").val("");
    }
    if (currentValue == "") {
        return;
    }
    var policy_risk_id = "";
    for (var i = 0; i < policyRiskList.length; i++) {
        if (policyRiskList[i].risk_code == currentValue) {
            policy_risk_id = policyRiskList[i].policy_risk_id;
        }
    }
    for (var i = 0; i < itemList.length; i++) {
        if (policy_risk_id == itemList[i].policy_risk_id) {
            nextList.push(itemList[i]);
        }
    }
    for (var i = 0; i < nextList.length; i++) {
        nextSelect.append("<option value='" + nextList[i].insurance_no + "' >" + nextList[i].insurance_name + "</option>");
    }
}

function changeRiskNum(e) {
    var e = e.currentTarget ? $(e.currentTarget) : $(e.target);
    var riskNum = e.val();
    var insuranceNo = e.closest("td").next().find("input");
    var amount = insuranceNo.closest("td").next().find("input");
    if (!insuranceNo.length) {
        return;
    }
    if (riskNum == "") {
        insuranceNo.val("");
        amount.val("");
        return;
    }
    for (var i = 0; i < nextList.length; i++) {
        if (riskNum == nextList[i].insurance_no) {
            insuranceNo.val(nextList[i].insurance_num);
            amount.val(nextList[i].amount);
            return;
        }
    }
}
// 查勘页面提交
function surveySubmitPage(){
    //页面数据
    var page = $("#page").clone()
    page.find("table").remove()
    //表格数据
    var tableData = [];
    var registerFee = []; //后面立案提交需要的数据
    $("#page").find("table").each(function (i) {
        tableData[i] = $(this).serializeJsonArray()
    })
    var pageDetail = page.serializeJson();
    console.log('pageDetail:', pageDetail);
    console.log('tableData[0]:', tableData[0]);
    console.log('tableData[1]:', tableData[1]);
    var surveyData = {}; //survey;
    var surveyLossData = []; //surveyLoss
    var surveyFee = []; //surveyFee
    for (var i = 0; i < tableData[0].length; i++){
        var tempSurvey = {};
        tempSurvey.caseNo = pageDetail.case_no; //赔案号
        tempSurvey.riskCode = riskCode; //险别代码 commonjs里面定义全局变量储存了
        tempSurvey.insureNo = policyRiskItem; //投保序号 commonjs里面定义全局变量储存了
        tempSurvey.lossAmount = tableData[0][i].MaintenancePrice; //定损金额
        tempSurvey.auditAmount = tableData[0][i].MaintenancePrice; //审计金额
        tempSurvey.detail ={
            deviceFault: tableData[0][i].bigFault, //故障大类
            deviceSubfault: tableData[0][i].Fault, //故障大类
            repairPlan: tableData[0][i].MaintenancePlan, //维修方案
            repairRemarks: tableData[0][i].surveyRemarks //备注
        }
        surveyLossData.push(tempSurvey)
    }
    for (var i = 0; i < tableData[1].length;i++){
        var tempSurvey = {};
        var tempRegisterFee = {};//后面立案提交的registerFee里面数据
        tempSurvey.caseNo = pageDetail.case_no; //赔案号
        tempRegisterFee.caseNo = pageDetail.case_no; //立案赔案号
        tempRegisterFee.policyNo = $('input[name="policyNo"]').val(); //立案保单号
        tempSurvey.feeTypeCode = tableData[1][i].CostType; //费用类型代码

        tempRegisterFee.fee_type_code = tableData[1][i].CostType;//立案费用类型代码
        tempSurvey.feeTypeName = document.getElementsByName('CostType')[i].selectedOptions[0].innerHTML; //费用类型名称
        tempRegisterFee.fee_type_name = tempSurvey.feeTypeName; //立案费用类型名称
        tempRegisterFee.register_fee = tableData[1][i].MaintenancePrice; //立案费用
        tempSurvey.lossFee = tableData[1][i].MaintenancePrice; //费用金额
        tempSurvey.auditFee = tableData[1][i].MaintenancePrice; //审计金额
        tempSurvey.detail ={
            repairRemarks: tableData[1][i].costRemarks, //备注
        }
        surveyFee.push(tempSurvey)
        registerFee.push(tempRegisterFee)
    }


    surveyData.caseNo = pageDetail.case_no; //赔案号
    surveyData.insurantNo = $('input[name="equipment-cod"]').val(); //设备串码
    surveyData.customerName = $('input[name="reporter-name"]').val(); //客戶姓名
    surveyData.customerTel = pageDetail.reporterTel; //客戶电话
    surveyData.accidentTime = $('input[name="accident-time"]').val(); //出险时间
    surveyData.accidentPass = $('textarea[name="After-investigation"]').val(); //出险经过
    surveyData.dutyScale = 100; //责任比例
    surveyData.lossAmount = $('.loss-cost').val(); //定损金额
    surveyData.auditAmount = $('.loss-cost').val(); //审计金额

    surveyData.lossFee = $('.fee-cost').val(); //定损费用
    surveyData.auditFee = $('.fee-cost').val(); //审计费用
    // return false;
    surveyData.detail = {
        surveyDate:$('input[name="survey-time"]').val(),//查勘日期
        surveyReason1:$('select[name="first-select"]').val(), //出险原因1
        surveyReason2:$('select[name="second-select"]').val(), //出险原因2
        province: { label: $('select[name="province"]').val(), code: $('select[name="province"] option:selected').attr("data-code") },//省
        city: { label: $('select[name="city"]').val(), code: $('select[name="city"] option:selected').attr("data-code") },//市
        county: { label: $('select[name="county"]').val(), code: $('select[name="county"] option:selected').attr("data-code") },//区
        detailedAddress: $('input[name="detail-address"]').val(),//详细地址
        newDeviceCode: $('input[name="New-device-code"]').val(), //新设备码
        doorTime: $('input[name="door-time"]').val(), //上门时间
        repairWay: $('select[name="maintenance-mode"]').val(), //维修方式
        deviceType: $('select[name="Equipment-classifica"]').val(),//设备分类
        deviceBrand: $('select[name="Equipment-brand"]').val(),//设备品牌
        deviceModel: $('select[name="Equipment-type"]').val(),//设备型号
        deviceAttr: $('select[name="Device-attribute"]').val(),//设备属性
        surveyAdv: $('textarea[name="Prospecting-opinion"]').val(),//查勘意见
        surveyConclusion: $('textarea[name="Survey-conclusion"]').val(),//查勘结论
    };
    var data = {
        "survey": surveyData,
        "surveyLoss": surveyLossData,
        "surveyFee": surveyFee
    }
    console.log('提交data',data)
    var surveySubmit = {
        "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=surveyService&method=add",
        "data": data,
        success: function (res) {
            console.log(res)
        }
    }
    getApiService(surveySubmit)//提交请求

    var register = {
        "register": {
            "caseNo": pageDetail.case_no,//赔案号
            "policyNo": $('input[name="policyNo"]').val(),//保单号
            "insureAmount": insureAmount,//保单总保额
            "registerAmount": $('.loss-cost').val(),//立案总金额
            "register_fee": $('.fee-cost').val()//立案总费用
        },
        "registerRisk": [{
            "caseNo": pageDetail.case_no,//赔案号
            "policyNo": $('input[name="policyNo"]').val(),//保单号
            "riskCode": riskCode,//险别代码----common里面全局定义的
            "riskName": policyRisk.riskName,//险别名称
            "insureAmount": insureAmount,//保额
            "registerAmount": $('.loss-cost').val()//立案金额
        }],
        "registerRiskItem": [{
            "caseNo": pageDetail.case_no,//赔案号
            "policyNo": $('input[name="policyNo"]').val(),//保单号
            "riskCode": riskCode,//险别代码----common里面全局定义的
            "insureNo": policyRiskItem,//投保序号
            "insureName": policyRiskItems.insureName,//标的名称
            "insureAmount": insureAmount,//保额
            "insureCount": policyRiskItems.insureCount,//投保份数
            "totalInsureAmount": policyRiskItems.totalInsureAmount,//总保额
            "registerAmount": $('.loss-cost').val()//立案金额
        }],
        "registerFee": []
    }
    register.registerFee = registerFee;//最后一个数据由上面循环获得
    // var test = {    registerFee 中 所需内容
    //     "caseNo": pageDetail.case_no,//赔案号
    //     "policyNo": $('input[name="policyNo"]').val(),//保单号
    //     "fee_type_code": "",//费用类型代码
    //     "fee_type_name": "",//费用类型名称
    //     "register_fee": ""//立案费用
    // }
    console.log('register',register)
    var registerSubmit = {
        "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=registerService&method=edit",
        "data": register,
        success: function (res) {
            console.log(res)
        }
    }
    getApiService(registerSubmit)//立案请求
    return false;
}

// 新增页面提交
function submitPage() {
    // var pageSubmitUrl = $("div.footer-button div.button-submit button.submit").data("pageSubmitUrl");
    //页面数据
    var page = $("#page").clone()
    page.find("table").remove()
    //表格数据
    var tableData = []
    $("#page").find("table").each(function(i){
        tableData[i] = $(this).serializeJsonArray()
    })
    var data = {
        "report": page.serializeJson(),
        "reportLoss":tableData[0]
    }
    data.report.claimType = ''
    data.report.detail = {
        insurantNo:$('input[name="equipment-cod"]').val(),//设备串码
        jxReport:$('input[name="jx-case-report"]').val(),//捷信报案号
        doorTime:$('input[name="door-time"]').val(),//上门时间
        province:{label:$('select[name="province"]').val(),code:$('select[name="province"] option:selected').attr("data-code")},//省
        city:{label:$('select[name="city"]').val(),code:$('select[name="city"] option:selected').attr("data-code")},//市
        county:{label:$('select[name="county"]').val(),code:$('select[name="county"] option:selected').attr("data-code")},//区
        detailedAddress:$('input[name="detailedAddress"]').val(),//详细地址
        riskReason1:$('select[name="first-select"]').val(),//出险原因1
        riskReason2:$('select[name="second-select"]').val(),//出险原因2
        repairWay:$('select[name="maintenance-mode"]').val(),//维修方式
        deviceType:$('select[name="Equipment-classifica"]').val(),//设备分类
        deviceBrand:$('select[name="Equipment-brand"]').val(),//设备品牌
        deviceModel:$('select[name="Equipment-type"]').val(),//设备型号
        deviceAttr:$('select[name="Device-attribute"]').val(),//设备属性
    }
    for(var i=0;i<data.reportLoss.length;i++){
        data.reportLoss[i].caseNo = $('input[name="caseNo"]').val()//赔案号
        data.reportLoss[i].riskCode = $('#riskCode').val()//险别代码
        data.reportLoss[i].insureNo = $('#insureNo').val()//投保序号
        data.reportLoss[i].lossAmount = data.reportLoss[i].MaintenancePrice//维修价格
        data.reportLoss[i].detail = {
            deviceFault:data.reportLoss[i].bigFault,//故障大类
            deviceSubfault:data.reportLoss[i].Fault,//故障小类
            repairPlan:data.reportLoss[i].MaintenancePlan,//维修方案
            repairRemarks:$('.repairRemarks').eq(i).html()//备注
        }
    }

    console.log(data);
    var submit = {
        "url":"http://192.168.100.45:9191/server/claimDataController.do?esType=reportService&method=addReport",
        "data": data,
        success:function(res){
            console.log(res)
        }
    }

    getApiService(submit)

    return false;
}
