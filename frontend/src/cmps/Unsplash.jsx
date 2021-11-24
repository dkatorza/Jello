import React from "react";


export class Unsplash extends React.Component {

    state = {
        data: '',
    }

    componentDidMount() {

        const accessKey = "kzG7BoT2XAboK7ER0LG3ItmTD5qxnTUKuvLQgdsJkAw"
        const {search} = this.props
        console.log('search from search',search);
        const url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=${search}&page=1&per_page=6&orientation=landscape`
         
        fetch(url)
            .then(res => res.json())
            .then(
                (res) => {
                    this.setState({ data: res })
                })
            .catch((err) => {
                console.log("something went wrong!", err);
            })
           

    }

    handleImg = (ev) => {
        const url = ev.target.name
        this.props.onImgUpload(url+'.jpg')
    }

    render() {
        const { data } = this.state
        if (!data) return <div>Loading...</div>;
        return (
            <>
            <div className="preview-unsplash-feed">
                {data.results.map(photo =>
                    <button key={photo.id} name={photo.urls.small} onClick={this.handleImg} className="preview-unsplash-cover"
                        style={{ backgroundImage: `url(${photo.urls.small})` }} />)}
            </div>
            
          
            </>
        )
    }
}




