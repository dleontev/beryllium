defmodule BackendWeb.AssignmentToGroupController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.AssignmentToGroup

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    assignments_to_groups = Auth.list_assignments_to_groups()
    render(conn, "index.json", assignments_to_groups: assignments_to_groups)
  end

  def create(conn, %{"assignment_to_group" => assignment_to_group_params}) do
    with {:ok, %AssignmentToGroup{} = assignment_to_group} <- Auth.create_assignment_to_group(assignment_to_group_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", assignment_to_group_path(conn, :show, assignment_to_group))
      |> render("show.json", assignment_to_group: assignment_to_group)
    end
  end

  def show(conn, %{"id" => id}) do
    assignment_to_group = Auth.get_assignment_to_group!(id)
    render(conn, "show.json", assignment_to_group: assignment_to_group)
  end

  def update(conn, %{"id" => id, "assignment_to_group" => assignment_to_group_params}) do
    assignment_to_group = Auth.get_assignment_to_group!(id)

    with {:ok, %AssignmentToGroup{} = assignment_to_group} <- Auth.update_assignment_to_group(assignment_to_group, assignment_to_group_params) do
      render(conn, "show.json", assignment_to_group: assignment_to_group)
    end
  end

  def delete(conn, %{"id" => id}) do
    assignment_to_group = Auth.get_assignment_to_group!(id)
    with {:ok, %AssignmentToGroup{}} <- Auth.delete_assignment_to_group(assignment_to_group) do
      send_resp(conn, :no_content, "")
    end
  end
end
