// src/features/todos/useAddTodo.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "@/api";
import { ITask } from "@/types/tasks";

export function addTaskMutation() {
    const queryClient = useQueryClient();

    return useMutation({
    mutationKey: ["todo", "create"],
    mutationFn: (data: ITask) => addTodo(data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    });
}
