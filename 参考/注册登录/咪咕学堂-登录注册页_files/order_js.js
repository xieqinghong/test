// JavaScript Document
var BasePath = $("#BasePath").val();
/*未绑定获取验证码
function GetVerifyCode(){
	var phno = $('#phno').val();
	var getcodeurl = $('#getcodeurl').val();
	var code = $('#imgVerifyCode').val();
	var pay_input = $('#phoneCode').text();
	if(pay_input=="获取手机验证码" || pay_input=="重新获取手机验证码"){
		if(checkBindNum(phno)){
		$.ajax({
			type:"POST",
			url:getcodeurl,
			data:{msisdn:phno,funcid:3,imgVerifyCode:code},	
			success:function(data){
				var data1= eval('('+ data +')');
				var resultCode = data1.resultCode;
				var resultMsg  = data1.resultMsg;
				if(resultCode=="200"){
					$("#tipgreen3").text("");
					$('#phoneCode').text("60秒重新获取");
					$("#message").removeAttr("disabled");	
					timeGo();
				}
				else if(resultCode == "21111"){
				$("#tipgreen2").text(resultMsg).show();
				createCode();
				}
				else{
				$("#tipgreen3").text(resultMsg).show();
				createCode();
				}
			},
                    error:function(){
					
				}
			});
		}
	}
}

*/
//校验验证码长度
function checkvl(obj){
	var lstr = $(obj).val();
	var str = $('#clicktip').text();
	     if(lstr.length==6 && str=="绑定号码"){
                $('.pay_sure_btn').removeClass("gray");
		$('#clicktip').attr("onclick","BindNum();");
	}
	else if(lstr.length==6 && str=="确认支付"){
		$('.pay_sure_btn').removeClass("gray");
		$('#clicktip').attr("onclick","Pay();");
	}
	else{
		$('.pay_sure_btn').addClass("gray");
		$('#clicktip').removeAttr("onclick");
	}
}

function checkphno(phno){
	if(phno=="" || phno=="请输入绑定支付的移动手机号"){
		$('#phnotip').html("绑定支付的手机号，支付更加便利");
		$('#phnotip').show();
		return false;
	}
	else{
		if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phno))){
			$("#phno").focus();
			$('#phnotip').html("手机号码格式不正确");
			$('#phnotip').show();
			return false;
		}
		else{
			return true;
		}
	}
}

//绑定手机号
function BindNum(){
	if(checkBindNum()){
		if(checkPic()){
			var message = $("#message").val();
			if(message){
	            $("#tipgreen3").hide();
				var msisdn = $('#phno').val();
				var VerifyCode = $('#message').val();
				var Bindurl = $('#BindPaymsisdn').val();
				var userIdentity = $('#userIdentity').val();
				var purl=window.location.href;
				$('#ym-window4').css('left',(document.body.clientWidth-372)/2);
				$('#ym-window4').css('top',(document.documentElement.clientHeight-192)/2);		
				$.ajax({
					type: "get",
					url:Bindurl,
					data:{userIdentity:userIdentity,payMsisdn:msisdn,verifyCode:VerifyCode,purl:purl},
					dataType: "text",
					cache: false,
					success:function(jsonData){
						var json = eval(JSON.parse(jsonData));
						var backUrl = json.backUrl;
						var resultCode = json.resultCode;	
						var resultMsg = json.resultMsg;	
						if(resultCode == "200"){
							$(".tips").html("绑定成功");
							$("#ym-window4").show();
							setTimeout(function(){window.location.href = backUrl;},1000);
						}
                                                else if(resultCode =="21105"){
                                                    $("#tipgreen3").text(resultMsg).show();
                                               }
						else{
							$(".tips").html(resultMsg);
							$("#ym-window4").show();
	                                                setTimeout(function(){$("#ym-window4").hide();},2000);
						}
					},
					error:function(){
						setTimeout(function(){window.history.back();},2000);
					}
				});
			}
			else{
	                     $("#tipgreen3").text("请输入短信验证码");
	                     $("#tipgreen3").show();
			}
		}
	}
}


