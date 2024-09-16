import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import logoTop from '../assets/IAF_logo.jpg';
import logoBottom from '../assets/logo.jpeg';

const drawerWidth = 165;

export default function Sidenav() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'navy',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ mx: 'auto', mb: 'auto', mt: '10px' }}>
          <img src={logoTop} alt="Top Logo" style={{ width: '60px', height: '60px', borderRadius: '50%', marginTop: '0' }} />
        </Box>
        <List sx={{ color: 'white', fontWeight: 'bold', p: 0 }}>
          {['Inbox', 'Phishing Mails', 'Quarantine', 'SIRTs', 'Rogue DB', 'CDR', 'Contact', 'Reports', 'Dashboard', 'Profile', 'Settings'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} sx={{ color: 'white', fontWeight: 'bold', p: 0 ,m: 0, }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mx: 'auto', mb: '10px' }}>
          <img src={logoBottom} alt="Bottom logo" style={{ width: '50px', height: '50px' }} />
        </Box>
      </Drawer>

    </Box>
  );
}
