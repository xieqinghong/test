//首页鼠标移入头像下拉列表
$(function(){
        $('#smallbox').hover(function(){
            $(this).children('.smallbox').toggle();
        })
    })
var BasePath = $("#BasePath").val();

$(function(){
    //单选框
   $(".Read_agreement .selectclick").live("click",function(e){
		$(this).children("i").toggleClass("on");
		$(this).parent().siblings().children(".selectclick").children("i").removeClass("on");
		
    });// JavaScript Document
	//单选框
   $(".land_check .selectclick2").live("click",function(e){
		$(this).children("i").toggleClass("on");
		$(this).parent().siblings().children(".selectclick2").children("i").removeClass("on");
		
    });// JavaScript Document
	//单选框
   $(".sex_check .selectclick3").live("click",function(e){
		$(this).children("i").toggleClass("on");
		$(this).parent().siblings().children(".selectclick3").children("i").removeClass("on");
		
    });// JavaScript Document
	
	$("#toshow").hover(function() {
        $(this).next(".Account_management").toggle();
		$(this).find(".Account_management").toggle();
    });

   $("#showpc").hover(function() {
        $("#pcdesc").toggle();
    });
	
	/*提示显示隐藏
   $(".pass_input").on("input",function(){
		var pass_va=$("#pass_word");

		if(pass_va.val()!=""){
				
			$(".pass_tip").hide();
		}else {
			$(".pass_tip").show();
		}
	})*/

	
	/*下拉框*/
$(".slcBox").click(function(){
		$(this).children(".slcitems").toggle();
		e = window.event || oEvent;
		 if (e.stopPropagation)
		 {
			 e.stopPropagation();
		 }else{
			 e.cancelBubble = true;
		 }
	});
	$(".slcitems p").click(function(){
		var vP = $(this).html();
		$(this).parent(".slcitems").siblings(".slct").val(vP);
		//$(this).parent(".slcitems").toggle();
	});
	$("body").click(function(){
		$(".slcitems").hide();
	});
})

/*密码重置*/
function checkPsw(){
	var msisdn = $("#msisdn").val();
	var password= $("#password").val();
	var password2= $("#password2").val();
    if(cpassword(password)){
		if(password==password2){
			$("#tip").hide();
			return true;
		}
		else{
			$("#tip").html("两次输入的密码不一致，请重新输入！").show();
			$("#resetPsw").disabled=false;
			$("#resetPsw").html("确认");
			return false;
		}
		$("#resetPsw").disabled=false;
		$("#resetPsw").html("确认");
		return false;
	}
	else{
	$("#tip").html("密码必须是8-16位数字+字母组合").show();
	$("#resetPsw").disabled=false;
	$("#resetPsw").html("确认");
	return false;
	}
}




function resetPassword(url) {
	$("#resetPsw").html("请稍候...");
	$("#resetPsw").disabled=true;
	var msisdn = $("#phno").val();
	var password= $("#password").val();
	var password2= $("#password2").val();
	var imgVerifyCode=$("#imgVerifyCode").val();
	var ret3=$("#ret3").val();
	if(msisdn!="" && msisdn!="请输入绑定支付的移动手机号"){
		if(imgVerifyCode!=""){
			if(ret3!=""){
				if(password != "" && password2 != ""){
					$.ajax({
						type:"POST",
						url:url,
						data:{"msisdn":msisdn,"funcid":"2","verifyCode":ret3 },	
						dataType:"json",	
						success:function(data){
							var resultCode = data.resultCode;
							var resultMsg = data.resultMsg;
							
							if(resultCode == "200"){	
								resetPsw();
							}else{
								$("#tip").html("重置密码失败").show();
								$("#resetPsw").disabled=false;
								$("#resetPsw").html("确认");
							}	
						},
						error:function(){
							$("#tip").html("重置密码失败").show();
							$("#resetPsw").disabled=false;
							$("#resetPsw").html("确认");
						}			
					})	
				}else{
					$("#tip").html("密码不能为空！").show();
					$("#resetPsw").html("确认");
					$("#resetPsw").disabled=false;
				}
			}else{ 
				$("#tip").html("短信验证码不能为空！").show();
				$("#resetPsw").disabled=false;
				$("#resetPsw").html("确认");
				createCode();
				}
		}else{
			$("#tip").html("验证码不能为空！").show();
			$("#resetPsw").disabled=false;
			$("#resetPsw").html("确认");
			createCode();
		}
	}else{ 
	$("#tip").html("手机号不能为空！").show();
    $("#resetPsw").disabled=false;
	$("#resetPsw").html("确认");
  }
}

function resetPsw(){
	var msisdn = $("#phno").val();
	var password= $("#password").val();
	var password2= $("#password2").val();
	checkPsw();

	if(checkPsw()){
		$.ajax({
			url:  BasePath+"/c/resetPassword",
			type: "POST",
			data: {"msisdn":msisdn,"password":base64encode(password),"funcid":"2"},
			dataType: "json",
			success: function(Data){
				var resultCode = Data.resultCode;
				var resultMsg = Data.resultMsg;

				if(resultCode == "200"){	
					window.location.href = BasePath+"/p/resetPw_result.jsp";
				}else if(resultCode == "21104"){
					document.getElementById("tip").innerHTML="密码格式错误";
					document.getElementById("tip").style.display="";
					$("#resetPsw").html("确认");
					$("#resetPsw").disabled=false;
				}else if(resultCode == "21105"){
					document.getElementById("tip").innerHTML="验证码校验不通过";
					document.getElementById("tip").style.display="";
					$("#resetPsw").html("确认");
					$("#resetPsw").disabled=false;
				}else{
					document.getElementById("tip").innerHTML="重置密码失败";
					document.getElementById("tip").style.display="";
					$("#resetPsw").html("确认");
					$("#resetPsw").disabled=false;
				}

			},
			error: function() {
				document.getElementById("tip").innerHTML="重置密码失败";
				document.getElementById("tip").style.display="";
				$("#resetPsw").html("确认");
				$("#resetPsw").disabled=false;
			}
		});
	}
}


