import { UsersAPIClientDirector } from './director';
import { UsersAPIClientBuilder, UsersAPIClientManualBuilder } from './builder';

export function clientCode(isFullFeaturedAPI = false)
{
    const clientBuilder = new UsersAPIClientBuilder();
    const manualBuilder = new UsersAPIClientManualBuilder();
    const director = new UsersAPIClientDirector();
    const buildProcess = isFullFeaturedAPI ? director.buildFullFeaturedAPIClient : director.buildReadOnlyAPIClient;

    // build API client
    director.setBilder(clientBuilder);
    buildProcess();

    // build API client manual
    director.setBilder(manualBuilder);
    buildProcess();

    const APIClient = clientBuilder.build();
    const APIClientManual = manualBuilder.build();

    // do something with API client manual
    console.log('API Client Methods: ', APIClientManual.listParts());
    APIClientManual.saveToFile('API-client-manual');

    // do something with API client
    APIClient.get(2)
        .then(res => console.log('APIClient.get response:\n', res))
        .catch((e) => console.log('Error APIClient.get: ', e));
    APIClient.delete(2)
        .then(res => console.log('APIClient.delete response:\n', res))
        .catch((e) => console.log('Error APIClient.delete: ', e));
}
