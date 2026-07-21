import { MessageSquare } from 'lucide-react';

const ChatButton = ({ onClick }) => {
  return (
    <button 
      className="w-14 h-14 bg-mauve-600 hover:bg-mauve-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer" 
      onClick={onClick} 
      aria-label="Open Chat"
    >
      <MessageSquare size={24} />
    </button>
  );
};

export default ChatButton;