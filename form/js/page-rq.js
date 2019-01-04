var policyRiskList = [{ "allFields": ["policy_risk_id", "risk_code", "risk_name", "amount", "creator_code", "create_time", "updater_code", "update_time", "policy_id"], "amount": "5000.00", "create_time": "2018-11-28 21:25:40.0", "creator_code": "admin", "fields": {}, "policy_id": "c073cf8e91b2433d92af3c63003ca38d", "policy_risk_id": "c073cf8e91b2433d92af3777333ca38d", "risk_code": "000001", "risk_name": "财物意外险", "update_time": "2018-11-28 21:25:31.0", "updater_code": "admin" }, { "allFields": ["policy_risk_id", "risk_code", "risk_name", "amount", "creator_code", "create_time", "updater_code", "update_time", "policy_id"], "amount": "4000.00", "create_time": "2018-11-28 21:25:43.0", "creator_code": "admin", "fields": {}, "policy_id": "c073cf8e91b2433d92af3c63003ca38d", "policy_risk_id": "c073cf8e91b2433d92afyyy7333ca38d", "risk_code": "000002", "risk_name": "人身意外险", "update_time": "2018-11-28 21:25:36.0", "updater_code": "admin" }];
var riskList = [{ "allFields": ["policy_risk_id", "risk_code", "risk_name", "amount", "creator_code", "create_time", "updater_code", "update_time", "policy_id"], "fields": {}, "risk_code": "000001", "risk_name": "财物意外险" }, { "allFields": ["policy_risk_id", "risk_code", "risk_name", "amount", "creator_code", "create_time", "updater_code", "update_time", "policy_id"], "fields": {}, "risk_code": "000002", "risk_name": "人身意外险" }];
var itemList = [{ "allFields": ["policy_risk_item_id", "insurance_no", "insurance_name", "amount", "insurance_num", "creator_code", "create_time", "updater_code", "update_time", "policy_risk_id"], "amount": "2000.00", "create_time": "2018-11-28 21:27:59.0", "creator_code": "admin", "fields": {}, "insurance_name": "1：财产损失", "insurance_no": "1", "insurance_num": "1", "policy_risk_id": "c073cf8e91b2433d92af3777333ca38d", "policy_risk_item_id": "c073cf8e91b2433d924ji777333ca38d", "update_time": "2018-11-28 21:28:06.0", "updater_code": "admin" }, { "allFields": ["policy_risk_item_id", "insurance_no", "insurance_name", "amount", "insurance_num", "creator_code", "create_time", "updater_code", "update_time", "policy_risk_id"], "amount": "1000.00", "create_time": "2018-11-28 21:31:37.0", "creator_code": "admin", "fields": {}, "insurance_name": "1：人身伤害", "insurance_no": "1", "insurance_num": "1", "policy_risk_id": "c073cf8e91b2433d92afyyy7333ca38d", "policy_risk_item_id": "c073cf8e91b2433d924ji77733dltv59", "update_time": "2018-11-28 21:31:41.0", "updater_code": "admin" }, { "allFields": ["policy_risk_item_id", "insurance_no", "insurance_name", "amount", "insurance_num", "creator_code", "create_time", "updater_code", "update_time", "policy_risk_id"], "amount": "3000.00", "create_time": "2018-11-28 21:32:46.0", "creator_code": "admin", "fields": {}, "insurance_name": "2：人身伤害", "insurance_no": "2", "insurance_num": "1", "policy_risk_id": "c073cf8e91b2433d92afyyy7333ca38d", "policy_risk_item_id": "c073cf8e91b2433d924ji777ejmkl487", "update_time": "2018-11-28 21:32:50.0", "updater_code": "admin" }, { "allFields": ["policy_risk_item_id", "insurance_no", "insurance_name", "amount", "insurance_num", "creator_code", "create_time", "updater_code", "update_time", "policy_risk_id"], "amount": "3000.00", "create_time": "2018-11-28 21:29:59.0", "creator_code": "admin", "fields": {}, "insurance_name": "2：财产损失", "insurance_no": "2", "insurance_num": "1", "policy_risk_id": "c073cf8e91b2433d92af3777333ca38d", "policy_risk_item_id": "c073cf8e91b2433ddkkji777333ca38d", "update_time": "2018-11-28 21:30:07.0", "updater_code": "admin" }];

