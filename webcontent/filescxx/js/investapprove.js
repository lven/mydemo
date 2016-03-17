/**
 * Created by Faker on 2016/2/25.
 */
var imgFile = [];
var imgStatus = [];    //0-从未上传；1-第一次上传；2-已经上传过了。

$(document).ready(function () {
    //initWebSocket();
/*





    $(".navcustom li#myaccount").addClass("active");
    $("#modal_riskAssessment").load("../mycommon/modal.html");
    $("#modal_resultRist").load("../mycommon/modal_resultRist.html");
    $("#modal_IdAuthentication").load("../mycommon/modal_IdAuthentication.html");
    $("#modal_qualificationInspecting").load("../mycommon/modal_qualificationInspecting.html");
  //  $("#modal_confirmQualifiedInvestors").load("../mycommon/modal_confirmQualifiedInvestors.html");

    //获取客户信息
    var obj_customer = getCustomer();
    getCustomerInfo();

    //延迟初始化弹层(modal)中的内容
    setTimeout(initModal_idAuthentication, "100");
    setTimeout(initModal_qualificationInspecting, "100");

    $("#riskAssessment").on("click", function () {
        $("#RiskCenter").modal({backdrop: "static"});
        var questionType;
        if (obj_customer.custType == '0') {//个人
            questionType = "0";//个人问题
        }
        if (obj_customer.custType == '2') {//机构
            questionType = "1";
        }
        //个人的风险评估
        ajaxPage("getRiskAssessmentList", {
            answerFlag: true,
            questionType: questionType
        }, showRisk);
    });


    $("#IdAuthentication").on("click", function () {
        $("#m_IdAuthentication").modal({backdrop: "static"});


    });

    $("#qualificationInspecting").on("click", function () {
        $("#m_qualificationInspecting").modal({backdrop: "static"});

    });
*/


    $("#signature").jSignature();
    $("#confirmQualifiedInvestors").on("click", function () {
        $("#m_confirmQualifiedInvestors").modal();
    });


});


//初始化资质认证中的内容
function initModal_qualificationInspecting() {
    var obj_customer = getCustomer();
    //检测是个人登录还是机构机构登录:custType : 0个人 ;2 机构;
    if (obj_customer.custType == "0") {

    } else if (obj_customer.custType == "2") {
        //初始化实名认证中的内容
        var $items_origi = $("#m_qualificationInspecting .item-card");
        $($items_origi[0]).find(".item-tip").text("财务报表");
        //$("#m_IdAuthentication .box-pic ul").append($items);
    }

    var strUserAttach = localStorage.getItem("userattach");

    if (typeof(strUserAttach) == "undefined") {
        objUserAttach = null;
    }
    else {
        objUserAttach = JSON.parse(strUserAttach);
        console.info(objUserAttach);
    }
    imgFile.length=0;
    if (obj_customer.custType == '0') {
        if (!isNull(objUserAttach.incomeproof)) {
            imgFile[0] = m_webRoot + objUserAttach.incomeproof;
            imgStatus[0] = 2;
        }
    }
    else {
        if (!isNull(objUserAttach.financialrpt)) {
            imgFile[0] = m_webRoot + objUserAttach.financialrpt;
            imgStatus[0] = 2;
        }
    }
    if (!isNull(objUserAttach.assetsproof)) {
        imgFile[1] = m_webRoot + objUserAttach.assetsproof;
        imgStatus[1] = 2;
    }
/*
    if (obj_customer.custType == '0') {
        if (!isNull(objUserAttach.idcardFront)) {
            imgFile[0] = m_webRoot + objUserAttach.idcardFront;
            imgStatus[0] = 2;
        }
        if (!isNull(objUserAttach.cardOpposite)) {
            imgFile[1] = m_webRoot + objUserAttach.cardOpposite;
            imgStatus[1] = 2;
        }
    } else {
        if (!isNull(objUserAttach.orgCertificate)) {
            imgFile[0] = m_webRoot + objUserAttach.orgCertificate;
            imgStatus[0] = 2;
        }
        if (!isNull(objUserAttach.busLicense)) {
            imgFile[1] = m_webRoot + objUserAttach.busLicense;
            imgStatus[1] = 2;
        }
        if (!isNull(objUserAttach.taxCertificate)) {
            imgFile[2] = m_webRoot + objUserAttach.taxCertificate;
            imgStatus[2] = 2;
        }
        if (!isNull(objUserAttach.legalpersonidcard)) {
            imgFile[3] = m_webRoot + objUserAttach.legalpersonidcard;
            imgStatus[3] = 2;
        }
    }
*/

    var strCheckStatus = getCertificatesStatus(objUserAttach.certificationStatus2);

    /*if (objUserAttach.certificationStatus1 == '-1') {
     strCheckStatus = '上传状态：' + strCheckStatus;
     }
     else {
     strCheckStatus = '审核状态：' + strCheckStatus;

     }*/


    // $("#check-status").css("cssText", "color:" + getThemesColorVal() + "!important;margin-top:5px!important;");
    //$(".approve-item:eq(0) dl dd").text(strCheckStatus);
   /* $("#IdAuthentication").text(strCheckStatus);

    var strCheckNote = objUserAttach.remarks1;
    if (strCheckNote != '') {
        if (objUserAttach.certificationStatus1 == '2') {
            strCheckNote += '退回原因：' + strCheckNote;
            $("#check-note").css("cssText", "color:red!important");
        }
        else {
            strCheckNote += '提示信息：' + strCheckNote;
            $("#check-note").css("cssText", "color:" + getThemesColorVal() + "!important");
        }
        $(".approve-item:eq(0) dl dd").text(strCheckNote);
    }*/

    /*$('#nextstep').text('保存');
     $('.back_btn').text('返回');*/

    //显示图片效果

    var strContent = '';
    for (var i = 0; i < imgFile.length; i++) {
        if (isNull(imgFile[i])) {
            continue;
        }
        //取图片的文件名称
        imgName = "img-" + i;
        strContent = "<img class='clear-image'  data-index='" + i + "' src='../icons/deletepic.png'>";
        strContent += "<img class='choose-image' data-status='false' data-index='" + i + "' id='" + imgName + "' src='" + imgFile[i] + "' alt=''>";
        var $itemPic = $("#m_qualificationInspecting .item-card >.item-add:eq(" + i + ")");
        $itemPic.empty();
        $itemPic.append(strContent);
    }
    bindDeletEvent();
    bindAddEvent();
    bindPicShowEvent();
}


