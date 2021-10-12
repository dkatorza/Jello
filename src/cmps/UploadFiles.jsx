import React from 'react';
import { cloudinaryService } from '../services/cloudinary.service'

export class UploadFiles extends React.Component {

  state = {
    fileUrl: null,
    isUploading: false,
  }

  uploadFile = async (ev) => {
    this.setState({ isUploading: true })

    try{
      const {secure_url} = await cloudinaryService.uploadFile(ev)
      this.props.setFileUpload(secure_url)
    }catch (err){
      console.log('error',err)
    }
    this.setState({ isUploading: false})
  
  }
  render() {
    return (
      <div className="upload-preview" >
        <label className="cover-img-upload" htmlFor="file-upload">Upload a cover image</label>
        <input type="file" onChange={ this.uploadFile } accept="img/*" id="file-upload" style={{width:'0px'}} />
      </div>
    )
  }
}