;(function ($) {
  var Dialog = function (config) {
    var _this_ = this;
    //默认参数配置
    this.config = {
      width: 'auto',
      height: 'auto',
      //提示信息
      message:null,
      //类型
      type:"waiting",
      //按钮
      buttons:null,
      //延迟多久关闭
      delay:null,
      //延迟关闭的回调用方法
      delayCallback:null,
      //透明度
      maskOpacity:null,
      //点击遮罩层是否可以关闭
      maskClose:null,
      //是否启用动画
      effect: null
    };

    //默认参数扩展
    if (config && $.isPlainObject(config)) {
      $.extend(this.config,config);
    }else{
      this.isConfig = true;
    };

    //创建Dom
    this.body=$('body');
    // 创建遮罩层
    this.mask = $('<div class="g-dialog-contianer">');
    //创建弹出框
    this.win = $('<div class="dialog-window">');
    //头部
    this.winHeader = $('<div class="dialog-header"></div>')
    //创建提示信息
    this.winContent = $('<div class="dialog-content">');

    this.winFooter = $('<div class="dialog-footer">');

    //渲染Dom
    this.creat();

  };
  //记录弹框层级
  Dialog.zIndex = 10000;

  Dialog.prototype = {
    //动画函数
    animate: function () {
      var _this_ = this;
      this.win.css('-webkit-transform','scale(0,0)');
      window.setTimeout(function () {
        _this_.win.css('-webkit-transform','scale(1,1)');
      }, 100);
    },

    //创建弹出框
    creat: function () {
      var _this_ = this,
          config = this.config,
          mask = this.mask,
          win = this.win,
          header = this.winHeader,
          content = this.winContent,
          footer = this.winFooter,
          body = this.body;
          //加弹框层级
          Dialog.zIndex++;
          this.mask.css('zIndex',Dialog.zIndex);
          //没有传参
          if (this.isConfig) {
            win.append(header.addClass('waiting'));

            if (config.effect) {
              this.animate();
            }

            mask.append(win);
            body.append(mask);
          }
          else{
            //根据参数创建弹窗
            header.addClass(config.type);
            win.append(header);
            //如果有信息
            if (config.message) {
              win.append(content.html(config.message));
            };
            //按钮组
            if (config.buttons) {
              console.log('buttons');
              this.creatButtons(footer, config.buttons);

              win.append(footer);
            };

            mask.append(win);
            body.append(mask);

            if (config.width != 'auto') {
              win.width(config.width);
            };

            if (config.height != 'auto') {
              win.height(config.height);
            };

            if (config.maskOpacity) {
              mask.css('backgroundColor','rgba(0,0,0,'+ config.maskOpacity +')');
            }

            //多久关闭
            if (config.delay && config.delay != 0) {
              window.setTimeout(function () {
                _this_.close();
                //执行延迟回调函数
                config.delayCallback && config.delayCallback();
              }, config.delay);
            }

            if (config.effect) {
              this.animate();
            }

            //点击遮罩层可以关闭
            if (config.maskClose) {
              mask.click(function () {
                _this_.close();
              })
            }
          };
    },
    creatButtons: function (footer, buttons) {
      var _this_ = this;

      // {
      //   type: 'red',
      //   text: 'ok',
      //   callback: function() {}
      // }

      $(buttons).each(function (i) {
        //获取按钮的样式
        var type = this.type?" class='"+this.type+ "'":"";
        var btnText = this.text?this.text:"按钮"+(++i);
        var callback = this.callback?this.callback:null;

        var button = $('<button'+ type +'>' + btnText +　"</button>");

        if (callback) {
          button.click(function (e) {
            var isClose = callback();
            //阻止事件冒泡
            e.stopPropagation();

            if (isClose != false) {
              _this_.close();
            }

          })
        }else{
          button.click(function (e) {
            //阻止事件冒泡
            e.stopPropagation();
            _this_.close();
          })
        }

        footer.append(button);

      });


      //console.log(buttons);
    },
    close: function () {
      this.mask.remove();
    }
  };

  window.Dialog = Dialog;

  $.dialog = function (config) {
    return new Dialog(config);
  }

})(Zepto)