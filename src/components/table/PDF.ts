export const PDF = (allTableData, images, priceShowFlag) => {
  const tableBody = allTableData.map((item: any) => [
    {
      image: images,
      fit: [80, 80],
    },
    {
      stack: [
        {
          text: `${item.code} (${item.volume || "N/A"})`,
          bold: true,
          fontSize: 13,
        },
        {
          text: `Material: ${item.material || "N/A"}`,
          fontSize: 9,
          color: "gray",
          margin: [0, 5, 0, 0],
        },
        {
          text: `COLOR: ${item.color || "N/A"}`,
          fontSize: 9,
          bold: true,
          color: "#ffffff",
          margin: [0, 5, 0, 0],
        },
        {
          text: [
            { text: `${item.vip || "N/A"} `, fontSize: 14, bold: true },
            {
              text: priceShowFlag ? "USD " : "руб. ",
              fontSize: 14,
              bold: true,
            },
            {
              text: "(price per unit)",
              fontSize: 10,
              color: "gray",
            },
          ],
          margin: [0, 22, 0, 0],
        },
      ],
    },
    {
      text: "100ml",
      fontSize: 35,
      bold: true,
      color: "#1C1C1C",
      alignment: "right",
    },
  ]);

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
    background: () => ({
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
    }),
    content: [
      {
        table: {
          widths: [70, "*", 120],
          body: tableBody,
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          paddingLeft: () => 10,
          paddingRight: () => 10,
          paddingTop: () => 10,
          paddingBottom: () => 10,
        },
      },
    ],
    defaultStyle: {
      color: "#ffffff",
    },
  };

  return docDefinition;
};
