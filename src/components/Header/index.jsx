import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg';
import searchIcon from '../../assets/icons/search.svg';
import Logout from "../auth/Logout";
import { useAuth } from "../../hooks/useAuth";

export default function Header({ showModal, setShowModal }) {


    const { auth } = useAuth();
    const fullName = auth?.user?.firstName + ' ' + auth?.user?.lastName
    return (

        <>
            <header>
                <nav className="container">
                    {/* Logo */}
                    <div>
                        <Link to="/">
                            <img className="w-32" src={logo} alt="lws" />
                        </Link>
                    </div>


                    <div>
                        <ul className="flex items-center space-x-5">
                            <li>

                                <Link
                                    to="/createblog"
                                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                                >
                                    Write
                                </Link>
                            </li>

                            {
                                auth?.authToken && <li>
                                    <button
                                        onClick={() => setShowModal(!showModal)}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <img
                                            src={searchIcon}
                                            alt="Search"
                                        />
                                        <span>Search</span>
                                    </button>
                                </li>
                            }


                            {
                                auth?.authToken ? (<li>
                                    <Logout />
                                </li>) : (<li>
                                    <Link
                                        to="/login"
                                        className="text-white/50 hover:text-white transition-all duration-200"
                                    >
                                        Login
                                    </Link>
                                </li>)
                            }



                            {
                                auth?.authToken && <li className="flex items-center">

                                    <div className="avater-img bg-orange-600 text-white">


                                        {
                                            auth?.user?.avatar ? (
                                                <img className='w-full h-full rounded-full' src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${auth?.user?.avatar}`} alt={auth?.user?.firstName} />
                                            ) : (<span>{auth?.user?.firstName.slice(0, 1)}</span>)
                                        }

                                    </div>


                                    <Link to={`/profile/${auth?.user?.id}`}>
                                        <span className="text-white ml-2">{fullName}</span>

                                    </Link>
                                    {/* Profile Image */}
                                </li>
                            }




                        </ul>
                    </div>
                </nav>
            </header>
        </>)
}

