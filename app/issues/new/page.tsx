"use client";

import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
    title: string;
    description: string;
}

export default function NewIssuePage() {
    const { register, control, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();

    return (
        <form
            className='max-w-xl space-y-3'
            onSubmit={handleSubmit(async (data) => {
                await axios.post("/api/issues", data);
                router.push("/");
            })}>
            <TextField.Root>
                <TextField.Input placeholder='Title' {...register("title")} />
            </TextField.Root>
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
            />
            <Button>Create New Issue</Button>
        </form>
    );
}