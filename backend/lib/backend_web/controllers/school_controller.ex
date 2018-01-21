defmodule BackendWeb.SchoolController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.School

  plug Guardian.Plug.EnsureAuthenticated, [handler: BackendWeb.SessionController]

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    schools = Auth.list_schools()
    render(conn, "index.json", schools: schools)
  end

  def create(conn, %{"school" => school_params}) do
    with {:ok, %School{} = school} <- Auth.create_school(school_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", school_path(conn, :show, school))
      |> render("show.json", school: school)
    end
  end

  def show(conn, %{"id" => id}) do
    school = Auth.get_school!(id)
    render(conn, "show.json", school: school)
  end

  def update(conn, %{"id" => id, "school" => school_params}) do
    school = Auth.get_school!(id)

    with {:ok, %School{} = school} <- Auth.update_school(school, school_params) do
      render(conn, "show.json", school: school)
    end
  end

  def delete(conn, %{"id" => id}) do
    school = Auth.get_school!(id)
    with {:ok, %School{}} <- Auth.delete_school(school) do
      send_resp(conn, :no_content, "")
    end
  end
end