//手机格式验证
function checkMobile(sMobile){
if(sMobile=="" || sMobile=="请输入绑定支付的移动手机号"){
         $(".cap_tip2").html("请输入中国大陆手机号码");
	 $(".cap_tip2").show();
        return false;
             }else{
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))){
        $("#phno").focus();
	 $(".cap_tip2").html("手机号码格式不正确");
	 $(".cap_tip2").show();
        return false;
    }else{
	return true;
    }
}
} 

function timeGo(){
	timeoutID=setTimeout('timeGo()',1000);
	var sec = parseInt($("#phoneCode").text().substring(0,2));
	if(sec<=60 && sec>1){
		sec=sec-1;		
		$("#phoneCode").text(sec+"秒重新获取");
	}else if (sec==1){
                clearTimeout(timeoutID);
		$("#phoneCode").css({background:"#fff",color:"#0f9d2d",border:"1px solid #3fb157"});
		$("#phoneCode").text("获取手机验证码");
	}
} 

function f(obj){
	if (obj.value=='请输入移动手机号码'){
		obj.value='';
		$(obj).removeClass("gray2");
		}
}
function b(obj){
	if (obj.value==''){
		obj.value='请输入移动手机号码';
                //obj.value='';
		$(obj).addClass("gray2");
	        //$(".cap_tip2").html("请输入中国大陆手机号码!");
	       // $(".cap_tip2").show();
		}
}
//找回密码中使用countdown1()
$(function(){
	countdown1("countdown1",3);
	});
function countdown1(id,time){
		var container = document.getElementById("Countdown1");
		var begintime = time;
                 var purl = $("#purl1").val();
		if(typeof(purl) == "undefined"){
			purl = BasePath;
		}
		function timego(){
			begintime-=1;
                        if(container){
			    container.innerHTML =begintime;
			    if(begintime<0||begintime==0){
			    var getTimestamp=new Date().getTime();
				if(purl.indexOf("?")>-1){
					window.location.href = purl+"&timestamp="+getTimestamp;
				}else{
					window.location.href = purl+"?timestamp="+getTimestamp;
				}
			    }else{			
				setTimeout(timego,1000);
			    }
                        }
		
		}
		setTimeout(timego,1000);
	}

function countdown(id,time){
		var container = document.getElementById("Countdown");
		var begintime = time;
                 var purl = $("#purl").val();
		if(typeof(purl) == "undefined"){
			purl = BasePath;
		}
		function timego(){
			begintime-=1;
                        if(container){
			    container.innerHTML =begintime;
			    if(begintime<0||begintime==0){
			    var getTimestamp=new Date().getTime();
				if(purl.indexOf("?")>-1){
					window.location.href = purl+"&timestamp="+getTimestamp;
				}else{
					window.location.href = purl+"?timestamp="+getTimestamp;
				}
			    }else{			
				setTimeout(timego,1000);
			    }
                        }
		
		}
		setTimeout(timego,1000);
	}

/*登录*/
/*function login(url){
	var msisdn=$("input[name='msisdn']").val();
	var ret3=$("input[name='password']").val();
if(msisdn!="" && msisdn!="手机号/和阅读账号"){
       if(ret3!="" && ret3!="密码" ){
            $.ajax({
		type:"POST",
		url:url,
		data:{"msisdn":msisdn,"password":base64encode(ret3)},	
                dataType:"json",	
		success:function(data){
			var backUrl = data.backUrl;
			var resultCode = data.resultCode;
			var resultMsg = data.resultMsg;
			
			if(resultCode == "200"){
			var getTimestamp=new Date().getTime();
			if(backUrl.indexOf("?")>-1){	
				window.location.href = backUrl+"&timestamp="+getTimestamp;
				}else{
				window.location.href = backUrl+"?timestamp="+getTimestamp;
				}
			}else if(resultCode=="21101"){
				$(".enter_pass").html("参数不合法，值为空或“”！").show();
                                $(".pass_tip").show();
			}else if(resultCode=="21102"){
				$(".enter_pass").html("用户名或密码错误！").show();
                                $(".pass_tip").show();
			}else if(resultCode=="21100"){
				$(".enter_pass").html("主站登录失败！").show();
                                $(".pass_tip").show();
			}else if(resultCode=="21107"){
				$(".enter_pass").html("用户未注册！").show();
                                $(".pass_tip").show();
			}else if(resultCode=="21108"){
				$(".enter_pass").html("用户名或密码错误！").show();//用户状态异常
                                $(".pass_tip").show();
			}else{
				$(".enter_pass").html("主站登录失败！").show();
                                $(".pass_tip").show();
			}	
		},
		error:function(){
			$(".enter_pass").html("亲，请稍后再试！");  
                       $(".pass_tip").show();
		}			
	     })	
         }else{$(".enter_pass").html("密码不能为空！");
                       $(".pass_tip").show();
                   }
     }else{$(".enter_pass").html("帐号不能为空！");
                      $(".pass_tip").show();
                         }
	
}*/

