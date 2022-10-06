import { User } from "@/model/user.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axios, { AxiosInstance } from "axios";
import {Password} from "@/model/password.model";
// import axiosClient from "../plugins/axios";

export class PasswordClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api',
            headers: {'Content-type': 'application/json'}
        });
    }

    public async findById(id: number): Promise<any> {
        try {
            return (await this.axiosClient.get<User>(`/passwords/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByAll(pageRequest: PageRequest): Promise<PageResponse<Password>> {
        try {
            let requestPath = '/passwords'

            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined
                ? '' : pageRequest.sortField},${pageRequest.direction}`

            return (await this.axiosClient.get<PageResponse<Password>>(requestPath,
                {
                    params: {filtros: pageRequest.filter}
                }
            )).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async save(password: Password): Promise<void> {
        try {
            return (await this.axiosClient.post('/passwords', password))
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async update(password: Password): Promise<void> {
        try {
            return (await this.axiosClient.put(`passwords/${password.id}`, password)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async disable(password: Password): Promise<any> {
        try {
            return (await this.axiosClient.delete(`/passwords/disable/`, password)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
}