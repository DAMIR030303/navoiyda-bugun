import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Users,
  Plus,
  Check,
  CheckCheck,
  Clock,
  Image as ImageIcon,
  File,
  Mic,
  X,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file" | "voice";
  status: "sending" | "sent" | "delivered" | "read";
  replyTo?: string;
}

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  isGroup: boolean;
  participants?: string[];
}

const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      name: "Loyiha guruhi",
      lastMessage: "Yangi vazifa tayinlandi",
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 3,
      isOnline: true,
      isGroup: true,
      participants: ["John Doe", "Jane Smith", "Bob Johnson"],
    },
    {
      id: "2",
      name: "CEO",
      lastMessage: "Hisobot tayyor",
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
      unreadCount: 1,
      isOnline: true,
      isGroup: false,
    },
    {
      id: "3",
      name: "Marketing jamoasi",
      lastMessage: "Kampaniya natijalari",
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 0,
      isOnline: false,
      isGroup: true,
      participants: ["Marketing Manager", "Designer", "Content Writer"],
    },
    {
      id: "4",
      name: "HR Manager",
      lastMessage: "Yangi xodim qabul qilish",
      lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      unreadCount: 0,
      isOnline: true,
      isGroup: false,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "user1",
      senderName: "John Doe",
      content: "Salom! Loyiha haqida gaplashishimiz kerak",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      type: "text",
      status: "read",
    },
    {
      id: "2",
      senderId: user?.id || "current",
      senderName: user?.firstName || "Siz",
      content: "Albatta, qachon qulay?",
      timestamp: new Date(Date.now() - 50 * 60 * 1000),
      type: "text",
      status: "read",
    },
    {
      id: "3",
      senderId: "user1",
      senderName: "John Doe",
      content: "Bugun soat 3 da bo'ladimi?",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      type: "text",
      status: "delivered",
    },
    {
      id: "4",
      senderId: user?.id || "current",
      senderName: user?.firstName || "Siz",
      content: "Ha, mayli. Konfrans zalida ko'rishamiz",
      timestamp: new Date(Date.now() - 40 * 60 * 1000),
      type: "text",
      status: "sent",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user?.id || "current",
      senderName: user?.firstName || "Siz",
      content: message.trim(),
      timestamp: new Date(),
      type: "text",
      status: "sending",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString("uz-UZ", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString("uz-UZ", {
        day: "2-digit",
        month: "2-digit",
      });
    }
  };

  const getMessageStatus = (status: Message["status"]) => {
    switch (status) {
      case "sending":
        return <Clock className="w-3 h-3 text-gray-400" />;
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChatData = chats.find((chat) => chat.id === selectedChat);

  return (
    <>
      <Helmet>
        <title>Xabarlar - Navoiyda Bugun</title>
        <meta name="description" content="Jamoaviy chat va xabarlar" />
      </Helmet>

      <div className="h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm border border-gray-200 flex">
        {/* Chat List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Chat List Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Xabarlar</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Chat List Items */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === chat.id ? "bg-blue-50 border-blue-200" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {chat.isGroup ? (
                        <Users className="w-6 h-6 text-white" />
                      ) : (
                        <span className="text-white font-medium">
                          {chat.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    {chat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatTime(chat.lastMessageTime)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full min-w-[20px] text-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {selectedChatData?.isGroup ? (
                        <Users className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white font-medium">
                          {selectedChatData?.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    {selectedChatData?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedChatData?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedChatData?.isGroup
                        ? `${selectedChatData.participants?.length} ishtirokchi`
                        : selectedChatData?.isOnline
                        ? "Onlayn"
                        : "Oxirgi faollik: 2 soat oldin"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Video className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                  const isOwn = msg.senderId === (user?.id || "current");

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isOwn ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          isOwn ? "order-2" : "order-1"
                        }`}
                      >
                        {!isOwn && (
                          <p className="text-xs text-gray-500 mb-1 ml-2">
                            {msg.senderName}
                          </p>
                        )}

                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            isOwn
                              ? "bg-blue-500 text-white rounded-br-md"
                              : "bg-gray-100 text-gray-900 rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>

                        <div
                          className={`flex items-center gap-1 mt-1 ${
                            isOwn ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span className="text-xs text-gray-500">
                            {formatTime(msg.timestamp)}
                          </span>
                          {isOwn && getMessageStatus(msg.status)}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx"
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </button>

                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Xabar yozing..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    />

                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Smile className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Mic className="w-5 h-5 text-gray-600" />
                  </button>

                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Chat tanlang
                </h3>
                <p className="text-gray-600">
                  Xabar almashinishni boshlash uchun chap tomondagi chatlardan
                  birini tanlang
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessagesPage;
