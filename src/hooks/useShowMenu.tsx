import { useLocation } from "react-router-dom";
import { routesConfig } from "@/routes";

function useShowMenu() {
  const location = useLocation();

  const key = location.pathname.split('/')[1];

  const targetRouteConfig = routesConfig.find((o) => o.path.split('/')[1] === key);

  return targetRouteConfig?.showMenu;
}

export default useShowMenu;
