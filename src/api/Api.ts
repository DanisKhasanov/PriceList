import axios from "axios";

const URL_API = import.meta.env.VITE_DOMEN;

const api = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
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
      "/auth/jwt/login",
      {
        username: username,
        password: password,
      },

      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (response.status === 200 || response.status === 204) {
      return true;
    }
  } catch (error) {
    console.error("Авторизация не удалась:", error);
    return false;
  }
};

export const GetPathName = async () => {
  try {
    const response = await api.get("get_filter?filter_name=pathName");
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении каталога:", error);
    throw error;
  }
};

export const GetDataForTable = async (
  pathName: string[],
  name: string[],
  extract_code: string[],
  fuzzy_code: string[],
  stock_zero_flag: boolean,
  oil_discriptions: boolean
  // stock_show_flag: boolean
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
    const response = await api.get(`get_data?${params.toString()}`);
    const responseData = response.data;
    return responseData.products || [];
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
    throw error;
  }
};

export const SortTableByPopularity = async () => {
  try {
    const response = await api.get("get_filter?filter_name=counterpartyABC");
    return response.data;
  } catch (error) {
    console.error("Ошибка при сортировке данных:", error);
    throw error;
  }
};

export const GetPricesToUSD = async () => {
  try {
    const response = await axios.get(
      "https://v6.exchangerate-api.com/v6/825e9a9d057e2f4e3a22556d/latest/USD"
    );
    return response.data.conversion_rates.RUB;
  } catch (error) {
    console.error("Ошибка при отправке данных на сервер:", error);
    throw error;
  }
};

export const GetImages = async (palyloadBody) => {
  try {
    const response = await api.post("/get_images/", palyloadBody);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении изображений:", error);
    throw error;
  }
};
