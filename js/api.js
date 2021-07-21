const API_KEY = "81d01975c5994df387e9af3710e68f68";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;

const fetchAPI = url => {
    console.log(Response)
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log(err)
        })
};


