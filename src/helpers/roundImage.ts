import { RoundImageProps } from "@/props/table/roundImageProps";

export const RoundImageWithCanvas = ({
  idImage,
  width,
  height,
  radius,
}: RoundImageProps) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = idImage;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.arcTo(width, 0, width, height, radius);
        ctx.arcTo(width, height, 0, height, radius);
        ctx.arcTo(0, height, 0, 0, radius);
        ctx.arcTo(0, 0, width, 0, radius);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(img, 0, 0, width, height);
      } else {
        reject(new Error("Failed to get 2D context"));
      }

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
  });
};
