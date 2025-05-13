import React, { useEffect } from 'react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    'aria-labelledby'?: string;
}

function Modal({ open, onClose, children, 'aria-labelledby': ariaLabelledBy }: ModalProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    if (!open) return null;

    return (
        <div 
            className="modal-overlay"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledBy}
        >
            <div 
                className="modal-content"
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

export default Modal; 