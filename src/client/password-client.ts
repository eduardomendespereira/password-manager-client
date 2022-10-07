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
            baseURL: 'http://localhost:8080/api/passwords',
            headers: { "Content-Type": "application/json" },
        });
    }

    public async findById(id: number): Promise<any> {
        try {
            return (await this.axiosClient.get<User>(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByAll(pageRequest: PageRequest): Promise<PageResponse<Password>> {
        try {
            let requestPath = ''

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
            return (await this.axiosClient.post('/', password))
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async update(password: Password): Promise<void> {
        try {
            return (await this.axiosClient.put(`/${password.id}`, password)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async delete(password: Password): Promise<any> {
        try {
            return (await this.axiosClient.delete(`/${password.id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
}