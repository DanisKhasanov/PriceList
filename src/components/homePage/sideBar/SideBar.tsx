import React, { useEffect, useState } from "react";
import Menu, { SubMenu, Item as MenuItem } from "rc-menu";
import "rc-menu/assets/index.css";
import { SearchByArticle } from "../search/SearchByArticle";
import { GetPathName } from "../../api/Api";
import { useDispatch, useSelector } from "react-redux";
import {
  setPathName,
  removePathName,
} from "../../../store/reducers/DataReducer";
import { Filter } from "../filter/Filter";
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";

const buildMenuTree = (paths: string[]) => {
  const tree: any = {};

  paths.forEach((path) => {
    const parts = path.split("/").filter((part) => part !== "Каталог");
    let current = tree;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = index === parts.length - 1 ? {} : {};
      }
      current = current[part];
    });
  });

  const renderMenu = (node: any, fullPath = "") => {
    return Object.keys(node).map((key) => {
      const newPath = fullPath ? `${fullPath}/${key}` : key;
      const children = renderMenu(node[key], newPath);
      return children.length > 0 ? (
        <SubMenu key={newPath} title={key}>
          {children}
        </SubMenu>
      ) : (
        <MenuItem key={newPath}>{key}</MenuItem>
      );
    });
  };

  return renderMenu(tree);
};

const SideBar = ({ fetchTableData }) => {
  const [menuData, setMenuData] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();
  const { pathName, name, extract_code, fuzzy_code } = useSelector(
    (state: any) => state.data
  );

  const onSelect = (info: { selectedKeys: string[]; key: string }) => {
    setSelectedKeys(info.selectedKeys);
    dispatch(setPathName("Каталог/" + info.key));
  };

  const onDeselect = (info: { selectedKeys: string[]; key: string }) => {
    const updatedKeys = info.selectedKeys.map((key) =>
      key.replace("Каталог/", "")
    );
    dispatch(removePathName(updatedKeys));
    setSelectedKeys(info.selectedKeys);
  };

  const deselectAll = () => {
    setSelectedKeys([]);
    dispatch(removePathName([]));
  };

  const getOrderData = async () => {
    try {
      const response = await GetPathName();
      setMenuData(buildMenuTree(response));
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
      throw error;
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <div className="sidebar-container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <p className="menu-title">Каталог</p>
        <Tooltip
          title="После сформированной таблицы, Вы можете дополнить ее, но при этом уберите предыдущую категорию"
          arrow
        >
          <HelpOutlineTwoToneIcon
            style={{
              cursor: "pointer",
              color: "rgba(5, 107, 241, 0.7)",
              fontSize: "15px",
            }}
          />
        </Tooltip>
      </div>
      <div className="menu-container">
        <Menu
          multiple
          onSelect={onSelect}
          onDeselect={onDeselect}
          onOpenChange={(openKeys: string[]) => setOpenKeys(openKeys)}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          mode={window.innerWidth < 768 ? "inline" : "vertical"}
        >
          {menuData}
        </Menu>
      </div>

      <button className="buttonSelect" onClick={deselectAll}>
        Снять выбор
        <RefreshIcon style={{ color: "#056BF1", marginLeft: "5px" }} />
      </button>

      <div className="menu-container">
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="menu-title">Артикулы</p>
          <Tooltip
            title="После добавления артикулов формируйте таблицу заново"
            arrow
          >
            <HelpOutlineTwoToneIcon
              style={{
                cursor: "pointer",
                color: "rgba(5, 107, 241, 0.7)",
                fontSize: "15px",
              }}
            />
          </Tooltip>
        </div>
        <SearchByArticle />
      </div>

      <div className="menu-container">
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="menu-title">Фильтры</p>
          <Tooltip
            title="После применения фильтра формируйте таблицу заново"
            arrow
          >
            <HelpOutlineTwoToneIcon
              style={{
                cursor: "pointer",
                color: "rgba(5, 107, 241, 0.7)",
                fontSize: "15px",
              }}
            />
          </Tooltip>
        </div>
        <Filter />
      </div>

      <div>
        <button
          className="buttonSelect getData"
          onClick={() => {
            if (
              !(
                pathName.some((item: string) => item.trim() !== "") ||
                name.some((item: string) => item.trim() !== "") ||
                extract_code.some((item: string) => item.trim() !== "") ||
                fuzzy_code.some((item: string) => item.trim() !== "")
              )
            ) {
              setMessage("Выберите Каталог или заполните Артикулы");
            } else {
              setMessage("");
              fetchTableData();
            }
          }}
        >
          Сформировать таблицу
        </button>
        {message && <p className="post-error">{message}</p>}
      </div>
    </div>
  );
};

export default SideBar;
