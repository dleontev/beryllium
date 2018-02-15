defmodule BackendWeb.EnrollmentController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Enrollment

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _params) do
    enrollments = Auth.list_enrollments()
    render(conn, "index.json", enrollments: enrollments)
  end

  def create(conn, %{"enrollment" => enrollment_params}) do
    with {:ok, %Enrollment{} = enrollment} <- Auth.create_enrollment(enrollment_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", enrollment_path(conn, :show, enrollment))
      |> render("show.json", enrollment: enrollment)
    end
  end

  def show(conn, %{"id" => id}) do
    enrollment = Auth.get_enrollment!(id)
    render(conn, "show.json", enrollment: enrollment)
  end

  def show(conn, %{"section_id" => section_id}) do
    %{id: user_id} = Guardian.Plug.current_resource(conn)
    enrollment = Auth.get_enrollment!(user_id, section_id)
    render(conn, "show.json", enrollment: enrollment)
  end

  def update(conn, %{"id" => id, "enrollment" => enrollment_params}) do
    enrollment = Auth.get_enrollment!(id)

    with {:ok, %Enrollment{} = enrollment} <-
           Auth.update_enrollment(enrollment, enrollment_params) do
      render(conn, "show.json", enrollment: enrollment)
    end
  end

  def delete(conn, %{"id" => id}) do
    enrollment = Auth.get_enrollment!(id)

    with {:ok, %Enrollment{}} <- Auth.delete_enrollment(enrollment) do
      send_resp(conn, :no_content, "")
    end
  end
end
