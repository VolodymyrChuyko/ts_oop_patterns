import { IMathModule } from './client';    // target interface
import { IMathLib } from './service';      // adaptee interface

// adapter
export class MathModuleAdapter implements IMathModule
{
    private __mathLib: IMathLib;

    public constructor(mathLib: IMathLib)
    {
        this.__mathLib = mathLib;
    }

    public calculate = (a: string, b: string, operator: string) =>
    {
        const numA = Number(a);
        const numB = Number(b);

        switch (operator)
        {
            case '+': return String(this.__mathLib.add(numA, numB));
            case '-': return String(this.__mathLib.sub(numA, numB));
            case '*': return String(this.__mathLib.mult(numA, numB));
            case '/': return String(this.__mathLib.div(numA, numB));
            case '^': return String(this.__mathLib.pow(numA, numB));
            default: throw new Error('Unknow operator');
        }
    };

    public convert = (infixNotation: string) =>
    {
        return this.__mathLib.infixToPostfix(infixNotation).split(',');
    };
}
