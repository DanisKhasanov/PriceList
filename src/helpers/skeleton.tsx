import { Skeleton } from "@mui/material";
export const CustomSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} variant="text" sx={{ fontSize: "1.5rem", width: "95%" }} />
      ))}
    </>
  );
};
