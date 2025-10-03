import { Chicle } from "next/font/google";

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean)=> boolean | void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({modalOpen, setModalOpen, children}) => {
    return <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
                {/* if there is a button in form, it will close the modal */}
                <label 
                    onClick={()=> setModalOpen(false)}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
                </label>
                {children}
        </div>
    </dialog>;
};

export default Modal;