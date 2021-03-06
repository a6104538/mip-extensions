﻿/**
 * @file 360doc 自定义逻辑组件
 * @author www.360doc.com技术部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        if ($('.mip-360doc-script-wxggalink') !== null) {
            $('.mip-360doc-script-wxggalink').html('<span class=\'mip-360doc-script-pic\'><img src=\'http://www.360doc.cn/images/zhaishou.png\' class=\'pic2\'/></span><span class=\'mip-360doc-script-pic\'><img src=\'http://www.360doc.cn/images/xiazai.png\'  class=\'pic2\'/></span>');
            var picn = $('.mip-360doc-script-pic').length;
            if (picn > 1) {
                $('.mip-360doc-script-pic').eq(0).css('display', 'inline').siblings('.mip-360doc-script-pic').hide();
            }
            $('.mip-360doc-script-box960').css('display', '');
            setone();
        }
        getRefNum();// 鲜花
        //  统计
        sendlog('mipConn');
        //  检测广告
        var t = setTimeout(function () {
            check();
            clearTimeout(t);
        }, 10000);
    };
    function check() {
        try {
            if (document.documentElement.outerHTML.indexOf('iframeu2825450_0') < 0) {
                sendlog('mipads/u2825450');
            }
            if (document.documentElement.outerHTML.indexOf('iframeu2825719_0') < 0) {
                sendlog('mipads/u2825719');
            }
        }
        catch (e) { }
    }
    function sendlog(url) {
        var img = new Image();
        var key = 'broswerlog_' + Math.floor(Math.random() * 2147483648).toString(36);
        window[key] = img;
        img.onload = img.onerror = img.onabort = function () {
            img.onload = img.onerror = img.onabort = null;
            window[key] = null;
            img = null;
        };
        img.src = 'http://mipeclick.360doc.com/' + url;
    }
    //  广告轮播
    function setone() {
        var t = setTimeout(function () {
            show(1);
            clearTimeout(t);
            settwo();
        }, 3000);
    }
    //  广告轮播
    function settwo() {
        var t = setTimeout(function () {
            show(0);
            clearTimeout(t);
            setone();
        }, 4000);
    }
    function show(index) {
        $('.mip-360doc-script-pic').eq(index).css('display', 'inline')
        .siblings('.mip-360doc-script-pic').css('display', 'none');
    }
    //  获取评论数
    function getRefNum() {
        var artid = getID();
        if (artid === '') {
            return;
        }
        $.ajax({
            type: 'POST',
            url: 'https://transfer.360doc.cn/ajax/Handler.ashx',
            data: 'id=' + artid,
            success: function (data) {
                var useridref = data.split('|');
                if (useridref[1] !== null && useridref[1] !== '') {
                    $('.mip-360doc-script-refnum').html(useridref[1]);
                }
                else {
                    $('.mip-360doc-script-refnum').html('0');
                }
                $('.mip-360doc-script-xh1').html('献花(' + useridref[3] + ')');
            },
            error: function () { }
        });
    }
    //  获取文章id
    function getID() {
        var artid = $('.mip-360doc-script-saveid').html();
        return artid;
    }
    return customElem;
});
