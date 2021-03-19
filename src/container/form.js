import React, { Component } from "react";
import axios from "axios";
import "./form.css";

class Form extends Component {
  state = {
    citizenship_front : null,
    citizenship_back: null,
    photo : null,
    loading: false,
    upload_disabled: false,  

    //for face
    verified: null,

    //for text
    citizen_no: null,
    full_name: "",
    address:"",
    ward_no:"",
  }
  handleCitizenship_front=(e)=>{
    let citizenship_front = e.target.files[0];
    this.setState({citizenship_front:citizenship_front});

  }
  handleCitizenship_back=(e)=>{
    let citizenship_back = e.target.files[0];
    this.setState({citizenship_back:citizenship_back})
  }
  handlePhoto=(e)=>{
    let photo = e.target.files[0];
    this.setState({photo:photo});

    
  }
  handleUpload=(e)=>{
    console.log(this.state);
    console.log(this.state.citizenship_front.name);
    console.log("Upload called");
    this.setState({loading:true})
    this.setState({verified:null})

    this.setState({citizen_no:null})
    this.setState({full_name:""})
    this.setState({address:""})
    this.setState({ward_no:""})


    let citizenship_front = this.state.citizenship_front;
    let citizenship_back = this.state.citizenship_back;
    let photo = this.state.photo;

    let formdata = new FormData()
    formdata.append("citizenship_front",citizenship_front)
    formdata.append("citizenship_back", citizenship_back)
    formdata.append("photo", photo)
    this.setState({upload_disabled:true})    




    axios({
      // url : "http://mangaleshworagrovet.com/text",
	    url: "http://127.0.0.1:8000/text",
      // url: "http://mangaleshworagrovet.com/text",
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
      this.setState({full_name: res.data["full_name"]})
      this.setState({address:res.data["p_address_district"]})
      this.setState({ward_no:res.data["p_address_ward_no"]})
    })
    axios({
      // url : "http://mangaleshworagrovet.com/text",
	    url: "http://127.0.0.1:8000/face",
      // url: "http://mangaleshworagrovet.com/text",
      method: "POST",
      headers : {
        "Content-Type":"multipart/form-data",
      },
      data:formdata,
    }).then((res)=>{
      console.log(res.data)
      this.setState({verified: res.data["verified"]})
      this.setState({loading:false})
      this.setState({upload_disabled:false})
      // this.setState({citizen_no: res.data["citizen_no"]})
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
    if (this.state.citizen_no != null){
      cno = <div className="details">Citizenship ID number:<h2>{this.state.citizen_no}</h2></div>
    }
    let full_name = "";
    if (this.state.full_name != ""){
      full_name = <div className="details">Applicant Name:<h2>{this.state.full_name}</h2></div>
    }
    let address = "";
    if (this.state.address != ""){
      address = <div className="details">Address:<h2>{this.state.address}</h2></div>
    }
    let ward_no = "";
    if (this.state.ward_no != ""){
      ward_no = <div className="details">Ward number:<h2>{this.state.ward_no}</h2></div>
    }
    return(  
      <div className="form-area">
        <div className="heading">
          EasyKyc
        </div>
        <form>
          <div className="file-area">
          <div className="upload-area">
          <div className="image-name">{this.state.citizenship_front ? this.state.citizenship_front.name : "Not uploaded" }</div>
          <input  type="file" name = "citizenship_front" onChange = {(e)=>this.handleCitizenship_front(e)} id="citizenship_front"/>
          <label htmlFor="citizenship_front" className = "upload"  >Upload Citizenship_front</label>
          </div>
          <div className="upload-area">
          <div className="image-name">{this.state.citizenship_back ? this.state.citizenship_back.name : "Not uploaded" }</div>
          <input  type="file" name = "citizenship_back" onChange = {(e)=>this.handleCitizenship_back(e)} id="citizenship_back"/>
          <label htmlFor="citizenship_back" className = "upload"  >Upload citizenship_back</label>
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
      {cno}
      {full_name}
      {address}
      {ward_no}
      
        </div>
      

    );
  }

}

export default Form;
