import { IListOfWords } from './component';

class ListOfWordsDecorator implements IListOfWords
{
    private listOfWords: IListOfWords;

    public constructor(listOfWords: IListOfWords)
    {
        this.listOfWords = listOfWords;
    }

    public size()
    {
        return this.listOfWords.size();
    }

    public add(word: string)
    {
        this.listOfWords.add(word);
    }

    public get()
    {
        return this.listOfWords.get();
    }

    public remove(index: number)
    {
        return this.listOfWords.remove(index);
    }

    public clear()
    {
        this.listOfWords.clear();
    }
}

export class CapitalizeDecorator extends ListOfWordsDecorator
{
    public get = () =>
    {
        const capitalizedList = [];

        for (const word of super.get())
        {
            const lowerCaseWord = word.toLowerCase();
            const firstLetter = /[a-z]/.exec(lowerCaseWord);

            if (firstLetter)
               capitalizedList.push(lowerCaseWord.replace(firstLetter[0], firstLetter[0].toUpperCase()));
            else
                capitalizedList.push(word);
        }

        return capitalizedList;
    };
}

export class OnlyLettersFilterDecorator extends ListOfWordsDecorator
{
    public get = () =>
    {
        const filteredList = [];

        for (const word of super.get())
        {
            if (!/[^A-Za-z]+/.test(word))
                filteredList.push(word);
        }

        return filteredList;
    };
}

export class DisallowEmptyDecorator extends ListOfWordsDecorator
{
    public add = (word: string) =>
    {
        word && super.add(word);
    };
}

export class CheckBeforeRemoveDecorator extends ListOfWordsDecorator
{
    public remove = (index: number) =>
    {
        if (index >= super.size() || index < 0)
        {
            console.log('Cannot remove an item: index is out of range.');
            return '';
        }

        return super.remove(index);
    };
}

export class NotifyClearDecorator extends ListOfWordsDecorator
{
    public clear = () =>
    {
        if (super.size() === 0)
        {
            console.log('Nothing to clear: the list is empty');
            return;
        }

        super.clear();
        console.log('Cleared successfully');
    };
}

