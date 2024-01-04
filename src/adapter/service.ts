// adaptee interface
export interface IMathLib
{
    add: (a: number, b: number) => number;
    sub: (a: number, b: number) => number;
    mult: (a: number, b: number) => number;
    div: (a: number, b: number) => number;
    pow: (a: number, b: number) => number;
    infixToPostfix: (infixNotation: string) => string;
}

// adaptee
export class MathLib implements IMathLib
{
    private __notationConveter = new NotationConveter();

    public add = (a: number, b: number) => a + b;
    public sub = (a: number, b: number) => a - b;
    public mult = (a: number, b: number) => a * b;
    public div = (a: number, b: number) => a / b;
    public pow = (a: number, b: number) => Math.pow(a, b);
    public infixToPostfix = (infixNotation: string) => this.__notationConveter.infixToPostfix(infixNotation);
}

const __OPERATION_PRIORITIES__ = {
    '-': 0,
    '+': 0,
    '*': 1,
    '/': 1,
    '^': 2,
};

class NotationConveter
{
    private __output!: string[];
    private __operationStack!: string[];
    private __operationPriorities: { [key: string]: number } = __OPERATION_PRIORITIES__;

    public constructor()
    {
        this.reset();
    }

    public infixToPostfix = (infixNotation:string) =>
    {
        let errorCounter = 0;
        let prev = '(';
        let unaryOperator = false;

        this.reset();

        for (const current of infixNotation + ')')
        {
            if (current === '(')
            {
                if (prev === '(')
                {
                    this.__operationStack.push(prev);
                    prev = current;
                    continue;
                }

                if (this.__isOperator(prev) && unaryOperator)
                {
                    prev += '1';
                    unaryOperator = false;
                }

                if (isFinite(Number(prev)))
                {
                    this.__output.push(prev);
                    prev = '*';
                }

                if (prev === ')')
                    prev = '*';

                if (this.__isOperator(prev))
                {
                    this.__addOperator(prev);
                    prev = current;
                    continue;
                }

                errorCounter++;
                break;
            }

            if (current === ')')
            {
                if (isFinite(Number(prev)))
                {
                    this.__output.push(prev);
                    prev = current;
                }

                if (prev === ')')
                {
                    const isClosed = this.__closeParentheses();
                    if (isClosed)
                        continue;
                }

                errorCounter++;
                break;
            }

            if (this.__isOperator(current))
            {
                if (prev === '(')
                {
                    this.__operationStack.push(prev);
                    prev = current;
                    unaryOperator = true;
                    continue;
                }

                if (prev === ')')
                {
                    prev = current;
                    continue;
                }

                if (isFinite(Number(prev)))
                {
                    this.__output.push(prev);
                    prev = current;
                    continue;
                }

                if (this.__isOperator(prev) && this.__operationPriorities[prev] > 0 && this.__operationPriorities[current] === 0)
                {
                    this.__addOperator(prev);
                    unaryOperator = true;
                    prev = current;
                    continue;
                }

                errorCounter++;
                break;
            }

            if ('0123456789.'.includes(current))
            {
                if (prev === '(')
                {
                    this.__operationStack.push(prev);
                    prev = current;
                    continue;
                }

                if (prev === ')')
                    prev = ('*');

                if (this.__isOperator(prev) && !unaryOperator)
                {
                    this.__addOperator(prev);
                    prev = current;
                    continue;
                }

                prev += current;
                unaryOperator = false;
            }
        }

        if(this.__operationStack.length)
            errorCounter++;

        if (errorCounter)
        {
            console.log('Malformed expression');
            return '';
        }

        return this.__output.join();
    };

    private reset = () =>
    {
        this.__output = [];
        this.__operationStack = [];
    };

    private __closeParentheses = () =>
    {
        while (this.__operationStack.length && this.__operationStack[this.__operationStack.length - 1] != '(')
            this.__output.push(this.__operationStack.pop() as string);

        return this.__operationStack.pop() === '(';
    };

    private __addOperator = (operator: string) =>
    {
        const lastOperation = () => this.__operationStack[this.__operationStack.length - 1];
        const lastOperationPririty = () => this.__operationPriorities[lastOperation()];

        while (this.__operationStack.length && lastOperation() != '(' && lastOperationPririty() >= this.__operationPriorities[operator])
            this.__output.push(this.__operationStack.pop() as string);

        this.__operationStack.push(operator);
    };

    private __isOperator = (str: string) =>
    {
        const operations = Object.keys(this.__operationPriorities);
        return operations.includes(str);
    };
}
