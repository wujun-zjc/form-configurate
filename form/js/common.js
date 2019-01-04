//保单数据
var policyData = 1



// 生成页面所需 function
function openClose(e) {
    $(e.currentTarget).toggleClass("icon-close");
    $(e.currentTarget).parent().next().slideToggle();
}

function selectChange() {
    // console.log(deviceAttrs, attrs, subList, repairPrice)
    // 维修地址.城市 => 维修方式
    $("select.link-city").change(function () {
        if (!$(this).val()) {
            linkSelect($(".link-maintain-type"));
        } else {
            // 获取对应数据
            //请求设备分类
            var arr = []
            var cityInfo = {
                "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=configMaintainerService&method=get",
                "data": {
                    cityCode: $('select[name="city"] option:selected').attr("data-code"),
                },
                success: function (res) {
                    if (res.obj) {
                        console.log(res)
                        for (var i = 0; i < res.obj.length; i++) {
                            var object = {
                                label: res.obj[i].maintainerName,
                                value: res.obj[i].maintainerCode
                            }
                            arr.push(object)
                        }
                    }
                    linkSelect($(".link-maintain-type"), arr);
                }
            }
            getApiService(cityInfo)
        }
    })
    // 维修方式 => 设备分类
    $("select.link-maintain-type").change(function () {
        if (!$(this).val()) {
            linkSelect($(".link-equipment-classification"));
        } else {
            // 获取对应数据
            //请求设备分类
            var arr = []
            var deviceType = {
                "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=repairService&method=getDeviceType",
                "data": {
                    appNme: "劲螭",
                    plyNo: "6172120181000000001",
                    prodNo: "1721",
                    repair: "5000001"
                },
                success: function (res) {
                    if (res.obj) {
                        for (var i = 0; i < res.obj.length; i++) {
                            var object = {
                                label: res.obj[i].name,
                                value: res.obj[i].id
                            }
                            arr.push(object)
                        }
                    }
                    linkSelect($(".link-equipment-classification"), arr);
                }
            }
            getApiService(deviceType)

        }
    })
    // 设备分类 => 设备品牌
    $("select.link-equipment-classification").change(function () {
        if (!$(this).val()) {
            linkSelect($(".link-equipment-brand"));
        } else {
            // 获取对应数据
            var arr = []
            //请求设备品牌
            var deviceBrand = {
                "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=repairService&method=getDeviceBrand",
                "data": {
                    deviceType: $('select[name="Equipment-classifica"]').val(),
                    repair: "5000001"
                },

                success: function (res) {
                    if (res.obj) {
                        console.log('设备品牌列表', res)
                        for (var i = 0; i < res.obj.length; i++) {
                            var object = {
                                label: res.obj[i].name,
                                value: res.obj[i].id
                            }
                            arr.push(object)
                        }
                    }
                    linkSelect($(".link-equipment-brand"), arr);
                }
            }
            getApiService(deviceBrand)
        }
    })
    // var deviceAttrs = deviceAttrs ? deviceAttrs:[]
    // 设备品牌 => 设备型号
    $("select.link-equipment-brand").change(function () {
        if (!$(this).val()) {
            linkSelect($(".link-equipment-type"));
        } else {
            // 获取对应数据
            //请求设备型号（包含属性）
            var arr = []
            var deviceModel = {
                "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=repairService&method=getDeviceModel",
                "data": {
                    deviceBrand: $('select[name="Equipment-brand"]').val(),
                    deviceType: $('select[name="Equipment-classifica"]').val(),
                    repair: "5000001"
                },
                success: function (res) {
                    console.log('设备型号', res)
                    if (res.obj) {
                        for (var i = 0; i < res.obj.length; i++) {
                            var object = {
                                label: res.obj[i].model,
                                value: res.obj[i].id
                            }
                            arr.push(object)
                            var object2 = {
                                value: res.obj[i].id,
                                attrs: res.obj[i].attrs
                            }
                            deviceAttrs.push(object2)
                        }
                    }
                    linkSelect($(".link-equipment-type"), arr);
                }
            }
            getApiService(deviceModel)
        }
    })
    // 设备型号 => 设备属性
    $("select.link-equipment-type").change(function () {
        if (!$(this).val()) {
            linkSelect($(".link-equipment-attribute"));
        } else {
            // 获取对应数据
            // var attrs = []//设备属性
            for (var i = 0; i < deviceAttrs.length; i++) {
                if (String(deviceAttrs[i].value) == $("select.link-equipment-type").val()) {
                    for (var j = 0; j < deviceAttrs[i].attrs.length; j++) {
                        var object = {
                            label: deviceAttrs[i].attrs[j].attributeValue,
                            value: deviceAttrs[i].attrs[j].id
                        }
                        attrs.push(object)
                    }
                }
            }
            linkSelect($(".link-equipment-attribute"), attrs);
        }
    })
    // var subList = subList ? subList:[]
    // 设备型号 => 故障大类
    $("select.link-equipment-type").change(function () {
        if (!$(this).val()) {
            linkSelect($(".link-fault-big"));
        } else {
            // 获取对应数据
            //请求故障大类（包含小类）
            var arr = []
            var deviceFault = {
                "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=repairService&method=getDeviceFault",
                "data": {
                    deviceBrand: $('select[name="Equipment-brand"]').val(),
                    deviceType: $('select[name="Equipment-classifica"]').val(),
                    deviceModel: $('select[name="Equipment-type"]').val(),
                    repair: "5000001"
                },
                success: function (res) {
                    if (res.obj) {
                        for (var i = 0; i < res.obj.length; i++) {
                            var object = {
                                label: res.obj[i].name,
                                value: res.obj[i].id
                            }
                            arr.push(object)
                            var object2 = {
                                value: res.obj[i].id,
                                subList: res.obj[i].subList
                            }
                            subList.push(object2)
                        }
                    }
                    linkSelect($(".link-fault-big"), arr);
                }
            }
            getApiService(deviceFault)
        }
    })
    // 故障大类 => 故障小类
    $("select.link-fault-big").change(function () {
        var dom = $(this)
        if (!$(this).val()) {
            linkSelect($(this).closest("tr").find(".link-fault-small"));
        } else {
            // 获取对应数据
            var sList = []//设备属性
            for (var i = 0; i < subList.length; i++) {
                if (String(subList[i].value) == $("select.link-fault-big").eq($("select.link-fault-big").index(this)).val()) {
                    for (var j = 0; j < subList[i].subList.length; j++) {
                        var object = {
                            label: subList[i].subList[j].name,
                            value: subList[i].subList[j].id
                        }
                        sList.push(object)
                    }
                }
            }
            linkSelect(dom.closest("tr").find(".link-fault-small"), sList);
        }
    })
    // var repairPrice = ''; //维修价格
    // 故障小类 => 维修方案
    $("select.link-fault-small").change(function () {
        var index = $("select.link-fault-small").index(this)
        var dom = $(this)
        if (!$(this).val()) {
            linkSelect($(this).closest("tr").find(".link-maintenance-plan"));
        } else {
            // 获取对应数据
            //请求维修方案（包含价格）
            var arr = []
            var repairPlan = {
                "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=repairService&method=getRepairPlan",
                "data": {
                    deviceAttr: $('select[name="Device-attribute"]').val(),
                    deviceBrand: $('select[name="Equipment-brand"]').val(),
                    deviceFault: $('select[name="bigFault"]').eq(index).val(),
                    deviceModel: $('select[name="Equipment-type"]').val(),
                    deviceSubfault: $('select[name="Fault"]').eq(index).val(),
                    deviceType: $('select[name="Equipment-classifica"]').val(),
                    repair: "5000001"

                },
                success: function (res) {
                    if (res.obj && JSON.stringify(res.obj)!='{}') {
                        for (var i = 0; i < res.obj.items.length; i++) {
                            var object = {
                                label: res.obj.items[i].solution,
                                value: res.obj.items[i].solutionId
                            }
                            arr.push(object)
                        }
                        repairPrice = res.obj.priceTotal
                    }

                    linkSelect(dom.closest("tr").find(".link-maintenance-plan"), arr);
                }
            }
            console.log(repairPlan)
            getApiService(repairPlan)
        }
    })
    // 维修方案 => 维修价格
    $("select.link-maintenance-plan").change(function () {
        if (!$(this).val()) {
            linkSelect($(this).closest("tr").find(".link-maintenance-price"), "", "");
        } else {
            // 获取对应数据
            linkSelect($(this).closest("tr").find(".link-maintenance-price"), "", repairPrice);
        }
    })
}






