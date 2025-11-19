// src/features/todos/useDeleteTodo.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "@/api";

export function deleteMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["todo", "delete"],
        mutationFn: (id: string) => deleteTodo(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    });
}
