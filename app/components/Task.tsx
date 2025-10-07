"use client"

import { ITask } from "@/types/tasks";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { deleteTodo, editTodo } from "@/api";
import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Form from "next/form";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ( { task } ) => {
  const router = useRouter()
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDeleted, setModalOpenDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text: taskToEdit
        });
        setModalOpenEdit(false);
        router.refresh();
    };
  
  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setModalOpenDeleted(false);
    router.refresh();
  }
  return <TableRow key={task.id}>
            <TableCell className="w-full">{task.text}</TableCell>   
            <TableCell className="flex gap-5">
              <FiEdit onClick={() => setModalOpenEdit(true)} cursor="pointer" className="text-blue-500" size={25}/>
              <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
                  <Form onSubmit={handleSubmitEditTodo}>
                      <h3 className="font-bold text-lg">Edit task</h3>
                      <div className="modal-action">
                          <Input 
                          value={taskToEdit}
                          onChange={(e)=> setTaskToEdit(e.target.value)}
                          type="text" 
                          placeholder="Type here"/>
                          <Button type="submit" className="btn">Submit</Button>
                      </div>
                  </Form>
              </Modal>
              <FiTrash2 onClick={() => setModalOpenDeleted(true)} cursor="pointer" className="text-red-500"size={25}/>
              <Modal modalOpen={modalOpenDeleted} setModalOpen={setModalOpenDeleted}>
                <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
                <div className="modal-action">
                  <Button
                    onClick={() => handleDeleteTask(task.id)}
                  >Yes</Button>
                </div>
              </Modal>
            </TableCell>
  </TableRow>;
} 

export default Task;