function popLogin(){
	$(".popBox").show();
}

function getCode(){
		$(".cap_tip").hide();
		var txtval=$("#phno").val();
		var purl1 = document.getElementById("ret3").value;
var postUrl = document.getElementById("ret1").value;
		var pay_code = $(".pay_code_btn.j_dx").text().trim();
var imgCode = $("#imgVerifyCode").val();
		if(checkMobile(txtval)){			
			$.ajax({
				type:"POST",
				url:postUrl,
				data:{"msisdn":txtval,"funcid":"1","imgVerifyCode":imgCode},
				dataType:"json",
				success:function(data){      //resultCode：200-成功；21101-参数不合法，值为空或“”；21103-手机号不合法；21106-手机号已注册过(当funcid=1时需要验证) 
					var result_code = data.resultCode;
					var result_msg = data.resultMsg;
					if(result_code == "200" && result_msg!="手机号已注册过"){
						if(pay_code=="获取手机验证码"||pay_code=="重新获取手机验证码"){
					$(".pay_code_btn.j_dx").text("60秒重新获取");
					timeGo()	
					$(".pay_code_btn.j_dx").css({background:"#ccc",color:"#fff",border:"1px solid #ccc"});						
					$(".cap_tip2").hide();
						}
					}
					else{
					    $(".cap_tip2").html(result_msg);
					    $(".cap_tip2").show();
createCode();
					}
				},
error:function(){
					createCode();
				}
			});				
		}
		else{
			 $(".cap_tip2").show();
			}

	}

/*注册pay_sure_btn*/
$(function(){
	countdown("Countdown",5);
});
//立即注册
$(".pay_register_btn").click(function(){
		var ps1 = $("#password1").val();
		var ps2 = $("#password2").val();
		var txtval=$("#phno").val();
		var purl1 = $("#ret3").val();
		var label = $(".selectclick").children().attr('class');
                var verifyCode1 = $("#message").val();
             if(iscode(verifyCode1,txtval)){
        
	if(cpassword(ps1)){
		if(ps1==ps2){
			$(".reg_num_hh").hide();		
					
			$.ajax({
			type:"POST",
			url:document.getElementById("ret2").value,
			data:{"msisdn":txtval,"password":ps1,"verifyCode":verifyCode1,"purl":purl1},
			dataType:"json",
			success:function(data){
				var result_code = data.resultCode;
				var result_msg = data.resultMsg;
                var backUrl = data.backUrl;
				if(result_code == "200"){
					$.ajax({
						type:"POST",
						url:BasePath+"/c/userLogin?msisdn="+txtval + "&password=" + ps2,
						dataType:"json",	
						success:function(data2){		
							$(".cap_tip2").hide();
							$("#password2").html("");					   
							
							window.location.href= BasePath+"/p/register_result.jsp?purl="+backUrl;
						}
					});
				}else{
					   $(".cap_tip2").html(result_msg);
					   $(".cap_tip2").show();
					
				
				}
			}
		});
		
		}
		else{
			$(".reg_num_hh").html("两次密码不一致");
		}
	}
	else{
		$(".reg_num_hh").html("密码格式不符");
	}
}
	});




//验证码校验不能为空
function iscode(codeIs,phno){
         if(checkMobile(phno)){
		if(codeIs!=""){
			if(codeIs.length ==6){
				return true;
			}else{
				$(".cap_tip2").html("请输入6位数验证码!");
				$(".cap_tip2").show();
                                return false;
			}
		}else{
			$(".cap_tip2").html("验证码不能为空!");
			$(".cap_tip2").show();
                        return false;
		}
            }
}

/*注册页面密码校验*/

function cpassword(ps1){
    
    if(!(/(?!^\d+$)(?!^[a-zA-Z]+$)^[0-9a-zA-Z]{8,16}$/.test(ps1))){
        $("#password1").focus();
        return false;
    }
	return true;
}

/*验证*/
function yanzheng(url){
	$(".next_btn a").html("请稍候...");
	$(".next_btn").disabled=true;
	var msisdn=$("#phno").val();
	var imgVerifyCode=$("#imgVerifyCode").val();
	var ret3=$("#ret3").val();
	if(msisdn!="" && msisdn!="请输入绑定支付的移动手机号"){
		if(imgVerifyCode!=""){
			if(ret3!=""){
				var url2=$("#url2").val();
				$.ajax({
				type:"POST",
				url:url,
				data:{"msisdn":msisdn,"funcid":"2","verifyCode":ret3 },	
				dataType:"json",	
				success:function(data){
					var backUrl = data.backUrl;
					var resultCode = data.resultCode;
					var resultMsg = data.resultMsg;
					
					if(resultCode == "200"){	
						window.location.href = url2+"?msisdn="+msisdn+"&funcid=2";
						$("#tip").hide();
						$("#tip1").hide();
						$("#tip2").hide();
					}else{
						$("#tip").hide();
						$("#tip1").hide();
						$("#tip2").html(resultMsg).show();
						$(".next_btn").disabled=false;
						$(".next_btn a").html("下一步");
					}	
				},
				error:function(){
					$("#tip").hide();
					$("#tip1").hide();
					$("#tip2").html(resultMsg).show();
					$(".next_btn").disabled=false;
					$(".next_btn a").html("下一步");
				}			
				})	
			}else{ 
				$("#tip").hide();
				$("#tip1").hide();
				$("#tip2").html("短信验证码不能为空！").show();
				$(".next_btn").disabled=false;
				$(".next_btn a").html("下一步");
				createCode();
				}
		}else{
			$("#tip").hide();
			$("#tip1").html("验证码不能为空！").show();
			$("#tip2").hide();
			$(".next_btn").disabled=false;
			$(".next_btn a").html("下一步");
			createCode();
		}
	}else{ 
	$("#tip").html("手机号不能为空！").show();
	$("#tip1").hide();
	$("#tip2").hide();
    $(".next_btn").disabled=false;
	$(".next_btn a").html("下一步");
  }
}

