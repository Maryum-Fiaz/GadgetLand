import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { useSendMessageMutation } from "../../redux/api/productApi";

const ChatBox = ({ onClose }) => {
  const [input, setInput] = useState("");

  // all (past too )messages stored locally in state
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! How can I help you explore GadgetLand today?",
    }, // initial greeting message
  ]);

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput(""); // Clear input box right away

    // previous messages and new
    const updatedHistory = [...messages, { sender: "user", text: userText }];
    setMessages(updatedHistory);

    try {
      const res = await sendMessage({
        message: userText,
        history: messages,
      }).unwrap();

      setMessages((prev) => [...prev, { sender: "bot", text: res.reply }]);
    } catch (err) {
      // error if backend or network fails
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I am having trouble connecting right now. Please try again!",
        },
      ]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white shadow-2xl flex flex-col overflow-hidden w-full h-full rounded-none md:w-[360px] md:h-[500px] md:rounded-2xl"
    >
      {/* Header */}
      <div className="bg-mauve-600 text-white p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="m-0 text-base font-medium tracking-wide">
            GLand Assistant
          </h3>
        </div>
        <button
          className="text-white hover:text-mauve-200 cursor-pointer transition-colors p-1"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      {/* Message History Container */}
      <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 text-sm leading-relaxed shadow-sm max-w-[85%] ${
              msg.sender === "user"
                ? "bg-mauve-600 text-white ml-auto rounded-t-xl rounded-bl-xl rounded-br-[2px]"
                : "bg-gray-200 text-gray-800 mr-auto rounded-t-xl rounded-br-xl rounded-bl-[2px]"
            }`}
          >
            <p className="m-0 whitespace-pre-wrap">{msg.text}</p>
          </div>
        ))}

        {/* Thinking / Loading */}
        {isLoading && (
          <div className="bg-gray-200 text-gray-600 p-3 rounded-t-xl rounded-br-xl rounded-bl-[2px] max-w-[85%] text-sm flex items-center gap-2">
            <Loader2 className="animate-spin" size={16} />
            <span>GLand Assistant is thinking...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-gray-100 flex gap-2 bg-white shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2.5 border border-gray-200 rounded-lg outline-none text-sm focus:border-mauve-500 transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-mauve-600 hover:bg-mauve-700 disabled:opacity-50 text-white p-2.5 rounded-lg text-sm font-medium cursor-pointer flex items-center justify-center transition-colors"
        >
          <Send size={16} />
        </button>
      </form>
    </motion.div>
  );
};

export default ChatBox;
