import { User } from "@/model/user.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axios, { AxiosInstance } from "axios";
// import axiosClient from "../plugins/axios";

export class UserClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api',
            headers: { "Content-Type": "application/json" }
        });
    }

    public async findById(id: number): Promise<any> {
        try {
            return (await this.axiosClient.get<User>(`/users/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByUsername(username: String): Promise<any> {
        try {
            return (await this.axiosClient.get<User>(`/users/findUsername/${username}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByAll(pageRequest: PageRequest): Promise<PageResponse<User>> {
        try {
            let requestPath = '/users'

            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined
                ? '' : pageRequest.sortField},${pageRequest.direction}`

            return (await this.axiosClient.get<PageResponse<User>>(requestPath,
                {
                    params: {filtros: pageRequest.filter}
                }
            )).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async save(user: User): Promise<void> {
        try {
            return (await this.axiosClient.post('/users', user))
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async update(user: User): Promise<void> {
        try {
            return (await this.axiosClient.put(`/users/${user.id}`, user)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async delete(user: User): Promise<any> {
        try {
            return (await this.axiosClient.delete(`/users/${user.id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async login(user: User): Promise<any> {
        try {
            return (await this.axiosClient.post('/users/login', user))
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}