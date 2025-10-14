import { ITask } from "@/types/tasks";
import Task from "./Task";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TodoListProps {
    tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
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
                {tasks.map((task) => (
                    <Task key={task.id} task={task}/>
                ))}
            </TableBody>
        </Table>
    </div>;
};
export default TodoList;