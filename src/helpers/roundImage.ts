import { RoundImageProps } from "@/props/table/roundImageProps";

export const RoundImageWithCanvas = ({
  idImage,
  radius,
}: RoundImageProps) => {
  return new Promise((resolve, reject) => {
    if (!idImage) {
      resolve(null); // Если изображение отсутствует, сразу возвращаем null
      return;
    }
    const img = new Image();
    img.src = idImage;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Используйте размеры исходного изображения
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get 2D context"));
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.arcTo(canvas.width, 0, canvas.width, canvas.height, radius);
      ctx.arcTo(canvas.width, canvas.height, 0, canvas.height, radius);
      ctx.arcTo(0, canvas.height, 0, 0, radius);
      ctx.arcTo(0, 0, canvas.width, 0, radius);
      ctx.clip();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};