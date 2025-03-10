import { RoundImageWithCanvas } from "@/helpers/roundImage";
import { CreatePDFProps } from "@/props/createPDFProps";
import { Product } from "@/props/product";
import { NotImage } from "./noImage";

export const CreatePDF = async ({
  allTableData,
  images,
  priceShowFlag,
}: CreatePDFProps) => {
  const roundedImages = await Promise.all(
    allTableData.map((item: any) => {
      const idImage = images[item.id];

      const imageToProcess = idImage
        ? `data:image/jpeg;base64,${idImage}`
        : NotImage;

      // return imageToProcess;
      return RoundImageWithCanvas({
        idImage: imageToProcess,
        width: 85,
        height: 85,
        radius: 50,
      });
    })
  );
  const tableBody = allTableData.map((item: Product, index: number) => {
    const getColors = (item: any) => {
      if (!item.variants || item.variants.length === 0) return "";

      const colors = item.variants
        .flatMap((variant:any) => {
          if (!variant.attributes || variant.attributes.length < 2) return [];
          return variant.attributes[1]; // Значения цветов во втором элементе массива
        })
        .filter((color:any) => typeof color === "string");

      return [...new Set(colors)].join(", "); // Убираем дубликаты и объединяем в строку
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
            text: `${item.code}`, // TODO:  тут вывести объем
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
            text: `${item.volume || ""}`,
            fontSize: 30,
            bold: true,
            color: "#1C1C1C",
            alignment: "right",
          },
        ],
      },
    ];
  });

  const docDefinition = {
    watermark: {
      text: "FLX",
      color: "white",
      opacity: 0.1,
      angle: 0,
      fontSize: 120,
      alignment: "left",
      margin: [0, 0, 24, 0],
    },

    header: (currentPage: number, pageCount: number) => ({
      text: `${currentPage}/${pageCount}`,
      alignment: "right",
      margin: [0, 10, 20, 0],
      color: "white",
    }),
    background: {
      canvas: [
        {
          type: "rect",
          x: 0,
          y: 0,
          w: 595.28,
          h: 841.89,
          color: "#101010",
        },
      ],
    },

    content: [
      {
        table: {
          widths: [75, "*", 100],
          body: tableBody,
          dontBreakRows: true,
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          paddingLeft: () => 8,
          paddingRight: () => 8,
          paddingTop: () => 8,
          paddingBottom: () => 8,
        },
      },
    ],
    info: {
      title: "Price List",
    },
    defaultStyle: {
      color: "#ffffff",
    },
  };

  return docDefinition;
};
