defmodule BackendWeb.PostView do
  use BackendWeb, :view
  alias BackendWeb.PostView

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post.json")}
  end

  def render("show_all.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post_detailed.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, PostView, "post.json")}
  end

  def render("post.json", %{post: post}) do
    %{id: post.id}
  end

  def render("post_detailed.json", %{post: post}) do
    %{
      id: post.id, 
      inserted_at: post.inserted_at, 
      updated_at: post.updated_at, 
      content: post.content, 
      parent_id: post.parent_id, 
      author_name: post.author_name
    }
  end
end
