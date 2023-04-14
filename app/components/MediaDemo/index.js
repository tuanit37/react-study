/**
 *
 * MediaDemo
 *
 */

import { Button, makeStyles } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Croppie from 'croppie';
import 'croppie/croppie.css';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const useStyle = makeStyles({
  root: {
    position: 'relative',
  },
  bodyCrop: {
    maxHeight: '300px',
  },
  img: {
    width: '500px',
    height: '350px',
  },
  demo: {
    paddingTop: '50px',
  },
});
function MediaDemo() {
  const classes = useStyle();
  const [cropped, setCropper] = useState(null);
  const [imagCrop, setImageCrop] = useState('');
  useEffect(() => {
    const opts = {
      enableExif: true,
      viewport: {
        width: 500,
        height: 350,
      },
      boundary: { width: 500, height: 350 },
      showZoomer: false,
      enableOrientation: true,
      // enforceBoundaryboolean: true
    };
    const cropper = new Croppie(document.getElementById('crop'), opts);
    const urlBind =
      'https://media.hahalolo.com/2021/05/31/14/36/9de1f4c1cac8e6b631ae104eda8f01e6-1622471786.jpg';
    // event load file
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', urlBind, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(ev) {
        if (ev.lengthComputable) {
          const progress = (ev.loaded / ev.total) * 100;
          console.log(progress.toFixed(0));
        } else {
          console.log('load error');
        }
      };

      xhr.onloadend = function() {
        if (!xhr.status.toString().match(/^2/)) {
          console.log('error');
        } else {
          console.log('load end');
          cropper.bind({
            url: urlBind,
          });
          setCropper(cropper);
        }
      };

      xhr.send();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const domCrop = document.getElementById('crop');
  useEffect(() => {
    if (domCrop) {
      domCrop.addEventListener('update', () => {
        if (cropped) {
          cropped
            .result({
              type: 'blob', // 'canvas',
              size: 'viewport',
              circle: false,
              format: 'jpeg',
            })
            .then(blob => {
              const fileNew = new File([blob], `nnkv.jpg`, {
                lastModified: Date.now(),
                type: 'image/jpeg',
              });
              setImageCrop(window.URL.createObjectURL(fileNew));
            });
        }
      });
    }
  }, [domCrop]);

  const handleCrop = () => {
    cropped
      .result({
        type: 'blob', // 'canvas',
        size: 'viewport',
        circle: false,
        format: 'jpeg',
      })
      .then(blob => {
        console.log(blob);
        const fileNew = new File([blob], `nnkv.jpg`, {
          lastModified: Date.now(),
          type: 'image/jpeg',
        });
        console.log('blob: ', fileNew);
        setImageCrop(window.URL.createObjectURL(fileNew));
      });
  };
  return (
    <>
      <div>Crop media</div>
      <div>
        <div id="crop" />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={handleCrop}>
          Save
        </Button>
      </div>
      {imagCrop && (
        <div className={classes.demo}>
          <CardMedia image={imagCrop} className={classes.img} />
        </div>
      )}
    </>
  );
}

MediaDemo.propTypes = {};

export default MediaDemo;
