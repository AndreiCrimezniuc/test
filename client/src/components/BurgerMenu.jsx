import PropTypes from 'prop-types';
import { IoMenu } from "react-icons/io5";
import { CgClose } from "react-icons/cg";

export default function BurgerMenu({ isOpen, toggleMenu }) {
    return (
        <button className="burger-menu" onClick={toggleMenu}>
            {isOpen ? <CgClose size={24} /> : <IoMenu size={24} />}
        </button>
    );
}

BurgerMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired
};