//获取短信验证码
function yanzhengCode(url){
	var imgCode = $("#imgVerifyCode").val();
	var cssbgk=$("#phoneCode").text().trim();
	if(cssbgk=="获取手机验证码" || cssbgk=="重新获取手机验证码" || cssbgk=="手机验证码"){
         var msisdn=$("#phno").val();
	$.ajax({
		type:"POST",
		url:url,
		data:{"msisdn":msisdn,"funcid":"2",imgVerifyCode:imgCode},	
        dataType:"json",	
		success:function(data){
			var resultCode = data.resultCode;
			var resultMsg = data.resultMsg;
			
			if(resultCode == "200"){
				$("#ret3").removeAttr("disabled");	
				$("#phoneCode").text("60秒重新获取")
				timeGo();
				$("#phoneCode").css({background:"#ccc",color:"#fff",border:"1px solid #ccc"});						
				$("#tip").hide();
			}else{
				$("#tip").text(resultMsg).show();
				createCode();
			}
		},
		error:function(){
			$("#tip").text("请求失败").show();
			createCode();
		}			
	})
		
	}else{
		return false;
       }
}
//切换图片验证码
function createCode(){ 
         var img = document.getElementById("Img"); 
    img.src = BasePath+"/authImage?rnd=" + Math.random(); 
} 

//让IE支持placeholder属性
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($("<div class='placeh'></div>").css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
            var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:'0', height:h, lienHeight:h, paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
        });
    }
};
//执行
jQuery(function(){
    JPlaceHolder.init();    
});


//注册图片验证输入框内容变化
function codeChange1(){
    $("#getcode").removeClass("hui");
    var getcode=document.getElementById("getcode");
	getcode.setAttribute("onclick", "getCode1()");
}


//图片验证输入框内容变化

function codeChange(){
    $("#phoneCode").removeClass("hui");
    var phoneCode=document.getElementById("phoneCode");
	phoneCode.setAttribute("onclick", "yanzhengCode('"+BasePath+"/c/getVerifyCode')");
}


//记住密码单选框
$(function() {
  /*checkbox*/
  $('.l-label').click(function(){  
    $(this).toggleClass('checked')       
  })
})

	/*提示显示隐藏*/
   $("#pass_word").on("input",function(){
		var pass_va=$(this).val();

		if(pass_va!=""){
				
			$("#l-tip").hide();
		}else {
			$("#l-tip").show();
		}
	})

/*登录*/
function login(url){
	var msisdn=$("input[name='msisdn']").val();
	var ret3=$("input[name='password']").val();
	var purl=$("input[name='purl1']").val();
        var pur2=$("input[name='purl']").val();
	var greenbtnBack = $(".greenbtn").css("background");
	$(".greenbtn").html("正在登录...").attr("disabled",true).removeAttr("href");
	if(msisdn!="" && msisdn!="手机号/和阅读账号"){
       if(ret3!="" && ret3!="密码" ){
        $.ajax({
		type:"POST",
		url:url,
		data:{"msisdn":msisdn,"password":base64encode(ret3),"purl":pur2},	
                dataType:"json",	
		success:function(data){
			var backUrl = data.backUrl;
			var resultCode = data.resultCode;
			var resultMsg = data.resultMsg;
			
			if(resultCode == "200"){
			var getTimestamp=new Date().getTime();
			if(backUrl.indexOf("?")>-1){	
				window.location.href = backUrl+"&timestamp="+getTimestamp;
				}else{
				window.location.href = backUrl+"?timestamp="+getTimestamp;
				}
			}else if(resultCode=="21101"){
				$(".l-text").html("参数不合法，值为空或“”！").show();
                                $("#l-tip").show();
                                $(".greenbtn").html("登录").attr("disabled",false).css("background",greenbtnBack);
			}else if(resultCode=="21102"){
				$(".l-text").html("账户名与密码不匹配，请重新输入").show();
                                $("#l-tip").show();
                                $(".greenbtn").html("登录").attr("disabled",false).css("background",greenbtnBack);
			}else if(resultCode=="21100"){
				$(".l-text").html("系统繁忙，请稍后重试！").show();
                                $("#l-tip").show();
                                $(".greenbtn").html("登录").attr("disabled",false).css("background",greenbtnBack);
			}else if(resultCode=="21107"){
				$(".l-text").html("用户未注册！").show();
                                $("#l-tip").show();
                                $(".greenbtn").html("登录").attr("disabled",false).css("background",greenbtnBack);
			}else if(resultCode=="21108"){
				$(".l-text").html("账户名与密码不匹配，请重新输入").show();//用户状态异常
                                $("#l-tip").show();
                                $(".greenbtn").html("登录").attr("disabled",false).css("background",greenbtnBack);
			}else if(resultCode=="21112"){
				window.location.href = BasePath+"/p/upgrade.jsp?purl="+purl;
			}else{
				$(".l-text").html("系统繁忙，请稍后重试！").show();
                                $("#l-tip").show();
                                $(".greenbtn").html("登录").attr("disabled",false).css("background",greenbtnBack);
			}	
		},
		error:function(){
			$(".l-text").html("系统繁忙，请稍后重试！");  
                       $("#l-tip").show();
                       $(".greenbtn").html("登录").attr("disabled",false).css("background",greenbtnBack);
		}			
	     })	
         }else{$(".l-text").html("请输入密码");
                       $("#l-tip").show();
                       $(".greenbtn").html("登录").attr("disabled",false).css("background",greenbtnBack);
                   }
     }else{$(".l-text").html("请输入账户名");
                      $("#l-tip").show();
                      $(".greenbtn").html("登录").attr("disabled",false).css("background",greenbtnBack);
                         }
	
}
//判断用户之前是否登录过保存过密码
$(function(){
	if($("#pass_word").attr("autocomplete") == "off"){
		$(".l-label").addClass("checked");
	}
})

