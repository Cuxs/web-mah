/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import Cropper from 'react-cropper';
import { Label, Input, Button } from 'reactstrap';
import _ from 'lodash';

const defaultSrc = 'http://placecage.com/c/80/80';

export default class ImageCrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: defaultSrc,
      cropResult: defaultSrc,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (_.isNull(this.state.cropResult)) {
      this.setState({
        cropResult: defaultSrc,
      });
    }
    if (nextProps.previewImage !== '' && this.state.cropResult === defaultSrc) {
      this.setState({
        cropResult: `${process.env.REACT_APP_SERVER}/${nextProps.previewImage}`,
      });
    }
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (
        files[0].type === 'image/jpeg' ||
        files[0].type === 'image/png' ||
        files[0].type === 'image/jpg'
      ) {
        this.setState({ src: reader.result, cropResult: null });
      } else {
        console.log('Formato no soportado');
      }
    };
    reader.readAsDataURL(files[0]);
  }
  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });

    this.cropper.getCroppedCanvas().toBlob(blob => this.props.cropImage(blob)); // Se pasa el BLOB al componente que lo llama
  }

  shouldShowSelectImage() {
    const isCropResult = _.isNull(this.state.cropResult);
    if (isCropResult) {
      return false;
    }
    return true;
  }

  shouldShowCropper() {
    const isCropResult = _.isNull(this.state.cropResult);
    if (isCropResult) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <div>
          {this.shouldShowSelectImage()
            ? <div>
              <Label>Elegí una imagen</Label>
              <Input type="file" name="file" id="exampleFile" onChange={event => this.onChange(event)} />
            </div>
            : <div>
              <Button color="primary" onClick={() => this.cropImage()}>Guardar</Button>
              <Button onClick={() => this.setState({ cropResult: `${process.env.REACT_APP_SERVER}/${this.props.previewImage}` })}> Cancelar </Button>
            </div>
              }
          <br />
          {this.shouldShowCropper()
            ? <Cropper
              style={{ height: 400, width: '100%' }}
              aspectRatio={this.props.aspectRatio}
              preview=".img-preview"
              guides={false}
              src={this.state.src}
              ref={(cropper) => {
                this.cropper = cropper;
              }}
            />
            : <img src={this.state.cropResult} alt="cropImage" />}
        </div>
        <br style={{ clear: 'both' }} />
        <style jsx>{
          `
          .cropper-container{font-size:0;line-height:0;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;direction:ltr}.cropper-container img{display:block;min-width:0!important;max-width:none!important;min-height:0!important;max-height:none!important;width:100%;height:100%;image-orientation:0deg}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{position:absolute;top:0;right:0;bottom:0;left:0}.cropper-wrap-box{overflow:hidden}.cropper-drag-box{opacity:0;background-color:#fff}.cropper-modal{opacity:.5;background-color:#000}.cropper-view-box{display:block;overflow:hidden;width:100%;height:100%;outline:#39f solid 1px;outline-color:rgba(51,153,255,.75)}.cropper-dashed{position:absolute;display:block;opacity:.5;border:0 dashed #eee}.cropper-dashed.dashed-h{top:33.33333333%;left:0;width:100%;height:33.33333333%;border-top-width:1px;border-bottom-width:1px}.cropper-dashed.dashed-v{top:0;left:33.33333333%;width:33.33333333%;height:100%;border-right-width:1px;border-left-width:1px}.cropper-center{position:absolute;top:50%;left:50%;display:block;width:0;height:0;opacity:.75}.cropper-center:after,.cropper-center:before{position:absolute;display:block;content:' ';background-color:#eee}.cropper-center:before{top:0;left:-3px;width:7px;height:1px}.cropper-center:after{top:-3px;left:0;width:1px;height:7px}.cropper-face,.cropper-line,.cropper-point{position:absolute;display:block;width:100%;height:100%;opacity:.1}.cropper-face{top:0;left:0;background-color:#fff}.cropper-line,.cropper-point{background-color:#39f}.cropper-line.line-e{top:0;right:-3px;width:5px;cursor:e-resize}.cropper-line.line-n{top:-3px;left:0;height:5px;cursor:n-resize}.cropper-line.line-w{top:0;left:-3px;width:5px;cursor:w-resize}.cropper-line.line-s{bottom:-3px;left:0;height:5px;cursor:s-resize}.cropper-point{width:5px;height:5px;opacity:.75}.cropper-point.point-e{top:50%;right:-3px;margin-top:-3px;cursor:e-resize}.cropper-point.point-n{top:-3px;left:50%;margin-left:-3px;cursor:n-resize}.cropper-point.point-w{top:50%;left:-3px;margin-top:-3px;cursor:w-resize}.cropper-point.point-s{bottom:-3px;left:50%;margin-left:-3px;cursor:s-resize}.cropper-point.point-ne{top:-3px;right:-3px;cursor:ne-resize}.cropper-point.point-nw{top:-3px;left:-3px;cursor:nw-resize}.cropper-point.point-sw{bottom:-3px;left:-3px;cursor:sw-resize}.cropper-point.point-se{right:-3px;bottom:-3px;width:20px;height:20px;cursor:se-resize;opacity:1}.cropper-point.point-se:before{position:absolute;right:-50%;bottom:-50%;display:block;width:200%;height:200%;content:' ';opacity:0;background-color:#39f}@media (min-width:768px){.cropper-point.point-se{width:15px;height:15px}}@media (min-width:992px){.cropper-point.point-se{width:10px;height:10px}}@media (min-width:1200px){.cropper-point.point-se{width:5px;height:5px;opacity:.75}}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{position:absolute;display:block;width:0;height:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}
          `
        }
        </style>
      </div>
    );
  }
}
