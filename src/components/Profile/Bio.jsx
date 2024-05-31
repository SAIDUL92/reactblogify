import { useProfile } from "../../hooks/useProfile";
import EditIcon from '../../assets/icons/edit.svg';
import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import { actions } from "../../actions";
import { useAuth } from "../../hooks/useAuth";
export default function Bio({ profileId }) {

    const { auth } = useAuth()
    const isMe = profileId === auth?.user?.id;
    const { state, dispatch } = useProfile()

    const { api } = useAxios()
    const [bio, setBio] = useState(state?.user?.bio)


    const [editMode, setEditMode] = useState(false);

    const handleBioEdit = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING });

        try {

            const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/profile`, { bio });

            if (response.status === 200) {
                dispatch({ type: actions.profile.USER_DATA_EDITED, data: response.data });

            }

            setEditMode(false)

        } catch (error) {

            dispatch({ type: actions.profile.DATA_FETCH_ERROR, error: error.message })
        }

    }


    return (

        <>
            <div className="mt-4 flex items-start gap-2 lg:mt-6">
                <div className="flex-1">
                    {

                        !editMode ? (

                            <p className="leading-[188%] text-gray-400 lg:text-lg">
                                {state?.user?.bio ? state?.user?.bio : 'Add your bio information'}
                            </p>

                        ) : (

                            <textarea
                                // value={bio}
                                className='w-full p-3 bg-[#030317] border rounded-md focus:outline-none focus:border-indigo-500 border-white/20'
                                onChange={(e) => setBio(e.target.value)}
                                name="edit" id="edit" cols="30" rows="10"></textarea>

                        )

                    }
                </div>
                {/* Edit Bio button. The Above bio will be editable when clicking on the button */}

                {!editMode ? (

                    <>

                        {
                            isMe && <button
                                onClick={() => setEditMode(true)}
                                className="flex-center h-7 w-7 rounded-full">
                                <img src={EditIcon} alt="Edit" />
                            </button>
                        }

                    </>


                ) : (
                    <button onClick={handleBioEdit}>update</button>
                )}

            </div>
        </>
    )
}