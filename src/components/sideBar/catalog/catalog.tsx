import Menu from "rc-menu";
import { useDispatch, useSelector } from "react-redux";
import { ReactNode, useEffect, useState } from "react";
import {
  setPathName,
  removePathName,
  deselectAllPathName,
} from "@/store/reducers/DataReducer";
import CustomTooltip from "@/helpers/tooltip";
import { GetPathName } from "@/api/Api";
import menuTree from "./menuTree";
import { CustomSkeleton } from "@/helpers/skeleton";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import { SideBarButton } from "@/components/buttons/sideBarButton";
import { RootState } from "@/store/store";

export const Catalog = () => {
  const dispatch = useDispatch();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { showSnackbar } = useCustomSnackbar();
  const { pathName } = useSelector((state: RootState) => state.data);
  const [menuData, setMenuData] = useState<ReactNode[]>([]);


  useEffect(() => {
    const pathNames = async () => {
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

    pathNames();
  }, []);

  const onSelect = (info: any) => {
    const newKey = `Каталог/${info.key}`;
    if (!pathName.includes(newKey)) {
      dispatch(setPathName(newKey));
    }
  };

  const onDeselect = (info: any) => {
    const keyToRemove = `Каталог/${info.key}`;
    dispatch(removePathName([keyToRemove]));
  };

  const deselectAll = () => {
    dispatch(deselectAllPathName([]));
  };

  const normalizedPathName = pathName
    .map((key) => {
      if (typeof key === "string") {
        return key.split("/").slice(1).join("/");
      }
      return "";
    })
    .filter((key) => key !== "");

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
            selectedKeys={normalizedPathName}
            mode={"vertical"}
          >
            {menuData}
          </Menu>
        )}
      </div>

      <SideBarButton onClick={deselectAll} label="Снять выбор" />
    </div>
  );
};
