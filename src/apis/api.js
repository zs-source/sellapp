import axios from 'axios';

// let IP = axios.create({
//     baseURL: 'http://127.0.0.1:3333'
// })
const IP = 'http://192.168.0.102:3333';
export function getSeller() {
    return axios.get(IP + '/api/seller')
}
export function getGoods() {
    return axios.get(IP + '/api/goods')
}
export function getRatings() {
    return axios.get(IP + '/api/ratings')
}