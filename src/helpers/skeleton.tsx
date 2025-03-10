import { Skeleton } from "@mui/material";
export const CustomSkeleton = () => {
  return (
    <>
      {Array.from({ length: 9 }).map((_, index) => (
        <Skeleton key={index} variant="text" sx={{ fontSize: "22px", width: "100%" }} />
      ))}
    </>
  );
};
