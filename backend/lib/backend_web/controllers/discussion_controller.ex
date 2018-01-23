defmodule BackendWeb.DiscussionController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Discussion

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    discussions = Auth.list_discussions()
    render(conn, "index.json", discussions: discussions)
  end

  def create(conn,%{"sectionid" => sectionid, "is_discussion" => is_discussion, "title" => title, "message" => message}) do
    %{id: id} = Guardian.Plug.current_resource(conn)
    user_id = id
    postid = Ecto.UUID.generate()
    post_params = %{id: postid, content: message, userid: user_id}
    Auth.create_post(post_params)
    discussion_params = %{id: Ecto.UUID.generate(), is_discussion: is_discussion, sectionid: sectionid, title: title, postid: postid}
    with {:ok, %Discussion{} = discussion} <- Auth.create_discussion(discussion_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", discussion_path(conn, :show, discussion))
      |> render("show.json", discussion: discussion)
    end
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

    with {:ok, %Discussion{} = discussion} <- Auth.update_discussion(discussion, discussion_params) do
      render(conn, "show.json", discussion: discussion)
    end
  end

  def delete(conn, %{"id" => id}) do
    discussion = Auth.get_discussion!(id)
    with {:ok, %Discussion{}} <- Auth.delete_discussion(discussion) do
      send_resp(conn, :no_content, "")
    end
  end
end
