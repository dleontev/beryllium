defmodule BackendWeb.PostView do
  use BackendWeb, :view
  alias BackendWeb.PostView

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post.json")}
  end

  def render("show_all.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post_detailed.json")}
  end

  def render("show_all_with_user_id.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post_detailed_with_user_id.json")}
  end

  def render("show.json", %{post: post}) do
    IO.puts("INSPECTING POST----------------------------------------------------")
    IO.inspect(post)
    %{data: render_one(post, PostView, "post.json")}
  end

  def render("post.json", %{post: [%{id: id, content: content, inserted_at: inserted_at, updated_at: updated_at, parent_id: parent_id, author_name: author_name}]}) do
    %{id: id, content: content, inserted_at: inserted_at, updated_at: updated_at, parent_id: parent_id, author_name: author_name}
  end

  def render("post_single.json", %{post: post}) do
     %{id: post.id, content: post.content, inserted_at: post.inserted_at, updated_at: post.updated_at, parent_id: post.parent_id}
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

  def render("post_detailed_with_user_id.json", %{post: post}) do
    %{
      id: post.id,
      inserted_at: post.inserted_at,
      updated_at: post.updated_at,
      content: post.content,
      parent_id: post.parent_id,
      user_id: post.user_id,
      author_name: post.author_name
    }
  end
end
