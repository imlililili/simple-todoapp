import { getAllTodos } from "@/api";
import { queryOptions } from "@tanstack/react-query";

export default function createTodoQueryOptions() {
    return queryOptions({
        queryKey: ['todos'],
        queryFn: getAllTodos,
    })
}