import { IconVK } from "@/helpers/iconVK";
import { IconTelegram } from "@/helpers/iconTelegram";
import { IconWhatsApp } from "@/helpers/iconWhatsApp";
import { IconMail } from "@/helpers/iconMail";
import { IconPhone } from "@/helpers/iconPhone";

export const FinalPage = (priceShowFlag: boolean) => [
  {
    stack: [
      {
        text: priceShowFlag ? "ALL CATEGORIES" : "ВСЕ КАТЕГОРИИ",
        style: "header3",
      },
      {
        text: priceShowFlag ? "CATEGORIES" : "НАШЕГО КАТАЛОГА",
        style: "header3",
      },
      {
        ul: [
          priceShowFlag ? "Atomizer bottles" : "Флаконы-атомайзеры",
          priceShowFlag ? "Non-spray bottles" : "Флаконы без атомайзера",
          priceShowFlag
            ? "Home fragrance diffusers"
            : "Аромадиффузоры для дома",
          priceShowFlag
            ? "MMB diffuser base"
            : "Основа для аромадиффузоров ММБ",
          priceShowFlag ? "Fragrances" : "Отдушки",
          priceShowFlag ? "Candle-making supplies" : "Свечеварение",
          priceShowFlag ? "Packaging products" : "Упаковочная продукция",
          priceShowFlag
            ? "Accessories and consumables"
            : "Аксессуары и расходные материалы",
          priceShowFlag ? "Electronic equipment" : "Электронное оборудование",
        ],
        style: "list2",
      },
      { text: priceShowFlag ? "CONTACTS" : "КОНТАКТЫ", style: "contactHeader" },

      {
        columns: [
          { image: IconPhone, width: 26, height: 26 },
          {
            text: "+7 999 333-92-30",
            link: "tel:+79993339230",
            style: "contactText",
          },
        ],
        margin: [20, 0, 0, 0],
      },
      {
        columns: [
          { image: IconMail, width: 26, height: 26 },
          {
            text: "info@flaconRf.ru",
            link: "mailto:info@flaconRf.ru",
            style: "contactText",
          },
        ],
        margin: [20, 0, 0, 0],
      },
      ...(!priceShowFlag
        ? [
            {
              columns: [
                {
                  stack: [
                    {
                      image: IconWhatsApp,
                      width: 26,
                      height: 26,
                      link: "https://api.whatsapp.com/send?phone=79393932577",
                    },
                  ],
                  width: "auto",
                  alignment: "center",
                },
                {
                  stack: [
                    {
                      image: IconTelegram,
                      width: 26,
                      height: 26,
                      link: "https://t.me/flakonyrf",
                    },
                  ],
                  width: "auto",
                  alignment: "center",
                },
                {
                  stack: [
                    {
                      image: IconVK,
                      width: 26,
                      height: 26,
                      link: "https://vk.com/flacon_rf",
                    },
                  ],
                  width: "auto",
                  alignment: "center",
                },
              ],
              margin: [20, 10, 0, 0],
              columnGap: 7,
            },
          ]
        : []),
      { text: "EXPRESS. EXPERTS. EXCELLENCE.", style: "footer" },
    ],
    pageBreak: "before",
  },
];
