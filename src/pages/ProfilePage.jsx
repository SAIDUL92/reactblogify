import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";

import { actions } from "../actions";
import MyPosts from "../components/Profile/MyPosts";
import ProfileInfo from "../components/Profile/ProfileInfo";
import { useParams } from 'react-router-dom';
import Layout from "../layout/Layout";


export default function ProfilePage() {
    const { profileId } = useParams();
    const { api } = useAxios()
    const { auth } = useAuth()
    const { state, dispatch } = useProfile()

    useEffect(() => {

        dispatch({ type: actions.profile.DATA_FETCHING });

        const fetchProfile = async () => {

            try {
                const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${profileId}`);

                dispatch({ type: actions.profile.DATA_FETCHED, data: response.data })
            }
            catch (error) {
                dispatch({ type: actions.profile.DATA_FETCH_ERROR, error: error.message })
            }
        }

        fetchProfile()

    }, [])

    if (state.loading) {
        return <p>Fetching your profile data...</p>
    }
    return (

        <>

            <Layout>

                <main className="mx-auto max-w-[1020px] py-8">
                    <div className="container">

                        <ProfileInfo profileId={profileId} />
                        <MyPosts />
                    </div>

                </main>


            </Layout>

        </>
    )
}