# jepub-react


Simple EPUB builder library, works in modern browsers.


## Installation

```bash
npm install --save react-jepub
```

 

 
```html


    import {jEpub} from "react-jepub"
    
    const jepub = new jEpub()
    // jepub.init({
    // do something
 
```

## Usage

```typescript
const jepub = new jEpub()
jepub.init({
    i18n: 'en', // Internationalization
    title: 'Book title',
    author: 'Book author',
    publisher: 'Book publisher',
    description: '<b>Book</b> description', // optional
    tags: [ 'epub', 'tag' ] // optional
})
```

- **i18n** only include the language codes defined in [`i18n.json`](https://github.com/lelinhtinh/jEpub/blob/master/src/i18n.json)
- **description**: HTML string.
- **tags**: Array.

### Set published date

```typescript
jepub.date(date: object)
```

- **date**: Date Object.

### Set identifier

```typescript
jepub.uuid(id: string | number)
```

- **id**: Unique id.

### Add cover

```typescript
jepub.cover(data: object)
```

- **data**: A Blob or an ArrayBuffer object from XMLHttpRequest.

### Add notes

```typescript
jepub.notes(content: string)
```

- **content**: HTML string.

### Add chapter `*`

```typescript
jepub.add(title: string, content: string | array, index?:number)
```

- **title**: Plain text.
- **content**:
  - `string`: HTML string.
  - `array`: Plain text for each item.
- **index**: Item index.

### Add image

```typescript
jepub.image(data: object, IMG_ID: string)
```

- **data**: A Blob or an ArrayBuffer object from XMLHttpRequest.
- **IMG_ID**: Unique id.

Place `<%= image[IMG_ID] %>` inside the chapter's content *(HTML string only)*, where you want to display it.

### Generate EPUB `*`

```typescript
jepub.generate(type = 'blob', onUpdate?: metadata => void)
```

- **type**: The type of EPUB to return. See [JSZip type option](https://stuk.github.io/jszip/documentation/api_jszip/generate_async.html#type-option).
- **onUpdate**: _(optional)_ Callback function. See [JSZip onUpdate callback](https://stuk.github.io/jszip/documentation/api_jszip/generate_async.html#onupdate-callback).

### Static methods `+`

#### Convert HTML to text

```typescript
jEpub.html2text(html: string, noBr = false)
```

- **html**: HTML string.
- **noBr**: Boolean. Add line break after Block-level elements.

## Development

```bash
npm start
```

Builds are concatenated and minified using [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/).

```bash
npm run build
```

 
