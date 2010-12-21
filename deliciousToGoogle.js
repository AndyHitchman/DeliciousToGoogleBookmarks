working = document.createElement("div");
working.setAttribute('style', 'font-family: helvetica,arial,sans-serif;display: block;position: absolute;top: 5%;left: 5%;padding: 3ex 8ex 3ex 8ex;font-size: 24px;font-weight: bold;color: #333;text-shadow: 1px 1px 0 white;white-space: nowrap;border: 3px solid #D4D4D4;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;background: #F4F4F4;background: -webkit-gradient(linear,left top,left bottom,from(#F4F4F4),to(#ECECEC));background: -moz-linear-gradient(top,#F4F4F4,#ECECEC);border-top-left-radius: 3px 3px;border-top-right-radius: 3px 3px;border-bottom-right-radius: 3px 3px;border-bottom-left-radius: 3px 3px;');
working.innerText = "Loading jQuery...";
document.getElementsByTagName('body')[0].appendChild(working);

if (typeof jQuery == 'undefined') {
    dynaLoad = document.createElement('SCRIPT');
    dynaLoad.type = 'text/javascript';
    dynaLoad.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(dynaLoad);
}

setTimeout(afterScriptLoad, 2000);

function xmlEscape(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/'/g, "&apos;")
            .replace(/&/g, "&amp;");
}

function afterScriptLoad() {
    if (typeof jQuery == 'undefined') {
        alert('Waiting for the jQuery library to load from the Google CDN. Try again right now.');
    }

    deliciousBookmarks = $('DL DT');
    googleBookmarks = [];

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

        $(bookmarkForm).appendTo('body');
        $('#uploader').submit();
    }

    function convertBookmark(node) {
        anchor = $('A', node);
        googleBookmarks.push('<bookmark>');
        googleBookmarks.push('<url>', xmlEscape(anchor.attr('HREF')), '</url>');
        googleBookmarks.push('<title>', xmlEscape(anchor.text()), '</title>');
        googleBookmarks.push('<labels>', '<label>', xmlEscape(anchor.attr('TAGS')), '</label>', '</labels>');

        annotation = $(node).next('DD');
        if (annotation.length > 0) {
            googleBookmarks.push('<annotation>', xmlEscape(annotation.text()), '</annotation>');
        }
        googleBookmarks.push('</bookmark>');
    }

    i = 0;
	batchSize = 100;
	
    function batch() {
        working.innerText = "Converting " + i + " of " + deliciousBookmarks.length + " bookmarks..."
        deliciousBookmarks.slice(i, i + batchSize).each(function () {
            convertBookmark(this);
        });

        i += batchSize;
        if (i < deliciousBookmarks.length) {
            setTimeout(batch, 0);
        }
        else {
            postToGoogle();
        }
    }

    setTimeout(batch, 0);
}