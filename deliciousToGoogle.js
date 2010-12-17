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
    bookmarks = [];
    $('DL DT').each(function () {
        anchor = $('A', this);
        bookmarks.push('<bookmark>');
        bookmarks.push('<url>', xmlEscape(anchor.attr('HREF')), '</url>');
        bookmarks.push('<title>', xmlEscape(anchor.text()), '</title>');
        bookmarks.push('<labels>', '<label>', anchor.attr('TAGS'), '</label>', '</labels>');

        annotation = $(this).next('DD');
        if (annotation.length > 0) {
            bookmarks.push('<annotation>', xmlEscape(annotation.text()), '</annotation>');
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