/* 支付页面订购及跳转页面*/
function Pay(){
	var purl = $("#purl").val();	
  	var tid1 = $("#tid").val();
	var cid1 = $("#cid").val();
	var nid1 = $("#nid").val();
	var uid = $("#uid").val();
	var lid = $("#lid").val();
	var IsCheck = "0";
	IsCheck = $("input[checked='checked']").val();
    var ActivityType = $('#ActivityType').val();
    var joinActivity=0;
    var ftl_type = $("#ftl_type").val();
     if(ActivityType=="2" && ftl_type!=""){
       joinActivity=1;
      }
      if(ActivityType=="1" || ActivityType=="3" || ActivityType=="4"){
       joinActivity=1;
      }
    var urlId = $("#urlId").val();
   if(urlId){
    	var Url=urlId.substring(0,urlId.indexOf(".jsp")+4);
    }
    if(IsCheck=="0"){
	if(cid1!="" && cid1!=undefined){
		/*课件购买*/
		var ContentId = $("#ContentId").val();
        var pre_purl = $("#pre_purl").val();
var deatailUrl = $("#deatailUrl").val();
			var reqUrl = $("#reqUrl").val();
		$('#ym-window4').css('left',(document.body.clientWidth-372)/2);
		$('#ym-window4').css('top',(document.documentElement.clientHeight-192)/2);
			/*普通订购*/
			$.ajax({
				type:"POST",
				url:reqUrl,
                data:{cid:ContentId,tid:tid1,joinActivity:joinActivity,purl:purl},      
				dataType:"json",		
				success:function(data){					
					var backUrl = data.backUrl;
					var resultCode = data.resultCode;
					var resultMsg = data.resultMsg;		
					if(resultCode == "200"){				    
					   $("#ti1").show();
countdownZhiFu("Countdowns",3);
					    if(ContentId =="192034"){
					        setTimeout(function(){window.location.href = pre_purl;},3000);
					    }else{
                            setTimeout(function(){window.location.href = deatailUrl;},3000);
					    }
				    }else{				    				    
					    $("#ti2").show();				        }
				},
				error:function(){
					$(".tips").html("亲，稍后再试试吧...");
					$("#ym-window4").show();
					setTimeout(function(){window.history.back();},3000);
				}
			});		
	}
	else if(nid!="" && nid!=undefined){
		/*仅包月专区购买*/	
		$('#ym-window4').css('left',(document.body.clientWidth-372)/2);
		$('#ym-window4').css('top',(document.documentElement.clientHeight-192)/2);		
		var reqMonthUrl = $("#reqMonthUrl").val();		
		$.ajax({
			type:"POST",
			url:reqMonthUrl,                       
                               data:{nid:nid1,tid:tid1,joinActivity:joinActivity,purl:purl},                   
			dataType:"json",		
			success:function(data){
				var backUrl = data.backUrl;
				var resultCode = data.resultCode;						
				if(resultCode == "200"){				    
					$(".tips").html("订购成功");
					$("#ym-window4").show();
					setTimeout(function(){window.location.href =BasePath+"/p/details_baoyue.jsp?nid="+nid1;},3000);					
				}else{		
			    	setTimeout(function(){window.location.href = BasePath+"/p/pay_error.jsp?purl="+Url+"&code="+resultCode+"&nid="+nid1;},3000);	
					if(!purl){
						purl = BasePath+"/p/error.jsp";
					}
				}
			},
			error:function(){
				$(".tips").html("亲，稍后再试试吧...");
				$("#ym-window4").show();
				if(!purl){
						purl = BasePath+"/p/error.jsp";
					}
				setTimeout(function(){window.location.href = purl;},3000);
			}			
		});	
	}
	}
	else if(IsCheck=="1"){
                $("#epaytip").show();
		var href = $("#href");
		href[0].click();
	}
}


/*包月绑定支付号验证码*/
$(function() {
  // radio单选框
  var freeID = $('#free').attr("checked");
  var normalID = $('#normal').attr("checked");
  if(freeID=="checked"){
    $('.order_rd[name="free"]').addClass('checked');
  }
  if(normalID=="checked"){
    $('.order_rd[name="normal"]').addClass('checked');
  }
  $('.order_rd').click(function(){
    var radioId = $(this).attr('name');
    $('.order_rd').removeClass('checked') && $(this).addClass('checked');
    $('input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');

  })
  $('#show-qbd').click(function(){
    $('#show-qbd').toggle();
    $('#find-input').toggle();
    return false;
  })
})


