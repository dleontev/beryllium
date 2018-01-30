defmodule BackendWeb.DiscussionController do
  use BackendWeb, :controller
  import Ecto.Query, warn: false
  alias Backend.Auth
  alias Backend.Auth.Discussion
  alias Backend.Repo
  alias Backend.Auth.Post

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _params) do
    discussions = Auth.list_discussions()
    render(conn, "index.json", discussions: discussions)
  end

  def show(conn, %{"id" => id}) do
    discussion = Auth.get_discussion!(id)
    render(conn, "show.json", discussion: discussion)
  end

  def show_all(conn, %{"section_id" => section_id, "is_discussion" => is_discussion}) do
    discussions = Auth.list_discussions(section_id, is_discussion)
    render(conn, "show_all.json", discussions: discussions)
  end

  def update(conn, %{"id" => id, "discussion" => discussion_params}) do
    discussion = Auth.get_discussion!(id)

    with {:ok, %Discussion{} = discussion} <-
           Auth.update_discussion(discussion, discussion_params) do
      render(conn, "show.json", discussion: discussion)
    end
  end

  def delete(conn, %{"id" => id}) do
    discussion = Auth.get_discussion!(id)
    Repo.delete_all(from(p in Post, where: p.discussion_id == ^id))

    with {:ok, %Discussion{}} <- Auth.delete_discussion(discussion) do
      send_resp(conn, :no_content, "")
    end
  end
end
