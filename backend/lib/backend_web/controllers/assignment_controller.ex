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

  def create(conn, 
  %{
    "content" => content, 
    "due_at" => due_at, 
    "groupsets" => groupsets, 
    "is_published" => is_published, 
    "points_possible" => points_possible,
    "section_id" => section_id,
    "title" => title,
    "type" => type
  }) do
    id = Ecto.UUID.generate()
    assignment_params = %{
                          id: id, 
                          section_id: section_id, 
                          due_at: due_at, 
                          type: type,
                          content: content,
                          is_published: is_published,
                          points_possible: points_possible,
                          title: title
                        }
    with {:ok, %Assignment{} = assignment} <- Auth.create_assignment(assignment_params) do
      for n <- groupsets do
        params = %{id: Ecto.UUID.generate(), assignment_id: id, groupset_id: n}
        Auth.create_assignment_to_groupset(params)
      end
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
    IO.inspect(conn)
    IO.inspect(section_id)
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
