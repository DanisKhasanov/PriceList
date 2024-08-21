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

export const GenerateExcel = async (data) => {
  try {
    const response = await api.post(
      "generate_excel",
      { products: data },
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);

    const contentDisposition = response.headers["content-disposition"];
    const filename = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : "download.xlsx";

    link.download = filename;
    link.click();

    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Ошибка при генерации Excel-файла:", error);
  }
};

export const ExtractCode = async (payload: any) => {
  try {
    const response = await api.get("get_data?extract_code=" + payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
    throw error;
  }
};
