import React, { useEffect, useState } from "react";
import Menu, { SubMenu, Item as MenuItem } from "rc-menu";
import "rc-menu/assets/index.css";
import "./RcMenu.css";
import { dates } from "../data/data";

// Преобразуем pathName в иерархическую структуру
const buildMenuTree = (paths: string[]) => {
  const tree: any = {};

  paths.forEach(path => {
    const parts = path.split('/').filter(part => part !== 'Каталог');
    let current = tree;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = index === parts.length - 1 ? {} : {};
      }
      current = current[part];
    });
  });

  const renderMenu = (node: any) => {
    return Object.keys(node).map(key => {
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

const RcMenu: React.FC = () => {
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
     const response = await dates;
      // const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      const paths = response.map((item: any) => item.pathName).filter((path: string) => path.startsWith("Каталог/")).map((path: string) => path.substring("Каталог/".length));
      setMenuData(buildMenuTree(paths));
    } catch (error) {
      // console.error("Ошибка при отправке данных на сервер:", error);
      throw error;
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <div>
      <div>
        <Menu
          multiple
          className="rc-menu-custom"
          onSelect={onSelect}
          onDeselect={onDeselect}
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          mode="inline"
        >
          {menuData}
        </Menu>
      </div>
    </div>
  );
};

export default RcMenu;
