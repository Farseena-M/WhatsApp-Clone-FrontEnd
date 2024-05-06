import { Box } from '@mui/material'
import Header from './header'
import Search from '../menu/search'
import Conversations from './conversations'


const Menu = () => {
  return (
    <Box>
    <Header />
    <Search />
    <Conversations />
    </Box>
    )
}

export default Menu