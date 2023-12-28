export interface IListOfWords
{
    size: () => number;
    add: (word: string) => void;
    get: () => string[];
    remove: (index: number) => string;
    clear: () => void;
}

export class ListOfWords implements IListOfWords
{
    private __list: string[] = [];
    public size = () => this.__list.length;
    public add = (word: string) => this.__list.push(word);
    public get = () => this.__list;
    public remove = (index: number) => this.__list.splice(index, 1)[0];
    public clear = () => this.__list = [];
}