function formatDate(NewDtime) {
    var dt = new Date(parseInt(NewDtime.slice(6, 19)));
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    var hour = dt.getHours();
    var minute = dt.getMinutes();
    var second = dt.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}


// 回显保单信息
var riskCode = ''; //险别代码
var policyRiskItem = ''; //投保序号
var insureAmount = ''; //保险金额
var policyRisk = '';//全局的 保单信息中的policyRisk
var policyRiskItems = '';//全局的 保单信息中的policyRiskItem
function PolicyInformation(obj) {
    // console.log('回显')
    console.log('obj111',obj)
    console.log('obj222',obj.policy)

    riskCode = obj.policyRisk[0].riskCode;
    policyRiskItem = obj.policyRiskItem[0].insureNo;
    insureAmount = obj.policy.insureAmount;
    policyRisk = obj.policyRisk[0];
    policyRiskItems = obj.policyRiskItem[0];
    //保单信息
    $('input[name="policyNo"]').val(obj.policy.policyNo); //保单号
    $('input[name="product"]').val(obj.policy.productName); //产品
    $('input[name="reportAmount"]').val(obj.policy.insureAmount); //保险金额
    $('input[name="be-risk-man"]').val(obj.policy.insurantName); //被保险人
    $('input[name="pull-risk-man"]').val(obj.policy.policyHolder); //投保人
    $('input[name="Contract-number"]').val(obj.policy.contractNo); //合同号码
    $('input[name="Underwriting-nstitu"]').val(obj.policy.underwriteOrg); //承保机构
    $('input[name="Device-code"]').val(obj.policy.insurantNo); //设备码
    // $('input[name="Insurance-period"]').val(obj.policy.startDate + " 至 " + obj.policy.endDate); //保险期限
    $('input[name="Insurance-period"]').val(formatDate(obj.policy.startDate + "") + " 至 " + formatDate(obj.policy.endDate + "")); //保险期限
    $('input[name="Risk-frequency"]').val(obj.policy.insureTimeCount);

    $('input[name="policy-num"]').val(obj.policy.policyNo); // 保单号
    $('input[name="accidentTime"]').val(getNowDate()); //出险日期


}

