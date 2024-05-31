import { useEffect, useState } from 'react';
import closeIcon from '../../assets/icons/close.svg';
import useAxios from '../../hooks/useAxios';

const SerachModal = ({setShowModal}) => {
    const { api } = useAxios();
    const [searchItem, setSearchitems] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {

        const SearchPost = async (query) => {
            try {

                const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${query}`);
                if (response.status === 200) {
                    setSearchitems([...response.data.data])
                }
            } catch (error) {

                console.log(error)
            }

        }

        if (query === '') {
            setSearchitems([])

        }
        if (query === '') return

        SearchPost(query)

    }, [query])


    return (

        <>
            {/* Search Result */}
            <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
                {/* Search Container */}
                <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
                    {/* Search */}
                    <div>
                        <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
                            Search for Your Desire Blogs
                        </h3>
                        <input
                            type="text"
                            placeholder="Start Typing to Search"
                            className="w-full bg-transparent p-2 text-base text-white outline-none border rounded-lg focus:ring focus:border-indigo-500 focus:ring-indigo-600 border-white/20"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    {/* Search Result */}
                    <div className="">
                        <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
                        <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
                            {searchItem && searchItem.map(item => {
                                return (
                                    <div key={item.id} className="flex gap-6 py-2">
                                        <img
                                            className="h-28 object-contain"
                                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${item.thumbnail}`}
                                            alt=""
                                        />
                                        <div className="mt-2">
                                            <h3 className="text-slate-300 text-xl font-bold">
                                                {item.title}
                                            </h3>
                                            {/* Meta Informations */}
                                            <p className="mb-6 text-sm text-slate-500 mt-1">
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <button onClick={() => setShowModal(false)}>
                        <img
                            src={closeIcon}
                            alt="Close"
                            className="absolute right-2 top-2 cursor-pointer w-8 h-8"
                        />
                    </button>
                </div>
            </section>
        </>
    )
}


export default SerachModal