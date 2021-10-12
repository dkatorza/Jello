import React from "react";


export class UnsplashSearch extends React.Component {

    state = {
        data: '',
        search: 'world',
        url: ''
    }

    componentDidMount() {
        this.fetchData()
       
    }

    fetchData=()=> {
        const accessKey = "kzG7BoT2XAboK7ER0LG3ItmTD5qxnTUKuvLQgdsJkAw"
        const {search} = this.state
        const {perPage} = this.props
        const url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=${search}&page=1&per_page=${perPage}&orientation=landscape`
         fetch(url)
            .then(res => res.json())
            .then(
                (res) => {
                    console.log('ress',res);
                    this.setState({ data: res })
                })
            .catch((err) => {
                console.log("something went wrong!", err);
            })
    }

    handleChange = (ev) => {
        const { value } = ev.target
        this.setState({ search: value })
        this.fetchData()
    }

    handleImg = (ev) => {
        const url = ev.target.name
        this.props.onImgUpload(url + '.jpg')
    }

    render() {
        const { data, search } = this.state
        if (!data) return <div>Loading...</div>;
        return (
            <>
                <input className="unsplash-search-input" type="text" value={search}
                    onChange={(ev) => { this.handleChange(ev) }} placeholder={"Search Unsplash for photos"} />
                <div className="preview-unsplash-feed">
                    {data.results.map(photo =>
                        <button key={photo.id} name={photo.urls.regular} onClick={this.handleImg} className="preview-unsplash-cover"
                            style={{ backgroundImage: `url(${photo.urls.regular})` }} />)}
                </div>


            </>
        )
    }
}




