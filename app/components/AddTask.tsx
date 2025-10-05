"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEvent, FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Form from "next/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>("");

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await addTodo({
            id: uuidv4(),
            text: newTaskValue
        });
        setNewTaskValue("");
        setModalOpen(false);
        router.refresh();
    };
    return (
    <div>
        <Link href="/add-task"onNavigate={(e) => {
            // Only executes during SPA navigation
            console.log('Navigating...')
            // Optionally prevent navigation
            // e.preventDefault()
        }}>
            <Button variant="outline"> Add new task <AiOutlinePlus className="ml-2" size={18}/></Button>
        </Link>
    </div>
    );   
};

export default AddTask;