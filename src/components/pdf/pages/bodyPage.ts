import { RoundImageWithCanvas } from "@/helpers/roundImage";
import { Product } from "@/props/product";
import { NotImage } from "@/helpers/noImage";

interface TableBodyProps {
  allTableData: Product[];
  images: Record<string, string>;
  priceShowFlag: boolean;
}

export const generateTableBody = async ({
  allTableData,
  images,
  priceShowFlag,
}: TableBodyProps) => {
  const roundedImages = await Promise.all(
    allTableData.map((item: any) => {
      const idImage = images[item.id];
      const imageToProcess = idImage
        ? `data:image/jpeg;base64,${idImage}`
        : NotImage;
      return RoundImageWithCanvas({
        idImage: imageToProcess,
        width: 85,
        height: 85,
        radius: 50,
      });
    })
  );

  return allTableData.map((item: Product, index: number) => {
    const getColors = (item: any) => {
      if (!item.variants || item.variants.length === 0) return "";
      const colors = item.variants
        .flatMap((variant: any) => {
          if (!variant.attributes || variant.attributes.length < 2) return [];
          return variant.attributes[1];
        })
        .filter((color: any) => typeof color === "string");
      return [...new Set(colors)].join(", ");
    };

    const colors = getColors(item);
    const imageObject = {
      image: roundedImages[index],
      width: 85,
      height: 85,
      radius: 10,
    };

    return [
      imageObject,
      {
        stack: [
          {
            text: `${item.code}`,
            bold: true,
            fontSize: 12,
          },
          {
            text: priceShowFlag
              ? `Material: ${item.material || ""}`
              : `Материал: ${item.material || ""}`,
            fontSize: 8,
            color: "gray",
            margin: [0, 5, 0, 0],
          },
          {
            text: priceShowFlag
              ? `Color: ${colors || ""}`
              : `Цвет: ${colors || ""}`,
            fontSize: 8,
            bold: true,
            color: "#ffffff",
            margin: [0, 5, 0, 0],
          },
          {
            text: [
              { text: `${item.vip || "N/A"} `, fontSize: 15, bold: true },
              {
                text: priceShowFlag ? "USD " : "руб. ",
                fontSize: 15,
                bold: true,
              },
              {
                text: priceShowFlag ? "(price per unit)" : "(цена за единицу)",
                fontSize: 10,
                color: "gray",
              },
            ],
            margin: [0, 22, 0, 0],
          },
        ],
      },
      {
        text: [
          {
            text: priceShowFlag
              ? item.volume
                ? item.volume.replace("мл", "ml").replace("л", "L")
                : ""
              : item.volume || "",
            fontSize: 30,
            bold: true,
            color: "#777777",
            alignment: "right",
          },
        ],
      },
    ];
  });
};