"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "@/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { ITask } from "@/types/tasks";

interface TaskProps {
    task: ITask
}

export default function AddTaskPage() {
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<ITask>();

    const router = useRouter();
    // const [newTaskValue, setNewTaskValue] = useState<string>("");

    // const handleSubmitNewTodo = async (e) => {
        
    //     e.preventDefault();
    //     if (!newTaskValue.trim()) { // Prevent adding empty tasks
    //         alert("Please enter a task title!");
    //         return;
    //     }
    //     await addTodo({
    //         id: uuidv4(),
    //         text: newTaskValue
    //     });
    //     setNewTaskValue("");
    //     router.push("/");
    // };


    const onSubmit = async (data: FieldValues) => {
        await addTodo({   
            id: uuidv4(),
            text: data.task,
            description: data.description
        });
        router.push("/");
    }
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-6">Add New Task</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-80">
                <Input {...register("task", {required: "Task title is required"})} type="text" placeholder="Task"  />
                <Input {...register("description")} type="text" placeholder="Description"  />
                <Button type="submit" variant="outline">
                    Save
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
