"use client";

import {Role} from "@/context/Role";

export interface Account {
    "id": number,
    "firstName": string,
    "name": string,
    "username": string,
    "email": string,
    "createdAt": Date,
    "updatedAt": Date,
    "roles": Role[],
    "credentialsNonExpired": boolean,
    "accountNonExpired": boolean,
    "accountNonLocked": boolean,
    "enabled": boolean
}