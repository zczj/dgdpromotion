/*
* @Author: suzhihui
* @Date:   2016-07-19 09:32:40
* @Last Modified by:   老苏
* @Last Modified time: 2016-12-07 14:24:51
*/

$(window).on('scroll', function () {
    $('.mark').height($(document).height())
});
$(window).on('resize', function () {
    var iH = $('#popBox').height();
    var fH = $(document).height();
    var top = (fH - iH)/2 + 'px';
    $('#popBox').css('top',top);

})
$('.buy').click(function () {
    if ($(this).hasClass('no-hoved')) {
        return;
    }
    var userid = $("#UserID").val();
    $.post("/Special/checkLogin", function (data) {

        if (data.state == "noLogin") {
            $.layer({
                shade: [0],
                area: ['200', 'auto'],
                dialog: {
                    msg: '请先登录',
                    btns: 2,
                    type: 4,
                    btn: ['确认', '取消'],
                    yes: function () {
                        location.href = "/passport/login?rel=" + $('#requestUrl').val();
                    }, no: function () {
                        return;
                    }
                }
            });
            return;
        }
        else if (data.state == "timeout") {
            layer.alert(data.msg);
            return;

        }

        else if (data.state == "nobuy") {
            $(".buy").html("10:00更新金额");
            layer.alert(data.msg, 8);
            return;
        }
        else if (data.state== "noauth")
        {
            $.layer({
                shade: [0],
                area: ['200', 'auto'],
                dialog: {
                    msg: '请先认证投资人',
                    btns: 2,
                    type: 4,
                    btn: ['确认','取消'],
                    yes: function () {
                        location.href = "/mycenter/authentication?rel=" + $('#requestUrl').val();
                    }, no: function () {
                        return;
                    }
                }
            });

        }
        else {

            popFn($('#popBox'), $('#mark'));
        }

    });

});
$('#mark,#popBox .close').click(function () {
    hideFn($('#popBox'),$('#mark'));
})

function popFn(obj,mark) {
    mark.fadeIn(30, function () {
        obj.fadeIn();
    })
}
function hideFn(obj,mark) {
    obj.fadeOut(30, function () {
        mark.fadeOut();
    })
}
// $(function () {
//     if (browserRedirect()) {
//         $('.tophead-warp,.layer-box').remove();
//     }
// })

//自定义弹窗
/*
@parma tips :提示语
@parma fn : 回调函数
*/
function myAlert(tips, fn) {
    popFn($('#myAlert'), $('#mark1'));
    $('.popBox-myalert .myalert-tips').html(tips);
    fn && fn();
}