defmodule BackendWeb.CourseController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Course

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _params) do
    # IO.puts(to_string(Guardian.Plug.current_resource(conn)))
    courses = Auth.list_courses(conn)
    render(conn, "index.json", courses: courses)
  end

  def create(conn, %{"course" => course_params}) do
    with {:ok, %Course{} = course} <- Auth.create_course(course_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", course_path(conn, :show, course))
      |> render("show.json", course: course)
    end
  end

  def show(conn, %{"id" => id}) do
    course = Auth.get_course!(id)
    render(conn, "show.json", course: course)
  end

  def show(conn, %{"section_id" => section_id}) do
    course = Auth.get_course(section_id)
    render(conn, "show.json", course: course)
  end

  def show_all(conn, _params) do
    %{id: id} = Guardian.Plug.current_resource(conn)
    courses = Auth.list_courses(id)
    render(conn, "show_all.json", courses: courses)
  end

  def update(conn, %{"id" => id, "course" => course_params}) do
    course = Auth.get_course!(id)

    with {:ok, %Course{} = course} <- Auth.update_course(course, course_params) do
      render(conn, "show.json", course: course)
    end
  end

  def delete(conn, %{"id" => id}) do
    course = Auth.get_course!(id)

    with {:ok, %Course{}} <- Auth.delete_course(course) do
      send_resp(conn, :no_content, "")
    end
  end
end
