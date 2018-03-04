defmodule BackendWeb.GradeController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Grade

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    grades = Auth.list_grades()
    render(conn, "index.json", grades: grades)
  end

  def create(conn, %{"grade" => grade_params}) do
    with {:ok, %Grade{} = grade} <- Auth.create_grade(grade_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", grade_path(conn, :show, grade))
      |> render("show.json", grade: grade)
    end
  end

  def show(conn, %{"id" => id}) do
    grade = Auth.get_grade!(id)
    render(conn, "show.json", grade: grade)
  end

  def update(conn, %{"id" => id, "grade" => grade_params}) do
    grade = Auth.get_grade!(id)

    with {:ok, %Grade{} = grade} <- Auth.update_grade(grade, grade_params) do
      render(conn, "show.json", grade: grade)
    end
  end

  def delete(conn, %{"id" => id}) do
    grade = Auth.get_grade!(id)
    with {:ok, %Grade{}} <- Auth.delete_grade(grade) do
      send_resp(conn, :no_content, "")
    end
  end
end
