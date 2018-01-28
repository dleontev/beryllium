// import entire SDK
var AWS = require("aws-sdk");

var bucketName = "beryllium-west";
var bucketRegion = "us-west-2";
var IdentityPoolId = "us-west-2:6b53c150-2bd3-4755-a987-b9f7b1b3a3af";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

AWS.config.credentials.get(function(err) {
  if (err) alert(err);
  console.log(AWS.config.credentials);
});

var s3 = new AWS.S3({
  params: { Bucket: bucketName }
});

export default {
  upload(path, files) {
    if (!files.length) {
      return alert("Please choose a file to upload first.");
    }

    var file = files[0];
    var fileName = file.name;
    var newUploadKey = encodeURIComponent(path) + "/" + fileName;

    return s3.upload(
      {
        Key: photoKey,
        Body: file,
        ACL: "public-read"
      },
      function(err, data) {
        if (err) {
          return alert(
            "There was an error uploading your file: ",
            err.message
          );
        }
        alert("Successfully uploaded file.");
      }
    );
  }

  // delete(albumName, photoKey) {
  //   s3.deleteObject({ Key: photoKey }, function(err, data) {
  //     if (err) {
  //       return alert("There was an error deleting your photo: ", err.message);
  //     }
  //     alert("Successfully deleted photo.");
  //     this.viewAlbum(albumName);
  //   });
  // },

  // listAlbums() {
  //   s3.listObjects({ Delimiter: "/" }, function(err, data) {
  //     if (err) {
  //       return alert("There was an error listing your albums: " + err.message);
  //     } else {
  //       var albums = data.CommonPrefixes.map(function(commonPrefix) {
  //         var prefix = commonPrefix.Prefix;
  //         var albumName = decodeURIComponent(prefix.replace("/", ""));
  //         return [
  //           "<li>",
  //           "<span onclick=\"deleteAlbum('" + albumName + "')\">X</span>",
  //           "<span onclick=\"viewAlbum('" + albumName + "')\">",
  //           albumName,
  //           "</span>",
  //           "</li>"
  //         ];
  //       });
  //       var message = albums.length
  //         ? [
  //             "<p>Click on an album name to view it.</p>",
  //             "<p>Click on the X to delete the album.</p>"
  //           ]
  //         : "<p>You do not have any albums. Please Create album.";
  //       var htmlTemplate = [
  //         "<h2>Albums</h2>",
  //         message,
  //         "<ul>",
  //         albums,
  //         "</ul>",
  //         "<button onclick=\"createAlbum(prompt('Enter Album Name:'))\">",
  //         "Create New Album",
  //         "</button>"
  //       ];
  //       console.log(htmlTemplate);
  //     }
  //   });
  // },

  // viewAlbum(albumName) {
  //   var albumPhotosKey = encodeURIComponent(albumName) + "//";
  //   s3.listObjects({ Prefix: albumPhotosKey }, function(err, data) {
  //     if (err) {
  //       return alert("There was an error viewing your album: " + err.message);
  //     }
  //     // `this` references the AWS.Response instance that represents the response
  //     var href = this.request.httpRequest.endpoint.href;
  //     var bucketUrl = href + bucketName + "/";

  //     var photos = data.Contents.map(function(photo) {
  //       var photoKey = photo.Key;
  //       var photoUrl = bucketUrl + encodeURIComponent(photoKey);
  //       return [
  //         "<span>",
  //         "<div>",
  //         '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
  //         "</div>",
  //         "<div>",
  //         "<span onclick=\"deletePhoto('" +
  //           albumName +
  //           "','" +
  //           photoKey +
  //           "')\">",
  //         "X",
  //         "</span>",
  //         "<span>",
  //         photoKey.replace(albumPhotosKey, ""),
  //         "</span>",
  //         "</div>",
  //         "<span>"
  //       ];
  //     });
  //     var message = photos.length
  //       ? "<p>Click on the X to delete the photo</p>"
  //       : "<p>You do not have any photos in this album. Please add photos.</p>";
  //     var htmlTemplate = [
  //       "<h2>",
  //       "Album: " + albumName,
  //       "</h2>",
  //       message,
  //       "<div>",
  //       photos,
  //       "</div>",
  //       '<input id="photoupload" type="file" accept="image/*">',
  //       '<button id="addphoto" onclick="addPhoto(\'' + albumName + "')\">",
  //       "Add Photo",
  //       "</button>",
  //       '<button onclick="listAlbums()">',
  //       "Back To Albums",
  //       "</button>"
  //     ];
  //     console.log(htmlTemplate);
  //   });
  // },

  // createAlbum(albumName) {
  //   albumName = albumName.trim();
  //   if (!albumName) {
  //     return alert(
  //       "Album names must contain at least one non-space character."
  //     );
  //   }
  //   if (albumName.indexOf("/") !== -1) {
  //     return alert("Album names cannot contain slashes.");
  //   }
  //   var albumKey = encodeURIComponent(albumName) + "/";
  //   s3.headObject({ Key: albumKey }, function(err, data) {
  //     if (!err) {
  //       return alert("Album already exists.");
  //     }
  //     if (err.code !== "NotFound") {
  //       return alert("There was an error creating your album: " + err.message);
  //     }
  //     s3.putObject({ Key: albumKey }, function(err, data) {
  //       if (err) {
  //         return alert(
  //           "There was an error creating your album: " + err.message
  //         );
  //       }
  //       alert("Successfully created album.");
  //       this.viewAlbum(albumName);
  //     });
  //   });
  // },

  // deleteAlbum(albumName) {
  //   var albumKey = encodeURIComponent(albumName) + "/";
  //   s3.listObjects({ Prefix: albumKey }, function(err, data) {
  //     if (err) {
  //       return alert("There was an error deleting your album: ", err.message);
  //     }
  //     var objects = data.Contents.map(function(object) {
  //       return { Key: object.Key };
  //     });
  //     s3.deleteObjects(
  //       {
  //         Delete: { Objects: objects, Quiet: true }
  //       },
  //       function(err, data) {
  //         if (err) {
  //           return alert(
  //             "There was an error deleting your album: ",
  //             err.message
  //           );
  //         }
  //         alert("Successfully deleted album.");
  //         this.listAlbums();
  //       }
  //     );
  //   });
  // }
};
