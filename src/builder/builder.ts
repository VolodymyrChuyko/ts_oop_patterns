import path from 'path';
import { writeFileSync } from 'fs';
import { manualParts } from './manual-parts';


// Product 1: API client
class UsersAPIClient
{
    public list: (page: number) => Promise<unknown>;
    public get: (id: number) => Promise<unknown>;
    public create: (user: unknown) => Promise<unknown>;
    public update: (id: number, userData: unknown) => Promise<unknown>;
    public replace: (id: number, user: unknown) => Promise<unknown>;
    public delete: (id: unknown) => Promise<unknown>;

    public constructor()
    {
        const defaultMethod = () => Promise.reject('Method not avaliable');
        this.list = defaultMethod;
        this.get = defaultMethod;
        this.create = defaultMethod;
        this.update = defaultMethod;
        this.replace = defaultMethod;
        this.delete = defaultMethod;
    }
}

// Product 2: API client manual
type ManualPart = { [key: string]: string };
class UsersAPIClientManual
{
    private __parts: ManualPart[] = [];

    public addPart = (part: ManualPart) =>
    {
        this.__parts.push(part);
    };

    public listParts = () =>
    {
        return this.__parts.map(part => Object.keys(part)[0]).join(', ');
    };

    public saveToFile = (filename: string) =>
    {
        const content = this.__parts.reduce((content: { 'references': string[]; 'texts': string[] }, part) =>
            {
                const [partName, partText] = Object.entries(part)[0];
                content.references.push(`- [${partName}](#${partName})`);
                content.texts.push(partText);
                return content;
            }, { 'references': [], 'texts': [] });
        const manualText = '# User API client manual\n\n'
            + '**Available methods:**\n'
            + content.references.join('\n')
            + '\n'
            + content.texts.join('\n');

        writeFileSync(path.resolve(`${filename}.md`), manualText, 'utf8');
    };
}

// Builder interface
export interface IUsersAPIClientBuilder
{
    addListMethod: () => void;
    addGetMethod: () => void;
    addCreateMethod: () => void;
    addUpdateMethod: () => void;
    addReplaceMethod: () => void;
    addDeleteMethod: () => void;
}

// Concrete builder 1: API client builder
export class UsersAPIClientBuilder implements IUsersAPIClientBuilder
{
    private __API_URL = 'https://reqres.in/api/users';
    private __usersAPIClient!: UsersAPIClient;

    public constructor()
    {
        this.reset();
    }

    public reset()
    {
        this.__usersAPIClient = new UsersAPIClient();
    }

    public addListMethod()
    {
        this.__usersAPIClient.list = async (page) =>
        {
            const response = await fetch(`${this.__API_URL}?page=${page}`, { method : 'GET' });
            const body: unknown = await response.json();
            return { status: response.status, body };
        };
    }

    public addGetMethod()
    {
        this.__usersAPIClient.get = async (id) =>
        {
            const response = await fetch(`${this.__API_URL}/${id}`, { method : 'GET' });
            const body: unknown = await response.json();
            return { status: response.status, body };
        };
    }

    public addCreateMethod()
    {
        this.__usersAPIClient.create = async (user) =>
        {
            const response = await fetch(this.__API_URL, { method : 'POST', body: JSON.stringify(user) });
            const body: unknown = await response.json();
            return { status: response.status, body };
        };
    }

    public addUpdateMethod()
    {
        this.__usersAPIClient.update = async (id, userData) =>
        {
            const response = await fetch(`${this.__API_URL}/${id}`, { method : 'PATCH', body: JSON.stringify(userData) });
            const body: unknown = await response.json();
            return { status: response.status, body };
        };
    }

    public addReplaceMethod()
    {
        this.__usersAPIClient.replace = async (id, user) =>
        {
            const response = await fetch(`${this.__API_URL}/${id}`, { method : 'PUT', body: JSON.stringify(user) });
            console.log(response);
            const body: unknown = await response.json();
            return { status: response.status, body };
        };
    }

    public addDeleteMethod()
    {
        this.__usersAPIClient.delete = async (id) =>
        {
            const response = await fetch(`${this.__API_URL}/${id}`, { method : 'DELETE' });
            return { status: response.status };
        };
    }

    public build()
    {
        const userAPIClient = this.__usersAPIClient;
        this.reset();

        return userAPIClient;
    }
}

// Concrete builder 2: API client manual builder
export class UsersAPIClientManualBuilder implements IUsersAPIClientBuilder
{
    private __usersAPIClientManual!: UsersAPIClientManual;

    public constructor()
    {
        this.reset();
    }

    public reset()
    {
        this.__usersAPIClientManual = new UsersAPIClientManual();
    }

    public addListMethod()
    {
        this.__usersAPIClientManual.addPart({ 'list': manualParts.list });
    }

    public addGetMethod()
    {
        this.__usersAPIClientManual.addPart({ 'get': manualParts.get });
    }

    public addCreateMethod()
    {
        this.__usersAPIClientManual.addPart({ 'create': manualParts.create });
    }

    public addUpdateMethod()
    {
        this.__usersAPIClientManual.addPart({ 'update': manualParts.update });
    }

    public addReplaceMethod()
    {
        this.__usersAPIClientManual.addPart({ 'replace': manualParts.replace });
    }

    public addDeleteMethod()
    {
        this.__usersAPIClientManual.addPart({ 'delete': manualParts.delete });
    }

    public build()
    {
        const userAPIClientManual = this.__usersAPIClientManual;
        this.reset();

        return userAPIClientManual;
    }
}
