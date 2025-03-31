import { IconFLX } from "@/helpers/iconFLX";
import { IconMail } from "@/helpers/iconMail";
import { IconPhone } from "@/helpers/iconPhone";
import { IconTelegram } from "@/helpers/iconTelegram";
import { IconVK } from "@/helpers/iconVK";
import { IconWhatsApp } from "@/helpers/iconWhatsApp";

export const IntroPage = (priceShowFlag: boolean) => [
  {
    stack: [
      { text: priceShowFlag ? "Price List" : "Прайс-лист", style: "header" },
      {
        text: priceShowFlag ? "for Our Products" : "на наши товары",
        style: "subheader",
      },
      {
        text: priceShowFlag ? "«FLX» Company" : "Компания «FLX»",
        style: "company",
      },

      {
        columns: [
          { image: IconPhone, width: 15, height: 15 },
          {
            text: "+7 999 333-92-30",
            link: "tel:+79993339230",
            margin: [7, 0, 0, 0],
          },
        ],
        margin: [20, 0, 0, 7],
      },
      {
        columns: [
          { image: IconMail, width: 15, height: 15 },
          {
            text: "info@flaconRf.ru",
            link: "mailto:info@flaconRf.ru",
            margin: [7, 0, 0, 0],
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
                      width: 15,
                      height: 15,
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
                      width: 15,
                      height: 15,
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
                      width: 15,
                      height: 15,
                      link: "https://vk.com/flacon_rf",
                    },
                  ],
                  width: "auto",
                  alignment: "center",
                },
              ],
              margin: [20, 7, 0, 0],
              columnGap: 7,
            },
          ]
        : []),

      {
        absolutePosition: { x: 400, y: 710 },
        stack: [
          {
            image: IconFLX,
            width: 110,
            height: 50,
            link: "https://www.flaconrf.ru",
          },
        ],
      },
    ],
    style: "introPage",
    pageBreak: "after",
  },
  {
    stack: [
      { text: priceShowFlag? "MEET" : "О НАШЕЙ", style: "header2" },
      { text: priceShowFlag? "OUR COMPANIES":"КОМПАНИИ", style: "header2" },
      {
        text: priceShowFlag? "Everything necessary for the":"Всё для парфюмерного",
        style: "subheader2",
      },
      {
        text: priceShowFlag? "perfume business in one place":"бизнеса в одном месте.",
        style: "subheader2",
      },
      {
        ol: priceShowFlag
          ? [
              "Our assortment includes more than 4000 items;",
              "Many years of experience with perfume bottles and packaging;",
              "Quality control of the product at all stages;",
              "Official cooperation and guarantees;",
              "Reliable delivery to any country, partnerships with the largest logistics companies;",
              "Warehouse size 2500 sq.m.",
            ]
          : [
              "Наш ассортимент включает более 4000 наименований продукции;",
              "Многолетний опыт работы с парфюмерной упаковкой и флаконами;",
              "Многоэтапный контроль качества на всех стадиях производства;",
              "Официальное сотрудничество с гарантиями для клиентов;",
              "Надёжная доставка в любую страну, партнёрство с крупнейшими логистическими компаниями;",
              "Собственный склад площадью 2500 м².",
            ],
        style: "list",
      },

      ...(!priceShowFlag
        ? [
            {
              margin: [80, 55, 0, 0],
              stack: [
                {
                  text: "В нашей компании действуют\n скидки от суммы заказа:",
                  style: "discountHeader",
                },
                {
                  ul: [
                    "От 10 000 ₽ - 3%;",
                    "От 25 000 ₽ - 5%;",
                    "От 50 000 ₽ - 8%;",
                    "От 75 000 ₽ - 12%;",
                    "От 300 000 ₽ - особые условия:\n индивидуальная цена, скидка на доставку.",
                  ],
                  style: "discountList",
                },
                {
                  text: "Скидка не распространяется на воск, ММБ, отдушки и акционные товары.",
                  style: "note",
                },
              ],
            },
          ]
        : []),
    ],
    pageBreak: "after",
  },
];
