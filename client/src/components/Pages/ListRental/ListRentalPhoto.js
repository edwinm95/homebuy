import React, {Component, Fragment} from 'react'
class ListRentalPhoto extends Component {
    constructor(props){
        super(props)
        this.state = {
            photos: []
        }
    }
    getValue = () => {
        return this.state.photos
    }
    renderRequired(){
        return <div className="requiredcomponent">*</div>
    }
    getFile = (event) => {
        if(event.target.files.length !== 0){
          const photo = event.target.files[0]
          this.setState({photos: [...this.state.photos, photo]} )
        }
      }
      uploadFile = () => {
        this.fileInput.click();
      }
      removePhoto = (name) => {
          var array = this.state.photos
          for (var i in array){
              if(array[i].name === name){
                  array.splice(i,1)
                  break;
              }
          }
          this.setState({photos: array})
      }
      renderImage(){
        if(this.state.photos.length === 0){
          return(<div></div>)
        }
        var count = 0;
        const mappedArray = this.state.photos.map((photo) => {
          const photoURL =  URL.createObjectURL(photo)
          const style = {
            position: 'relative',
            backgroundImage: `url(${photoURL})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            width: '100%',
            height: '100%',
          }
          count++
          return(
              <div className="imagecontainer">
                <div style={style}>
                  <div className="imagetag">{count}.</div>
                  <div className="closebutton" onClick={() => this.removePhoto(photo.name)}><i class="fal fa-times"></i></div>
                </div>
              </div>
            )
        })
        return mappedArray
      }
      renderPhotos(){
          return(
              <div className= "field">
                    <h1 className="fieldtitle">Photos{this.renderRequired()}</h1>
                    <div className="photofieldcomponent">
                        <div className="imagefilecomponent">
                        {this.renderImage()}
                        </div>
                        <div className="photocomponent" onClick={this.uploadFile}>
                        <input type="file" className={'fileinput'} ref={(ref) => this.fileInput = ref} onChange={this.getFile}/>
                        </div>
                    </div>
              </div>

          )
      }
    render(){
        return(
            <Fragment>
                {this.renderPhotos()}
            </Fragment>
        )
    }
}
export default ListRentalPhoto