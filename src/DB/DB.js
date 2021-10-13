import axios from "axios";

let baseURL = 'http://localhost:4000';
let pathURL = {
    recieveFeeds: '/feeds',
    RecieveRSSs: '/rsss',
    updateRSSs: '/rsss/updatersss'
}


function dataToStringfy(data) {
    return JSON.stringify({"RSS": data});
}


function Configy(method, path, data) {

    path = baseURL + path;

    const config = {
        method: method,
        url: path,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    return config;

}


async function recieveFeeds() {

    return (await axios.get((baseURL + pathURL.recieveFeeds))).data;
};


async function RecieveRSSs() {

    return (await axios.get((baseURL + pathURL.RecieveRSSs))).data;
};

async function updateRSSs(RSS) {
  return   axios(Configy("post", pathURL.updateRSSs, dataToStringfy(RSS)));
}


export {
    recieveFeeds,
    RecieveRSSs,
    updateRSSs
}