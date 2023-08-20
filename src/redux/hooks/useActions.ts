'use client'

import {useDispatch} from "react-redux";
import {useMemo} from "react";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import {actions as templateActions} from "../store/template/template.slice";

const rootActions = {
    ...templateActions,
}
export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions,dispatch),[dispatch])
}