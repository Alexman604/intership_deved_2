import { useSelector } from "react-redux";

export function useAuth() {
    let user = useSelector(state => state.user)
    console.log(user);
    const{userName, userImage, userId} = useSelector(state => state.user)
    return {
        isAuth: !! userName,
        userName,
        userImage,
        userId,
    }
}