/*20151103 xpf uesftl-5820 验证码输入按钮可点*/
$("#imgVerifyCode").live("input",function(){
	
	var stryz=$("#imgVerifyCode").val();
	if(stryz!="" && stryz!=undefined){
		$("#getcode").removeClass("hui");
		$("#getcode").attr("onclick","getCode1();");
	}else{
		$("#getcode").attr("class","btn hui");
		$("#getcode").attr("onclick","");
	}
})
//获取手机验证码
function getCode1(){
		$(".l-tip").hide();
		var tel_word = $("#phno").val();/*手机号*/
		var tel_reg = /^[0-9]{11}$/;//手机号正则
        if(!tel_word){
            $(".l-tip .l-text").html("手机号码不能为空");
            $(".l-tip").show();
            return false;
        }else if(!tel_reg.test(tel_word)){
			$(".l-tip .l-text").html("请输入11位手机号码");
            $(".l-tip").show();
            return false;
		}
		
		var postUrl = document.getElementById("ret1").value;
		var pay_code = $("#getcode").text().trim();
		var imgCode = $("#imgVerifyCode").val();
		if(checkMobile1(tel_word)){			
			$.ajax({
				type:"POST",
				url:postUrl,
				data:{"msisdn":tel_word,"funcid":"1","imgVerifyCode":imgCode},
				dataType:"json",
				success:function(data){      //resultCode：200-成功；21101-参数不合法，值为空或“”；21103-手机号不合法；21106-手机号已注册过(当funcid=1时需要验证) 
					var result_code = data.resultCode;
					var result_msg = data.resultMsg;
					if(result_code == "200" && result_msg!="手机号已注册过"){
					if(pay_code=="获取手机验证码"||pay_code=="重新获取手机验证码"){
					$("#message").attr("disabled",false);		
					$("#getcode").text("60秒重新获取");
					timeGo1()	
					$("#getcode").css({background:"#ccc",color:"#fff",border:"1px solid #ccc"});						
					$(".l-tip .l-text").hide();
					$(".l-tip").hide();
						}
					}
					else{
					    $(".l-tip .l-text").html(result_msg);
					    $(".l-tip").show();
						createCode();
					}
				},
					error:function(){
					createCode();
					$(".l-tip .l-text").html("请重新输入图片验证码");
					$(".l-tip").show();
					$(".l-text").show();

				}
			});				
		}
		else{
			 /*$(".cap_tip2").show();*/
			}

	}

	
//倒计时	
	function timeGo1(){
	timeoutID=setTimeout('timeGo1()',1000);
	var sec = parseInt($("#getcode").text().substring(0,2));
	if(sec<=60 && sec>1){
		sec=sec-1;		
		$("#getcode").text(sec+"秒重新获取");
	}else if (sec==1){
                clearTimeout(timeoutID);
		$("#getcode").css({background:"#fff",color:"#0f9d2d",border:"1px solid #3fb157"});
		$("#getcode").text("重新获取手机验证码");   
	}
	
} 
//选择框
$(function(){
  // checkbox
  $('#xzk').click(function(){  
    $("#yhxy").toggleClass('checked')       
  })
  $('#register-pop').click(function(){  
    $('.register-pop').show();       
  })
  $('#agree-pop').click(function(){  
    $('.register-pop').hide();
	$("#xzk").addClass('checked')
  })
  //输入框选中效果
  $('.l-input input').focus(function(){
    $(this).parents('.l-input').addClass('focus');
  })
  $('.l-input input').blur(function(){
    $(this).parents('.l-input').removeClass('focus');
  })
});




