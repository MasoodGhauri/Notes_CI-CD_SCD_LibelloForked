import React, { useRef, useState } from "react";
import firebaseApp from "../firebase/firebase";
import { getFirestore, updateDoc, doc } from "firebase/firestore";

/**chakra ui */

import { Box, Heading, Icon, chakra } from "@chakra-ui/react";
import { BiX } from "react-icons/bi";

import { motion } from "framer-motion";

/**setting firestore */

const firestore = getFirestore(firebaseApp);

const NotesList = ({ notes, userEmail, setNotes }) => {
  /**framer motion variatn */
  const noteVariant = {
    hidden: { scale: 1, opacity: 0 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        x: { duration: 1 },
        default: { ease: "linear" },
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.5,
      },
    },
  };

  /**handle delete task button  */

  async function handleDeleteNote(noteId) {
    /**create new array of tasks */
    const newNotes = notes.filter((notes) => notes.id !== noteId);
    /**update database in firestore */
    const docRef = doc(firestore, `notes/${userEmail}`);
    updateDoc(docRef, { notes: [...newNotes] });
    /**update state */
    setNotes(newNotes);
  }

  /**handle delete task button  */

  return (
    <Box ml={{ lg: 52, base: 10 }} mt={{ lg: 9, base: 16 }} position="absolute">
      <Heading
        mb={{ lg: 16, base: 10 }}
        color="var(--title-color)"
        textShadow="var(--title-shadow)"
        letterSpacing={2}
        fontFamily="var(--font-family)"
      >
        {" "}
        My Notes
      </Heading>

      <Box display="flex" flexWrap="wrap">
        {notes.map((note) => {
          return (
            <motion.div
              variants={noteVariant}
              initial="hidden"
              whileHover="hover"
              drag
              dragTransition={{ bounceStiffness: 400, bounceDamping: 10 }}
              dragConstraints={{
                top: -5,
                left: 0,
                right: 0,
                bottom: 5,
              }}
              animate="show"
              key={note.id}
            >
              <Box
                className="note"
                position="relative"
                bg="var(--note-color)"
                shadow="var(--note-shadow)"
                cursor="pointer"
                color="var(--note-text-color)"
                border="1px"
                borderColor="var(--border-color)"
                p={5}
                borderRadius="var(--border-radius)"
                m={{ lg: 5, base: 1 }}
                w={{ lg: "220px", base: "330px" }}
                h={{ lg: "220px", base: "auto" }}
                ml={{ lg: "0", base: "-17px" }}
                role="group"
              >
                <Icon
                  as={BiX}
                  display="none"
                  opacity={0.3}
                  _groupHover={{ display: "block" }}
                  w={8}
                  h={8}
                  color="var(--icon-color)"
                  mt="-15px"
                  right={{ lg: 1, base: 1 }}
                  cursor="pointer"
                  position="absolute"
                  onClick={() => handleDeleteNote(note.id)}
                ></Icon>

                <chakra.p
                  color="var(--note-text-color)"
                  mt={3}
                  fontSize="18px"
                  overflow="hidden"
                  letterSpacing={1}
                >
                  {note.content}
                </chakra.p>
                <Box
                  display="none"
                  opacity="0.5"
                  color="var(--note-date-color)"
                  overflow="hidden"
                  mt={{ lg: "auto", base: 1 }}
                  _groupHover={{ display: "block" }}
                >
                  <chakra.small fontSize={{ lg: "11px", base: "9px" }}>
                    {note.date}
                  </chakra.small>
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default NotesList;