//初始化实名认证中的内容
function initModal_idAuthentication() {
    var obj_customer = getCustomer();
    //检测是个人登录还是机构机构登录:custType : 0个人 ;2 机构;
    if (obj_customer.custType == "0") {
    } else if (obj_customer.custType == "2") {
        //初始化实名认证中的内容
        var $items_origi = $("#m_IdAuthentication .item-card");
        var $items = $items_origi.clone();
        $($items_origi[0]).find(".item-tip").text("组织代码证");
        $($items_origi[1]).find(".item-tip").text("营业执照");
        $($items[0]).find(".item-tip").text("企业税务登记证");
        $($items[1]).find(".item-tip").text("企业法人身份证");
        $($items[0]).find(".item-add").attr("id","itemId2");
        $($items[1]).find(".item-add").attr("id","itemId3");
        $($items[0]).find("input:file").attr("id","file2");
        $($items[1]).find("input:file").attr("id","file3");
        $("#m_IdAuthentication .box-pic ul").append($items);
    }

    var strUserAttach = localStorage.getItem("userattach");

    if (typeof(strUserAttach) == "undefined") {
        objUserAttach = null;
    }
    else {
        objUserAttach = JSON.parse(strUserAttach);
        console.info(objUserAttach);
    }
    imgFile.length=0;
    if (obj_customer.custType == '0') {
        if (!isNull(objUserAttach.idcardFront)) {
            imgFile[0] = m_webRoot + objUserAttach.idcardFront;
            imgStatus[0] = 2;
        }
        if (!isNull(objUserAttach.cardOpposite)) {
            imgFile[1] = m_webRoot + objUserAttach.cardOpposite;
            imgStatus[1] = 2;
        }
    } else {
        if (!isNull(objUserAttach.orgCertificate)) {
            imgFile[0] = m_webRoot + objUserAttach.orgCertificate;
            imgStatus[0] = 2;
        }
        if (!isNull(objUserAttach.busLicense)) {
            imgFile[1] = m_webRoot + objUserAttach.busLicense;
            imgStatus[1] = 2;
        }
        if (!isNull(objUserAttach.taxCertificate)) {
            imgFile[2] = m_webRoot + objUserAttach.taxCertificate;
            imgStatus[2] = 2;
        }
        if (!isNull(objUserAttach.legalpersonidcard)) {
            imgFile[3] = m_webRoot + objUserAttach.legalpersonidcard;
            imgStatus[3] = 2;
        }
    }

    var strCheckStatus = getCertificatesStatus(objUserAttach.certificationStatus1);

    /*if (objUserAttach.certificationStatus1 == '-1') {
     strCheckStatus = '上传状态：' + strCheckStatus;
     }
     else {
     strCheckStatus = '审核状态：' + strCheckStatus;

     }*/

    //
    // $("#check-status").css("cssText", "color:" + getThemesColorVal() + "!important;margin-top:5px!important;");
    //$(".approve-item:eq(0) dl dd").text(strCheckStatus);
    $("#IdAuthentication").text(strCheckStatus);

    var strCheckNote = objUserAttach.remarks1;
    if (strCheckNote != '') {
        if (objUserAttach.certificationStatus1 == '2') {
            strCheckNote += '退回原因：' + strCheckNote;
            $("#check-note").css("cssText", "color:red!important");
        }
        else {
            strCheckNote += '提示信息：' + strCheckNote;
            $("#check-note").css("cssText", "color:" + getThemesColorVal() + "!important");
        }
        $(".approve-item:eq(0) dl dd").text(strCheckNote);
    }

    /*$('#nextstep').text('保存');
     $('.back_btn').text('返回');*/

    //显示图片效果
    var strContent = '';
    for (var i = 0; i < imgFile.length; i++) {
        if (isNull(imgFile[i])) {
            continue;
        }
        //取图片的文件名称
        imgName = "img-" + i;
        strContent = "<img class='clear-image'  data-index='" + i + "' src='../icons/deletepic.png'>";
        strContent += "<img class='choose-image' data-status='false' data-index='" + i + "' id='" + imgName + "' src='" + imgFile[i] + "' alt=''>";
        var $itemPic = $("#m_IdAuthentication .item-card >.item-add:eq(" + i + ")");
        $itemPic.empty();
        $itemPic.append(strContent);
    }
    bindDeletEvent();
    bindAddEvent();
    bindPicShowEvent()
}


