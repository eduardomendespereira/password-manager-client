import { AbstractEntity } from "./abstract-entity.model"

export class User extends AbstractEntity {
    username! : string
    url! : string
    password! : string

    constructor() {
        super()
        this.inactive = false
    }
}