export class CalculatorModule
{
    private __memory: Memory;
    private __mathLib: MathLib;
    private __operations: { [key: string]: (a: number, b: number) => number };

    public constructor(memory: Memory, mathLib: MathLib)
    {
        this.__memory = memory;
        this.__mathLib = mathLib;
        this.__operations = {
            '+': this.__mathLib.add,
            '-': this.__mathLib.sub,
            '*': this.__mathLib.mult,
            '/': this.__mathLib.div,
            '^': this.__mathLib.pow,
        };
    }

    public run()
    {
        const postfixNotation = this.__memory.getExpresion().split(',');
        let index = 0;
        while (index < postfixNotation.length)
        {
            const current = postfixNotation[index];
            if (Object.keys(this.__operations).includes(current))
            {
                const b = this.__memory.readRAM();
                const a = this.__memory.readRAM();

                if (!a || !b)
                    throw new Error('Malformed expression: failed to calculate');

                this.__memory.writeRAM(String(this.__operations[current](+a, +b)));
            }
            else
            {
                this.__memory.writeRAM(current);
            }

            index++;
        }

        const result = this.__memory.readRAM();
        this.__memory.reset();
        this.__memory.setToDisplay(result);
    }
}

export class Memory
{
    private __ram!: string[];
    private __toDisplay!: string;
    private __expression!: string;

    public constructor()
    {
        this.reset();
    }

    public reset()
    {
        this.__ram = [];
        this.__toDisplay = '';
        this.__expression = '';
    }

    public setToDisplay(input: string)
    {
        this.__toDisplay += input;
    }

    public getToDisplay()
    {
        return this.__toDisplay;
    }

    public writeRAM(value: string)
    {
        this.__ram.push(value);
    }

    public readRAM()
    {
        const item = this.__ram.pop();
        return item ? item : '';
    }

    public setExpresion(postfixNotation: string)
    {
        this.__expression = postfixNotation;
    }

    public getExpresion()
    {
        return this.__expression;
    }
}

export class MathLib
{
    private __decimals = 8;

    public config(decimals: number)
    {
        this.__decimals = decimals;
    }

    public add = (a: number, b: number) => Number((a + b).toFixed(this.__decimals));
    public sub = (a: number, b: number) => Number((a - b).toFixed(this.__decimals));
    public mult = (a: number, b: number) => Number((a * b).toFixed(this.__decimals));
    public div = (a: number, b: number) => Number((a / b).toFixed(this.__decimals));
    public pow = (a: number, b: number) => Number(Math.pow(a, b).toFixed(this.__decimals));
}

const __OPERATION_PRIORITIES__ = {
    '-': 0,
    '+': 0,
    '*': 1,
    '/': 1,
    '^': 2,
};

export class NotationConverter
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