//点击按钮删除图片事件
function bindDeletEvent() {
    $(".clear-image").off();
    $(".clear-image").on("click ", function () {
        //var index = $(this).attr("data-index");
        strContent = ' <div class="dotted-box"><div class="l1"></div><div class="l2"></div></div>';
        //var $itemPic = $(".item-card >.item-add:eq(" + index + ")");
        var $itemPic = $(this).parent();
        $itemPic.empty();
        $itemPic.append(strContent);
        bindAddEvent();
    });
}


//点击添加图片事件
function bindAddEvent(selectId) {
    $(".item-card .item-add .dotted-box").off("click.myupload");
    $(".item-card .item-add .dotted-box").on("click.myupload", function () {
        $(this).parent().siblings("input:file").trigger('click');
    });
}


//上传图片显示事件/**/
function bindPicShowEvent(){
    $('input:file').off("change.myupload");
    $('input:file').on("change.myupload", function () {
        var item_addID= $(this).parent().find(".item-add").attr("id");
        previewImage(this, item_addID);
        strContent = "<img class='clear-image'  data-index='" + 222 + "' src='../icons/deletepic.png'>";
        var $itemPic = $(this).parent().find(".item-add");
        $itemPic.append(strContent);
        bindDeletEvent();
    });
}




//获得证件照片上传的状态
function getCertificatesStatus(status) {
    if (status == '-1') {
        return '未上传';
    }
    else if (status == '0') {
        return '审核中';
    }
    else if (status == '1') {
        return '已审核';
    }
    else {
        return '已退回';
    }
}

