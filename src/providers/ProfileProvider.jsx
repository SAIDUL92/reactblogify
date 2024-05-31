import { useReducer } from "react";
import { ProfileContext } from "../context";
import { initialState, profilereducer } from "../reducers/ProfileReducers";

const ProfileProvider = ({children}) => {

    const [state, dispatch] = useReducer(profilereducer, initialState)

    return (
        <ProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfileContext.Provider>
    )

}

export default ProfileProvider