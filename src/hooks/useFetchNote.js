import { useEffect, useState } from "react";
import { archiveNote, deleteNote, getActiveNotes, getArchivedNotes, unarchiveNote } from "../utils/network-data";

const useFetchNote = (noteType) => {
  const [notes, setNotes] = useState([]);
  const [deleteData, setDeleteData] = useState(false);
  const [archive, setArchive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      if (noteType === "active") {
        const { error, data } = await getActiveNotes();
        if (!error) {
          setNotes(data);
        }
        setLoading(false);
      } else {
        const { error, data } = await getArchivedNotes();
        if (!error) {
          setNotes(data);
        }
        setLoading(false);
      }
    };

    fetchNotes();

    return () => {
      setDeleteData(false);
      setArchive(false);
      setActive(false);
    };
  }, [deleteData, archive, active, noteType]);

  const handleDelete = async (id) => {
    await deleteNote(id);
    setDeleteData(true);
  };

  const handleArchive = async (id) => {
    await archiveNote(id);
    setArchive(true);
  };

  const handleActive = async (id) => {
    await unarchiveNote(id);
    setActive(true);
  };

  return { notes, loading, handleDelete, handleActive, handleArchive };
};

export default useFetchNote;
