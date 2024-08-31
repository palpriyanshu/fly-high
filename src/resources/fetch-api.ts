
const fetchApis = {
    fetchFlightList: () => fetch('/flights').then((flightList) => flightList.json()),
    fetchFlightDetail: (id: string) => fetch(`/flight/${id}`).then((details) => details.json()),
};

export default fetchApis;
