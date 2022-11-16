import { useWeb3React } from "@web3-react/core";
import { useAuthKey } from "../contexts/AuthContext";

const useIsAuthed = () => {
    const { authKey } = useAuthKey()
    const { account } = useWeb3React()
    return authKey !== undefined && account !== undefined;
}
 
export default useIsAuthed;