import Header from "../components/Header";
import Footer from "../components/Footer";
import SerachModal from "../components/SearchModal";
import { useState } from "react";
import { createPortal } from "react-dom";



export default function Layout({ children }) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            {/* Header */}

            <Header showModal={showModal} setShowModal={setShowModal} />

            {
                showModal && createPortal(<SerachModal setShowModal={setShowModal} />, document.getElementById('lws-modal-container'))
            }

            {/* Main content */}

            {children}

            {/* Footer */}

            <Footer />

        </>)
}