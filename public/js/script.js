// dom elements
const file = document.querySelector('#file');
const display = document.querySelector('#display');
const downld = document.querySelector('#downld');
const fileType = document.querySelector('#fileType');
const origSize = document.querySelector('#origSize');
const newSize = document.querySelector('#newSize');
const savedSize = document.querySelector('#savedSize');
const dWidth = document.querySelector('#dWidth');
const dHeight = document.querySelector('#dHeight');
const pCompress = document.querySelector('#compress');
const downloadButton = document.querySelector('#downloadButton') ? document.querySelector('#downloadButton') : '';

file.addEventListener('click', function (e) {
    downld.innerHTML = '';
    origSize.innerHTML = '';
    newSize.innerHTML ='';
})

async function showImage(src) {
    var fr = new FileReader();
    // when image is loaded, set the src of the image where you want to display it
    let target = document.createElement('img');
    fr.onload = function (e) { 
        target.src = this.result;
        display.appendChild(target);
    };
    src.addEventListener("change", function () {
        // fill fr with image data  
        fr.readAsDataURL(src.files[0]);
        compress(src, fileType);
    });
}

// for (let i = 0; i < file.files.length; i++) {
showImage(file);
// }

async function compress(file, fileType) {
    var f = file.files[0];
    var fileName = f.name.split('.')[0];
    // const origSize = f.size;
    origSize.innerHTML = `Original Size: ${f.size / 1000000}MB`;

    console.info(f.size);
    var img = new Image();
    img.src = URL.createObjectURL(f);
    img.onload = function () {
        dWidth.placeholder = `Original width: ${img.width}`;
        dHeight.placeholder = `Original height: ${img.height}`;

        pCompress.addEventListener('click', function (e) {
            e.preventDefault();
            var canvas = document.createElement('canvas');
            canvas.width = dWidth.value ? dWidth.value : img.width;
            canvas.height = dHeight.value ? dHeight.value : img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(function (blob) {
                console.info(blob.size);
                newSize.innerHTML = `New Size: ${blob.size / 1000000}MB`;
                // fileType.addEventListener('change', function(e) {
                // if (fileType.value !== '') {

                downld.innerHTML = '';
                var f2 = new File([blob], fileName + `.${fileType.value}`);
                console.log(f2);
                console.log(f2.name);
                url = window.URL.createObjectURL(blob);
                console.log(url);
                let dwl = document.createElement('a');
                dwl.id = 'downloadButton';
                downld.appendChild(dwl);
                dwl.innerText = 'Download'
                dwl.href = url;
                dwl.download = f2.name;
                dwl.className = 'btn btn-info mb-1 form-control';
                dwl.style.width = '350px auto';
                // dwl.click();
                // window.URL.revokeObjectURL(url);
                // }
                // }) 
 
            }, 'image/jpeg', 0.4);
        })
    }
}

