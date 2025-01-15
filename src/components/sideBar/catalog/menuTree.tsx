import { SubMenu, Item as MenuItem } from "rc-menu";
import { ReactNode } from "react";

interface MenuNode {
  [key: string]: MenuNode;
}

const menuTree = (paths: string[]): ReactNode[] => {
  const tree: MenuNode = {};

  paths.forEach((path) => {
    const parts = path.split("/").filter((part) => part !== "Каталог");
    let current = tree;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = index === parts.length - 1 ? {} : {};
      }
      current = current[part] as MenuNode;
    });
  });

  const renderMenu = (node: MenuNode, fullPath = ""): ReactNode[] => {
    return Object.keys(node).map((key) => {
      const newPath = fullPath ? `${fullPath}/${key}` : key;
      const children = renderMenu(node[key] as MenuNode, newPath);
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

export default menuTree;
