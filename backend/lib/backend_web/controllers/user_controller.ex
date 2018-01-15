defmodule BackendWeb.UserController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.User

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    users = Auth.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"users" => %{"email" => email, "first_name" => first_name,
  "middle_name" => middle_name, "last_name" => last_name, "time_zone" => time_zone, "password" => password}}) do
    user_params = %{id: Ecto.UUID.generate(), email: email, first_name: first_name, middle_name: middle_name, last_name: last_name, time_zone: time_zone, password: Auth.hash_password(password)}
    with {:ok, %User{} = user} <- Auth.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end
  @doc"""
  def show(conn, %{"id" => id}) do
    user = Auth.get_user!(id)
    render(conn, "show.json", user: user)
  end
  """


  def show(conn, %{"user" => %{"email" => email, "password" => password}}) do
    user = %{email: email, password: password}
    render(conn, "validate.json", user: user)
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