//注册提交
function go_register(){
        $("#zcmg").html(" 正在注册...")
		var tel_reg = /^[0-9]{11}$/;//手机号正则
        var tel_word = $("#phno").val();/*手机号*/
        var imgVerifyCode = $("#imgVerifyCode").val();/*验证码*/
        var message = $("#message").val();/*手机验证码*/
		var pwd_reg =/(?!^\d+$)(?!^[a-zA-Z]+$)^[0-9a-zA-Z]{8,16}$/;
        var pass_word = $("#pass_word").val();/*密码*/
        var purl = $("#ret3").val();
        /*判断手机号是否存在*/
        if(!tel_word){
            $(".l-tip .l-text").html("手机号码不能为空");
            $(".l-tip").show();
			$(".l-text").show();
			$("#zcmg").html("注册")
            return false;
        }else if(!tel_reg.test(tel_word)){
			$(".l-tip .l-text").html("请输入11位手机号码");
            $(".l-tip").show();
			$(".l-text").show();
			$("#zcmg").html("注册")
            return false;
		}

        /*判断手机验证码*/
        if(!message){
            $(".l-tip .l-text").html("请输入短信验证码");
            $(".l-tip").show();
			$(".l-text").show();
			$("#zcmg").html("注册")
            return false;
        }

        /*判断密码*/
        if(!pass_word){
            $(".l-tip .l-text").html("密码不能为空");
            $(".l-tip").show();
			$(".l-text").show();
			$("#zcmg").html("注册")
            return false;
        }else if(!pwd_reg.test(pass_word)){
			$(".l-tip .l-text").html("密码必须为8-16位数字+字母组合");
            $(".l-tip").show();
			$(".l-text").show();
			$("#zcmg").html("注册")
            return false;
		}
		/*判断用户是否勾选用户协议*/
		var yhxy = $("#yhxy");
		if(yhxy.attr("class") != ("checkbox")){
			$(".l-tip .l-text").html("请同意用户协议");
            $(".l-tip").show();
			$(".l-text").show();
			$("#zcmg").html("注册")
            return false;
		}

        var register_form_url = $("#go-register").attr("action");
        $.ajax({
            type:'post',
            url:register_form_url,
            data:{"msisdn":tel_word,"password":base64encode(pass_word),"verifyCode":message,"purl":purl},
            dataType:"json",
            success:function(data){
                var result_code = data.resultCode;
                var result_msg = data.resultMsg;
                var backUrl = data.backUrl;
                if(result_code == "200"){
                    $.ajax({
                        type:"POST",
                        url:BasePath+"/c/userLogin?msisdn="+tel_word + "&password=" + pass_word,
                        dataType:"json",    
                        success:function(data2){
                            $(".l-tip").hide();
                          
                            window.location.href= BasePath+"/p/register_result.jsp?purl="+backUrl;
                        }

                    });
                }else{
                       $(".l-tip .l-text").html(result_msg);
                       $(".l-tip").show();
					   $(".l-text").show();
                       $("#zcmg").html("注册");
                }
            }
        });
    }
	function checkMobile1(sMobile){
if(sMobile=="" || sMobile=="请输入绑定支付的移动手机号"){
     $(".l-tip .l-text").html("请输入中国大陆手机号码");
	 $(".l-tip").show();
        return false;
             }else{
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))){
        $("#phno").focus();
	 $(".l-tip .l-text").html("手机号码格式不正确");
	 $(".l-tip").show();
        return false;
    }else{
	return true;
    }
}
} 

function countdownZhiFu(id,time){
		var container = document.getElementById("Countdowns");
		var begintime = time;
       var purl = $("#Countdowns").parent().find("a").attr("href");
		if(typeof(purl) == "undefined"){
			purl = BasePath;
		}
		function timego(){
			begintime-=1;
                        if(container){
			    container.innerHTML =begintime;
			    if(begintime<0||begintime==0){
			    var getTimestamp=new Date().getTime();
				if(purl.indexOf("?")>-1){
					window.location.href = purl+"&timestamp="+getTimestamp;
				}else{
					window.location.href = purl+"?timestamp="+getTimestamp;
				}
			    }else{			
				setTimeout(timego,1000);
			    }
                        }
		
		}
		setTimeout(timego,1000);
	}

/*账号升级*/
function Upgrade(url) {
	$("#resetPsw").html("请稍候...");
	var msisdn = $("#msisdn").val();
	var newPwd= $("#password").val();
	var newPwd2= $("#password2").val();
        var purl=$("input[name='purl1']").val();
	if(newPwd == "" || newPwd2 == ""){
		$("#warnning").html("密码不能为空！").show();
		$("#resetPsw").html("确定升级");
	}else{
		checkUpgradePsw();

		if(checkUpgradePsw()){
			$.ajax({
				url:  url,
				type: "POST",
				data: {"msisdn":msisdn,"newPwd":base64encode(newPwd)},
				dataType: "json",
				success: function(Data){

					var backUrl = Data.backUrl;
			
					var resultCode = Data.resultCode;

					var resultMsg = Data.resultMsg;


					if(resultCode == "200"){	
						window.location.href = BasePath+"/p/upgrade2.jsp?purl="+purl;
					}else if(resultCode == "21104"){
						document.getElementById("warnning").innerHTML="密码格式不正确";
						document.getElementById("warnning").style.display="";
						$("#resetPsw").html("确定升级");
					}else if(resultCode == "32015"){
						document.getElementById("warnning").innerHTML="手机号码为空或非移动号";
						document.getElementById("warnning").style.display="";
						$("#resetPsw").html("确定升级");
					}else if(resultCode == "32016"){
						document.getElementById("warnning").innerHTML="咪咕账号已存在，无需升级";
						document.getElementById("warnning").style.display="";
						$("#resetPsw").html("确定升级");
					}else{
						document.getElementById("warnning").innerHTML="升级失败";
						document.getElementById("warnning").style.display="";
						$("#resetPsw").html("确定升级");
					}

				},
				error: function() {
					$("#resetPsw").html("确定升级");
				}
			});
		}else{
			$("#resetPsw").html("确定升级");
		}
	}
	
}


