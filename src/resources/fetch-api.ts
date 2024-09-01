const baseUrl = 'https://flight-status-mock.core.travelopia.cloud';

export type ErrorResponse = {
    errorMessage: string;
};
const fetchData = (url: string) => {
    return fetch(url).then((response) => {
        if (response.ok) {
            return Promise.resolve(response.json());
        } else {
            return Promise.reject({errorMessage: 'API fetch fails'});
        }
    }).catch(() => {
        return Promise.reject({errorMessage: 'API fetch fails'});
    });
}

const fetchApis = {
    fetchFlightList: () => fetchData(`${baseUrl}/flights`),
    fetchFlightDetail: (id: string) => fetchData(`${baseUrl}/flights/${id}`),
};

export default fetchApis;
