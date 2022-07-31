
export declare class jEpub {

    init: ({
               i18n: string,
               dir: string,
               title: string,
               author: string,
               publisher: string,
               description: string, // optional
               tags: array // optional
           }) => void
    date: (date: object) => void
    uuid: (id: string | number) => void
    cover: (data: object) => void
    notes: (content: string) => void
    add: (title: string, content: string | array, index?: number) => void
    image: (data: object, IMG_ID: string) => void
    generate: (type: string = "blob", onUpdate?: (metadata) => void) => void
    html2text: (html: string, noBr = false) => void

}

