import { useLocation } from "react-router-dom";

function useShowHeader() {
  const location = useLocation();

  const key = location.pathname.split('/')[1];

  return key !== 'login';
}

export default useShowHeader;
