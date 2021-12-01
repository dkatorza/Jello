import Axios from 'axios'

const UNSPLASH_API = 'kzG7BoT2XAboK7ER0LG3ItmTD5qxnTUKuvLQgdsJkAw';

export const unSplashService = {
    query,
    searchImgs
}

async function query(keyword = '16:9',noOfImages='10') {
    const res = await Axios.get(`https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_API}&query=${keyword}&page=1&per_page=${noOfImages}&orientation=landscape`)
    return res.data
}

async function searchImgs(keyword,noOfImages) {
    const { results } = await query(keyword,noOfImages);
    return Promise.resolve(
        results.map(img => {
            return { id: img.id, small: img.urls.small, full: img.urls.full }
        })
    )
}