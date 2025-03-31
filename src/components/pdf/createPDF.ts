import { CreatePDFProps } from "@/props/createPDFProps";
import { IntroPage } from "./pages/introPage";
import { FinalPage } from "./pages/finalPage";
import { generateTableBody } from "./pages/bodyPage";

export const CreatePDF = async ({
  allTableData,
  images,
  priceShowFlag,
}: CreatePDFProps) => {
  const tableBody = await generateTableBody({
    allTableData,
    images,
    priceShowFlag,
  });

  const docDefinition = {
    footer: {
      text: "F L X",
      color: "white",
      opacity: 0.1,
      bold: true,
      angle: 0,
      fontSize: 30,
      alignment: "right",
      font: "Roboto",
      margin: [0, 0, 20, 0],
    },

    header: (currentPage: number, pageCount: number) => {
      if (currentPage < 3 || currentPage === pageCount) {
        return null;
      }
      return {
        text: `${currentPage}/${pageCount}`,
        alignment: "right",
        margin: [0, 10, 20, 0],
        color: "white",
      };
    },

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
      ...IntroPage(priceShowFlag),
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
      FinalPage(priceShowFlag),
    ],

    info: {
      title: "Price List",
    },

    defaultStyle: {
      color: "#ffffff",
    },

    styles: {
      header: {
        fontSize: 50,
        bold: true,
        margin: [20, 200, 0, 0],
      },
      header2: {
        fontSize: 26,
        bold: true,
        margin: [20, 0, 0, 0],
      },

      header3: {
        fontSize: 16,
        bold: true,
        margin: [20, 0, 0, 0],
      },

      subheader: {
        fontSize: 50,
        bold: true,
        margin: [20, 0, 0, 0],
      },
      subheader2: {
        fontSize: 15,
        bold: true,
        margin: [20, 0, 0, 0],
        color: "gray",
      },
      company: {
        fontSize: 18,
        bold: true,
        margin: [20, 10, 0, 320],
      },
      list: {
        fontSize: 16,
        margin: [40, 120, 70, 0],
        lineHeight: 1.6,
      },
      list2: {
        fontSize: 14,
        margin: [30, 10, 70, 0],
        lineHeight: 1.2,
        color: "gray",
      },
      discountHeader: {
        fontSize: 14,
        bold: true,
      },
      discountList: {
        fontSize: 12,
        lineHeight: 1.2,
        margin: [10, 0, 0, 0],
      },
      note: {
        fontSize: 10,
        italic: true,
        color: "#777777",
      },
      contactHeader: {
        fontSize: 20,
        bold: true,
        margin: [20, 120, 0, 10],
      },
      contactText: {
        fontSize: 20,
        margin: [12, 0, 0, 0],
        bold: true,
      },
      footer: {
        fontSize: 20,
        bold: true,
        margin: [0, 240, 0, 0],
        alignment: "center",
      },
    },
  };

  return docDefinition;
};
