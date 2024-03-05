import React from 'react';
import {
  ListItemText,
  List as ListUI,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
import { Pokemon } from '../../types';
import { Link } from 'react-router-dom';

import PokeballIcon from '../../../../assets/PokeBall_icon.png';

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '16px',
};

interface Props {
  data: Pokemon[];
}

const List = ({ data }: Props) => {
  return (
    <ListUI style={gridStyle}>
      {data.map((item) => {
        return (
          <ListItemButton
            key={item.name}
            component={Link}
            to={`/pokemon/${item.id}`}>
            <ListItemIcon>
              <img
                src={PokeballIcon}
                alt='Pokeball'
                style={{ width: 24, height: 24 }}
              />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        );
      })}
    </ListUI>
  );
};

export default List;
