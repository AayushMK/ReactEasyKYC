import React, { Component } from "react";
import axios from "axios";
import "./form.css";

class Form extends Component {
  state = {
    citizenship : null,
    photo : null,
    verified: false,
    loading: false,
    upload_disabled: false,  
    citizen_no: null,
  }
  handleCitizenship=(e)=>{
    let citizenship = e.target.files[0];
    this.setState({citizenship:citizenship});

  }
  handlePhoto=(e)=>{
    let photo = e.target.files[0];
    this.setState({photo:photo});

    
  }
  handleUpload=(e)=>{
    console.log(this.state);
    console.log(this.state.citizenship.name)
    console.log("Upload called");
    this.setState({loading:true})
    this.setState({verified:null})
    let citizenship = this.state.citizenship;
    let photo = this.state.photo;

    let formdata = new FormData()
    formdata.append("citizenship",citizenship)
    formdata.append("photo", photo)
    this.setState({upload_disabled:true})    


    axios({
      url: "http://127.0.0.1:8000/text",
      method: "POST",
      headers : {
        "Content-Type":"multipart/form-data",
      },
      data:formdata,
    }).then((res)=>{
      console.log(res.data)
      // this.setState({verified: res.data["verified"]})
      this.setState({loading:false})
      this.setState({upload_disabled:false})
      this.setState({citizen_no: res.data["citizen_no"]})
    })
  }
  render(){
    let message = "";
    if (this.state.verified === true){
      message = <div className="message">They are the same person</div>;
    }else if (this.state.verified === false){
      message = <div className="message">They are not the same person</div>;
    }else if (this.state.loading===true){
      message= <div className="loader">Loading</div>;
    }
    let cno = "";
    if (this.state.citizen_no){
      cno = this.state.citizen_no
    }
    return(  
      <div className="form-area">
        <div className="heading">
          EasyKyc Face-verification Module
        </div>
        <form>
          <div className="file-area">
          <div className="upload-area">
          <div className="image-name">{this.state.citizenship ? this.state.citizenship.name : "Not uploaded" }</div>
          <input  type="file" name = "citizenship" onChange = {(e)=>this.handleCitizenship(e)} id="citizenship"/>
          <label htmlFor="citizenship" className = "upload"  >Upload Citizenship</label>
          </div>
          <div className="upload-area">
          <div className="image-name">{this.state.photo ? this.state.photo.name : "Not uploaded" }</div>
          <input type="file" name = "photo" onChange = {(e)=>this.handlePhoto(e)} id="photo"/>
          <label htmlFor="photo" className = "upload" >Upload Photo</label>
          </div>
          </div>
        <button type = "button" disabled={this.state.upload_disabled} onClick={e=>this.handleUpload(e)}>Verify</button>
        </form>
      <div className="message-area">{message}</div>
      <h1>{cno}</h1>
      
        </div>
      

    );
  }

}

export default Form;
