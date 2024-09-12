import React, { useState, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import HeaderMenu from './headerMenu';
import InfoDrawer from '../drawer/drawer';
import { useAuthContext } from '../../../AccountContext/accountContext';

const Component = styled(Box)`
  height: 55px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
`;

const Wrapper = styled(Box)`
  margin-left: auto;
  & > *:first-of-type {
    font-size: 22px;
    margin-right: 8px;
    margin-top: 3px;
  }
`;

const Image = styled('img')({
  height: 40,
  width: 40,
  borderRadius: '50%',
  cursor: 'pointer',
});

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const {  authUser } = useAuthContext();

  useEffect(() => {
    console.log('authUser:', authUser);
  }, [authUser]);


  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <Component>
        <Image
          src={authUser.image}
          alt='dp'
          onClick={toggleDrawer}
        />
        <Wrapper>
          <HeaderMenu open={openDrawer} setOpenDrawer={setOpenDrawer} />
        </Wrapper>
      </Component>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  );
};

export default Header;
