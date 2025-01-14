'use strict';

import * as utils from './utils';
import imageType from 'image-type';

import language from './i18n.json';

import container from './tpl/kepubjs/META-INF/container.xml';
import cover from './tpl/kepubjs/OEBPS/front-cover.html.ejs';
import notes from './tpl/kepubjs/OEBPS/notes.html.ejs';
import page from './tpl/kepubjs/OEBPS/page.html.ejs';
import tocInBook from './tpl/kepubjs/OEBPS/table-of-contents.html.ejs';
import info from './tpl/kepubjs/OEBPS/title-page.html.ejs';
import bookConfig from './tpl/kepubjs/book.opf.ejs';
import mime from './tpl/kepubjs/mimetype';
import toc from './tpl/kepubjs/toc.ncx.ejs';
import JSZip from 'jszip';

export default class jEpub {
    constructor() {
        this._I18n = {};
        this._Info = {};
        this._Uuid = {};
        this._Date = null;
        this._Cover = null;

        this._Pages = [];
        this._Images = [];

        this._Zip = {};
    }

    init(details) {
        if (details instanceof JSZip) {
            this._Zip = details;
            return this;
        }

        this._Info = Object.assign({}, {
            i18n: 'en',
            dir: 'ltr',
            title: 'undefined',
            author: 'undefined',
            publisher: 'undefined',
            description: '',
            tags: []
        }, details);

        this._Uuid = {
            scheme: 'uuid',
            id: utils.uuidv4()
        };

        this._Date = utils.getISODate();

        if (!language[this._Info.i18n]) throw `Unknown Language: ${this._Info.i18n}`;
        this._I18n = language[this._Info.i18n];

        this._Zip = new JSZip();
        this._Zip.file('mimetype', mime);
        this._Zip.file('META-INF/container.xml', container);
        this._Zip.file('OEBPS/title-page.html', info( {
            i18n: this._I18n,
            title: this._Info.title,
            author: this._Info.author,
            publisher: this._Info.publisher,
            description: utils.parseDOM(this._Info.description),
            tags: this._Info.tags,
            dir: this._Info.dir
        }));

        return this;
    }

    static html2text(html, noBr = false) {
        return utils.html2text(html, noBr);
    }

    date(date) {
        if (date instanceof Date) {
            this._Date = utils.getISODate(date);
            return this;
        } else {
            throw 'Date object is not valid';
        }
    }

    uuid(id) {
        if (utils.isEmpty(id)) {
            throw 'UUID value is empty';
        } else {
            let scheme = 'uuid';
            if (utils.validateUrl(id))
                scheme = 'URI';
            this._Uuid = {
                scheme: scheme,
                id: id
            };
            return this;
        }
    }

    cover(data) {
        let ext, mime;
        if (data instanceof Blob) {
            mime = data.type;
            ext = utils.mime2ext(mime);
        } else if (data instanceof ArrayBuffer) {
            ext = imageType(new Uint8Array(data));
            if (ext) {
                mime = ext.mime;
                ext = utils.mime2ext(mime);
            }
        } else {
            throw 'Cover data is not valid';
        }
        if (!ext) throw 'Cover data is not allowed';

        this._Cover = {
            type: mime,
            path: `OEBPS/cover-image.${ext}`
        };
        this._Zip.file(this._Cover.path, data);
        this._Zip.file('OEBPS/front-cover.html',  cover( {
            i18n: this._I18n,
            cover: this._Cover,
            dir: this._Info.dir
        }));
        return this;
    }

    image(data, name) {
        let ext, mime;
        if (data instanceof Blob) {
            mime = data.type;
            ext = utils.mime2ext(mime);
        } else if (data instanceof ArrayBuffer) {
            ext = imageType(new Uint8Array(data));
            mime = ext.mime;
            if (ext) ext = utils.mime2ext(mime);
        } else {
            throw 'Image data is not valid';
        }
        if (!ext) throw 'Image data is not allowed';

        const filePath = `assets/${name}.${ext}`;
        this._Images[name] = {
            type: mime,
            path: filePath
        };
        this._Zip.file(`OEBPS/${filePath}`, data);
        return this;
    }

    notes(content) {
        if (utils.isEmpty(content)) {
            throw 'Notes is empty';
        } else {
            this._Zip.file('OEBPS/notes.html',  notes({
                i18n: this._I18n,
                notes: utils.parseDOM(content),
                dir: this._Info.dir
            }));
            return this;
        }
    }

    add(title, content, index = this._Pages.length) {
        if (utils.isEmpty(title)) {
            throw 'Title is empty';
        } else if (utils.isEmpty(content)) {
            throw `Content of ${title} is empty`;
        } else {
            if (!Array.isArray(content)) {
                // const template = ejs.compile(content, {
                //     client: true
                // });
                // content = template({
                //     image: this._Images
                // }, data => {
                //     return `<img src="${(data ? data.path: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=')}" alt=""></img>`;
                // });
                content = utils.parseDOM(content);
            }
            this._Zip.file(`OEBPS/page-${index}.html`, page({
                i18n: this._I18n,
                title: title,
                content: content,
                dir: this._Info.dir

            }));
            this._Pages[index] = title;
            return this;
        }
    }

    generate(type = 'blob', onUpdate) {
        if (!JSZip.support[type]) throw `This browser does not support ${type}`;

        let notes = this._Zip.file('OEBPS/notes.html');
        notes = !notes ? false : true;

        this._Zip.file('book.opf',  bookConfig({
            i18n: this._I18n,
            uuid: this._Uuid,
            date: this._Date,
            title: this._Info.title,
            author: this._Info.author,
            publisher: this._Info.publisher,
            description: utils.html2text(this._Info.description, true),
            tags: this._Info.tags,
            cover: this._Cover,
            pages: this._Pages,
            notes: notes,
            images: this._Images
        }));

        this._Zip.file('OEBPS/table-of-contents.html', tocInBook({
            i18n: this._I18n,
            pages: this._Pages,
            dir: this._Info.dir
        }));

        this._Zip.file('toc.ncx', toc({
            i18n: this._I18n,
            uuid: this._Uuid,
            title: this._Info.title,
            author: this._Info.author,
            pages: this._Pages,
            notes: notes
        }));

        return this._Zip.generateAsync({
            type: type,
            mimeType: mime,
            compression: 'DEFLATE',
            compressionOptions: {
                level: 9
            }
        }, onUpdate);
    }
}
