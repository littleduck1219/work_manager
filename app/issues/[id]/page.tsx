import React, { cache } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOption";
import IssueDetail from "./_components/IssueDetail";

interface Props {
    params: { id: string };
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

export default async function IssueDetailPage({ params }: Props) {
    const session = await getServerSession(authOptions);
    const numericId = parseInt(params.id, 10);
    if (isNaN(numericId) || numericId.toString() !== params.id) notFound();

    const issue = await fetchUser(parseInt(params.id));

    if (!issue) notFound();

    return <IssueDetail params={params} />;
}

export async function generateMetadata({ params }: Props) {
    const issue = await fetchUser(parseInt(params.id));
    return {
        title: `Work Manager - ${issue?.title}`,
        description: "Detail of Work: " + issue?.description,
    };
}
