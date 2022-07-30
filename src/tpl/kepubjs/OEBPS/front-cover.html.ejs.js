export default ({cover,i18n})=>`
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${i18n.code}">

<head>
 <title><%= i18n.cover %></title>
 <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
    <style type="text/css" class="kobostylehacks">div#book-inner { margin-top: 0; margin-bottom: 0;}</style>
</head>

<body>
    <div id="book-columns">
  <div id="book-inner">
   <div id="cover-image">
    <span class="koboSpan" id="kobo.1.1">
     <img src="../${cover.path}" alt="${i18n.cover}" />
    </span>
   </div>
  </div>
 </div>
</body>

</html>

`;
