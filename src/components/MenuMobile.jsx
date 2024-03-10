import React, {useState} from 'react'
import FirebaseApp from '../firebase/firebase'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

import AddNote from './AddNote';
import ProfilePicAndTheme  from './ProfilePicAndTheme';

import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'

/**chakra ui */
import { Button, Box, Icon} from '@chakra-ui/react'

/**button motion */

const buttonVariant = {
	hidden: {scale: 1},
	hover: {
	  scale: 1.1,
	  transition: {
		duration: 0.5
	  }
	}
  }

  const menuShowVariant = {
    initial: { opacity: 0, x: 1000},
    visible: { opacity: 1, x: 0,
    transition: {
      duration: 0.2, ease: 'easeIn'
    }
    }
  }


/** starting firebase auth and firestore */

const auth = getAuth(FirebaseApp);
const firestore = getFirestore(FirebaseApp);


const MenuMobile = ({ userEmail, uid, notes, setNotes, setShowMenu}) => {


  
  return (
<>

<div className='wrapper' onClick={()=> setShowMenu(false)}/> 

	<motion.div
  variants={menuShowVariant}
  initial='initial'
  animate='visible'
  >

<Box className='mobile-menu' h={'100vh'} display={{ lg: 'none'}} top={0} border={{base: '1px', lg: 'none'}} bg={{base: 'var(--bg-color)'}} p={{base:4, lg: '0'}} right={{base: 0, lg: '0'}} position={{base: 'absolute', lg: 'relative'}} >

<Icon as={IoClose} display={{lg: 'none'}} w={9} h={9} mx='auto' mt={{base: 2}} onClick={()=> setShowMenu(false)}></Icon>
          <Box mt={{base: '-20px'}}>
            <ProfilePicAndTheme uid={uid}/>
          </Box>
        <Box mb={60} pr='4'>
        <AddNote
              notes={notes}
              setNotes={setNotes}
              userEmail={userEmail}
          />
        </Box>
      
        <motion.div
        variants={buttonVariant}
        initial='hidden'
        whileHover='hover'
        >
        <Button size='sm' bottom={10} position='absolute'   bg='var(--icon-color)' color='var(--bg-color)' _hover={{background: 'var(--icon-shadow-color)'}}  right='3' onClick={()=> signOut(auth)}>Sign Out</Button>
        </motion.div>
        </Box> 
	</motion.div>
  </>
  )
}

export default MenuMobile