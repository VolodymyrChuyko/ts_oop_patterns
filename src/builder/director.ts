import { IUsersAPIClientBuilder } from './builder';

export class UsersAPIClientDirector
{
    private __builder!: IUsersAPIClientBuilder;

    public setBilder = (builder: IUsersAPIClientBuilder) =>
    {
        this.__builder = builder;
    };

    public buildReadOnlyAPIClient = () =>
    {
        this.__builder.addListMethod();
        this.__builder.addGetMethod();
    };

    public buildFullFeaturedAPIClient = () =>
    {
        this.__builder.addListMethod();
        this.__builder.addGetMethod();
        this.__builder.addCreateMethod();
        this.__builder.addUpdateMethod();
        this.__builder.addReplaceMethod();
        this.__builder.addDeleteMethod();
    };
}
