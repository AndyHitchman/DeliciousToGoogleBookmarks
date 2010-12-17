dynaLoad = document.createElement('SCRIPT');
dynaLoad.type = 'text/javascript';
dynaLoad.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(dynaLoad);

setTimeout(afterScriptLoad, 2000);

function xmlEscape(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
}

function afterScriptLoad() {
    if (typeof jQuery == 'undefined') {
        alert('Could not load the jQuery library from the Google CDN. Try again now.');
        return;
    }
    $('<div style="font-family: helvetica,arial,sans-serif;display: block;position: static;top: 10%;left: 10%;padding: 10ex;font-size: 24px;font-weight: bold;color: #333;text-shadow: 1px 1px 0 white;white-space: nowrap;cursor: pointer;border: 1px solid #D4D4D4;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;background: #F4F4F4;filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#F4F4F4',endColorstr='#ECECEC');background: -webkit-gradient(linear,left top,left bottom,from(#F4F4F4),to(#ECECEC));background: -moz-linear-gradient(top,#F4F4F4,#ECECEC);border-top-left-radius: 3px 3px;border-top-right-radius: 3px 3px;border-bottom-right-radius: 3px 3px;border-bottom-left-radius: 3px 3px;">Working</div>').appendTo('body');
    bookmarks = [];
    $('DL DT').each(function () {
        anchor = $('A', this);
        bookmarks.push('<bookmark>');
        bookmarks.push('<url>', encodeURI(anchor.attr('HREF')), '</url>');
        bookmarks.push('<title>', escape(anchor.text()), '</title>');
        bookmarks.push('<labels>', '<label>', escape(anchor.attr('TAGS')), '</label>', '</labels>');

        annotation = $(this).next('DD');
        if (annotation.length > 0) {
            bookmarks.push('<annotation>', escape(annotation.text()), '</annotation>');
        }
        bookmarks.push('</bookmark>');
    });
    bookmarkForm = [
        '<form id="uploader" action="https://www.google.com/bookmarks/mark?op=upload" method="post">',
        '<textarea id="data" name="<?xml version">',
        '"1.0" encoding="utf-8"?>',
        '<bookmarks>', 
        bookmarks.join(''),
        '</bookmarks>',
        '</textarea>',
        //'<input type="SUBMIT" value="Submit to Google Bookmarks"/>',
        '</form>'].join('');
        
    alert(bookmarkForm);

    $(bookmarkForm).appendTo('body');
    $('#uploader').submit();
}