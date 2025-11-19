// src/features/todos/useEditTodo.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTodo } from "@/api";
import { ITask } from "@/types/tasks";

export default function editMutation(todo: Partial<ITask> & { id: string }) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["todo", "edit"],
        mutationFn: (vars: EditVars) => editTodo(vars),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    });
}
