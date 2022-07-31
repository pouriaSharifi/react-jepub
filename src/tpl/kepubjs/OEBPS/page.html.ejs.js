export default ({i18n,title,content,dir})=>`
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${i18n.code}">

<head>
 <title>${title}</title>
 <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
    <style type="text/css" class="kobostylehacks">div#book-inner { margin-top: 0; margin-bottom: 0;}</style>
</head>

<body  dir="${dir}">
    <div id="book-columns">
  <div id="book-inner">
   <div class="chapter type-1">
    <div class="chapter-title-wrap">
     <h2 class="chapter-title">${title}</h2>
    </div>
    <div class="ugc chapter-ugc">
      ${Array.isArray(content)?content.map(item=>`   <p class="indent">${item}</p>`):content}
    </div>
   </div>
  </div>
 </div>
</body>

</html>

`;
