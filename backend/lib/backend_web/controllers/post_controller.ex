defmodule BackendWeb.PostController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Post
  
  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    posts = Auth.list_posts()
    render(conn, "index.json", posts: posts)
  end

  def create(conn, %{"sectionid" => sectionid, "is_discussion" => is_discussion, "title" => title, "message" => message}) do
    %{id: userid} = Guardian.Plug.current_resource(conn)

    discussionid = Ecto.UUID.generate()
    discussion_params = %{id: discussionid, sectionid: sectionid, title: title, is_discussion: is_discussion, is_locked: false }  
    Auth.create_discussion(discussion_params)

    post_params = %{id: Ecto.UUID.generate(), content: message, userid: userid, discussionid: discussionid}

    with {:ok, %Post{} = post} <- Auth.create_post(post_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", post_path(conn, :show, post))
      |> render("show.json", post: post)
    end
  end

  def show(conn, %{"id" => id}) do
    post = Auth.get_post!(id)
    render(conn, "show.json", post: post)
  end

  def update(conn, %{"id" => id, "post" => post_params}) do
    post = Auth.get_post!(id)

    with {:ok, %Post{} = post} <- Auth.update_post(post, post_params) do
      render(conn, "show.json", post: post)
    end
  end

  def delete(conn, %{"id" => id}) do
    post = Auth.get_post!(id)
    with {:ok, %Post{}} <- Auth.delete_post(post) do
      send_resp(conn, :no_content, "")
    end
  end
end
