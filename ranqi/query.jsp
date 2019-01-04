<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>报案</title>
    <link rel="stylesheet" href="${path}/form/css/page.css">
</head>

<body>
    <div class="main" id="view-main" style="width:1052px;margin:0 auto;">
        <form id="page" action="" onsubmit="return submitReport()">
            <input type="hidden" id="processId" name="processId" value="${processId }" />
            <input type="hidden" id="policy_id" name="policy_id" value="${policy_id }" />
            <div class="form-area area-demos">
                <div class="form-area-head">
                    <span class="area-title">保单信息</span>
                    <div class="area-title-icon icon-open" onclick="openClose(event)"></div>

                </div>
                <div class="form-area-main" ondragover="dragOver(event)" ondrop="drop(event,this,'move','area-main')">

                    <!-- <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                            ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                            <div class="input-title">
                                <span class="span-required">*</span>
                                <span class="span-text">字段</span>
                            </div>
                            <input type="text" name="" id="" placeholder="输入框" disabled required>
                        </div> -->

                    <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required"></span>
                            <span class="span-text">保单号</span>
                        </div>
                        <input type="text" name="" id="" disabled value="${policy.policy_no}">
                    </div>

                    <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required"></span>
                            <span class="span-text">产品</span>
                        </div>
                        <input type="text" name="" id="" disabled value="${policy.product_name}">
                    </div>

                    <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required"></span>
                            <span class="span-text">产品类型</span>
                        </div>
                        <input type="text" name="" id="" disabled value="${policy.product_type}">
                    </div>

                    <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required"></span>
                            <span class="span-text">保额</span>
                        </div>
                        <input type="text" name="" id="" disabled value="${policy.amount}">
                    </div>

                    <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required"></span>
                            <span class="span-text">被保险人</span>
                        </div>
                        <input type="text" name="" id="" disabled value="${policy.insurant_name}">
                    </div>

                    <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required"></span>
                            <span class="span-text">投保人</span>
                        </div>
                        <input type="text" name="" id="" disabled value="${policy.policy_holder_name}">
                    </div>

                    <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required"></span>
                            <span class="span-text">承保机构</span>
                        </div>
                        <input type="text" name="" id="" disabled value="${policy.underwrite_organization_name}">
                    </div>

                    <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required"></span>
                            <span class="span-text">保险期限</span>
                        </div>
                        <input type="text" name="" id="" disabled value="${policy.insurance_start_time}至 ${policy.insurance_end_time}">
                    </div>

                    <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required"></span>
                            <span class="span-text">出险次数</span>
                        </div>
                        <input type="text" name="" id="" disabled value="${policy.accident_time}">
                    </div>
                </div>
            </div>

            <div class="form-area area-demos">
                <div class="form-area-head">
                    <span class="area-title">报案信息</span>
                    <div class="area-title-icon icon-open" onclick="openClose(event)"></div>

                </div>
                <div class="form-area-main" ondragover="dragOver(event)" ondrop="drop(event,this,'move','area-main')">

                    <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required"></span>
                            <span class="span-text">赔案号</span>
                        </div>
                        <input type="text" name="" id="" disabled value="">
                    </div>

                    <div class="form-component component-select" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required">*</span>
                            <span class="span-text">报案方式</span>
                        </div>
                        <select name="report_way" id="" required>
                            <option value="" selected> - 请选择 - </option>
                            <option value="00000001">上门报案</option>
                            <option value="00000002">400报案</option>
                            <option value="00000003">捷信报案</option>
                            <option value="00000004">微信报案</option>
                        </select>
                    </div>

                    <div class="form-component component-multi-select" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required">*</span>
                            <span class="span-text">出险原因</span>
                        </div>
                        <select name="accident_cause_big_type" id="" required>
                            <option value="" selected>-- 请选择 --</option>
                            <option value="00000001">意外事故</option>
                        </select>
                        <select class="second-select risk-process" id="risk-cause" name="accident_cause_sub_type" id=""
                            required>
                            <option value="" selected>-- 请选择 --</option>
                            <option value="00000001">燃气泄漏</option>
                        </select>
                    </div>

                    <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required">*</span>
                            <span class="span-text">客户姓名</span>
                        </div>
                        <input class="risk-process" id="reporterName" type="text" name="reporter_name" id="" required
                            value="">
                    </div>

                    <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required">*</span>
                            <span class="span-text">联系电话</span>
                        </div>
                        <input class="risk-process" id="customer-phoneNum" type="text" name="reporter_tel" id=""
                            required value="">
                    </div>

                    <div class="form-component component-date" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required">*</span>
                            <span class="span-text">出险时间</span>
                        </div>
                        <input class="Wdate risk-process" id="risk-time" type="text" id="" name="accident_time" onclick='WdatePicker({"readOnly":true})'
                            required>
                    </div>

                    <div class="form-component component-date" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required">*</span>
                            <span class="span-text">上门时间</span>
                        </div>
                        <input class="Wdate" type="text" id="" name="doorTime" onclick='WdatePicker({"readOnly":true})'
                            required>
                    </div>

                    <div class="form-component component-input" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required">*</span>
                            <span class="span-text">客户地址</span>
                        </div>
                        <input class="risk-process" id="customer-adress" type="text" name="accident_addr_detail" id=""
                            required value="">
                    </div>

                    <div class="form-component component-table" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <table width="1014px" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <th onclick="editColumn(event)" draggable="true" ondragstart="dragStart(event, this, 'move', 'th')"
                                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','th')">报损险别</th>
                                    <th onclick="editColumn(event)" draggable="true" ondragstart="dragStart(event, this, 'move', 'th')"
                                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','th')">投保序号</th>
                                    <th onclick="editColumn(event)" draggable="true" ondragstart="dragStart(event, this, 'move', 'th')"
                                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','th')">投保份数</th>
                                    <th onclick="editColumn(event)" draggable="true" ondragstart="dragStart(event, this, 'move', 'th')"
                                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','th')">保险金额</th>
                                    <th class="th-count" onclick="editColumn(event)" draggable="true" ondragstart="dragStart(event, this, 'move', 'th')"
                                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','th')">报损金额</th>
                                    <th class="table-special table-remarks">备注</th>
                                    <th class="table-special table-operation">操作</th>
                                </tr>
                                <tr>
                                    <td ondragover="dragOver(event)" ondrop="drop(event,this,'move','td')">
                                        <div class="form-component component-select">
                                            <select class="risk-type" name="risk_code" id="" required>
                                                <option value="" selected> - 请选择 - </option>
                                            </select>
                                        </div>
                                    </td>

                                    <td ondragover="dragOver(event)" ondrop="drop(event,this,'move','td')">
                                        <div class="form-component component-select">
                                            <select class="risk-num" name="insure_no" id="" required>
                                                <option value="" selected> - 请选择 - </option>
                                            </select>
                                        </div>
                                    </td>

                                    <td ondragover="dragOver(event)" ondrop="drop(event,this,'move','td')">
                                        <div class="form-component component-input">
                                            <input type="text" name="insure_num" id="" required disabled value="">
                                        </div>
                                    </td>

                                    <td ondragover="dragOver(event)" ondrop="drop(event,this,'move','td')">
                                        <div class="form-component component-input">
                                            <input type="text" name="insure_price" id="" required disabled value="">
                                        </div>
                                    </td>

                                    <td ondragover="dragOver(event)" ondrop="drop(event,this,'move','td')">
                                        <div class="form-component component-input">
                                            <input class="money" type="text" name="loss_amount" id="" required value=""
                                                onkeyup="getCount(event);">
                                        </div>
                                    </td>

                                    <td>
                                        <input type="text" name="remark" id="" value="">
                                    </td>

                                    <td>
                                        <button type="button" class="delete-row" onclick="deleteRow(event)">删除</button>
                                    </td>
                                </tr>
                                <tr class="last-empty-tr">
                                    <td class="table-special  table-add-row">
                                        <button type="button" class="add-row">新增</button>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>合计
                                        <input class="count risk-process" id="baosuo-count" type="text" name="baosuoCount"
                                            id="" value="">
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="form-component component-textarea" draggable="true" ondragstart="dragStart(event, this, 'move', 'component')"
                        ondragover="dragOver(event)" ondrop="drop(event,this,'move','component')">
                        <div class="input-title">
                            <span class="span-required">*</span>
                            <span class="span-text">出险经过</span>
                        </div>
                        <textarea class="risk-process-all" placeholder="出险经过" name="accident_pass" id="" rows="4"
                            maxlength="1000" required=""></textarea>
                    </div>





                </div>
            </div>



            <div class="form-area footer-button">
                <div class="form-component button-submit">
                    <button class="submit">提交</button>
                </div>
            </div>

        </form>
    </div>





    <script src="${path}/form/lib/js/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="${path}/static/js/origin/jquery.json-2.2.js"></script>
    <script src="${path}/static/js/origin/ajax.js"></script>
    <script src="${path}/form/lib/js/form.js"></script>
    <script src="${path}/static/lib/My97DatePicker/WdatePicker.js"></script>
    <script src="${path}/form/js/common.js"></script>
    <script src="${path}/form/js/page.js"></script>

    <!-- <script>
        var policyRiskList = [{
            risk_name: "财务意外险",
            risk_code: "000001"
        }, {
            risk_name: "人身意外险",
            risk_code: "000002",
        }];

        var riskList = [{
                risk_name: "财务意外险",
                risk_code: "000001",
                insurance_name: "1",
                insurance_no: "1",
                insurance_num: "1",
                amount: "6000",
            },
            {
                risk_name: "财务意外险",
                risk_code: "000001",
                insurance_name: "2",
                insurance_no: "2",
                insurance_num: "1",
                amount: "3000",
            },
            {
                risk_name: "人身意外险",
                risk_code: "000002",
                insurance_name: "1",
                insurance_no: "1",
                insurance_num: "1",
                amount: "5000",
            },
            {
                risk_name: "人身意外险",
                risk_code: "000002",
                insurance_name: "2",
                insurance_no: "2",
                insurance_num: "1",
                amount: "4000",
            },
        ]

    </script> -->

    <!-- 二级联动 -->
    <script>
        var policyRiskList = ${policyRiskList};
        var riskList = ${riskList};

        var nextList = [];

        function changeRiskType(e) {
            var currentValue = $(e.currentTarget).val();
            var nextSelect = $(e.currentTarget).parent().next().children("select.risk-num");
            nextList = [];
            nextSelect.empty().append("<option value='' selected> - 请选择 - </option>");
            $(e.currentTarget).parent().next().next().children("input").val("");
            $(e.currentTarget).parent().next().next().next().children("input").val("");
            if (currentValue == "") {
                return;
            }
            for (var i = 0; i < riskList.length; i++) {
                if (currentValue == riskList[i].risk_code) {
                    nextList.push(riskList[i]);
                }
            }
            for (var i = 0; i < nextList.length; i++) {
                nextSelect.append("<option value='" + nextList[i].insurance_no + "' >" +
                    nextList[i].insurance_name + "</option>");
            }
        }

        function changeRiskNum(e) {
            var riskNum = $(e.currentTarget).val();
            var insuranceNo = $(e.currentTarget).parent().next().children("input");
            var amount = insuranceNo.parent().next().children("input");
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

        $(function () {
            for (var i = 0; i < policyRiskList.length; i++) {
                $("select.risk-type").append("<option value='" + policyRiskList[i].risk_code + "' >" +
                    policyRiskList[i].risk_name + "</option>");
            }
        })
    </script>

</body>

</html>