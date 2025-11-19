"use client";

import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "@/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ITask } from "@/types/tasks";
import { addTaskMutation } from "./addTaskMutation";

export default function AddTaskPage() {

    const router = useRouter(); 
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<ITask>();
    
    const { mutate, isPending, error} = addTaskMutation();
    const onSubmit = (data: ITask) => {
        const newTask: ITask = {
            id: uuidv4(),
            text: data.task,
            description: data.description || "",
        };
        mutate(newTask, {
            onSuccess: () => {
                router.push("/");
            },
        });

    }
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-6">Add New Task</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-80">
                <Input {...register("task", {required: "Task title is required"})} type="text" placeholder="Task"  />
                {errors.task && <p className="text-red-500">{errors.task.message}</p>}
                <Input {...register("description")} type="text" placeholder="Description"  />
                <Button type="submit" variant="outline" disabled = {isPending}>
                    {isPending ? "Saving..." : "Save"}
                </Button>
            </form>

            <button
                onClick={() => router.push("/")}
                className="mt-4 text-blue-600 hover:underline"
            >
                ← Back to Home
            </button>
        </main>
    );
}
