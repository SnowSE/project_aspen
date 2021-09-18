export default class Token {
    readonly key:string;
    constructor(key: string) {
        this.key = key;
        console.log(JSON.parse(atob(key.split('.')[1])));
    }
} 