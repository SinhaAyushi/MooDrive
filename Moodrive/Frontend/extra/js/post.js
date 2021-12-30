let Post = [];

let NewPost = new Object();


let date = new Date();
console.log(date.toDateString());


let PostBtn = document.getElementById("postBtn");
let popup = document.createElement('div');
popup.className = "popup";
popup.innerHTML = `
<div id="popupcard" class="card mt-3" style="width: 20rem;">
<h5 class="card-title my-3" style="text-align:center">Create Post</h5>
<div class="card-body">
<input type="text" id="post-Place" class="my-2" placeholder="Enter Location">
<input type="file" class="my-2" id="myInputfile">
<img src="" id="img-preview" />
<input type="text" id="post-Desc"  class="my-2" placeholder="Write about post!"><br>
<a href="#" class="btn btn-primary" id="SubmitPost">Post</a>
<a href="#" class="btn btn-primary" id="closePost">Close</a>
</div>
</div>
`

PostBtn.addEventListener("click", showPopUp);
function showPopUp() {

    document.getElementById("feed-list").append(popup);
    //--------------------------------------------------------------function for submit post----------------------------------------

    fileUpload = document.getElementById('myInputfile');
    // console.log(fileUpload)

    // imgPreview = document.getElementById('img-preview');
    // console.log(imgPreview)


    var CLOUDINARY_URL = "	https://api.cloudinary.com/v1_1/h2a3rb3o34u4r2/upload";
    var CLOUDINARY_UPLOAD_PRESET = "fineqi35";



    fileUpload.addEventListener('change', function (event) {
        var file = event.target.files[0];

        var formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

        axios({
            url: CLOUDINARY_URL,
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
        }).then(function (res) {
            NewPost.img = res.data.secure_url;
        }).catch(function (err) {
            console.log(err);
        })
            ;


    });



    let submitPost = document.getElementById('SubmitPost');
    submitPost.addEventListener('click', addToPost);
    let closePost = document.getElementById("closePost");
    closePost.addEventListener('click', () => {

        // console.log("Submit Post clicked!");
        document.getElementById('feed-list').removeChild(popup);
    })
}


let newPost = document.createElement('div');
newPost.className = "newPost";
newPost.innerHTML = `
<div class=" newPost card mt-3" style="width: 18rem;">
    <h5 class="card-title my-3" style="text-align:center">User Name</h5>
    <div class="card-body">
        <p class="card-text">Place</p>
        <p id="date">${date.toDateString()}</p>
        <img id="imgPreview" src="" alt="" style="width: 16rem;"> <br>
        <a href="#" class="btn btn-primary" id="likePost">Like</a>
        <a href="#" class="btn btn-primary" id="commentPost">Comment</a>
    </div>
</div>
`


function addToPost() {

    let postPlace = document.getElementById('post-Place');
    let postDesc = document.getElementById('post-Desc');
    NewPost.date= date.toDateString();
    NewPost.place = postPlace.value;
    NewPost.Desc = postDesc.value;

    // Post.push(NewPost);
    // console.log(Post);

    var user_id = Cookies.get('Harbour_auth');
    // console.log(user_id);
    
    $.post(`https://harbour-api.herokuapp.com/post/${user_id}`, NewPost, function (res) {
        swal({
            title: "success",
            text: res,
            icon: "success",
            button: "close!"
        })
    })
    .fail(function (res) {

        swal({
            title: res.status,
            text: res.responseText,
            icon: "warning",
            button: "close!"
        })
    })


    document.getElementById("feed-list").removeChild(popup);
}