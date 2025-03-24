import * as React from "react"
import Link from "next/link";

function Logo() {
    return (
        <Link href="/">
            <h1 className="absolute top-6 left-6 text-white text-2xl font-semibold italic">send.me</h1>
        </Link>
    )
}

export {Logo};