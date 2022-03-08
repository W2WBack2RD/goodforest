import React from 'react';
import treesIcon from '../../../assets/icons/trees.svg';
import menuIcon from '../../../assets/icons/icon_menu.svg';

import Container from 'react-bulma-companion/lib/Container';

export default function PageLayout(props) {

    const openMenu = () => {
        console.log("menu should open");
    }
    return (
        <div>
            <Container className="layoutBG">
                <img src={menuIcon} id='menuIcon' onClick={openMenu} />
                <img src={treesIcon} id='treesIcon' />

                <p id='pageTitle'>
                    {props.title}
                </p>
                <div className='innerPageLayout'>
                    {props.children}
                </div>
            </Container>

        </div>

    );

}