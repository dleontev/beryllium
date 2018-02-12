defmodule BackendWeb.QuizController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Quiz

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    quizzes = Auth.list_quizzes()
    render(conn, "index.json", quizzes: quizzes)
  end

  def create(conn, %{"quiz" => quiz_params}) do
    with {:ok, %Quiz{} = quiz} <- Auth.create_quiz(quiz_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", quiz_path(conn, :show, quiz))
      |> render("show.json", quiz: quiz)
    end
  end

  def show(conn, %{"id" => id}) do
    quiz = Auth.get_quiz!(id)
    render(conn, "show.json", quiz: quiz)
  end

  def update(conn, %{"id" => id, "quiz" => quiz_params}) do
    quiz = Auth.get_quiz!(id)

    with {:ok, %Quiz{} = quiz} <- Auth.update_quiz(quiz, quiz_params) do
      render(conn, "show.json", quiz: quiz)
    end
  end

  def delete(conn, %{"id" => id}) do
    quiz = Auth.get_quiz!(id)
    with {:ok, %Quiz{}} <- Auth.delete_quiz(quiz) do
      send_resp(conn, :no_content, "")
    end
  end
end
