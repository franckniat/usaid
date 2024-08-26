import React, { Fragment } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbProps{
    path:{
        name:string,
        href:string
    }[];
}

export const CustomBreadcrumb = ({path}:BreadcrumbProps) => {
    return (
        path && (
            <Breadcrumb>
                <BreadcrumbList>
                    {path.slice(0, -1).map((item, index)=>(
                        <Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={item.href}>
                                    {item.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </Fragment>
                    ))}
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-primary">{path[path.length - 1].name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        )
    );
};
