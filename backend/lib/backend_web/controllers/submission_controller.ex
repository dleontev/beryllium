defmodule BackendWeb.SubmissionController do
  use BackendWeb, :controller
  use PhoenixHtmlSanitizer, :basic_html

  alias Backend.Auth
  alias Backend.Auth.Submission
  alias Backend.Auth.Answer

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    submissions = Auth.list_submissions()
    render(conn, "index.json", submissions: submissions)
  end

  def create(conn, %{"submission" => payload}) do
    %{id: user_id} = Guardian.Plug.current_resource(conn)
    id = Ecto.UUID.generate()
    group_id = 
      case String.length(payload["group_id"]) do
        0 ->
          nil
        _ -> 
          payload["group_id"]
      end
    submission_params = 
      case payload["type"] do
        0 -> 
          {_, result} = sanitize(payload["text_entry"], :basic_html)
          %{id: id, user_id: user_id, assignment_id: payload["assignment_id"], group_id: group_id, text_entry: result}
        2 ->
          %{id: id, user_id: user_id, assignment_id: payload["assignment_id"], group_id: group_id}
        _ -> nil
      end
    with {:ok, %Submission{} = submission} <- Auth.create_submission(submission_params) do
      if(payload["type"] == 0) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", submission_path(conn, :show, submission))
        |> render("show.json", submission: submission)
      else
        answer_params = Auth.parse_bulk_answers(id, payload["quiz_answers"], [])
        Backend.Repo.insert_all(Answer, answer_params)
        
        quiz_info = Backend.Auth.gather_quiz_info(payload["quiz_id"], id)
        grade = Backend.Auth.grade_quiz(quiz_info)
        grade_params = %{id: Ecto.UUID.generate(), submission_id: id, points_earned: grade}
        Auth.create_grade(grade_params)
        conn
        |> put_status(:created)
        |> put_resp_header("location", submission_path(conn, :show, submission))
        |> render("show.json", submission: submission)
      end
    end

    #if(payload["type"] == 0) do
    #  {_, result} = sanitize(payload["text_entry"], :basic_html)
    #  %{id: user_id} = Guardian.Plug.current_resource(conn)
    #  id = Ecto.UUID.generate()
    #  submission_params = %{id: id, user_id: user_id, assignment_id: payload["assignment_id"], file_id: payload["file_id"], text_entry: result}
    #  with {:ok, %Submission{} = submission} <- Auth.create_submission(submission_params) do
    #    conn
    #   |> put_status(:created)
    #    |> put_resp_header("location", submission_path(conn, :show, submission))
    #    |> render("show.json", submission: submission)
    #  end
    #end
  end

  def count_submissions_by_assignment(conn, %{"assignment_id" => assignment_id}) do
    count = Auth.count_submissions_by_assignment(assignment_id)
    render(conn, "show_count.json", submission: count)
  end

  def count_submissions_by_assignment_individual(conn, %{"assignment_id" => assignment_id}) do
    %{id: user_id} = Guardian.Plug.current_resource(conn)
    count = Auth.count_submissions_by_assignment(assignment_id, user_id)
    render(conn, "show_count.json", submission: count)
  end

  def show_submissions_by_assignment(conn, %{"assignment_id" => assignment_id}) do
    %{id: user_id} = Guardian.Plug.current_resource(conn)
    submissions = Auth.get_submissions_by_assignment(assignment_id)
    render(conn, "show_by_assignment.json", submissions: submissions)
  end

  def show_submissions_by_assignment_individual(conn, %{"assignment_id" => assignment_id}) do
  %{id: user_id} = Guardian.Plug.current_resource(conn)
    submissions = Auth.get_submissions_by_assignment_individual(assignment_id, user_id)
    render(conn, "show_by_assignment.json", submissions: submissions)
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
