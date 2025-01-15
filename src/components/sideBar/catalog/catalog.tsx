import Menu from "rc-menu";
import { useDispatch } from "react-redux";
import { useState, ReactNode, useEffect } from "react";
import { setPathName, removePathName } from "@/store/reducers/DataReducer";
import CustomTooltip from "@/helpers/tooltip";
import { GetPathName } from "@/api/Api";
import menuTree from "./menuTree";
import { CustomSkeleton } from "@/helpers/skeleton";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import SideBarButton from "@/components/buttons/sideBarButton";

export const Catalog = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [menuData, setMenuData] = useState<ReactNode[]>([]);
  const dispatch = useDispatch();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { showSnackbar } = useCustomSnackbar();

  useEffect(() => {
    const pathName = async () => {
      try {
        const response = await GetPathName();
        setMenuData(menuTree(response));
        setLoading(false);
      } catch {
        showSnackbar("Ошибка при получении данных для Каталога", {
          variant: "error",
        });
      }
    };

    pathName();
  }, []);

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

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p className="menu-title">Каталог</p>
        <CustomTooltip title="После сформированной таблицы, Вы можете дополнить ее, но при этом уберите предыдущий Каталог" />
      </div>

      <div className="menu-container">
        {loading ? (
          <CustomSkeleton />
        ) : (
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
        )}
      </div>

      <SideBarButton onClick={deselectAll} label="Снять выбор"/>
    </div>
  );
};
