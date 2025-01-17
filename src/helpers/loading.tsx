import { Box, CircularProgress } from "@mui/material";

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
        <CircularProgress color="secondary" />
      </Box>
    )
  );
};

export default Loading;
