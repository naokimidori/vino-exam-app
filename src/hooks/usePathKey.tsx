import { useLocation } from "react-router-dom";

function usePathKey() {
  const location = useLocation();

  const key = location.pathname.split('/')[1];

  return key;
}

export default usePathKey;
