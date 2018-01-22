defmodule BackendWeb.PostController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Post

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    posts = Auth.list_posts()
    render(conn, "index.json", posts: posts)
  end

  def create(conn, %{"post" => post_params}) do
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
