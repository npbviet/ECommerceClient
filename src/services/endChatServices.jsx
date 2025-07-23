const API_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;

export const deleteRoom = async (roomId) => {
  if (!roomId) throw new Error("Thiếu roomId");

  try {
    const response = await fetch(`${API_URL}/chatrooms/deleteRoom`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Không thể xóa phòng");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