$(function() {
    // 表格 新增
    $("div.component-table button.add-row").click(function() {
        var tr = $(this).closest("table").find("tr").eq(1).clone();
        tr.find("input").val("");
        tr.find("select").val("");
        tr.find("textarea").val("");
        $(this).closest("table").find("tr").last().before(tr);
    })
    
    // 出险经过 自动带出
    // $(".risk-process").change(function () {
    //     setProcess();
    // })
    $("input.risk-process").keyup(function() {
        setProcess();
    })
    $("select.risk-process").change(function() {
            setProcess();
        })
        // 日期 keyup 触发不了
    $("input.Wdate.risk-process").blur(function() {
        setProcess();
    });

    //    联动下拉框

    for (var i = 0; i < policyRiskList.length; i++) {
        $("select.risk-type").append("<option value='" + policyRiskList[i].risk_code + "' >" +
            policyRiskList[i].risk_name + "</option>");
    }

    $("input.count").each(function() {
        var index = $(this).closest("td").index();
        var trs = $(this).closest("table").find("tr");
        var count = 0;
        trs.each(function(i) {
            if (i > 0 && i < trs.length - 1) {
                count += $(this).find("td").eq(index).find("input.money").val() * 1;
            }
        });
        $(this).val(count);
    })
})

// 表格 删除        需要被clone 所以不能给元素绑定 只能给在行内
// $("div.component-table button.delete-row").on("click",function () {
//     $(this).closest("tr").remove();
// })
// $("div.component-table button.delete-row").click(function () {
//     $(this).closest("tr").remove();
// })

function deleteRow(e) {
    var e = $(e.currentTarget);
    // 如果有合计,先减去当前值
    if (e.closest("table").find("input.count").length) {
        var deleteValue = e.closest("table").find("input.count").val() - e.parent().siblings().find("input.money").val();
        e.closest("table").find("input.count").val(deleteValue);
        // 触发   改变 process 出现经过 的值
        setProcess();
    }
    e.closest("tr").remove();
}

// 表格 合计        需要被clone 所以不能给元素绑定 只能给在行内
function getCount(e) {
    var e = $(e.currentTarget);
    var index =  e.closest("td").index();
    var count = 0;
    var trs = e.closest("table").find("tr");
    trs.each(function (i) {
        if (i>0&&i<trs.length-1) {
        	var countNnum = $(this).find("input.count-num").length ? $(this).find("input.count-num").val() : 1;
        	var countDays = $(this).find("input.count-days").length ? $(this).find("input.count-days").val() : 1;
        	var countMoney = $(this).find("input.money").length ? $(this).find("input.money").val() : 1;
        	count += countMoney * 1 * countNnum * countDays;
        }
    });
    trs.last().find("input.count").val(count);

    // 触发   改变 process 出现经过 的值
    setProcess();
//    if (trs.last().find("input.count").hasClass("risk-process")) {
//    }
}

// 改变 process 出现经过 的值
function setProcess() {
    var riskProcess = " " + $("input[name='reporter_name']").val() + " " + $("input[name='reporter_tel']").val() + " 于 " + $("input[name='accident_time']").val() + " 在 " + $("input[name='accident_addr_detail']").val() + " 因为 " + $("select[name='accident_cause_sub_type']").val() + " 发生了事故";
    if($("input[name='baosuoCount']").val()!=undefined && $("input[name='baosuoCount']").val()!=''){
    	riskProcess +="，报损金额 " + $("input[name='baosuoCount']").val();
    }
    $("textarea.risk-process-all").val(riskProcess);
}

//联动
var nextList = [];

