import axios from "axios";

let baseURL = 'http://localhost:4000';
let pathURL = {
    recieveFeeds: '/feeds',
    RecieveRSSs: '/rsss',
    updateRSSs: '/rsss/updatersss'
}


async function recieveFeeds() {

    return (await axios.get((baseURL + pathURL.recieveFeeds))).data;
};


async function RecieveRSSs() {

    return (await axios.get((baseURL + pathURL.RecieveRSSs))).data;
};

async function updateRSSs(RSS) {

    RSS=JSON.stringify({RSS:RSS})
axios.post('http://localhost:4000/rsss/updatersss',RSS).then(result=>{});

    return ('')
}

export {
    recieveFeeds,
    RecieveRSSs,
    updateRSSs
}