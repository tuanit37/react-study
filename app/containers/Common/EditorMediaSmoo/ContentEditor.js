import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AtomBox from './atom/Box';
import MakeGrid from './atom/MakeGrid';
// import AtomTextField from './atom/TextField';
import AtomList from './atom/List';
import ListItemAdvanced from './atom/ListItemAdvanced';
import CropIcon from './icon/CropIcon';
import RotateIcon from './icon/RotateIcon';
import TagIcon from './icon/TagIcon';
import TextIcon from './icon/TextIcon';
import AtomToolbar from './atom/Toolbar';
import AtomButtonRounded from './atom/Button/AtomButtonRounded';
import EditImage from './EditImage';
const useStyles = makeStyles(theme => ({
  /* list mode */
  mediaContainer: {
    position: 'relative',
    maxHeight: '100%',
    paddingBottom: theme.spacing(7),
  },
  mediaItem: { cursor: 'move' },
  mediaItemCover: {
    position: 'relative',
  },
  mediaItemContent: {
    padding: theme.spacing(1),
  },
  editItemButton: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
  tagItemButton: {
    position: 'absolute',
    bottom: theme.spacing(1),
    left: theme.spacing(1),
  },
  removeItemButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  bottomToolbar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    padding: theme.spacing(0, 2),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  /* studio mode */
  studioPreview: {
    [theme.breakpoints.up('lg')]: {
      order: 1,
    },
  },
  /* no media */
  noMedia: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.h6.fontSize,
    '& svg': {
      fontSize: theme.typography.h2.fontSize,
    },
  },
}));
const EVENT_EDIT = {
  crop: 'EVENT_CROP',
  rotate: 'EVENT_ROTATE',
};
function ContentEditor(props) {
  const { onResult, media, onProgress } = props;
  const classes = useStyles();
  // handle event
  const [isCrop, setCrop] = useState(false);
  const [isRotate, setRotate] = useState(false);
  const [isChange, setChangeImage] = useState(false);
  const [resultEdit, setResult] = useState();
  const [path, setPath] = useState();

  // set media
  useEffect(() => {
    if (typeof media === 'string') {
      setPath(media);
    } else {
      setPath(window.URL.createObjectURL(media));
    }
  }, [media]);
  const handleEvent = evt => {
    if (evt === EVENT_EDIT.crop) {
      setCrop(true);
    }
    if (evt === EVENT_EDIT.rotate) {
      setRotate(true);
    }
  };
  // handle event cancel
  const handleEventCancel = () => {
    // reset event
    setCrop(false);
    setRotate(false);
    setResult(null);
    setPath(null);
    setChangeImage(false);
    setTimeout(() => {
      setPath(media);
    }, 500);
    if (window.haloCroppie) {
      window.haloCroppie.destroy();
      window.haloCroppie = null;
    }
  };
  const handleEventSave = () => {
    if (onResult) onResult(resultEdit);
  };
  return (
    <AtomBox p={2}>
      <MakeGrid
        grids={[
          {
            children: (
              <div>
                <EditImage
                  media={path}
                  crop={isCrop}
                  rotate={isRotate}
                  onProgress={onProgress}
                  onResult={result => {
                    setChangeImage(true);
                    setResult(result);

                    // reset rotate
                    setRotate(false);
                  }}
                />
              </div>
            ),
            props: { xs: 12, lg: 9, className: classes.studioPreview },
          },
          {
            children: (
              <div>
                {/* <AtomTextField
                  label="Chú thích"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                /> */}

                <AtomList>
                  <React.Fragment>
                    <ListItemAdvanced
                      button
                      icon={<CropIcon />}
                      primary="Cắt"
                      onClick={() => {
                        handleEvent(EVENT_EDIT.crop);
                      }}
                    />
                    <ListItemAdvanced
                      button
                      icon={<RotateIcon />}
                      primary="Xoay"
                      onClick={() => {
                        handleEvent(EVENT_EDIT.rotate);
                        // setRotate(false);
                      }}
                    />
                    <ListItemAdvanced
                      button
                      icon={<TagIcon />}
                      primary="Gắn thẻ ảnh"
                    />
                    <ListItemAdvanced
                      button
                      icon={<TextIcon />}
                      primary="Văn bản thay thế"
                    />
                  </React.Fragment>
                </AtomList>

                <AtomToolbar disableGutters>
                  <MakeGrid
                    allGridProps={{ xs: true }}
                    grids={[
                      {
                        children: (
                          <AtomButtonRounded
                            fullWidth
                            variant="outlined"
                            onClick={handleEventCancel}
                          >
                            Hủy
                          </AtomButtonRounded>
                        ),
                      },
                      {
                        children: (
                          <AtomButtonRounded
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleEventSave}
                            disabled={!isChange}
                          >
                            Lưu
                          </AtomButtonRounded>
                        ),
                      },
                    ]}
                  />
                </AtomToolbar>
              </div>
            ),
            props: { xs: 12, lg: 3 },
          },
        ]}
      />
    </AtomBox>
  );
}

ContentEditor.propTypes = {
  onResult: PropType.func,
  onProgress: PropType.func,
  media: PropType.any,
};
export default ContentEditor;
