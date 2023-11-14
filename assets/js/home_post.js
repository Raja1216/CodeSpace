{
  // Method to submit the new post form using Ajax
  let createPost = () => {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "POST",
        url: "/posts/create-post",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
        },
        error: (err) => {
          console.log("Error:", err.responseText);
        },
      });
    });
  };

  // Method to create a new post in DOM
  let newPostDom = (post) => {
    return $(`<li id="post-${post.id}">
    <div class="user-posts">
      <p>${post.content}</p>
      <small>Auther: ${post.user.name}</small>
      <small class="delete-link">
        <a
          href="posts/destroy/${post.id}"
          title="Delete Post"
          class="delete-post-btn"
          >X</a
        >
      </small>
    </div>
    <hr />
    <div class="post-comments">
      <h3>Comments:</h3>
      <ul id="post-comments-${post._id}">
        
      </ul>
    </div>
    <div class="post-comments-form">
      <form action="comments/create" method="post">
        <input
          type="text"
          name="content"
          placeholder="Type Here To Add Comment..."
          class="comment-input"
          required
        />
        <input type="hidden" name="post" value="${post._id}" />
        <input type="submit" class="comment-btn" value="Add Comment" />
      </form>
    </div>
  </li>
  `);
  };

  createPost();
}
