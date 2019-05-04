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
    // 是否参加过(默认第一次)
    var firstLode = true;
    //标记点亮的省份
    var lightArr = [];
    // 选中的省份
    var selectedText = '北京市'
    // 动态添加省份
    function addProvice() {
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
        $('.ownmap').show()
    })
    // 提示
    $('#mymap').on('click',function () {
        window.location.href="index.html?frendcity="+encodeURI(selectedText);
    })
    // 点击去点亮
    $('#go_light').on('click',function(){
        if (firstLode) {
            // 未参加
           $('.fri_home').hide(); 
           $('.fri_choose').show();
        } else {
            // 参加
            $('.ownmap_conternt').text('');
            showMask();
            $('.ownmap').show()
        }
    })
    // 点击选择出生地
    $('#choose_born').on('click', function () {
        showMask();
        $('.born').show();
    })
    // 选择出生地关闭按钮
    $('#born_close').on('click', function () {
        $('.born').hide();
        hideMask();
    })
    // 点击活动规则
    $('.rule').on('click', function () {
        showMask();
        $('.rulecontent').show();
    });
    // 关闭活动规则
    $('.close').on('click', function () {
        hideMask();
        $('.rulecontent').hide();
    })

    // 测试
    $('.test1').on('click',function(){
        $('.test1').css('color','red');
        firstLode = false;
    });
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