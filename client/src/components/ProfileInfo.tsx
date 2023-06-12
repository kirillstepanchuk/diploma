import { FC } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BadgeIcon from '@mui/icons-material/Badge';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

interface ProfileInfoProps {
  user: any;
}

const ProfileInfo: FC<ProfileInfoProps> = ({ user }) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem
        secondaryAction={
          <Link component={RouterLink} to="/edit-profile" color="inherit">
            <IconButton
              edge="end"
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          </Link>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <BadgeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Имя пользователя"
          secondary={user?.name || 'Не указано'}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AlternateEmailIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Email"
          secondary={user?.email || 'Не указано'}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LocalPhoneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Номер телефона"
          secondary={user?.phoneNumber || 'Не указано'}
        />
      </ListItem>
    </List>
  );
}

export default ProfileInfo;
