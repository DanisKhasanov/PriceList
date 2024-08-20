import React, { useEffect, useState } from "react";
import Menu, { SubMenu, Item as MenuItem } from "rc-menu";
import "rc-menu/assets/index.css";
import { SearchByArticle } from "../search/SearchByArticle";
import { GetOrderData } from "../../api/GetData";
import { useDispatch} from "react-redux";
import {
  setPathName,
  removePathName,
} from "../../../store/reducers/DataReducer";

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
  const dispatch = useDispatch();

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
      const response = await GetOrderData();
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
    <div>
      <p className="menu-title">Каталог:</p>
      <div>
        <Menu
          multiple
          className="sidebar-menu"
          onSelect={onSelect}
          onDeselect={onDeselect}
          onOpenChange={(openKeys: string[]) => setOpenKeys(openKeys)}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
        >
          {menuData}
        </Menu>
      </div>

      <div className="menu-buttons">
        <button className="buttonSelect" onClick={fetchTableData}>
          Получить данные
        </button>
        <button className="buttonSelect" onClick={deselectAll}>
          Снять выбор
        </button>
      </div>

      <p className="menu-title">Артикулы:</p>
      <div>
        <SearchByArticle />
      </div>
    </div>
  );
};

export default SideBar;
