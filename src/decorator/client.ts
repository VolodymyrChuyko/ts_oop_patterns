import { IListOfWords, ListOfWords } from './component';
import
{
    CapitalizeDecorator,
    OnlyLettersFilterDecorator,
    DisallowEmptyDecorator,
    CheckBeforeRemoveDecorator,
    NotifyClearDecorator,
} from './decorator';

const __WORDS__: string[] = ['Building', 'BUS', 'caRRot', '~river~', '', 'summer trip', 'hello!', 'eighty-three'];

export function app()
{
    let list: IListOfWords = new ListOfWords();
    list = new CapitalizeDecorator(list);
    list = new OnlyLettersFilterDecorator(list);
    list = new DisallowEmptyDecorator(list);
    list = new CheckBeforeRemoveDecorator(list);
    list = new NotifyClearDecorator(list);

    for (const word of __WORDS__)
        list.add(word);

    console.log('List: ', list.get());
    console.log('Removed item: ', list.remove(10));
    list.clear();
    list.clear();
}
