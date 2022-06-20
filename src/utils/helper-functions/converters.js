const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const blobToFile = (blob, filename, type) => {
    console.log(blob, "blob in converter")
    return new File([blob], filename, { type, lastModified: new Date().getTime() })
}

const urltoFile = (url, filename, mimeType) => {
    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
}

export { fileToBase64, blobToFile, urltoFile }