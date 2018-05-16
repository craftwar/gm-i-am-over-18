// ==UserScript==
// @name          I am over 18
// @author        tsaiid
// @namespace     http://tsai.it/project/gmscripts/i-am-over-18/
// @homepageURL   https://github.com/tsaiid/gm-i-am-over-18
// @version       0.2.20180106
// @description   Automatically agrees the "I'm over 18" declaration. The current supported sites are primarily in Taiwan.
// @icon          https://raw.githubusercontent.com/tsaiid/gm-i-am-over-18/master/icon48.png
// @icon64        https://raw.githubusercontent.com/tsaiid/gm-i-am-over-18/master/icon64.png
// @license       MIT
// @copyright     2016, I-Ta Tsai (http://tsai.it/)
// @include       https://www.ptt.cc/*
// @include       http*://*.ettoday.net/*
// @include       http://*.playno1.com/*
// @include       http*://*.eyny.com/*
// @include       http*://ck101.com/*
// @include       http://kickass.socialtorrent.net/*
// @include       http://katproxy.com/*
// @include       http*://www.xvideos.com/*
// @include       https://v.jav101.com/*
// @include       http*://*.blogspot.*/*
// @include       http://www.appledaily.com.tw/*
// @include       https://www.kocpc.com.tw/*
// @include       https://www.myfreecams.com/*
// @include       http://www.ibeauty.tw/*
// @include       http://www.storm.mg/*
// @include       http://www.getchu.com/php/attestation.html*
// @include       http*://t66y.com/
// @include       https://*.fc2.com/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require       https://gist.githubusercontent.com/BrockA/2625891/raw/waitForKeyElements.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

window.addEventListener('load', ()=> { // wait until page loaded

    let url = window.location.href;

    function clickToContinue(jNodes) {
/*
        console.log(jNodes);
        console.log(jNodes.context);
        console.log(jNodes.selector);
*/
        jNodes[0].click();
    }

    // for ptt
    if (url.includes("www.ptt.cc")) {
        $('button:contains("我同意，我已年滿十八歲")').click();
    }

    // for ettoday
    if (url.includes(".ettoday.net") && $('.adult-box').is(':visible')) {
        $('.adult-box').hide();
    }

    // for playno1
    if (url.includes(".playno1.com")) {
        waitForKeyElements(
            'button:contains("我已滿18歲 進入")',
            clickToContinue
        );
    }

    // for eyny
    if (url.includes(".eyny.com")) {
        $('input[value*="是，我已年滿18歲。"]').click();
    }

    // for ck101
    if (url.includes("ck101.com")) {
      document.getElementById('periodaggre18_2015').checked = true;
      document.getElementById('fwin_dialog_submit').click();
    }

    // for kickass
    if (url.includes("kickass.socialtorrent.net") || url.includes("katproxy.com")) {
        $('button:contains("Yes, let me see it")').click();
    }

    // for xvideos
    if (url.includes(".xvideos.com")) {
        $('#disclaimer_background').click();
    }

    // for jav101
    if (url.includes("v.jav101.com")) {
        $('a.agreeBtn').click();
    }

    // blogspot
    // from https://gist.github.com/obeattie/362589
    if (url.includes('.blogspot.')) {
        let overlay = document.getElementById('injected-iframe');
        if (overlay) {
            let nextSibling = overlay.nextElementSibling;
            if (nextSibling.tagName == 'STYLE') nextSibling.parentElement.removeChild(nextSibling);
            overlay.parentElement.removeChild(overlay);
        }
    }

    // appledaily
    if (url.includes("www.appledaily.com.tw")) {
        waitForKeyElements(
            "#popup_18 a.yes",
            clickToContinue
        );
    }

    // www.kocpc.com.tw
    if (url.includes("www.kocpc.com.tw")) {
        waitForKeyElements(
            "button.ox18B",
            clickToContinue
        );
    }

    // myfreecams
    if (url.includes("www.myfreecams.com")) {
        waitForKeyElements(
            "#enter_desktop",
            clickToContinue
        );
    }

    // ibeauty
    if (url.includes("www.ibeauty.tw")) {
        waitForKeyElements(
            ".warningWp .warningBtn .btnYes",
            clickToContinue
        );
    }

    // storm.mg
    if (url.includes("www.storm.mg")) {
        waitForKeyElements(
            "button.button18x.yes",
            clickToContinue
        );
    }
    // getchu.com
    if (url.includes("www.getchu.com/")) {
        $('a:contains("[は い]")')[0].click();
    }
    // t66y.com
    if (url.includes("t66y.com")) {
        waitForKeyElements(
            'a:contains("滿 18 歲,")',
            clickToContinue
        );
    }
    // <a href="javascript:void(0)" class="c-btn-102 btnSz-2" role="button" aria-label="yes">是（進入）</a>
    if (url.includes(".fc2.com")) {
        document.querySelector("a.c-btn-102").click();
    }
}, false);
