import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Phone,
  MessageCircle,
  ExternalLink,
  HelpCircle,
  List,
} from "lucide-react";
import {
  findFAQAnswer,
  suggestedQuestions,
  faqData,
} from "@/components/ui/chatbot/faq-data";
import { useContainerSmoothScroll } from "@/components/ui/chatbot/scroll-helper";

import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFAQList, setShowFAQList] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      text: "Hi there! 👋 I'm Cherry Assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use our custom smooth scroll hook for chat messages
  const { containerRef: chatContainerRef, scrollToBottom } =
    useContainerSmoothScroll();

  // Use another instance for the FAQ list
  const { containerRef: faqContainerRef } = useContainerSmoothScroll();

  // Call scrollToBottom when messages change
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      // Get answer from FAQ
      const answer = findFAQAnswer(inputValue.trim());

      // Add bot message
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // WhatsApp integration - open WhatsApp with pre-filled message
  const openWhatsApp = () => {
    const serviceMessage = "Hello, I'm interested in Cherry.design services!";
    window.open(
      `https://wa.me/+919756188580?text=${encodeURIComponent(serviceMessage)}`,
      "_blank",
    );
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-8 right-8 text-white z-50 p-2 md:p-3 shadow-lg font-bebas"
        whileHover={{ scale: 1.05, rotate: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
        style={{
          backgroundColor: "#F33D3D",

          borderRadius: "6px",
          border: "2px solid #FF41A6",
          boxShadow: "4px 4px 0px #0A0A0A, 4px 4px 0px 2px #FF41A6",
          transform: "rotate(2deg)",
        }}
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="h-3 w-3 md:h-6 md:w-6" />
          <span className="text-xs md:text-xl tracking-wide">CHAT</span>
        </div>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-8 right-8 w-[350px] h-[550px] bg-white overflow-hidden flex flex-col z-50"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2), 0 0 0 2px #F33D3D",
              transform: "rotate(-0.5deg)",
            }}
          >
            {/* Header */}
            <div
              className="text-white p-4 flex justify-between items-center font-bebas"
              style={{
                background: "#0A0A0A",
                borderBottom: "2px solid #F33D3D",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative elements */}
              <div
                className="absolute top-1 right-1 w-10 h-10 rounded-full opacity-30"
                style={{ background: "#FF41A6" }}
              ></div>
              <div
                className="absolute bottom-1 left-1 w-5 h-5 rounded-full opacity-20"
                style={{ background: "#FFC700" }}
              ></div>

              <div className="flex items-center gap-2 z-10">
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center"
                  style={{ background: "#F33D3D" }}
                >
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg tracking-wider">
                    CHERRY ASSISTANT
                  </h3>
                  <p className="text-xs opacity-80 font-mono">
                    Online | Replies instantly
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 z-10">
                <button
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                  onClick={() => setShowFAQList(!showFAQList)}
                  aria-label="View all FAQs"
                  title="View all FAQs"
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages container */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 text-[#F96C53]"
              style={{
                backgroundColor: "#f8f8f8",
                backgroundImage:
                  "radial-gradient(#e0e0e0 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex flex-col max-w-[80%]",
                      message.isUser
                        ? "ml-auto items-end"
                        : "mr-auto items-start",
                    )}
                  >
                    <div
                      className={cn(
                        "px-4 py-3 inline-block shadow-md",
                        message.isUser
                          ? "text-white rounded-tr-xl rounded-tl-xl rounded-bl-xl rounded-br-none font-medium"
                          : "bg-white rounded-tr-xl rounded-tl-none rounded-bl-xl rounded-br-xl",
                      )}
                      style={
                        message.isUser
                          ? {
                              background: "#F33D3D",
                              border: "1px solid #FF41A6",
                            }
                          : { border: "1px solid #e0e0e0" }
                      }
                    >
                      <p
                        className={cn(
                          "break-words",
                          message.isUser ? "" : "font-mono text-sm",
                        )}
                      >
                        {message.text}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 font-mono">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex max-w-[80%] mr-auto items-start">
                    <div
                      className="bg-white rounded-tr-xl rounded-tl-none rounded-bl-xl rounded-br-xl px-4 py-3 inline-block shadow-md"
                      style={{ border: "1px solid #e0e0e0" }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full animate-bounce"
                          style={{
                            background: "#F33D3D",
                            animationDelay: "0ms",
                          }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full animate-bounce"
                          style={{
                            background: "#4BB1F1",
                            animationDelay: "150ms",
                          }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full animate-bounce"
                          style={{
                            background: "#FFC700",
                            animationDelay: "300ms",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Suggested questions (shown after bot's first message) */}
                {messages.length === 1 && (
                  <div className="mt-8">
                    <p
                      className="text-sm font-bebas tracking-wider mb-3 text-gray-600"
                      style={{ letterSpacing: "1px" }}
                    >
                      FREQUENTLY ASKED QUESTIONS:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions
                        .slice(0, 3)
                        .map((question: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestedQuestion(question)}
                            className="bg-white shadow-md px-4 py-2 text-sm transition-all relative font-mono"
                            style={{
                              border: `1px solid ${index === 0 ? "#F33D3D" : index === 1 ? "#4BB1F1" : "#FFC700"}`,
                              borderRadius: "4px",
                              transform: `rotate(${index % 2 === 0 ? "-0.5deg" : "0.5deg"})`,
                            }}
                          >
                            {question}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Empty div for scroll reference */}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* WhatsApp integration button */}
            <div
              className="p-3 border-t border-gray-200"
              style={{
                backgroundColor: "#f8f8f8",
                backgroundImage:
                  "radial-gradient(#e0e0e0 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 text-white font-bebas tracking-wider relative overflow-hidden"
                style={{
                  backgroundColor: "#25D366",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
                  border: "1px solid #21bf5b",
                  fontSize: "16px",
                  letterSpacing: "1px",
                }}
              >
                {/* Decorative elements */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-10 rounded-full"
                  style={{
                    background: "white",
                    transform: "translate(30%, -30%)",
                  }}
                ></div>
                <div
                  className="absolute bottom-0 left-0 w-8 h-8 opacity-10 rounded-full"
                  style={{
                    background: "white",
                    transform: "translate(-30%, 30%)",
                  }}
                ></div>

                <Phone className="h-5 w-5" />
                <span>CONTINUE ON WHATSAPP</span>
                <ExternalLink className="h-5 w-5" />
              </button>
            </div>

            {/* Input area */}
            <div
              className="p-4 border-t border-gray-200 flex items-center gap-3"
              style={{ background: "#0A0A0A" }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 focus:outline-none text-[#F96C53] font-mono text-sm"
                style={{
                  backgroundColor: "#ffffff",
                  border: "2px solid #F33D3D",
                  borderRadius: "4px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ""}
                aria-label="Send message"
                className="p-3 text-white shadow-md transition-transform"
                style={{
                  backgroundColor: "#F33D3D",
                  borderRadius: "4px",
                  transform: "rotate(2deg)",
                  opacity: inputValue.trim() === "" ? 0.5 : 1,
                }}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ List Modal */}
      <AnimatePresence>
        {isOpen && showFAQList && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFAQList(false)}
          >
            <motion.div
              className="bg-white rounded-xl w-[90%] max-w-3xl h-[80vh] overflow-hidden flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 10px 25px rgba(0,0,0,0.3), 0 0 0 2px #F33D3D",
              }}
            >
              {/* FAQ Modal Header */}
              <div
                className="p-5 text-white font-bebas flex justify-between items-center"
                style={{
                  background: "#0A0A0A",
                  borderBottom: "2px solid #F33D3D",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ background: "#F33D3D" }}
                  >
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl tracking-wide">
                    ALL FREQUENTLY ASKED QUESTIONS
                  </h2>
                </div>
                <button
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                  onClick={() => setShowFAQList(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* FAQ List */}
              <div
                ref={faqContainerRef}
                className="flex-1 overflow-y-auto p-6"
                style={{
                  backgroundColor: "#f8f8f8",
                  backgroundImage:
                    "radial-gradient(#e0e0e0 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <div className="space-y-6">
                  {faqData.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-5 shadow-md transition-transform hover:-translate-y-1"
                      style={{
                        border: `2px solid ${
                          index % 5 === 0
                            ? "#F33D3D"
                            : index % 5 === 1
                              ? "#4BB1F1"
                              : index % 5 === 2
                                ? "#FFC700"
                                : index % 5 === 3
                                  ? "#9D4EDD"
                                  : "#63D471"
                        }`,
                        transform: `rotate(${index % 2 === 0 ? "-0.5deg" : "0.5deg"})`,
                      }}
                    >
                      <h3
                        className="text-lg font-bebas mb-2 tracking-wide"
                        style={{
                          color:
                            index % 5 === 0
                              ? "#F33D3D"
                              : index % 5 === 1
                                ? "#4BB1F1"
                                : index % 5 === 2
                                  ? "#FFC700"
                                  : index % 5 === 3
                                    ? "#9D4EDD"
                                    : "#63D471",
                        }}
                      >
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 font-mono text-sm">
                        {faq.answer}
                      </p>
                      <button
                        className="mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium inline-flex items-center gap-1 transition-colors"
                        onClick={() => {
                          handleSuggestedQuestion(faq.question);
                          setShowFAQList(false);
                        }}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Ask this</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
