export class Singleton
{
    private static __instance: Singleton | null = null;
    private __value: number | null = null;
    private constructor() {}
    public get value() {return this.__value}
    public set value(value) {this.__value = value}
    public static getInstance = () => Singleton.__instance ? Singleton.__instance : Singleton.__instance = new Singleton();
    public composeMessage = () => this.__value ? `The singleton value is "${this.__value}"` : 'The singleton value was not set';
}
