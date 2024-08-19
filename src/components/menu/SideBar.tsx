import React, { useEffect, useState } from "react";
import Menu, { SubMenu, Item as MenuItem } from "rc-menu";
import "rc-menu/assets/index.css";
import { SearchByArticle } from "../search/SearchByArticle";
import { GetOrderData } from "../data/GetData";

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

  const renderMenu = (node: any) => {
    return Object.keys(node).map((key) => {
      const children = renderMenu(node[key]);
      return children.length > 0 ? (
        <SubMenu key={key} title={key}>
          {children}
        </SubMenu>
      ) : (
        <MenuItem key={key}>{key}</MenuItem>
      );
    });
  };

  return renderMenu(tree);
};

const SideBar = () => {
  const [menuData, setMenuData] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const onSelect = (info: { selectedKeys: string[] }) => {
    setSelectedKeys(info.selectedKeys);
    console.log(info.selectedKeys);
  };
  const onDeselect = (info: { selectedKeys: string[] }) => {
    setSelectedKeys(info.selectedKeys);
  };
  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys);
  };

  const getOrderData = async () => {
    try {
      const response = await GetOrderData();
      const paths = response.map((path: string) =>
        path.substring("Каталог/".length)
      );
      setMenuData(buildMenuTree(paths));
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
      <p className="menu-title">Категории:</p>
      <div>
        <Menu
          multiple
          className="sidebar-menu"
          onSelect={onSelect}
          onDeselect={onDeselect}
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
        >
          {menuData}
        </Menu>
      </div>

      <div className="menu-buttons">
        <button className="buttonSelect" onClick={() => setSelectedKeys([])}>
          Выбрать все
        </button>
        <button className="buttonSelect" onClick={() => setSelectedKeys([])}>
          Снять выбор
        </button>
      </div>

      <p className="menu-title">Артикулы:</p>
      <div>
        <SearchByArticle />
      </div>

      <div>{/* <Filer/> */}</div>
    </div>
  );
};

export default SideBar;