/*账号升级密码检查*/
function checkUpgradePsw(){
	var msisdn = $("#msisdn").val();
	var password= $("#password").val();
	var password2= $("#password2").val();
    if(cUpgradePassword(password)){
		if(password==password2){
			$("#warnning").hide();
			return true;
		}
		else{
			$("#warnning").html("您两次输入的密码不一致").show();
			var btn = document.getElementById("resetPsw");
			btn.value = "确定升级";
			$("#resetPsw").removeAttr("disabled");
			return false;
		}
		var btn = document.getElementById("resetPsw");
			btn.value = "确定升级";
			$("#resetPsw").removeAttr("disabled");
		return false;
	}
	else{
	$("#warnning").html("请输入8-16位数字+字母组合").show();
	var btn = document.getElementById("resetPsw");
	btn.value = "确定升级";
	$("#resetPsw").removeAttr("disabled");
	return false;
	}
}

/*账号升级密码校验*/
function cUpgradePassword(ps1){
    
    if(!(/^.{8,16}$/.test(ps1))){
        $("#password1").focus();
        return false;
    }
	return true;
}

//首页鼠标移入头像下拉列表
$(function(){
    $('.slidebox').hover(function(){
        $(this).children('.smallbox').toggle();
    })
    $("#show-slide").hover(function(){
      $('.head-nav-slide .wrap-nav').toggle();
    })
    $('.head-nav-slide .wrap-nav').hover(function(){
      $(".mod-nav-li").removeClass('on');
      $('.mod-nav-slide').hide();
      $(".mod-nav-li.first-show").addClass('on');
      $(".mod-nav-li.first-show").children('.mod-nav-slide').show();
        $(this).toggle();
    })
    $(".head-nav-slide .mod-nav-li").hover(function(){
      $(".mod-nav-li").removeClass('on');
      $(".mod-nav-li").removeClass('old');
      $('.mod-nav-slide').hide();
      $(this).addClass('on');
      $(this).siblings('.mod-nav-li').addClass('old');
      $(this).children('.mod-nav-slide').show();    
    })
    $(".mod-nav-li .ztPic").hover(function(){
        $(this).parent().siblings('.nav-slide-pic').toggle();
    })
    $(".per-show-ul").click(function(){
        $(this).siblings('ul').show();
        $(this).parent().siblings('.per-list-li').removeClass('active');
        $(this).parent().addClass('active');
    })
    $(".classfiyList").hover(function(){
        $(this).children('.per-close').toggle();
    })
  
})

function getAssociativeKeywords(obj){
	var obj2 = $(obj).parents("form").siblings(".lxc-search");
	$(obj2).empty();
	var value = $(obj).val();
	var IsShow = 0;
//$(obj).val(value);
	var url = $('#getAssociativeKeywords').val();
	//搜索词长度
	var vlength = value.length; 
		$.ajax({
	    	type: "get",
	    	url:url,
	    	data:{keyword:value},
	    	dataType: "text",
			cache: false,
			success:function(jsonData){
				var json = eval(JSON.parse(jsonData));
				var resultCode = json.resultCode;
				if(resultCode!="21109"){
				var length = json.keywordList.length;
				if(length>=1){
				var keyword1 = json.keywordList[0].keyword;
				}
				if(length>=2){
				var keyword2 = json.keywordList[1].keyword;
				}
				if(length>=3){
				var keyword3 = json.keywordList[2].keyword;
				}
				if(length>=4){
				var keyword4 = json.keywordList[3].keyword;
				}
				if(length>=5){
				var keyword5 = json.keywordList[4].keyword;
				}
				var rex = new RegExp(value, 'gmi');
				if(keyword1!="" && keyword1!=undefined){
					var keyword11 = keyword1.replace(rex,"<span class='green'>"+value+"</span>");
					$(obj2).append("<a href='"+BasePath+"/p/search_list.jsp?keyWord="+keyword1+"'><li>"+keyword11+"</li></a>");
					IsShow = 1;
				}
				if(keyword2!="" && keyword2!=undefined){
					var keyword12 = keyword2.replace(rex,"<span class='green'>"+value+"</span>");
					$(obj2).append("<a href='"+BasePath+"/p/search_list.jsp?keyWord="+keyword2+"'><li>"+keyword12+"</li></a>")
				}
				if(keyword3!="" && keyword3!=undefined){
					var keyword13 = keyword3.replace(rex,"<span class='green'>"+value+"</span>");
					$(obj2).append("<a href='"+BasePath+"/p/search_list.jsp?keyWord="+keyword3+"'><li>"+keyword13+"</li></a>")
				}
				if(keyword4!="" && keyword4!=undefined){
					var keyword14 = keyword4.replace(rex,"<span class='green'>"+value+"</span>");
					$(obj2).append("<a href='"+BasePath+"/p/search_list.jsp?keyWord="+keyword4+"'><li>"+keyword14+"</li></a>")
				}
				if(keyword5!="" && keyword5!=undefined){
					var keyword15 = keyword5.replace(rex,"<span class='green'>"+value+"</span>");
					$(obj2).append("<a href='"+BasePath+"/p/search_list.jsp?keyWord="+keyword5+"'><li>"+keyword15+"</li></a>")
				}
				}
				 sc_show(obj,IsShow);
			},
			error:function(){

				}
	    });
	   
}

//搜索框展示联想框
function sc_show(obj,IsShow){
	var value = $(obj).val();
	if(value != "" && IsShow==1){
		$(obj).parents("form").siblings(".lxc-search").show();
	}else{
		$(obj).parents("form").siblings(".lxc-search").hide();
	}
}

