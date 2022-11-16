import { useAuthKey } from "../contexts/AuthContext";
import { usePopup } from "../contexts/PopupContext";
import Api from "../utils/api/Api";

const useApi = () => {
    const {authKey} = useAuthKey();
    const {setPopup} = usePopup();

    if(!authKey) return undefined;
    const api = new Api(authKey, undefined, (e: any) => {
        setPopup(e.response.data.message, "HTTP ERROR")
    });
    return api;
}
 
export default useApi;