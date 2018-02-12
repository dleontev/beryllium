defmodule BackendWeb.AnswerController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Answer

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    answers = Auth.list_answers()
    render(conn, "index.json", answers: answers)
  end

  def create(conn, %{"answer" => answer_params}) do
    with {:ok, %Answer{} = answer} <- Auth.create_answer(answer_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", answer_path(conn, :show, answer))
      |> render("show.json", answer: answer)
    end
  end

  def show(conn, %{"id" => id}) do
    answer = Auth.get_answer!(id)
    render(conn, "show.json", answer: answer)
  end

  def update(conn, %{"id" => id, "answer" => answer_params}) do
    answer = Auth.get_answer!(id)

    with {:ok, %Answer{} = answer} <- Auth.update_answer(answer, answer_params) do
      render(conn, "show.json", answer: answer)
    end
  end

  def delete(conn, %{"id" => id}) do
    answer = Auth.get_answer!(id)
    with {:ok, %Answer{}} <- Auth.delete_answer(answer) do
      send_resp(conn, :no_content, "")
    end
  end
end
