import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatButton from './ChatButton';
import ChatBox from './ChatBox';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`fixed z-9999 flex flex-col items-end gap-4 
        ${isOpen 
          ? 'inset-0 md:inset-auto md:bottom-8 md:right-8' 
          : 'bottom-8 right-8'
        }`}
    >
      <AnimatePresence>
        {isOpen && <ChatBox onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

      {/* Hide the floating trigger button completely on smaller screens when the chat box is open */}
      {!isOpen && <ChatButton onClick={() => setIsOpen(true)} />}
    </div>
  );
};

export default ChatAssistant;