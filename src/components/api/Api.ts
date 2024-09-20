import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export const Authorisation = async (username: string, password: string) => {
  try {
    const response = await api.post(
      "http://127.0.0.1:8000/auth/jwt/login",
      new URLSearchParams({
        username: username,
        password: password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 204) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
    return false;
  }
};

export const GetPathName = async () => {
  try {
    //     username: "guest",
    //     password: "FLX_guest_PRICE",

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

export const GetDataForTable = async (
  pathName: string[],
  name: string[],
  extract_code: string[],
  fuzzy_code: string[],
  stock_zero_flag: boolean,
  oil_discriptions: boolean,
  stock_show_flag: boolean
) => {
  try {
    const params = new URLSearchParams();

    const formattedExtractCode = extract_code
      .map((code) => code.replace(/\n/g, "|"))
      .join("|");

    if (pathName.length > 0) {
      params.append("path_name", pathName.join("|"));
    }
    if (name.length > 0) {
      params.append("name", name.join("|"));
    }

    if (formattedExtractCode) {
      params.append("extract_code", formattedExtractCode);
    }
    if (fuzzy_code.length > 0) {
      params.append("fuzzy_code", fuzzy_code.join("|"));
    }

    if (stock_zero_flag) {
      params.append("stock_zero_flag", stock_zero_flag.toString());
    }

    if (oil_discriptions) {
      params.append("oil_discriptions", oil_discriptions.toString());
    }

    // if (stock_show_flag) {
    params.append("stock_show_flag", true.toString());
    // }
    const response = await api.get(`get_data?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = response.data;
    return responseData.products || [];
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
    throw error;
  }
};

export const GenerateExcel = async (data: any) => {
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

export const SortTableByPopularity = async () => {
  try {
    const response = await api.get("get_filter?filter_name=counterpartyABC", {
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