//未绑定获取验证码
function GetVerifyCode(){
	var phno = $('#phno').val();
	var getcodeurl = $('#getcodeurl').val();
	var code = $('#imgVerifyCode').val();
	var pay_input = $('#phoneCode').text();
	if(pay_input=="获取手机验证码" || pay_input=="重新获取手机验证码"){
		$("#tipgreen2").text("");
		if(checkBindNum(phno)){
		$.ajax({
			type:"POST",
			url:getcodeurl,
			data:{msisdn:phno,funcid:3,imgVerifyCode:code},	
			success:function(data){
				var data1= eval('('+ data +')');
				var resultCode = data1.resultCode;
				var resultMsg  = data1.resultMsg;
				if(resultCode=="200"){
					$("#tipgreen1").text("");
					$('#phoneCode').text("60秒重新获取");
					$("#message").removeAttr("disabled");	
					timeGo();
				}
				else if(resultCode == "21111"){
				$("#tipgreen2").text(resultMsg).show();
				createCode();
				}
				else{
				$("#tipgreen1").text(resultMsg).show();
				createCode();
				}
			},
                    error:function(){
					
				}
			});
		}
	}
}

function tipRemove1(){
	$("#ti1").hide();
}

function tipRemove2(){
	$("#ti2").hide();
}

//图片验证输入框内容变化
function codeColor(){
    $("#phoneCode").removeClass("hui");
    var phoneCode=document.getElementById("phoneCode");
	phoneCode.setAttribute("onclick", "GetVerifyCode('"+BasePath+"/c/getVerifyCode')");
}

function  checkEPay(){
	window.location.reload();
}

//课件资费手机号码错误提示
function checkBindNum(){
	var tel_word = $("#phno").val();/*手机号*/
	var tel_reg = /^[0-9]{11}$/;//手机号正则
    if(!tel_word){
        $("#tipgreen1").html("手机号码不能为空");
        $("#tipgreen1").show();
        return false;
    }else if(!tel_reg.test(tel_word)){
		$("#tipgreen1").html("请输入11位手机号码");
		$("#tipgreen1").show();
        return false;
	}else{
		$("#tipgreen1").hide();
		return true;
	}
}

//课件资费图片验证码错误提示
function checkPic(){
	var imgVerifyCode = $("#imgVerifyCode").val();
	if(!imgVerifyCode){
        $("#tipgreen2").html("请输入图片验证码中的字符");
        $("#tipgreen2").show();
        return false;
    }
    else{
    	$("#tipgreen2").hide();
    	return true;
    }
}

//支付宝手机格式校验
function checkpEpayNum(phno){
	if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phno))){
		$("#phno").focus();
		$('#tipgreen1').html("手机号码格式不正确");
		$('#tipgreen1').show();
		return false;
	}
	else{
		return true;
	}
}

function  checkShow(){
	var cid1 = $("#cid").val();
var postUrl = BasePath+"/t/isBuy.jsp?vt=9";
	$.ajax({
		type:"POST",
		url:postUrl,                       
        data:{cid:cid1},                   
		dataType:"html",		
		success:function(data){
			var start = data.indexOf("<!--start-->");
			var end = data.indexOf("<!--end-->");
			data = data.substring(start+12,end);
			if(data=="false"){
				$("#epaytip").hide();
countdownZhiFu("Countdowns",3);
				$("#ti1").show();
			}
			else{
				$("#epaytip").hide();
				$("#ti2").show();
			}
		},
		error:function(){
				
			}			
		});	
}

//静态页面登录区块展示
var url=window.location.href;

if (url.indexOf(".jsp")>-1) {
var headUrl=$("#headPicUrl").val();
setCookie("picUrl",headUrl);
}

if (url.indexOf(".html")>-1){
var lms=getCookie("lmsTokenId");
      if (lms!=null && lms!="" ){
 var newPicUrl=getCookie("picUrl");
if(newPicUrl!=null && newPicUrl!=""){
 $("#pic").attr("src",newPicUrl);
 $("#pic2").attr("src",newPicUrl);
}      	      
               $(".js_myInfoList").show();
               $(".js_loginList").hide();              
      }
      else{
$(".js_myInfoList").hide();
           $(".js_loginList").show();
}
}


function setCookie(c_name,value)
{
	document.cookie=c_name+ "=" +escape(value)+";path=/";
}

function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return "";
}
