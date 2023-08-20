import {useDispatch} from "react-redux";
import {useMemo} from "react";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import {actions as templateActions} from "../store/template/template.slice";
import {actions as userActions} from "../store/user/user.slice";

const rootActions = {
    ...templateActions,
    ...userActions
}
export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions,dispatch),[dispatch])
}