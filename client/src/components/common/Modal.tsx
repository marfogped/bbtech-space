import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width: string;
  height: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children, width, height }) => {
  const [isVisible, setIsVisible] = useState(show);
  const [animation, setAnimation] = useState('slideIn');

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      document.body.classList.add("overflow-hidden")
      setAnimation('slideIn');
    } else if (!show && isVisible) {
      setAnimation('slideOut');
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.classList.remove("overflow-hidden")
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [show, isVisible]);

  if (!isVisible) return null;



  return (
    <div className="modal" onClick={onClose}>
      <div 
      className="modal-content" 
      onClick={e => e.stopPropagation()}
      style={{ width, height, animation: `${animation} .5s cubic-bezier(0.87, 0, 0.13, 1)` }}
      >
        <div className="h-full w-full overflow-y-auto">
          <header className='w-full fixed h-max flex justify-end p-8'>
            <X size={32} className='cursor-pointer' onClick={onClose} />
          </header>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;