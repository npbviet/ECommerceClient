import { useEffect, useRef, useState } from "react";
import styles from "./LiveChat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useRouteLoaderData } from "react-router";
import io from "socket.io-client";
import { deleteRoom } from "../services/endChatServices";

const API_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;
const socket = io(`${API_URL}/client`, {
  transports: ["websocket"],
  withCredentials: true,
});
const LiveChat = () => {
  const data = useRouteLoaderData("root").user || {};
  const user = data.user || null;

  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  const [messageChat, setMessageChat] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const roomId = user?.userID;

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isChatOpen && user) {
      socket.emit("joinRoom", {
        userId: user.userID,
        roomId,
        fullName: user.fullName,
        role: user.role || "client",
      });
    }
  }, [isChatOpen, user]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("chatHistory", (history) => {
      setMessages(history);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("chatHistory");
    };
  }, []);

  const toggleChat = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsChatOpen((prev) => !prev);
  };

  const sendMessage = async () => {
    if (messageChat.trim() === "") return;

    // Nếu tin nhắn là "/end" thì xóa phòng
    if (messageChat.trim() === "/end") {
      try {
        console.log("Xoá phòng với roomId:", roomId);
        await deleteRoom(roomId);
        alert("Đã kết thúc phòng chat.");
        setIsChatOpen(false);
        setMessages([]);
        setMessageChat("");
      } catch (error) {
        alert("Lỗi khi kết thúc phòng: " + error.message);
      }
      return; // Không gửi tin nhắn "/end" đi nữa
    }

    // Nếu không phải /end thì gửi bình thường
    const msg = {
      roomId,
      senderId: user._id,
      senderName: user.fullName,
      message: messageChat,
      isAdmin: user.role === "admin",
    };

    socket.emit("sendMessage", msg);
    setMessageChat("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className={styles.liveChat}>
      <div className={styles.chatButton} onClick={toggleChat}>
        <FontAwesomeIcon icon="fa-brands fa-facebook-messenger" />
      </div>

      {isChatOpen && user && (
        <div className={styles.chatPopup}>
          <div className={styles.chatHeader}>
            <span>Customer support</span>
            <button className={styles.chatAppButton}>Let's Chat App</button>
          </div>

          <div className={styles.chatContainer}>
            <div className={styles.messageAdmin}>
              <span
                className={`${styles.message} ${styles.received} ${styles.messageUserIcon}`}
              >
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </span>
              <div className={`${styles.message} ${styles.received}`}>
                <span className={styles.messageText}>Chào {user.fullName}</span>
              </div>
            </div>
            {messages.map((msg, idx) =>
              msg.isAdmin ? (
                <div className={styles.messageAdmin} key={idx}>
                  <span
                    className={`${styles.message} ${styles.received} ${styles.messageUserIcon}`}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-user" />
                  </span>
                  <div className={`${styles.message} ${styles.received}`}>
                    <span className={styles.messageText}>{msg.message}</span>
                  </div>
                </div>
              ) : (
                <div className={`${styles.message} ${styles.sent}`} key={idx}>
                  <span className={styles.messageText}>{msg.message}</span>
                </div>
              )
            )}

            <div ref={chatEndRef}></div>
          </div>

          <div className={styles.chatFooter}>
            <div className={styles.messageFooter}>
              <span
                className={`${styles.message} ${styles.received} ${styles.messageUserIcon}`}
              >
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </span>
              <input
                type="text"
                value={messageChat}
                onChange={(e) => setMessageChat(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter Message!"
              />
              <FontAwesomeIcon
                icon="fa-solid fa-paperclip"
                className={styles.messagerIcon}
              />
              <FontAwesomeIcon
                icon="fa-solid fa-face-smile"
                className={styles.messagerIcon}
              />
              <FontAwesomeIcon
                icon="fa-solid fa-paper-plane"
                className={`${styles.iconSend} ${styles.messagerIcon}`}
                onClick={sendMessage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