/*懒加载效果*/
var Lazy = {
    "Img": null,
    "getY": function(b) {
        var a = 0;
        if (b && b.offsetParent) while (b.offsetParent) a += b.offsetTop, b = b.offsetParent; else b && b.y && (a += b.y);
        return a;
    },
    "getX": function(b) {
        var a = 0;
        if (b && b.offsetParent) while (b.offsetParent) a += b.offsetLeft, b = b.offsetParent; else b && b.x && (a += b.X);
        return a;
    },
    "scrollY": function() {  <!--获取鼠标Y-->
        var a = document.documentElement;
        return self.pageYOffset || a && a.scrollTop || document.body.scrollTop || 0;
    },
    "scrollX": function() {  <!--获取鼠标X-->
        var a = document.documentElement;
        return self.pageXOffset || a && a.scrollLeft || document.body.scrollLeft || 0;
    },
    "windowWidth": function() {
        var a = document.documentElement;
        return self.innerWidth || a && a.clientWidth || document.body.clientWidth;
    },
    "windowHeight": function() {
        var a = document.documentElement;
        return self.innerHeight || a && a.clientHeight || document.body.clientHeight;
    },
    "CurrentHeight": function() {
        return Lazy.scrollY() + Lazy.windowHeight();
    },
    "CurrentWidth": function() {
        return Lazy.scrollX() + Lazy.windowWidth();
    },
    "Load": function(d) {
        Lazy.Init();
        var f = Lazy.CurrentHeight(), b = Lazy.CurrentWidth();
        for (_index = 0; _index < Lazy.Img.length; _index++) {
            var a = Lazy.Img[_index];
            $(a).attr("lazy") == undefined && $(a).attr("lazy", "n");
            if ($(a).attr("lazy") == "y") continue;
           
            if (d == undefined || d == "" || d == null) {
                var c = Lazy.getY(a), e = Lazy.getX(a);
                //e < b && c < f && (a.src = a.getAttribute("data-src"), $(a).attr("lazy", "y"), a.removeAttribute("data-src"));
				c < f && (a.src = a.getAttribute("data-src"), $(a).attr("lazy", "y"), a.removeAttribute("data-src"));
				$(a).attr("data-rel",e);
            } else if (d == "x") {
                var c = Lazy.getX(a);
                c < b && (a.src = a.getAttribute("data-src"), $(a).attr("lazy", "y"));
				
            }
        }
    },
    "Init": function() {
        var a = document.querySelectorAll("img[data-src]");
        Lazy.Img = a;
    }
};
//为滚动轴绑定图片懒加载事件
window.onscroll = function(){Lazy.Load();};
setTimeout(function(){Lazy.Load();},100);

// 修复ie8对trim不支持
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

//登录注册回车
function KeyDown(e){
   var event = window.event || e;
   if (event.keyCode == 13){
      document.getElementById("enter").click();
   }
 }

//点击搜索
function toSearch(obj){
	var searchUrl = $("#searchUrl").val();
	var keyWord = $(obj).next().val();
	keyWord = keyWord.replace(/[<>"&]/g,function(match,pos,originalText){
	switch(match){
		case "<":
			return "%26lt%3B";
		case ">":
			return "%26gt%3B";
		case "&":
			return "%26amp%3B";
		case "\"":
			return "%26quot%3B";
	}
});
	window.location.href = searchUrl+"?keyWord="+keyWord;	
}

//搜索回车
function KeyDown2(e,obj){
   var event = window.event || e;
   if (event.keyCode == 13){
window.event.cancelBubble = true;
window.event.returnValue = false;
$(obj).prev().click();
   }
 }


//base64加密
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                                              -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                                              -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
                                              58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0,  1,  2,  3,  4,  5,  6,
                                              7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                                              25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                                              37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1,
                                              -1, -1);

            function base64encode(str)
                {
                var out, i, len;
                var c1, c2, c3;
                len = str.length;
                i = 0;
                out = "";

                while (i < len)
                    {
                    c1 = str.charCodeAt(i++) & 0xff;

                    if (i == len)
                        {
                        out += base64EncodeChars.charAt(c1 >> 2);
                        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                        out += "==";
                        break
                        }

                    c2 = str.charCodeAt(i++);

                    if (i == len)
                        {
                        out += base64EncodeChars.charAt(c1 >> 2);
                        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                        out += "=";
                        break
                        }

                    c3 = str.charCodeAt(i++);
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                    out += base64EncodeChars.charAt(c3 & 0x3F)
                    }

                return out
                }

            function base64decode(str)
                {
                var c1, c2, c3, c4;
                var i, len, out;
                len = str.length;
                i = 0;
                out = "";

                while (i < len)
                    {
                    do
                        {
                        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
                        } while (i < len && c1 == -1);

                    if (c1 == -1)
                        break;

                    do
                        {
                        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
                        } while (i < len && c2 == -1);

                    if (c2 == -1)
                        break;

                    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

                    do
                        {
                        c3 = str.charCodeAt(i++) & 0xff;

                        if (c3 == 61)
                            return out;

                        c3 = base64DecodeChars[c3]
                        } while (i < len && c3 == -1);

                    if (c3 == -1)
                        break;

                    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

                    do
                        {
                        c4 = str.charCodeAt(i++) & 0xff;

                        if (c4 == 61)
                            return out;

                        c4 = base64DecodeChars[c4]
                        } while (i < len && c4 == -1);

                    if (c4 == -1)
                        break;

                    out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
                    }

                return out
                }