//回显核赔基本信息
function BaseInfo(obj){
    //保单信息
    $('input[name="caseNo"]').val(obj.caseNo); //赔案号
    $('input[name="equipment-cod"]').val(obj.imei); //设备串码
    $('input[name="Amount-paid"]').val(obj.rptAmount); //已赔付金额
    $('input[name="Amount-paid-incash"]').val(obj.regAmount); // 本次出险金额
    $('input[name="Amount-this-indemnity"]').val(obj.factAmount); //实付金额
    $('input[name="Compensated-expenses"]').val(obj.lossAmount); //已赔付费用
    $('input[name="Payment"]').val(obj.regFee); //本次出险费用
    $('input[name="Expenses-payable"]').val(obj.factFee); //实付费用
    // $('input[name="Expenses-payable"]').val(obj.regAmount); //本次应付费用
    // $('input[name="Prepaid-expenses"]').val(0); //预付费用
    // $('input[name="Payee"]').val(0); //收款人
}

var deviceAttrs = [];
var attrs = []//设备属性
var subList = []
var repairPrice = ''; //维修价格
// 查勘信息
function SurveyInformation(obj) {
    // console.log('回显查勘信息')
    var detail = JSON.parse(obj.report.detail)
    console.log("obj", obj)
    console.log('detail', detail)
    $('input[name="reporter-name"]').val(obj.report.reporterName); // 客户姓名
    $('input[name="reporterTel"]').val(obj.report.reporterTel); // 联系电话
    // $('input[name="equipment-cod"]').val(obj.report.reporterTel); // 设备串码
    $('input[name="accident-time"]').val(formatDate(obj.report.accidentTime + "")); // 出险日期
    $('input[name="create-time"]').val(obj.report.createTime); // 报案时间

    $('input[name="case_no"]').val(obj.report.caseNo); //赔案号

    $('input[name="equipment-cod"]').val(detail.insurantNo); // 设备串码

    $('input[name="detail-address"]').val(detail.detailedAddress); // 详细地址
    $('.distpicker').children().eq(0).val(detail.province.label).change(); // 维修地址 省
    $('.distpicker').children().eq(1).val(detail.city.label); // 维修地址 市
    $('.distpicker').children().eq(2).val(detail.county.label); // 维修地址 区

    $('input[name="door-time"]').val(detail.doorTime); //上门时间

    getApiService({
        "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=configMaintainerService&method=get",
        "data": {
            cityCode: $('select[name="city"] option:selected').attr("data-code"),
        },
        success: function (res) {
            var arr1 = []
            if (res.obj) {
                // console.log(res)
                for (var i = 0; i < res.obj.length; i++) {
                    var object = {
                        label: res.obj[i].maintainerName,
                        value: res.obj[i].maintainerCode
                    }
                    arr1.push(object);
                }
            }
            linkSelect($(".link-maintain-type"), arr1);

            $(".link-maintain-type").val(detail.repairWay); // 维修方式

            getApiService({
                "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=repairService&method=getDeviceType",
                "data": {
                    appNme: "劲螭",
                    plyNo: "6172120181000000001",
                    prodNo: "1721",
                    repair: "5000001"
                },
                success: function (res) {
                    var arr2 = []
                    if (res.obj) {
                        for (var i = 0; i < res.obj.length; i++) {
                            var object = {
                                label: res.obj[i].name,
                                value: res.obj[i].id
                            }
                            arr2.push(object)
                        }
                    }
                    linkSelect($(".link-equipment-classification"), arr2);

                    $(".link-equipment-classification").val(detail.deviceType); // 设备分类

                    getApiService({
                        "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=repairService&method=getDeviceBrand",
                        "data": {
                            deviceType: $('select[name="Equipment-classifica"]').val(),
                            repair: "5000001"
                        },

                        success: function (res) {
                            var arr3 = []
                            if (res.obj) {
                                // console.log('设备品牌列表', res)
                                for (var i = 0; i < res.obj.length; i++) {
                                    var object = {
                                        label: res.obj[i].name,
                                        value: res.obj[i].id
                                    }
                                    arr3.push(object)
                                }
                            }
                            linkSelect($(".link-equipment-brand"), arr3);
                            $(".link-equipment-brand").val(detail.deviceBrand); // 设备品牌

                            getApiService({
                                "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=repairService&method=getDeviceModel",
                                "data": {
                                    deviceBrand: $('select[name="Equipment-brand"]').val(),
                                    deviceType: $('select[name="Equipment-classifica"]').val(),
                                    repair: "5000001"
                                },
                                success: function (res) {
                                    // var deviceAttrs = []
                                    var arr4 = []
                                    // console.log('设备型号', res)
                                    if (res.obj) {
                                        for (var i = 0; i < res.obj.length; i++) {
                                            var object = {
                                                label: res.obj[i].model,
                                                value: res.obj[i].id
                                            }
                                            arr4.push(object)
                                            var object2 = {
                                                value: res.obj[i].id,
                                                attrs: res.obj[i].attrs
                                            }
                                            deviceAttrs.push(object2)
                                        }
                                    }
                                    linkSelect($(".link-equipment-type"), arr4);
                                    $(".link-equipment-type").val(detail.deviceModel); // 设备型号

                                    // var attrs = []//设备属性
                                    for (var i = 0; i < deviceAttrs.length; i++) {
                                        if (String(deviceAttrs[i].value) == $("select.link-equipment-type").val()) {
                                            for (var j = 0; j < deviceAttrs[i].attrs.length; j++) {
                                                var object = {
                                                    label: deviceAttrs[i].attrs[j].attributeValue,
                                                    value: deviceAttrs[i].attrs[j].id
                                                }
                                                attrs.push(object)
                                            }
                                        }
                                    }
                                    linkSelect($(".link-equipment-attribute"), attrs);
                                    $(".link-equipment-attribute").val(detail.deviceAttr); // 设备属性

                                    getApiService({
                                        "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=repairService&method=getDeviceFault",
                                        "data": {
                                            deviceBrand: $('select[name="Equipment-brand"]').val(),
                                            deviceType: $('select[name="Equipment-classifica"]').val(),
                                            deviceModel: $('select[name="Equipment-type"]').val(),
                                            repair: "5000001"
                                        },
                                        success: function (res) {
                                            var arr5 = []
                                            // var subList = []
                                            if (res.obj) {
                                                for (var i = 0; i < res.obj.length; i++) {
                                                    var object = {
                                                        label: res.obj[i].name,
                                                        value: res.obj[i].id
                                                    }
                                                    arr5.push(object)
                                                    var object2 = {
                                                        value: res.obj[i].id,
                                                        subList: res.obj[i].subList
                                                    }
                                                    subList.push(object2)
                                                }
                                            }

                                            linkSelect($(".link-fault-big"), arr5);

                                            console.log(obj.reportLoss);
                                            var defaulttr = $("select.link-fault-big").closest("tr").clone(true);
                                            var table = $("select.link-fault-big").closest("table");
                                            $("select.link-fault-big").closest("tr").remove();

                                            for (var i = 0; i < obj.reportLoss.length; i++) {
                                                var tr = defaulttr.clone(true);
                                                table.find("tr").eq(i).after(tr);
                                                tr.find(".link-fault-big").val(JSON.parse(obj.reportLoss[i].detail).deviceFault);     //故障大类

                                                var sList = []
                                                for (var a = 0; a < subList.length; a++) {
                                                    if (String(subList[a].value) == $("select.link-fault-big").eq($("select.link-fault-big").index(this)).val()) {
                                                        for (var j = 0; j < subList[a].subList.length; j++) {
                                                            var object = {
                                                                label: subList[a].subList[j].name,
                                                                value: subList[a].subList[j].id
                                                            }
                                                            sList.push(object)
                                                        }
                                                    }
                                                }
                                                linkSelect(tr.find("select.link-fault-small"), sList);

                                                tr.find("select.link-fault-small").val(JSON.parse(obj.reportLoss[i].detail).deviceSubfault);    //故障小类

                                                getApiService({
                                                    async: true,
                                                    "url": "http://192.168.100.45:9191/server/claimDataController.do?esType=repairService&method=getRepairPlan",
                                                    "data": {
                                                        deviceAttr: $('select[name="Device-attribute"]').val(),
                                                        deviceBrand: $('select[name="Equipment-brand"]').val(),
                                                        deviceFault: tr.find('select[name="bigFault"]').val(),
                                                        deviceModel: $('select[name="Equipment-type"]').val(),
                                                        deviceSubfault: tr.find('select[name="Fault"]').val(),
                                                        deviceType: $('select[name="Equipment-classifica"]').val(),
                                                        repair: "5000001"

                                                    },
                                                    success: function (res) {
                                                        var arr6 = []
                                                        if (res.obj) {
                                                            for (var b = 0; b < res.obj.items.length; b++) {
                                                                var object = {
                                                                    label: res.obj.items[b].solution,
                                                                    value: res.obj.items[b].solutionId
                                                                }
                                                                arr6.push(object)
                                                            }
                                                            repairPrice = res.obj.priceTotal
                                                        }

                                                        linkSelect(tr.find(".link-maintenance-plan"), arr6);

                                                        tr.find(".link-maintenance-plan").val(JSON.parse(obj.reportLoss[i].detail).repairPlan)      // 维修方案

                                                        tr.find(".link-maintenance-price").val(obj.reportLoss[i].lossAmount).keyup();    // 维修价格
                                                        tr.find(".repairRemarks").val(JSON.parse(obj.reportLoss[i].detail).repairRemarks);    // 备注

                                                        selectChange();
                                                    }
                                                })

                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })

        }

    })




}

// 请求 function()
function getApiService(obj) {
    loading.show()
    // console.log(obj)
    // console.log('objData', obj.data);
    var data = obj.data;
    // 1. 需要将 data 转成 json 字符串
    var jsonData = JSON.stringify(data);
    // console.log('jsonData', jsonData)
    $.ajax({
        type: "POST",
        async: obj.async ? false : true,
        url: obj.url,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (request) {
            var appId = "5"; //固定值
            var appSecret = "65537"; //固定值
            var timestamp = new Date().getTime();
            var randomNumber = MathRand();
            request.setRequestHeader("Authorization", "your token");
            request.setRequestHeader("appId", appId);
            request.setRequestHeader("version", "1");
            request.setRequestHeader("randomNumber", randomNumber);
            request.setRequestHeader("timestamp", timestamp);
            request.setRequestHeader("token", getSign(appId, appSecret, timestamp, randomNumber, jsonData));
        },
        data: getBase64(jsonData),
        dataType: "json",
        success: function (res) {
            // console.log('调用成功 : ', res);
            obj.success(res)
            loading.hide()
        },
        error: function (res) {
            // console.log('调用失败 : ', res.msg);
            obj.fail(res)
            loading.hide()
        }
    });
}

function MathRand() {
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}

// 算出token
function getSign(appId, appSecret, timestamp, randomNumber, requestBody) {
    var content = appId + timestamp + randomNumber + requestBody + appSecret;
    return md5(content).toUpperCase();
}

// 返回 转成 base64 进行加密
function getBase64(data) {
    return BASE64.encode(utf16to8(data));
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

    console.log("前天：" + GetDateStr(-2));
    console.log("昨天：" + GetDateStr(-1));
    console.log("今天：" + GetDateStr(0));
    console.log("明天：" + GetDateStr(1));
    console.log("后天：" + GetDateStr(2));
    console.log("大后天：" + GetDateStr(3));

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

// 获取当前时间(精确到秒)
function getNowDate() {
    var date = new Date();
    var sign1 = "-";
    var sign2 = ":";
    var year = date.getFullYear(); // 年
    var month = date.getMonth() + 1; // 月
    var day = date.getDate(); // 日
    var hour = date.getHours(); // 时
    var minutes = date.getMinutes(); // 分
    var seconds = date.getSeconds(); //秒
    var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    var week = weekArr[date.getDay()];
    // 给一位数数据前面加 “0”
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
    var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds;
    console.log('当前时间', currentdate);
    return currentdate;
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
function popup(txt, target) {
    target = target ? target : "body";
    if (target == 'body') {
        var _obj = $('<div class="toast-tips" style="position:fixed;left:47%;top:300px;padding:0 25px;height:48px;line-height: 48px;border-radius:4px;text-align: center;font-size: 14px;color:#fff;background: rgba(0,0,0,0.7);z-index:999">' + txt + '</div>');
    } else {
        var _obj = $('<div class="toast-tips" style="position:absolute;left:50%;top:50%;width:126px;margin:-24px 0 0 -82px;padding:10px 20px;border-radius:4px;text-align: center;font-size: 14px;color:#fff;background: rgba(0,0,0,0.7);z-index:999">' + txt + '</div>');
    }
    $(target).append(_obj);
    setTimeout(function () {
        $('.toast-tips').remove()
    }, 2000)
}

var loading = {
    show(msg) {

        if (!$("div.mask").length) {
            var mask = $('<div class="mask" style="width: 100%;height: 100%;position: fixed;top: 0;left: 0;background: rgba(0,0,0,.5);display: none;"></div>');
            var maskPosition = $('<div class="mask-position" style="width: 100%;height: 100%;position: relative;"></div>');
            var main = $('<div class="main" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);text-align: center;max-width: 300px;min-height: 30px;line-height: 30px;padding:15px"></div>');
            var loadingIcon = $('<img src="./form/images/loading.gif" alt="" style="width:50px;height:50px">');
            $("#view-main").append(mask.append(maskPosition.append(main.append(loadingIcon))));
        }
        // $("div.mask .main").html(msg);
        $("div.mask").show();
    },
    hide() {
        $("div.mask").hide();
    }
}