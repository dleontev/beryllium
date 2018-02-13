defmodule BackendWeb.Assignment_to_groupsetController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Assignment_to_groupset

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    assignments_to_groupsets = Auth.list_assignments_to_groupsets()
    render(conn, "index.json", assignments_to_groupsets: assignments_to_groupsets)
  end

  def create(conn, %{"assignment_to_groupset" => assignment_to_groupset_params}) do
    with {:ok, %Assignment_to_groupset{} = assignment_to_groupset} <- Auth.create_assignment_to_groupset(assignment_to_groupset_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", assignment_to_groupset_path(conn, :show, assignment_to_groupset))
      |> render("show.json", assignment_to_groupset: assignment_to_groupset)
    end
  end

  def show(conn, %{"id" => id}) do
    assignment_to_groupset = Auth.get_assignment_to_groupset!(id)
    render(conn, "show.json", assignment_to_groupset: assignment_to_groupset)
  end

  def update(conn, %{"id" => id, "assignment_to_groupset" => assignment_to_groupset_params}) do
    assignment_to_groupset = Auth.get_assignment_to_groupset!(id)

    with {:ok, %Assignment_to_groupset{} = assignment_to_groupset} <- Auth.update_assignment_to_groupset(assignment_to_groupset, assignment_to_groupset_params) do
      render(conn, "show.json", assignment_to_groupset: assignment_to_groupset)
    end
  end

  def delete(conn, %{"id" => id}) do
    assignment_to_groupset = Auth.get_assignment_to_groupset!(id)
    with {:ok, %Assignment_to_groupset{}} <- Auth.delete_assignment_to_groupset(assignment_to_groupset) do
      send_resp(conn, :no_content, "")
    end
  end
end
