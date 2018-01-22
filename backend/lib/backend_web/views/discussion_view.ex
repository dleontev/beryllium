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
    %{id: discussion.id}
  end
end
