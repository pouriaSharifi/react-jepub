
export default ({i18n, uuid, date, title, author, publisher, description, tags, cover, pages, notes, images}) => `

<?xml version="1.0" encoding="UTF-8" ?>
<package version="2.0" xmlns="http://www.idpf.org/2007/opf" unique-identifier="PrimaryID">

 <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
  <dc:title>${title}</dc:title>
  <dc:language>${i18n.code}</dc:language>
  <dc:identifier id="PrimaryID" opf:scheme="${uuid.scheme}">${uuid.id}</dc:identifier>
        <dc:date opf:event="publication">${date}</dc:date>
        ${description && `<dc:description>${description}</dc:description>`}

  <dc:creator opf:role="aut">${author}</dc:creator>
  <dc:publisher>${publisher}</dc:publisher>
      ${cover && `<meta name="cover" content="cover-image" />`}
      ${Array.isArray(tags) && tags.length &&  tags.map(tag=>`


       <dc:subject>$
{
    tag
}
</dc:subject>


`)}
 </metadata>

 <manifest>
 ${cover && `<item id="front-cover" href="OEBPS/front-cover.html" media-type="application/xhtml+xml"/>`}

  <item id="title-page" href="OEBPS/title-page.html" media-type="application/xhtml+xml" />
  <item id="notes" href="OEBPS/notes.html" media-type="application/xhtml+xml" />
  <item id="table-of-contents" href="OEBPS/table-of-contents.html" media-type="application/xhtml+xml" />
  ${pages.map((page, index) => `
   <item id="page-${index}" href="OEBPS/page-${index}.html" media-type="application/xhtml+xml" />
  `)}
       ${cover && `
            <item id="cover-image" href="${cover.path}" media-type="${cover.type}" properties="cover-image" />
        `}

  <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />
  ${Object.keys(images).map(name => `
              <item id="${name}" href="OEBPS/${images[name].path}" media-type="${images[name].type}" />
  `)}
 </manifest>

 <spine toc="ncx">
 ${cover && ` <itemref idref="front-cover" linear="no" />`}

  <itemref idref="title-page" linear="yes" />
  <itemref idref="table-of-contents" linear="yes" />
        ${pages.map((page, index) => `
                    <itemref idref="page-${index}" linear="yes" />
        `)}
        ${notes && `<itemref idref="notes" linear="yes"/>`}
 </spine>
 <guide>
  ${cover && `<reference type="cover" title="${i18n.cover}" href="OEBPS/front-cover.html" />`}
  <reference type="toc" title="<%= i18n.toc %>" href="OEBPS/table-of-contents.html" />
 </guide>
</package>
`;
