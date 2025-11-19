import { ITask } from "@/types/tasks";
import Task from "./Task";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import createTodoQueryOptions from "../queryOptions/createTodoQueryOptions";
import { getAllTodos } from "@/api";

interface TodoListProps {
    tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = () => {
    const { data: todos = [], isPending } = useQuery(createTodoQueryOptions());

    if (isPending) return <div>Loading…</div>;
    return <div className="overflow-x-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>TASKS</TableHead>
                    <TableHead>DESCRIPTION</TableHead>
                    <TableHead>ACTIONS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {todos.map((t) => <Task key={t.id} task={t} />)}
            </TableBody>
        </Table>
    </div>;
};
export default TodoList;