import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import SideBtn from '../components/SideBtn';


const layout = (props) => (
    <div>
        <Navbar />
        {props.children}
        <Footer />
        <SideBtn />
    </div>
);

export default layout;
