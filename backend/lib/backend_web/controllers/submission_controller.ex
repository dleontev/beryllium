defmodule BackendWeb.SubmissionController do
  use BackendWeb, :controller
  use PhoenixHtmlSanitizer, :basic_html

  alias Backend.Auth
  alias Backend.Auth.Submission

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    submissions = Auth.list_submissions()
    render(conn, "index.json", submissions: submissions)
  end

  def create(conn, %{"submission" => payload}) do
    if(payload["type"] == 0) do
      {_, result} = sanitize(payload["text_entry"], :basic_html)
      %{id: user_id} = Guardian.Plug.current_resource(conn)
      id = Ecto.UUID.generate()
      submission_params = %{id: id, user_id: user_id, assignment_id: payload["assignment_id"], file_id: payload["file_id"], text_entry: result}
      with {:ok, %Submission{} = submission} <- Auth.create_submission(submission_params) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", submission_path(conn, :show, submission))
        |> render("show.json", submission: submission)
      end
    end
  end

  def show(conn, %{"id" => id}) do
    submission = Auth.get_submission!(id)
    render(conn, "show.json", submission: submission)
  end

  def update(conn, %{"id" => id, "submission" => submission_params}) do
    submission = Auth.get_submission!(id)

    with {:ok, %Submission{} = submission} <- Auth.update_submission(submission, submission_params) do
      render(conn, "show.json", submission: submission)
    end
  end

  def delete(conn, %{"id" => id}) do
    submission = Auth.get_submission!(id)
    with {:ok, %Submission{}} <- Auth.delete_submission(submission) do
      send_resp(conn, :no_content, "")
    end
  end
end
