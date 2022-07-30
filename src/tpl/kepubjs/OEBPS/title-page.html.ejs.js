
export default ({i18n ,title ,author ,publisher ,description ,tags}) => `
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${i18n.code}">

<head>
 <title>${i18n.info}</title>
 <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
    <style type="text/css" class="kobostylehacks">div#book-inner { margin-top: 0; margin-bottom: 0;}</style>
</head>

<body>
    <div id="book-columns">
        <div id="book-inner">
            <div id="title-page">
                <h1 class="title">${title}</h1>
                <h2 class="subtitle"></h2>
                <h3 class="author">${author}</h3>
                <h4 class="publisher">${publisher}</h4>
            </div>
            ${Array.isArray(tags) && tags.length &&
            `
              <div class="part-title-wrap">
                <code>${tags.join('</code>, <code>')}</code>
                </div>
            `}
             ${description && `<div className="ugc">
                     ${description}
             </div>`}
        </div>
    </div>
</body>

</html>
`;
