import React from 'react'
import { Button } from '@/components/ui/button';
import Link from "next/link";


export default function FormFooter({backHref, backMessage}: {backHref: string, backMessage:string}) {
    return (
        <>
        
            <div className="flex justify-center items-center">
                <Link href={backHref}>
                    <Button variant={"link"}>{backMessage}</Button>
                </Link>
            </div>
        </>
    )
}
