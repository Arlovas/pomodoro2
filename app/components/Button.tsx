import React from 'react';

interface ButtonProps {
    onClick: () => void;
    label: string;
    icon?: React.ReactElement;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, icon }) => {
    return (
        <button
            onClick={onClick}
            className=" cursor-pointer p-3 rounded-xl flex gap-2 items-center align-middle text-xl
                focus-visible:ring-4 focus-visible:ring-teal-700 focus-visible:outline-none
                hover:bg-orange-400 hover:bg-opacity-20 text-secondaryText"
        >
            {icon && icon} {label}
        </button>
    );
};

export default Button;
