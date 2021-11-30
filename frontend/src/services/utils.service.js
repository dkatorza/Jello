export const utilsService = {
    makeId,
    getRandomIntInclusive,
    isValidImg,
    isValidUrl,
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function isValidImg(filename) {
    return (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(filename)
}

function isValidUrl(txt) {
    const urlExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
    return urlExp.test(txt)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
    //The maximum is inclusive and the minimum is inclusive 
}
