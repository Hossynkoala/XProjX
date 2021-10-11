import axios from "axios";

let baseURL = 'http://localhost:4000';
let pathURL = {
    recieveFeeds: '/feeds',
    RecieveRSSs:'/rsss'
}


 async function recieveFeeds() {

    return (await axios.get((baseURL + pathURL.recieveFeeds))).data;
};


async function RecieveRSSs() {

    return (await axios.get((baseURL + pathURL.RecieveRSSs))).data;
};

export {
   recieveFeeds,
    RecieveRSSs

}