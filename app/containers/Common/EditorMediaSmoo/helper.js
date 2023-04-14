import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
export function cropImage(options) {
  if (options.destroy && window.haloCroppie) {
    window.haloCroppie.destroy();
    window.haloCroppie = null;
  }
  if (!options.ref) {
    return;
  }
  window.haloCroppie = new Cropper(options.ref, {
    // aspectRatio: 16 / 9,
    viewMode: 1,
    dragMode: 'move',
    center: true,
    highlight: true,
    background: true,
    autoCrop: true,
    autoCropArea: 0.99,
    cropBoxMovable: true,
    minContainerWidth: 100,
    minContainerHeight: 100,
    minCanvasWidth: 100,
    minCanvasHeight: 100,
    minCropBoxWidth: 100,
    minCropBoxHeight: 100,
    responsive: false,
    restore: true,
    zoom() {
      fetch(window.haloCroppie.getCroppedCanvas().toDataURL())
        .then(res => res.blob())
        .then(blob => {
          const fileNew = new File([blob], `${gUuid()}nnkv.jpg`, {
            lastModified: Date.now(),
            type: 'image/jpeg',
          });
          const objResult = {
            file: fileNew,
            path: window.URL.createObjectURL(fileNew),
          };
          if (options.onCompleted) options.onCompleted(objResult);
        });
    },
    // crop(event) {
    //   console.log(event);
    // },
    // cropstart(event) {
    //   console.log('cropstart: ', event);
    // },
    // cropmove(event) {
    //   console.log('cropmove: ', event);
    // },
    cropend() {
      fetch(window.haloCroppie.getCroppedCanvas().toDataURL())
        .then(res => res.blob())
        .then(blob => {
          const fileNew = new File([blob], `${gUuid()}nnkv.jpg`, {
            lastModified: Date.now(),
            type: 'image/jpeg',
          });
          const objResult = {
            file: fileNew,
            path: window.URL.createObjectURL(fileNew),
          };
          if (options.onCompleted) options.onCompleted(objResult);
        });
    },
  });
}

export const gUuid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};
