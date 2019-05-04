(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
// ios点击事件不触发
$(function() {  
    FastClick.attach(document.body);  
})
var ChineseDistricts = {
    110000: '北京市',
    120000: '天津市',
    130000: '河北省',
    140000: '山西省',
    150000: '内蒙古自治区',
    210000: '辽宁省',
    220000: '吉林省',
    230000: '黑龙江省',
    310000: '上海市',
    320000: '江苏省',
    330000: '浙江省',
    340000: '安徽省',
    350000: '福建省',
    360000: '江西省',
    370000: '山东省',
    410000: '河南省',
    420000: '湖北省',
    430000: '湖南省',
    440000: '广东省',
    450000: '广西壮族自治区',
    460000: '海南省',
    500000: '重庆市',
    510000: '四川省',
    520000: '贵州省',
    530000: '云南省',
    540000: '西藏自治区',
    610000: '陕西省',
    620000: '甘肃省',
    630000: '青海省',
    640000: '宁夏回族自治区',
    650000: '新疆维吾尔自治区',
    710000: '台湾省',
    810000: '香港特别行政区',
    820000: '澳门特别行政区'
};
$(document).ready(function () {
    //是否关注公众号
    var attention = true;
    // 是否绑定手机号
    var binding = true;
    // 本网，异网用户(默认本网)
    var CM = true;
    //是否转增
    var increase;
    // 领取奖励后当前class
    var current_clickclass
    // 领取奖励后当前礼盒
    var current_lihe
    //标记点亮的省份
    var lightArr = [];
    // 选中的省份
    var selectedText = '北京市'
    // 好友页点亮地图
    if (getUrlParms('frendcity') != null) {
        selectedText = getUrlParms('frendcity')
        light_city()
        selectedText = '北京市'
    }
    // 动态添加省份
    function addProvice () {
        var li = ''
        $.each(ChineseDistricts, function (index, item) {
            if (index == '110000') {
                li += "<li class='choosed' data='" + index + "' value='" + item + "'>" + item + "</li>"   
            } else {
                li += "<li data='" + index + "' value='" + item + "'>" + item + "</li>"
            }
        })
        $('#chose_provice').html(li)
    }
    addProvice();
    // 选择省份
    $('#chose_provice li').on('click', function () {
        $(this).addClass('choosed');
        $(this).siblings('li').removeClass('choosed');
        selectedText = $(this).attr('value')
    })
    // 点击确定，点亮地图
    $('#true_pro').on('click', function () {
        $('.born').hide();
        hideMask();
        $('.choose').hide();
        $('.main').show();
        light_city()
    })

    // 点亮city
    function light_city () {
        $(".city").each(function () {
            if ($(this).children('div').attr('data') == selectedText) {
                // 没被点亮
                if (!$(this).hasClass('all_right')) {
                    $(this).addClass('all_right');
                    $(this).children('div').show();
                    lightArr.push(1);
                    // 点亮的个数
                    $('#alllight_places').text(lightArr.length);

                    // console.log(lightArr);
                    // console.log(lightArr.length)
                } else {
                    // alert('该城市已经被点亮');
                }
                return false
            }
        })
    }
    // 点击主页开始按钮
    $('.stratgame').on('click',function(){
        $('.home').hide();
        $('.choose').show();
    })
    // 点击选择出生地
    $('#choose_born').on('click',function(){
        showMask();
        $('.born').show();
    })
    // 选择出生地关闭按钮
    $('#born_close').on('click',function(){
        $('.born').hide();
        hideMask();
    })
    // 点击去抽流量
    $('#goto').on('click',function(){
        $('.main').hide();
        $('.award').show();
    })
    // 点击抽奖页的返回
    $('#return').on('click',function(){
        $('.award').hide();
        $('.main').show();
    })
    // 点击分享页面，默认分享(测试用)
    $('.share').on('click',function(){
        $('.share').hide();
        $('.main').show();
    })
    // 没有中奖时，发送好友
    $('.send_friend').on('click',function(){
        hideMask();
        $('.unling').hide();
        $('.award').hide();
        $('.share').show();
    })
    // 判断关注，绑定等
    function jiangli() {
        if (attention) {
            // 已关注
            if (binding) {
                if (CM) {
                    //本网中流量 
                    showMask();
                    $('.tc_1').show();
                } else {
                    //异网中流量 
                    if ($(current_clickclass).text() == '点击查看') {
                        // alert('查看奖励')
                        showMask();
                        $('.tc_5').show();
                    } else {
                        showMask();
                        $('.tc_2').show();
                    }
                }
            } else {
                $('.award').hide();
                $('.bind').show();
                // 未绑定手机号
                // alert('你还没绑定手机号');
            }
        } else {
            // 未关注
            alert('未关注');
            // window.location.href = "https://mp.weixin.qq.com/s/FDD5Q57SnOrWAiYkfyzLFQ";
        }
    };
    // 点击领取奖励
	$('.lottery').on('click',function(){
		if ($(this).hasClass('two_places')) {
			if (lightArr.length<2) {
                // alert('您还没有点亮两个地方')
                showMask();
                $('#unling_content').text('2');
                $('.unling').show();
			} else {
                current_clickclass = '.two_places';
                current_lihe = 'two';
                // current_lihe = $(this).parent('div').children('div:eq(0)').removeClass('twono').addClass('twoyes');
                jiangli();
			}
		}else if($(this).hasClass('five_places')){
			if (lightArr.length<5) {
                // alert('您还没有点亮5个地方')
                showMask();
                $('#unling_content').text('5');
                $('.unling').show();
			} else {
                current_clickclass = '.five_places'
                // current_lihe = $(this).parent('div').children('div:eq(0)').removeClass('fiveno').addClass('fiveyes'); 
                current_lihe = 'five';
                jiangli();
			}
		}else if($(this).hasClass('ten_places')){
			if (lightArr.length<10) {
                // alert('您还没有点亮10个地方')
                showMask();
                $('#unling_content').text('10');
                $('.unling').show();
			} else {
                current_clickclass = '.ten_places'
                current_lihe = 'ten';
                // current_lihe = $(this).parent('div').children('div:eq(0)').removeClass('tenno').addClass('tenyes'); 
                jiangli();
			}
		}
    })
    // (转增和取消)
    function Transfcancel () {
        if (increase) {
           //转增
           $('.tc_2').hide();  
           $('.tc_3').show();  
        } else {
           //  取消
           hideMask();
           $('.tc_2').hide();  
        }  
       };
       //异网流量弹窗 1（取消）
       $('.close2').on('click',function(){
           increase = false;
           Transfcancel ();
       });
       //异网流量弹窗 1（转增）
       $('#giveBtn').on('click',function(){
           increase = true;
           Transfcancel ();
       });
       //异网流量弹窗 2,确定
       $('#giveBtn_2').on('click',function(){
           var input_val = $('#inputTel').val();
           if (istel(input_val)) {
               $('.tc_3').hide();
               $('.tc_4').show();
               $('.mobile').text(input_val);   
           } else {
              alert('请输入正确的北京移动号'); 
           }
          
       });
       //异网流量弹窗 3,修改
       $('#revise').on('click',function(){
           $('.tc_4').hide();
           $('.tc_3').show();
       });
       //异网流量弹窗 3,确定
       $('#giveBtn_3').on('click',function(){
           $('.tc_4').hide();
           $('.tc_5').show();
       });
        //关闭
       $('.close').on('click',function(){
           $(current_clickclass).parent('div').children('div:eq(0)').removeClass(current_lihe+'no').addClass(current_lihe+'yes'); 
           $(current_clickclass).css('background-color', '#ff746b');
           $(current_clickclass).text('点击查看');
           $(this).parent().hide();
           hideMask();
       });
    //移动手机号码验证
    function istel(tel) {
        var rtn = false;
        //移动号段验证
        // var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(178)|(147))[\d]{8}$/;
        var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(17[2|8])|(165)|(147)|198)[\d]{8}$/;
        if (regtel.test(tel)) {
            rtn = true;
        }
        return rtn;
    }
    // 点击活动规则
    $('.rule').on('click',function(){
        showMask();
        $('.rulecontent').show();
    })
    // 测试
    $('.test2').on('click',function(){
        $('.test2').css('color','red');
        attention = false;
    });
    $('.test3').on('click',function(){
        $('.test3').css('color','red');
        binding = false;
    });
    $('.test4').on('click',function(){
        $('.test4').css('color','red');
        CM = false;
    });
    $('.test5').on('click',function(){
        $('.test5').css('color','red');
        $('#choose_born').trigger('click')
    }); 
    // 恢复首次登陆
    $('.test6').on('click',function () {
        $('.test6').css('color','red');
        localStorage.clear();
        window.location.href="index.html?time="+((new Date()).getTime());
    })
});
//显示遮罩层
function showMask() {
    $("#mask").css("height", $(document).height());
    $("#mask").css("width", $(document).width());
    $("#mask").show();
    $('body').css('position', 'fixed');
}
//隐藏遮罩层
function hideMask() {
    $("#mask").hide();
    $('body').css('position', 'unset');
}

// 获取url参数
function getUrlParms(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return null;
}