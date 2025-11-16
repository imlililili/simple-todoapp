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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ( { task } ) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDeleted, setModalOpenDeleted] = useState<boolean>(false);

  const { register,
          handleSubmit,
          formState: { errors },
        } = useForm<ITask>();

  const editMutation = useMutation({
  mutationKey: ["todo", "edit", task.id],
  mutationFn: (data: FormData) =>
    editTodo({ 
      id: task.id,
      text: data.task,
      description: data.description
    }),
  onMutate: async (data) => {
    await queryClient.cancelQueries({ queryKey: ["todos"] });
    const prev = queryClient.getQueryData<ITask[]>(["todos"]);
    queryClient.setQueryData<ITask[]>(["todos"], (old = []) =>
      old.map((t) => (t.id === task.id ? { ...t, text: data.task, description: data.description ?? "" } : t))
    );
    return { prev };
  },
  onError: (_e, _v, ctx) => {
    if (ctx?.prev) queryClient.setQueryData(["todos"], ctx.prev);
  },
  // cover prev dataa
  onSuccess: (updated) => {
    queryClient.setQueryData<ITask[]>(["todos"], (old = []) =>
      old.map((t) => (t.id === task.id ? { ...t, ...updated } : t))
    );
    setModalOpenEdit(false);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});


  const onSubmit = (data: ITask) => {
    editMutation.mutate(data);
  }
  
  const deleteMutation = useMutation({
    mutationKey: ["todo", "delete", task.id],
    mutationFn: (id: string) => deleteTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const prev = queryClient.getQueryData<ITask[]>(["todos"]);

      queryClient.setQueryData<ITask[]>(["todos"], (old = []) => old.filter((t) => t.id !== id));

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["todos"], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onSuccess: () => {
      setModalOpenDeleted(false);
    },
  });
  return <TableRow key={task.id}>
            <TableCell className="w-[30%] text-left">{task.text}</TableCell>
            <TableCell className="w-[50%] text-left">{task.description}</TableCell>   
            <TableCell className="flex gap-4">
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
                                  <Textarea id="description" defaultValue={task.description} {...register("description", {required: "Description is required"})} />
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
                    onClick={() =>  deleteMutation.mutate(task.id)}
              disabled={deleteMutation.isPending}
                  >Yes</Button>
                </div>
              </Modal>
            </TableCell>
  </TableRow>;
} 

export default Task;