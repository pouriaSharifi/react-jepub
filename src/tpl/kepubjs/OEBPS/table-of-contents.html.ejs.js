export default ({
                    i18n,
                    pages
                })=>`
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${i18n.code}">

<head>
 <title>${i18n.toc}</title>
 <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
    <style type="text/css" class="kobostylehacks">div#book-inner { margin-top: 0; margin-bottom: 0;}</style>
</head>

<body>
    <div id="book-columns">
        <div id="book-inner">
            <div id="toc">
                <h1>${i18n.toc}</h1>
                <ul>
                ${pages.map((title, index) =>`
                     <li class="chaptertype-1">
                                <a href="page-${index}.html">
                                    <span class="toc-chapter-title">${title}</span>
                                </a>
                     </li>
                `)}
                </ul>
            </div>
        </div>
    </div>
</body>

</html>

`;
