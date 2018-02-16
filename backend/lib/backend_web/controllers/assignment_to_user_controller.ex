defmodule BackendWeb.AssignmentToUserController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.AssignmentToUser

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    assignments_to_users = Auth.list_assignments_to_users()
    render(conn, "index.json", assignments_to_users: assignments_to_users)
  end

  def create(conn, %{"assignment_to_user" => assignment_to_user_params}) do
    with {:ok, %AssignmentToUser{} = assignment_to_user} <- Auth.create_assignment_to_user(assignment_to_user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", assignment_to_user_path(conn, :show, assignment_to_user))
      |> render("show.json", assignment_to_user: assignment_to_user)
    end
  end

  def show(conn, %{"id" => id}) do
    assignment_to_user = Auth.get_assignment_to_user!(id)
    render(conn, "show.json", assignment_to_user: assignment_to_user)
  end

  def update(conn, %{"id" => id, "assignment_to_user" => assignment_to_user_params}) do
    assignment_to_user = Auth.get_assignment_to_user!(id)

    with {:ok, %AssignmentToUser{} = assignment_to_user} <- Auth.update_assignment_to_user(assignment_to_user, assignment_to_user_params) do
      render(conn, "show.json", assignment_to_user: assignment_to_user)
    end
  end

  def delete(conn, %{"id" => id}) do
    assignment_to_user = Auth.get_assignment_to_user!(id)
    with {:ok, %AssignmentToUser{}} <- Auth.delete_assignment_to_user(assignment_to_user) do
      send_resp(conn, :no_content, "")
    end
  end
end