//获得客户信息
function getCustomerInfo() {
    $("#sexGroup").hide();
    $.ajax({
        url: getUrl('getCustomerInfo'),//你对数据库的操作路径
        data: {
            customerId: getCustomerId()//
        },
        dataType: 'JSONP',
        jsonp: "callbackparam", //服务端用于接收callback调用的function名的参数
        jsonpCallback: "success_jsonpCallback", //callback的function名称,服务端会把名称和data一起传递回来
        type: 'Post',//提交方式
        success: function (data) {//后台处理数据成功后的回调函数
            if (data.success) {
                console.log(data);
                var objdetail = data.model;//AD_HREF
                var objAttach = objdetail.headAttach;
                $("#destination img").attr("src", m_webRoot + objAttach.filePath);
                $("#fullname").val(objdetail.name);
                $("#transactor").val(objdetail.transactor);
                $("#idcode").val(objdetail.cardId);
                $("#phone").val(objdetail.phone);
                $("#email").val(objdetail.mail);
                $("#company").val(objdetail.company);
                $("#duty").val(objdetail.position);
                $("#address").val(objdetail.address);
                $("#sexshow").text(objdetail.sexName);
                $("#custmanager").val(objdetail.custManager);

                if (objdetail.custType == '0') {
                    $("#transactorname").css("display", "none");
                }
                else {
                    $("#name").text("机构名称");
                }
                //对证件类型赋值
                var strcardType = (objdetail.cardType == '' ? 'qxz' : objdetail.cardType);
                $("#idtype").val(strcardType);
                $("#idtype").trigger("change");

                //处理实名认证、风险评测、资质审查
                var smrzyn = $('#IdAuthentication');
                var tzqryn = $('#tzqryn');
                var riskyn = $('#riskAssessment');
                var zzscyn = $('#qualificationInspecting');

                var smrzresult = $(".approve-item:eq(0) dl dd")
                var tzqrresult = $(".approve-item:eq(3) dl dd");
                var riskresult = $(".approve-item:eq(1) dl dd");
                var zzscresult = $(".approve-item:eq(2) dl dd");

                if (objdetail.certificationStatus1 == '-1') {
                    smrzyn.text('未上传');
                    smrzresult.text('我要上传>>');
                }
                else {
                    if ((objdetail.custType == '0' && objdetail.idcardFrontImg != '' && objdetail.iscardOppositeImg != '') ||
                            (objdetail.custType == '2' && objdetail.orgCertificateImg != '' && objdetail.busLicenseImg != '' && objdetail.taxCertificateImg != '' && objdetail.legalpersonidcardImg != '')) {
                        smrzyn.text('已上传');
                        smrzresult.text(getCertificatesStatus(objdetail.certificationStatus1) + ',我要重新上传>>');
                    }
                    else {
                        smrzyn.text('部分上传');
                        smrzresult.text(getCertificatesStatus(objdetail.certificationStatus1) + ',我要补充上传>>');
                    }
                }
                smrzresult.css("cssText", "color:" + getThemesColorVal() + "!important");

                if (!isNull(objdetail.investorSignName)) {
                    tzqryn.text('已签名');
                    tzqrresult.text('已确认,我要重新签名>>');
                }
                else {
                    tzqryn.text('未签名');
                    tzqrresult.text('未确认,我要签名>>');
                }

                tzqrresult.css("cssText", "color:" + getThemesColorVal() + "!important");

                if (objdetail.assessmentTypeName == '') {
                    riskyn.text('未评估');
                    riskresult.text('我要评估>>');
                }
                else {
                    riskyn.text('已评估');
                    riskresult.text(objdetail.assessmentTypeName + ',我要重新评估>>');
                }
                riskresult.css("cssText", "color:" + getThemesColorVal() + "!important");

                if (objdetail.certificationStatus2 == '-1') {
                    zzscyn.text('未上传');
                    zzscresult.text('我要上传>>');
                }
                else {
                    if ((objdetail.custType == '0' && objdetail.incomeproofImg != '' && objdetail.assetsproofImg != '') ||
                            (objdetail.custType == '2' && objdetail.financialrptImg != '' && objdetail.assetsproofImg != '')) {
                        zzscyn.text('已上传');
                        zzscresult.text(getCertificatesStatus(objdetail.certificationStatus2) + ',我要重新上传>>');
                    }
                    else {
                        zzscyn.text('部分上传');
                        zzscresult.text(getCertificatesStatus(objdetail.certificationStatus2) + ',我要补充上传>>');
                    }
                }
                zzscresult.css("cssText", "color:" + getThemesColorVal() + "!important");
                //将用户上传的图片信息地址写入缓存
                saveCustomerAttachInfo(data.model.idcardFrontImg, data.model.iscardOppositeImg, data.model.orgCertificateImg, data.model.busLicenseImg, data.model.taxCertificateImg, data.model.legalpersonidcardImg, data.model.investorSignName, data.model.investorSignTime, data.model.incomeproofImg, data.model.assetsproofImg, data.model.financialrptImg, data.model.certificationStatus1, data.model.certificationStatus2, data.model.remarks1, data.model.remarks2);

            }
            else {
                showMessageTip('获取用户资料信息：' + data.msg);
            }

        },
        error: function (data) {//后台处理数据失败后的回调函数
            console.log(data);
        }
    });
}

