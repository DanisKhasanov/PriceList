import { Box } from "@mui/material";

const Loading = ({ downloading }: { downloading: boolean }) => {
  return (
    downloading && (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/uia.gif"
          alt="Loading..."
          style={{ width: "250px", height: "250px" }}
        />
      </Box>
    )
  );
};

export default Loading;
