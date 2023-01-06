import { useSelector } from "react-redux";

export function useAuth() {
  // let user = useSelector(state => state.user)
  const { userName, userImage, userId } = useSelector((state) => state.user);
  return {
    isAuth: !!userName,
    userName,
    userImage,
    userId,
  };
}
