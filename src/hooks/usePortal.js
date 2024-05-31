import { useContext } from "react";
import { PostContext } from "../context";

const usePortal = () => {
    return useContext(PostContext)

}

export { usePortal }