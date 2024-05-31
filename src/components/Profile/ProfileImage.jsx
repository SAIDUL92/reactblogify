import EditIcon from '../../assets/icons/edit.svg';
import { useProfile } from '../../hooks/useProfile';
import useAxios from '../../hooks/useAxios';
import { useRef } from 'react';

import { actions } from '../../actions';
import { useAvatar } from '../../hooks/useAvatar';
import { useAuth } from '../../hooks/useAuth';

export default function ProfileImage({ profileId }) {
    const { auth } = useAuth()
    const isMe = profileId === auth?.user?.id;
    const { state, dispatch } = useProfile()
    const { api } = useAxios();
    // const avatar = useAvatar()
    const fileUploaderRef = useRef();

    const handleImageUpload = (e) => {

        e.preventDefault()
        fileUploaderRef.current.addEventListener('change', updateImageDisplay)
        fileUploaderRef.current.click();
    }

    const updateImageDisplay = async () => {

        try {
            const formData = new FormData();

            for (const file of fileUploaderRef.current.files) {
                formData.append("avatar", file)

            }

            const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar/`, formData);

            if (response.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPDATED,
                    data: response.data
                });
            }


        }

        catch (error) {
            dispatch({ type: actions.profile.DATA_FETCH_ERROR, error: error.message })
        }

    }


    return (

        <>
            <div
                className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]"
            >

                {
                    state?.user?.avatar ? <img className='w-full h-full rounded-full' src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${state?.user?.avatar}`} alt={state?.user?.firstName} /> : <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                        <span className="">{state?.user?.firstName.slice(0, 1)}</span>
                    </div>
                }

                {
                    isMe && <form id="form" encType="multipart/form-data">
                        <button
                            type='submit'
                            onClick={handleImageUpload}
                            className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
                        >
                            <img src={EditIcon} alt="Edit" />
                        </button>
                        <input ref={fileUploaderRef} type="file" name="file" id="file" hidden />
                    </form>
                }

            </div>
        </>
    )
}