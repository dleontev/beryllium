defmodule BackendWeb.AssignmentController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Assignment

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    assignments = Auth.list_assignments()
    render(conn, "index.json", assignments: assignments)
  end

  def create(conn, %{"assignment" => assignment_params}) do
    with {:ok, %Assignment{} = assignment} <- Auth.create_assignment(assignment_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", assignment_path(conn, :show, assignment))
      |> render("show.json", assignment: assignment)
    end
  end

  def show(conn, %{"id" => id}) do
    assignment = Auth.get_assignment!(id)
    render(conn, "show.json", assignment: assignment)
  end

  def assignments_by_section(conn, %{"section_id" => section_id}) do
    {:ok}
  end

  def update(conn, %{"id" => id, "assignment" => assignment_params}) do
    assignment = Auth.get_assignment!(id)

    with {:ok, %Assignment{} = assignment} <- Auth.update_assignment(assignment, assignment_params) do
      render(conn, "show.json", assignment: assignment)
    end
  end

  def delete(conn, %{"id" => id}) do
    assignment = Auth.get_assignment!(id)
    with {:ok, %Assignment{}} <- Auth.delete_assignment(assignment) do
      send_resp(conn, :no_content, "")
    end
  end
end
