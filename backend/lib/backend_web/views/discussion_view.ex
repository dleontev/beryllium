defmodule BackendWeb.DiscussionView do
  use BackendWeb, :view
  alias BackendWeb.DiscussionView

  def render("index.json", %{discussions: discussions}) do
    %{data: render_many(discussions, DiscussionView, "discussion.json")}
  end

  def render("show.json", %{discussion: discussion}) do
    %{data: render_one(discussion, DiscussionView, "discussion.json")}
  end

  def render("discussion.json", %{discussion: discussion}) do
    %{id: discussion.id, is_locked: discussion.is_locked, title: discussion.title}
  end

  def render("show_all.json", %{discussions: discussions}) do
    %{data: render_many(discussions, DiscussionView, "discussions_all.json")}
  end

  def render("discussions_all.json", %{discussion: discussion}) do
    %{
      id: discussion.id,
      title: discussion.title,
      content: discussion.content,
      inserted_at: discussion.inserted_at,
      is_locked: discussion.is_locked,
      is_pinned: discussion.is_pinned,
      updated_at: discussion.updated_at,
      author_name: discussion.author_name,
      author_id: discussion.author_id
    }
  end
end
