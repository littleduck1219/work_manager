import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, "too short").max(255),
    description: z.string().min(1).max(65535),
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, "too short").max(255).optional(),
    description: z.string().min(1).max(65535).optional(),
    assignedToUserId: z
        .string()
        .min(1, "Assigned to user is required")
        .max(255)
        .optional()
        .nullable(),
});

export const issueCommentSchema = z.object({
    comment: z.string().min(1).max(65535),
});
