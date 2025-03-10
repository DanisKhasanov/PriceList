import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Loading = ({ downloading }: { downloading: boolean }) => {
  const messages = [
    "Загрузка... Пожалуйста, подождите.",
    "Все еще загружается... Немного терпения.",
    "Почти готово... Еще чуть-чуть.",
    "Почти закончено... Осталось совсем немного.",
  ];
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    if (!downloading) return;

    setMessage(messages[0]);

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 5000);

    return () => clearInterval(interval);
  }, [downloading]);

  if (!downloading) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <img
        src="/uia.gif"
        alt="Загрузка..."
        style={{ width: "200px", height: "200px" }}
      />
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          p: 1,
          bgcolor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
