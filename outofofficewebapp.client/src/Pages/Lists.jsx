import { } from "@chakra-ui/react";
//import React, { useState, useEffect, createContext } from 'react';
//import { Navigate } from 'react-router-dom';
import AuthorizeView, { CheckUserRole } from "../Components/AuthorizeView.jsx";



function Lists() {
    return (
        <AuthorizeView>
            <section className="p-8 flex flex-row justify-start items-start gap-12">
                <CheckUserRole value="email"/>
            </section>
        </ AuthorizeView>
    );
}
export default Lists;