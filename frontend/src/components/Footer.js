
import { FaFacebookSquare} from 'react-icons/fa';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './Footer.css';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});


const Footer = () => {
  
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <section className="footer">
       <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
      <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
    </BottomNavigation>
      
   
      <section className="footer-social-media">
        <a href="/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </section>
      <section className="footer-info">
        <section className="footer-info-left">
          <section className="footer-info__name">
              Software Engineer Haydn
          </section>
          <section className="footer-info__returns">
            Returns Policy
            <br />
            Delivery
          </section>        
        </section>
        <section className="footer-info-center">
          <section className="footer-info__email">
            shop.info@gmail.com
          </section>
          <section className="footer-info__terms">
            Terms and Conditions
            <br />
            Copyright
          </section>
        </section>
        <section className="footer-info-right">
          <section className="footer-info__number">
         <FaFacebookSquare/>
          </section>
          <section className="footer-info__contact">
            My Story
            <br />
            Contact Us
          </section>
        </section>
      </section>
     
    </section>
  )

}

export default Footer
