import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOption";
import AssignSelect from "../_components/AssignSelect";

interface Props {
    params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
    const session = await getServerSession(authOptions);
    const numericId = parseInt(params.id, 10);
    if (isNaN(numericId) || numericId.toString() !== params.id) notFound();

    const issue = await prisma.issue.findUnique({
        where: { id: numericId },
    });

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", md: "5" }} gap='5'>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {session && (
                <Box>
                    <Flex direction='column' gap='4'>
                        <AssignSelect />
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    );
}