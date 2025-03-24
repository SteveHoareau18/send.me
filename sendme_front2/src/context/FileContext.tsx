"use client";

import {Account} from "@/context/Account";

export interface FileContext {
    "id": number,
    "sender": Account,
    "uploadedAt": Date,
    "expiresAt": Date,
    "filePath": string,
    "isPrivate": boolean,
    "name": string
}