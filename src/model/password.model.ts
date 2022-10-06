import { AbstractEntity } from "./abstract-entity.model"
import {User} from "@/model/user.model";

export class Password extends AbstractEntity {
    description! : string
    url! : string
    password! : string
    user! : User

    constructor() {
        super()
        this.inactive = false
    }
}