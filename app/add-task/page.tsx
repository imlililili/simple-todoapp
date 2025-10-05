"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "@/api";

export default function AddTaskPage() {
    const router = useRouter();
    const [newTaskValue, setNewTaskValue] = useState<string>("");

    const handleSubmitNewTodo = async (e) => {
        
        e.preventDefault();
        if (!newTaskValue.trim()) { // Prevent adding empty tasks
            alert("Please enter a task title!");
            return;
        }
        await addTodo({
            id: uuidv4(),
            text: newTaskValue
        });
        setNewTaskValue("");
        router.refresh();
        router.push("/");
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-6">Add New Task</h1>

            <form onSubmit={handleSubmitNewTodo} className="flex flex-col gap-4 w-80">
                <input
                    type="text"
                    placeholder="Task title"
                    value={newTaskValue}
                    onChange={(e)=> setNewTaskValue(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                <button
                    type="submit"
                    className="btn"
                >
                    Save
                </button>
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
