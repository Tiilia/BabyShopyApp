export class Link {

    constructor(
        public title: string,
        public url?: string,
        public children?: Link[], 
        public isVisible?: boolean
        ) {
            this.title = title;
            this.url = url;
            this.isVisible = isVisible;
            if (children === undefined) children = [];
            this.children = children;
    }
}