function changeRiskType(e) {
	var e = e.currentTarget ? $(e.currentTarget) : $(e.target);
    var currentValue = e.val();
    var nextSelect = e.closest("td").next().find("select.risk-num");
    nextList = [];
    nextSelect.empty().append("<option value='' selected> - 请选择 - </option>");
    if(e.closest("td").next().next().find("input").length){
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
    if(!insuranceNo.length){
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

// 页面提交
function submitPage() {
    // var pageSubmitUrl = $("div.footer-button div.button-submit button.submit").data("pageSubmitUrl");
    var data = $("#page").serializeJson();
    console.log(data);

    $.ajax({
        url: $("div.footer-button div.button-submit button.submit").data("pageSubmitUrl"),
        data: $("#page").serializeJson(),
        success: function(res) {
            console.log(res);
        },
        fail: function(res) {
            console.log(res);
        }
    })


    return false;
}

//报案页面提交
function submitReport() {
 // var pageSubmitUrl = $("div.footer-button div.button-submit button.submit").data("pageSubmitUrl");
// var data = $("#page").serializeJson();
 var report={"report_way":$("select[name=report_way]").val(),
 		"accident_cause_big_type":$("select[name=accident_cause_big_type]").val(),
 		"accident_cause_sub_type":$("select[name=accident_cause_sub_type]").val(),
 		"reporter_name":$("input[name=reporter_name]").val(),
 		"reporter_tel":$("input[name=reporter_tel]").val(),
 		"accident_time":$("input[name=accident_time]").val(),
 		"accident_pass":$("textarea[name=accident_pass]").val(),
 		"accident_addr_detail":$("input[name=accident_addr_detail]").val()
 }
// //产品自定义字段格式
// var productReportDataList = {
// 		'column_name': 'column_name',
// 		'data': 'data'
// };
 var reportLossList={
 		"risk_code":$("select[name=risk_code]").val(),	
 		"insure_no":$("select[name=insure_no]").val(),	
 		"insure_num":$("input[name=insure_num]").val(),
 		"insure_price":$("input[name=insure_price]").val(),
 		"loss_amount":$("input[name=loss_amount]").val(),
 		"remark":$("input[name=remark]").val()
 }
	var processId=$("#processId").val();
    var policy_id=$("#policy_id").val();
    
	$.ajaxPost("/business/report/save", {'processId':processId,'policy_id':policy_id,'report':report, 'reportLossList':[reportLossList]}, function(result) {
		if (result == "1") {
			window.parent.$.messager.alert("提示","报案成功",'info',function(){
				window.parent.$("#tabBar").tabs("close","报案");
			});
	    } else if (result == "0") {
	    	window.parent.$.messager.alert("提示","报案失败",'warning');
	    }
	});

    return false;
}

//调度页面提交
function submitDispatch() {
    var dispatchList = [{
        "task_type": $("select[id=task_type0]").val(),
        "worker_code": $("select[id=worker_code0]").val(),
        "dispatch_content": $("input[id=dispatch_content0]").val(),
        "dispatch_place": $("input[id=dispatch_place0]").val()
    }, {
        "task_type": $("select[id=task_type1]").val(),
        "worker_code": $("select[id=worker_code1]").val(),
        "dispatch_content": $("input[id=dispatch_content1]").val(),
        "dispatch_place": $("input[id=dispatch_place1]").val()
    }, {
        "task_type": $("select[id=task_type2]").val(),
        "worker_code": $("select[id=worker_code2]").val(),
        "dispatch_content": $("input[id=dispatch_content2]").val(),
        "dispatch_place": $("input[id=dispatch_place2]").val()
    }]

	 var case_no=$("#case_no").val();
	 var policy_id=$("#policy_id").val();
 var report_id=$("#report_id").val();
 var taskId=$("#taskId").val();
 var data = {
		 'case_no':case_no,
		 'policy_id':policy_id,
		 'report_id':report_id,
		 'taskId':taskId,
		 'dispatchList':dispatchList
};
	$.ajaxPost("/business/dispatch/save", data, function(result) {
		if (result == "1") {
			window.parent.$.messager.alert("提示","调度成功",'info',function(){
				window.parent.$("#tabBar").tabs("close","调度");
			});
	    } else if (result == "0") {
	    	window.parent.$.messager.alert("提示","调度失败",'warning');
	    }
	});
	
	return false;
}

//查勘页面提交
function submitSurvey() {
	var duty_scale = '100';
	if ($("select[name=duty_type]").val() == '00000001') {
		duty_scale = $("input[name=duty_scale]").val();
	}
    var survey = {
        "customer_name": $("input[id=customer_name]").val(),
        "customer_tel": $("input[id=customer_tel]").val(),
        "accident_cause_big_type": $("select[name=accident_cause_big_type]").val(),
        "accident_cause_sub_type": $("select[name=accident_cause_sub_type]").val(),
        "survey_addr": $("input[id=survey_addr]").val(),
        "survey_time": $("input[id=survey_time]").val(),
        "duty_type": $("select[name=duty_type]").val(),
        "duty_scale": $("input[name=duty_scale]").val(),
        "accident_pass": $("textarea[name=accident_pass]").val(),
        "survey_result": $("textarea[name=survey_result]").val()
    }

////产品自定义字段格式
//var productSurveyDataList = {
//		'column_name': 'column_name',
//		'data': 'data'
//};
	 var orderId=$("#orderId").val();
	 var taskId=$("#taskId").val();
 var dispatch_id=$("#dispatch_id").val();
 var report_id=$("#report_id").val();
	$.ajaxPost("/business/survey/save", {'orderId':orderId,'taskId':taskId,'dispatch_id':dispatch_id,'report_id':report_id,'survey':survey}, function(result) {
		if (result == "1") {
			window.parent.$.messager.alert("提示","现场查勘成功",'info',function(){
				window.parent.$("#tabBar").tabs("close","现场查勘");
			});
	    } else if (result == "0") {
	    	window.parent.$.messager.alert("提示","现场查勘失败",'warning');
	    }
	});
	
	return false;
}

//物损页面提交
function submitObject() {
    var objectLossList = [{
        "risk_code": $("select[id=risk_code]").val(),
        "insure_no": $("select[id=insure_no]").val(),
        "loss_type": $("select[name=loss_type]").val(),
        "loss_item_name": $("input[id=loss_item_name]").val(),
        "price": $("input[name=price]").val() || 0,
        "loss_amount": $("input[name=loss_amount]").val()
    }];

    var remnantList = [{
        "risk_code": $("select[id=risk_code_leave]").val(),
        "insure_no": $("select[id=insure_no_leave]").val(),
        "is_deduct": $("select[name=is_deduct]").val(),
        "loss_item_name": $("input[id=loss_item_name_leave]").val(),
        "num": $("input[id=num_leave]").val(),
        "survey_price": $("input[id=survey_price_leave]").val()
    }];

    var otherLossList = [{
        "risk_code": $("select[id=risk_code_other]").val(),
        "insure_no": $("select[id=insure_no_other]").val(),
        "addr": $("input[name=addr]").val(),
        "num": $("input[id=num_other]").val(),
        "day_num": $("input[name=day_num]").val(),
        "survey_price": $("input[id=survey_price_other]").val()
    }];

    var feeList = [{
        "fee_type": $("select[name=fee_type]").val(),
        "amount": $("input[name=amount]").val(),
        "description": $("input[id=description_fee]").val()
    }];

    var objectSurvey = {
        "loss_view": $("textarea[name=loss_view]").val(),
        "description": $("textarea[id=description]").val()
    };

    var data = {
        'objectLossList': objectLossList,
        'remnantList': remnantList,
        'otherLossList': otherLossList,
        'feeList': feeList,
        'objectSurvey': objectSurvey,
        'taskId': $("#taskId").val(),
        'report_id': $("#report_id").val(),
        'dispatch_id': $("#dispatch_id").val()
    };

    $.ajaxPost("/business/objectSurvey/save", data, function(result) {
        if (result == "1") {
            window.parent.$.messager.alert("提示", "财物定损成功", 'info', function() {
                window.parent.$("#tabBar").tabs("close", "财物定损");
            });
        } else if (result == "0") {
            window.parent.$.messager.alert("提示", "财物定损失败", 'warning');
        }
    });

    return false;
}

//财务核损提交
function auditObject() {
    var objectLossList = [{
        "object_loss_id": $("input[id=object_loss_id]").val(),
        "risk_code": $("select[id=risk_code]").val(),
        "audit_amount": $("input[id=audit_amount]").val()
    }];
    var remnantList = [{
        "remnant_id": $("input[id=remnant_id]").val(),
        "risk_code": $("select[id=risk_code_leave]").val(),
        "is_deduct": $("select[id=is_deduct]").val(),
        "num": $("input[id=num_leave]").val(),
        "audit_price": $("input[id=audit_price_leave]").val()
    }];
    var otherLossList = [{
        "other_loss_id": $("input[id=other_loss_id]").val(),
        "risk_code": $("select[id=risk_code_other]").val(),
        "num": $("input[id=num_other]").val(),
        "day_num": $("input[id=day_num]").val(),
        "audit_price": $("input[id=audit_price_other]").val()
    }];
    var feeList = [{
        "fee_id": $("input[id=fee_id]").val(),
        "fee_type": $("select[id=fee_type]").val(),
        "description": $("input[id=description_fee]").val(),
        "audit_amount": $("input[id=audit_amount_fee]").val()
    }];
    var data = {
        'taskId': $("#taskId").val(),
        'policy_id': $("#policy_id").val(),
        'report_id': $("#report_id").val(),
        'dispatch_id': $("#dispatch_id").val(),
        'objectLossList': objectLossList,
        'remnantList': remnantList,
        'otherLossList': otherLossList,
        'feeList': feeList
    };
    $.ajaxPost("/business/auditObjectLoss/save", data, function(result) {
        if (result == "1") {
            window.parent.$.messager.alert("提示", "财物核损成功", 'info', function() {
                window.parent.$("#tabBar").tabs("close", "财物核损");
            });
        } else if (result == "0") {
            window.parent.$.messager.alert("提示", "财物核损失败", 'warning');
        }
    });
    return false;
}

//人伤页面提交
function submitPerson() {
	var personSurvey={
			"customer_name":$("input[name=customer_name]").val(),
 		"card_id":$("input[name=card_id]").val(),
 		"sex":$("input[name=sex]").val(),
 		"age":$("input[name=age]").val(),
 		"tel":$("input[name=tel]").val(),
 		"addr":$("input[name=addr]").val(),
 		"unit_name":$("input[name=unit_name]").val(),
 		"unit_addr":$("input[name=unit_addr]").val(),
 		"unit_tel":$("input[name=unit_tel]").val(),
 		"hurt_level":$("select[name=hurt_level]").val(),
 		"is_locale_survey":$("input[name=is_locale_survey]").val(),
 		"is_in_hospital":$("input[name=is_in_hospital]").val(),
 		"diagnosis_result":$("textarea[name=diagnosis_result]").val(),
 		"loss_view":$("textarea[name=loss_view]").val()
 };
 
	 var personLossList = [{
 		"risk_code":$("select[name=risk_code]").val(),
		"insure_no":$("select[name=insure_no]").val(),
		"price":$("input[name=price]").val(),
		"description":$("input[name=description]").val(),
		"loss_amount":$("input[name=loss_amount]").val()
}];
	
	var feeList = [{
			"fee_type":$("select[name=fee_type]").val(),
 		"amount":$("input[name=amount]").val(),
 		"description":$("input[id=description_fee]").val()
	}];
	
var data = {
			'personSurvey':personSurvey,
			'personLossList':personLossList,
			'feeList':feeList,
			'taskId':$("#taskId").val(),
			'report_id':$("#report_id").val(),
			'dispatch_id':$("#dispatch_id").val()
	};
	$.ajaxPost("/business/personSurvey/save", data, function(result) {
		if (result == "1") {
			window.parent.$.messager.alert("提示","人伤定损成功",'info',function(){
				window.parent.$("#tabBar").tabs("close","人伤定损");
			});
	    } else if (result == "0") {
	    	window.parent.$.messager.alert("提示","人伤定损失败",'warning');
	    }
	});
	
	return false;
}

//人伤核损提交
function auditPersonLoss() {
	 var personLossList = [{
	 		"risk_code":$("select[id=risk_code]").val(),
 		"person_loss_id":$("input[id=person_loss_id]").val(),
		"audit_amount":$("input[id=audit_amount]").val()
}];
	 var feeList = [{
	 		"fee_id":$("input[id=fee_id]").val(),
			"audit_amount":$("input[id=audit_amount_fee]").val(),
	 		"fee_type":$("select[id=fee_type]").val(),
			"description":$("input[id=description_fee]").val()
	}];
	var data = {
			'taskId':$("#taskId").val(),
			'policy_id':$("#policy_id").val(),
			'report_id':$("#report_id").val(),
			'dispatch_id':$("#dispatch_id").val(),
			'personLossList':personLossList,
			'feeList':feeList
	};
	$.ajaxPost("/business/auditPersonLoss/save", data, function(result) {
		if (result == "1") {
			window.parent.$.messager.alert("提示","人伤核损成功",'info',function(){
				window.parent.$("#tabBar").tabs("close","人伤核损");
			});
	    } else if (result == "0") {
	    	window.parent.$.messager.alert("提示","人伤核损失败",'warning');
	    }
	});
	
	return false;
}

//理算页面提交
function submitAdjustment() {
    var compensate = {
        "fee_type": $("select[name=fee_type_compensate]").val(),
        "account": $("input[name=account]").val(),
        "name": $("input[name=name]").val(),
        "amount": $("input[name=amount]").val(),
        "remark": $("input[name=remark]").val()
    }

    var adjustmentFee = {
        "adjustment_fee_id": $("input[name=adjustment_fee_id]").val(),
        "adjustment_amount": $("input[name=adjustment_amount]").val()
    }

	var adjustmentRisk = {
			"adjustment_risk_id":$("input[name=adjustment_risk_id]").val(),
 		"adjustment_amount":$("input[name=adjustment_amount]").val()
	}
	
	var taskId = $("#taskId").val();
	var report_id = $("#report_id").val();
	var dispatch_id = $("#dispatch_id").val();
	
	var data = {
			'taskId':taskId,
			'report_id':report_id,
			'dispatch_id':dispatch_id,
			'result':$("input[name=result]").val(),
			'view':$("input[name=view]").val(),
			'compensateList':[compensate],
			'adjustmentFeeList':[adjustmentFee],
			'adjustmentRiskList':[adjustmentRisk]
	}

	$.ajaxPost("/business/adjustment/save", data, function(result) {
		if (result == "1") {
			window.parent.$.messager.alert("提示","理算成功",'info',function(){
				window.parent.$("#tabBar").tabs("close","财物理算");
				window.parent.$("#tabBar").tabs("close","人伤理算");
			});
	    } else if (result == "0") {
	    	window.parent.$.messager.alert("提示","理算失败",'warning');
	    }
	});
	
	return false;
}

//核赔页面提交
function auditAdjustment() {
    var data = {
        'taskId': $("#taskId").val(),
        'report_id': $("#report_id").val(),
        'dispatch_id': $("#dispatch_id").val(),
        'result': $("input[name=result]").val(),
        'view': $("input[name=view]").val()
    }

	$.ajaxPost("/business/auditAdjustment/save", data, function(result) {
		if (result == "1") {
			window.parent.$.messager.alert("提示","核赔成功",'info',function(){
				window.parent.$("#tabBar").tabs("close","财物核赔");
				window.parent.$("#tabBar").tabs("close","人伤核赔");
			});
	    } else if (result == "0") {
	    	window.parent.$.messager.alert("提示","核赔失败",'warning');
	    }
	});
	
	return false;
}

//结案页面提交
function closeCase() {
    var data = {
        'orderId': $("#orderId").val(),
        'taskId': $("#taskId").val(),
        'report_id': $("#report_id").val(),
        'dispatch_id': $("#dispatch_id").val(),
        'result': $("input[name=result]").val(),
        'view': $("input[name=view]").val()
    }

	$.ajaxPost("/business/closeCase/save", data, function(result) {
		if (result == "1") {
			window.parent.$.messager.alert("提示","结案成功",'info',function(){
				window.parent.$("#tabBar").tabs("close","财物结案");
				window.parent.$("#tabBar").tabs("close","人伤结案");
			});
	    } else if (result == "0") {
	    	window.parent.$.messager.alert("提示","结案失败",'warning');
	    }
	});
	
	return false;
}