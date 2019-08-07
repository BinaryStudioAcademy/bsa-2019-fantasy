import callWebApi from 'src/helpers/webApiHelper';

export const getTestResult = async () => {
    const response = await callWebApi({
        endpoint: '/api/test',
        type: 'GET'
    });
    return response.json();
};