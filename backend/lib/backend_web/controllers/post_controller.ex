defmodule BackendWeb.PostController do
  use BackendWeb, :controller
  use PhoenixHtmlSanitizer, :basic_html

  alias Backend.Auth
  alias Backend.Auth.Post

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _params) do
    posts = Auth.list_posts()
    render(conn, "index.json", posts: posts)
  end

  def create(conn, %{
        "section_id" => section_id,
        "is_discussion" => is_discussion,
        "title" => title,
        "message" => message
      }) do
    %{id: user_id} = Guardian.Plug.current_resource(conn)
    [head | tail] = Auth.check_if_teacher(section_id, conn, user_id)
    if((is_discussion == false && head == "teacher") || is_discussion == true) do
      discussion_id = Ecto.UUID.generate()

      discussion_params = %{
        id: discussion_id,
        section_id: section_id,
        title: title,
        is_discussion: is_discussion,
        is_locked: false
      }

      Auth.create_discussion(discussion_params)
      {_, result} = sanitize(message, :basic_html)
      post_params = %{
        content: result,
        user_id: user_id,
        discussion_id: discussion_id
      }

      with {:ok, %Post{} = post} <- Auth.create_post(post_params) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", post_path(conn, :show, post))
        |> render("show_base.json", post: post)
      end
    end
  end


  def create(conn, %{"discussion_id" => discussion_id, "content" => content, "parent_id" => parent_id}) do
    %{id: user_id} = Guardian.Plug.current_resource(conn)
    id = Ecto.UUID.generate();
    post_params = %{id: id, discussion_id: discussion_id, parent_id: parent_id, user_id: user_id, content: content}
    with {:ok, %Post{} = post} <- Auth.create_post(post_params) do
      process_name = String.to_atom(discussion_id)
      if(GenServer.whereis(process_name) != nil) do
        Agent.update(process_name, fn amount -> amount + 1 end)
      end
      BackendWeb.Endpoint.broadcast("notifications:discussion"<>discussion_id, "new_response", %{})
      BackendWeb.Endpoint.broadcast("notifications:replies"<>parent_id, "new_response", %{})
      conn
      |> put_status(:created)
      |> put_resp_header("location", post_path(conn, :show, post))
      |> render("post_single.json", post: post)
    end
  end

  def show(conn, %{"id" => id}) do
    post = Auth.get_post_by_discussion_id(id)
    render(conn, "show.json", post: post)
  end

  def show_all(conn, %{"discussion_id" => discussionid}) do
    posts = Auth.list_posts_by_discussion(discussionid)
    render(conn, "show_all.json", posts: posts)
  end

  def show_children(conn, %{"post_id" => post_id}) do
    posts = Auth.list_posts_by_parent(post_id)
    render(conn, "show_all_with_user_id.json", posts: posts)
  end

  def show_self(conn, %{"post_id" => post_id}) do
    post = Auth.get_post!(post_id)
    render(conn, "show_is_deleted.json", post: post)
  end

  def update(conn, %{"id" => id, "post" => post_params}) do
    post = Auth.get_post!(id)

    with {:ok, %Post{} = post} <- Auth.update_post(post, post_params) do
      render(conn, "show_is_deleted.json", post: post)
    end
  end

  def delete(conn, %{"id" => id}) do
    post = Auth.get_post!(id)

    with {:ok, %Post{}} <- Auth.delete_post(post) do
      send_resp(conn, :no_content, "")
    end
  end
end
