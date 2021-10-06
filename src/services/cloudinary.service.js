export function uploadImg(ev) {
    const CLOUD_NAME = 'dh4cdbmav'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    // console.log('target', ev.target)
    formData.append('file', ev.target.files[0])
    console.log('ev.target.files[0]):', ev.target.files[0])
    formData.append('upload_preset', 'wbls0qti');
    // console.log('formData:', formData)

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => res.url)
        .catch(err => console.error(err))
}
