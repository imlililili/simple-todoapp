"use client"

import { ITask } from "@/types/tasks";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { deleteTodo, editTodo } from "@/api";
import { useRouter } from "next/navigation";

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
  return <tr key={task.id}>
            <td className="w-full">{task.text}</td>   
            <td className="flex gap-5">
              <FiEdit onClick={() => setModalOpenEdit(true)} cursor="pointer" className="text-blue-500" size={25}/>
              <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
                  <form onSubmit={handleSubmitEditTodo}>
                      <h3 className="font-bold text-lg">Edit task</h3>
                      <div className="modal-action">
                          <input 
                          value={taskToEdit}
                          onChange={(e)=> setTaskToEdit(e.target.value)}
                          type="text" 
                          placeholder="Type here" 
                          className="input input-bordered w-full"/>
                          <button type="submit" className="btn">Submit</button>
                      </div>
                  </form>
              </Modal>
              <FiTrash2 onClick={() => setModalOpenDeleted(true)} cursor="pointer" className="text-red-500"size={25}/>
              <Modal modalOpen={modalOpenDeleted} setModalOpen={setModalOpenDeleted}>
                <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
                <div className="modal-action">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                  >Yes</button>
                </div>
              </Modal>
            </td> 
        </tr>;
} 

export default Task;