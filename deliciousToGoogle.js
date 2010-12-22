working = document.createElement("div");
working.setAttribute('style', 'font-family: helvetica,arial,sans-serif;display: block;position: absolute;top: 5%;left: 5%;padding: 3ex 8ex 3ex 8ex;font-size: 24px;font-weight: bold;color: #333;text-shadow: 1px 1px 0 white;white-space: nowrap;border: 3px solid #D4D4D4;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;background: #F4F4F4;background: -webkit-gradient(linear,left top,left bottom,from(#F4F4F4),to(#ECECEC));background: -moz-linear-gradient(top,#F4F4F4,#ECECEC);border-top-left-radius: 3px 3px;border-top-right-radius: 3px 3px;border-bottom-right-radius: 3px 3px;border-bottom-left-radius: 3px 3px;');
working.innerText = "Here we go...";
document.getElementsByTagName('body')[0].appendChild(working);

function xmlEscape(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/'/g, "&apos;")
            .replace(/&/g, "&amp;");
}

deliciousBookmarks = document.getElementsByTagName('DT');
googleBookmarks = [];
renderPause = navigator.userAgent.indexOf("Firefox") != -1 ? 125 : 0;

function postToGoogle() {
    working.innerText = "Posting " + deliciousBookmarks.length + " bookmarks to Google..."

    bookmarkForm = [
        '<form id="uploader" action="https://www.google.com/bookmarks/mark?op=upload" method="post">',
        '<textarea id="data" rows="30" columns="60" name="<?xml version">',
        '"1.0" encoding="utf-8"?>',
        '<bookmarks>',
        googleBookmarks.join(''),
        '</bookmarks>',
        '</textarea>',
        '</form>'].join('');

    postForm = document.createElement("div");
    postForm.innerHTML = bookmarkForm;
    document.getElementsByTagName('body')[0].appendChild(postForm);
    document.getElementById('uploader').submit();
}

function convertBookmark(node) {
    anchor = node.firstChild;
    googleBookmarks.push('<bookmark>');
    googleBookmarks.push('<url>', xmlEscape(anchor.href), '</url>');
    googleBookmarks.push('<title>', xmlEscape(anchor.innerHTML), '</title>');
    googleBookmarks.push('<labels>', '<label>', xmlEscape(anchor.getAttribute('TAGS')), '</label>', '</labels>');
    googleBookmarks.push('</bookmark>');
}

i = 0;
batchSize = 100;

function batch() {
    alert('batch ' + i);
    working.innerText = "Converting " + i + " of " + deliciousBookmarks.length + " bookmarks...";
    for (var slice = 0; slice < batchSize && i + slice < deliciousBookmarks.length; slice++) {
        convertBookmark(deliciousBookmarks[i + slice]);
    }

    i += batchSize;
    if (i < deliciousBookmarks.length) {
        setTimeout(function () { batch(); }, renderPause);
    }
    else {
        setTimeout(function() { postToGoogle(); }, renderPause);
    }
}

alert('inline');
setTimeout(function () { batch(); }, renderPause);
