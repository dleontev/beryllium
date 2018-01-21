defmodule BackendWeb.UserController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.User

  action_fallback BackendWeb.FallbackController

  plug Guardian.Plug.EnsureAuthenticated, [handler: Sling.SessionController] when action in [:show_by_course, :show_by_group, :update, :index, :show, :delete]

  def index(conn, _params) do
    users = Auth.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"email" => email, "first_name" => first_name,
  "middle_name" => middle_name, "last_name" => last_name, "password" => password}) do
    user_params = %{id: Ecto.UUID.generate(), email: email, first_name: first_name, 
    middle_name: middle_name, last_name: last_name, password: Auth.hash_password(password)}
    with {:ok, %User{} = user} <- Auth.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, _params) do
    %{id: id} = Guardian.Plug.current_resource(conn)
    user = Auth.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def show_by_course(conn, %{"section_id" => section_id}) do
    users = Auth.list_users_by_section(section_id)
    render(conn, "index_by_course.json", users: users)
  end

  def show_by_group(conn, %{"group_id" => group_id}) do
    users = Auth.list_users_by_group(group_id)
    render(conn, "index.json", users: users)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Auth.get_user!(id)

    with {:ok, %User{} = user} <- Auth.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Auth.get_user!(id)
    with {:ok, %User{}} <- Auth.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
