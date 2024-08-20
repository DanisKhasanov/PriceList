import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const GetOrderData = async () => {
  try {
    await api.post(
      "auth/jwt/login",
      new URLSearchParams({
        username: "guest",
        password: "FLX_guest_PRICE",
        grant_type: "",
        scope: "",
        client_id: "",
        client_secret: "",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );

    const response = await api.get("get_filter?filter_name=pathName", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
    throw error;
  }
};

export const PostDataForTable = async (payload: any) => {
  try {
    const response = await api.get("get_data?path_name=" + payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
    throw error;
  }
};

export const GenerateExcel = async (data: any) => {
  try {
    const response = await api.post("generate_excel", {"products": data}, {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: 'blob', // ожидаем бинарные данные
    });

    // Извлечение имени файла из заголовка Content-Disposition
    const contentDisposition = response.headers['content-disposition'];
    let filename = "output.xlsx"; // Имя файла по умолчанию
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) {
        filename = match[1];
      }
    }

    // Создаем ссылку для скачивания файла
    const blob = new Blob([response.data], { type: response.data.type });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  } catch (error) {
    console.error("Ошибка при генерации Excel-файла:", error);
  }
};