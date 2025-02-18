"use client"

import React from 'react'

/** Main Export */
const CustomButton = ({
    text,               
    style,             
    icon,             
    type , 
    onClick  
   
}) => {

    const buttonText =  text;

    return (
        <button
            type={type}
            className={`${style.tb_button}`}
            onClick={onClick}
        >
            {icon && <span  className={`${style.tb_icon}`}>{icon}</span>} 
            {buttonText}
        </button>
    )
}

export default CustomButton;