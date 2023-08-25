import {useDispatch} from "react-redux";
import {useMemo} from "react";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import {actions as templateActions} from "../store/template/template.slice";
import {actions as userActions} from "../store/user/user.slice";
import {actions as routesActions} from "../store/routes/routes.slice";
import {actions as usersActions} from "../store/users/users.slice";

const rootActions = {
    ...templateActions,
    ...userActions,
    ...routesActions,
    ...usersActions
}
export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions,dispatch),[dispatch])
}