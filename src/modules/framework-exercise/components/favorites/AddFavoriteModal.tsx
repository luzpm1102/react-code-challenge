import React, { useState } from 'react';
import {
  Modal,
  TextField,
  Button,
  Snackbar,
  Typography,
  Alert,
} from '@mui/material';
import { Pokemon } from '../../types';
import {
  addFavoriteForUser,
  removeFavoriteForUser,
} from '../../firebase/favorites';

interface Props {
  isOpen: boolean;
  favorite: boolean;
  onClose: () => void;
  pokemon: Pokemon;
  setFavorite: () => void;
}

const AddFavoriteModal = ({
  isOpen,
  onClose,
  pokemon,
  setFavorite,
  favorite,
}: Props) => {
  const [username, setUsername] = useState('');
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSave = async () => {
    if (username.trim() === '') {
      return;
    }

    try {
      if (!favorite) {
        const added = await addFavoriteForUser(username, pokemon);

        if (added) {
          if (added === 'exist') {
            setUsername('');
            setNotification({
              open: true,
              message: 'Favorite already exist for that user!',
              severity: 'error',
            });
            onClose();
            return;
          }
          setFavorite();
          setUsername('');
          setNotification({
            open: true,
            message: 'Favorite added successfully!',
            severity: 'success',
          });
        }
      } else {
        const removed = await removeFavoriteForUser(username, pokemon.id);

        if (removed) {
          setFavorite();
          setUsername('');
          setNotification({
            open: true,
            message: 'Favorite removed successfully!',
            severity: 'success',
          });
        } else {
          setFavorite();
          setUsername('');
          setNotification({
            open: true,
            message: 'Favorite does not exist for that user!',
            severity: 'error',
          });
        }
      }
      onClose();
    } catch (error) {
      setNotification({
        open: true,
        message: 'An error occurred. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        hideBackdrop
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40vw',
            height: '30vh',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}>
          <Typography variant='h6'>
            {favorite
              ? `Remove ${pokemon.name} from Favorites`
              : `Add  ${pokemon.name} to Favorites`}
          </Typography>
          <TextField
            label='Username'
            variant='outlined'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <Button variant='contained' onClick={handleSave}>
            Save
          </Button>
        </div>
      </Modal>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddFavoriteModal;
