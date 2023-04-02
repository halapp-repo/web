import { AvatarSizeType } from '@halapp/common';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { Box, Button, Stack } from '@mui/material';
import { ChangeEventHandler, useEffect, useState } from 'react';

import { User } from '../../models/user';
import { useAppDispatch } from '../../store/hooks';
import { uploadAvatar } from '../../store/users/usersSlice';

const imageMimeType = /image\/(png|jpg|jpeg)/i;

interface ProfilePictureProps {
  EditMode: boolean;
  User: User;
}

const ProfilePicture = ({ EditMode, User }: ProfilePictureProps) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer | null>(null);

  const changeImageHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target?.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.match(imageMimeType)) {
      return;
    }
    if (file.size > 2097152) {
      return;
    }
    setFile(file);
  };
  const handleUploadAvatar = (file: File, userId: string, preview: ArrayBuffer | string) => {
    if (file && userId) {
      dispatch(uploadAvatar({ file: file, ID: userId, preview })).then(() => setFileDataURL(null));
    }
  };
  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const target = e.target;
        const result = target?.result;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const getAvatarContent = ({
    editMode,
    userImageURL,
    fileDataURL,
    preview
  }: {
    editMode: boolean;
    userImageURL?: string;
    fileDataURL: string | ArrayBuffer | null;
    preview?: string | ArrayBuffer;
  }) => {
    if (editMode) {
      if (fileDataURL || preview) {
        return (
          <img
            src={(fileDataURL || preview) as string}
            alt="preview"
            style={{ width: '120px', height: '120px' }}
          />
        );
      } else if (userImageURL) {
        return (
          <img
            src={`${userImageURL}/${AvatarSizeType.large}.png`}
            alt="preview"
            style={{ width: '120px', height: '120px' }}
          />
        );
      } else {
        return <AccountCircleTwoToneIcon color="info" sx={{ width: '120px', height: '120px' }} />;
      }
    } else {
      if (userImageURL) {
        return (
          <img
            src={`${userImageURL}/${AvatarSizeType.large}.png`}
            alt="preview"
            style={{ width: '120px', height: '120px' }}
          />
        );
      } else {
        return <AccountCircleTwoToneIcon color="info" sx={{ width: '120px', height: '120px' }} />;
      }
    }
  };
  const getButtonContent = ({
    editMode,
    fileDataURL
  }: {
    editMode: boolean;
    fileDataURL: string | ArrayBuffer | null;
  }) => {
    const buttons = [];
    if (editMode) {
      buttons.push(
        <Button size="small" color="info" variant="outlined" component="label" key="choose">
          Profil Seç
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={changeImageHandler}
            multiple={false}
            hidden
          />
        </Button>
      );
      if (fileDataURL && file) {
        buttons.push(
          <Button
            key="upload"
            size="small"
            color="primary"
            variant="contained"
            onClick={() => handleUploadAvatar(file, User.ID, fileDataURL)}>
            Profili Yükle
          </Button>
        );
      }
    }
    return buttons;
  };

  return (
    <Stack alignItems={'center'} spacing={1}>
      <Box
        sx={{
          width: '120px',
          height: '120px',
          overflow: 'hidden',
          zIndex: 1000,
          borderRadius: '50%'
        }}>
        {getAvatarContent({
          userImageURL: User.BaseImageUrl,
          editMode: EditMode,
          fileDataURL: fileDataURL,
          preview: User.Preview
        })}
      </Box>

      <Stack direction={'row'} spacing={1}>
        {getButtonContent({
          editMode: EditMode,
          fileDataURL: fileDataURL
        })}
      </Stack>
    </Stack>
  );
};

export { ProfilePicture };
