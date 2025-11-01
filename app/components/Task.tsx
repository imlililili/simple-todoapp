"use client"

import { ITask } from "@/types/tasks";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { deleteTodo, editTodo } from "@/api";
import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import Form from "next/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ( { task } ) => {
  const router = useRouter()
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDeleted, setModalOpenDeleted] = useState<boolean>(false);

  const { register,
          handleSubmit,
          formState: { errors, isSubmitting },
        } = useForm<ITask>();

  const onSubmit = async (data: FieldValues) => {
        await editTodo({   
            id: task.id,
            text: data.task,
            description: data.description
        });
        setModalOpenEdit(false);
        router.refresh();
    }
  
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <h3 className="font-bold text-lg text-center">Edit task</h3>
                      <div className="modal-action">
                          <div className="flex flex-col gap-4 w-full">
                              <div className="flex flex-col gap-2 w-full">
                                  <Label htmlFor="task">Task</Label>
                                  <Input id="task" defaultValue={task.text} {...register("task", { required: "Task name is required" })} />
                                  {errors.task && <span className="text-red-500 text-sm">{errors.task.message}</span>}
                                  <Label htmlFor="description">Description</Label>
                                  <Textarea id="description" defaultValue={task.description} {...register("description")} />
                                  <Button type="submit" className="btn">Submit</Button>
                              </div>
                          </div>
          
                          
                      </div>
                  </form>
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