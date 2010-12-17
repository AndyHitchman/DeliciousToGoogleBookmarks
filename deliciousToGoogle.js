dynaLoad = document.createElement('SCRIPT');
dynaLoad.type = 'text/javascript';
dynaLoad.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(dynaLoad);

working = document.createElement("div");
working.setAttribute('style', 'font-family: helvetica,arial,sans-serif;display: block;position: absolute;top: 5%;left: 5%;padding: 3ex 8ex 3ex 8ex;font-size: 24px;font-weight: bold;color: #333;text-shadow: 1px 1px 0 white;white-space: nowrap;border: 3px solid #D4D4D4;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;background: #F4F4F4;background: -webkit-gradient(linear,left top,left bottom,from(#F4F4F4),to(#ECECEC));background: -moz-linear-gradient(top,#F4F4F4,#ECECEC);border-top-left-radius: 3px 3px;border-top-right-radius: 3px 3px;border-bottom-right-radius: 3px 3px;border-bottom-left-radius: 3px 3px;');
working.innerText = "Working...";
document.getElementsByTagName('body')[0].appendChild(working);

setTimeout(afterScriptLoad, 2000);

function xmlEscape(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/'/g, "&apos;")
            .replace(/&/g, "&amp;");
}

function afterScriptLoad() {
    $(document).ready(function () {
        if (typeof jQuery == 'undefined') {
            alert('Could not load the jQuery library from the Google CDN. Try again now.');
            return;
        }
        bookmarks = [];
        $('DL DT').each(function (i) {
            anchor = $('A', this);
            bookmarks.push('<bookmark>');
            bookmarks.push('<url>', xmlEscape(anchor.attr('HREF')), '</url>');
            bookmarks.push('<title>', xmlEscape(anchor.text()), '</title>');
            bookmarks.push('<labels>', '<label>', xmlEscape(anchor.attr('TAGS')), '</label>', '</labels>');

            annotation = $(this).next('DD');
            if (annotation.length > 0) {
                bookmarks.push('<annotation>', xmlEscape(annotation.text()), '</annotation>');
            }
            bookmarks.push('</bookmark>');
        });
        bookmarkForm = [
            '<form id="uploader" action="https://www.google.com/bookmarks/mark?op=upload" method="post">',
            '<textarea id="data" rows="30" columns="60" name="<?xml version">',
            '"1.0" encoding="utf-8"?>',
            '<bookmarks>',
            bookmarks.join(''),
            '</bookmarks>',
            '</textarea>',
            '</form>'].join('');

        $(bookmarkForm).appendTo('body');
        $('#uploader').submit();
    });
}