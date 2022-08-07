import axios, { AxiosPromise } from "axios";

interface HasId {
    id?: number;
}
export class ApiHandler <T extends HasId> {
    constructor (private apiBaseUrl: string) {}

    fetch (id?: number):AxiosPromise {
        if (id){
            // show spacific record when id is given.
            return axios.get(`${this.apiBaseUrl}/id`)
        } else {
            // show all records otherwise.
            return axios.get(`${this.apiBaseUrl}`)
        }
    }
    save(data: T): AxiosPromise {
        const { id } = data;

        if (id) {
            // update existing data.
            return axios.put(this.apiBaseUrl, data);
        } else {
            // save new data.
            return axios.post(this.apiBaseUrl, data);
        }
    }
}