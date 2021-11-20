import React from "react";
import { Link } from "react-router-dom";
export default function BackBtn() {
    return (
        <>
            <Link to={'/'}><button id='backBtn' type='button' >Back</button ></Link>
        </>
    );
}