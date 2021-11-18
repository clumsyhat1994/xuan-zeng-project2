import React from "react";
import { Link } from "react-router-dom";
export default function BackBtn(params) {
    return (
        <>
            <Link to={'/'}><button id='backBtn' style={{ height: '100px', width: '100px' }} type='button' >Back</button ></Link>

        </>
    );
}