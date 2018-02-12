defmodule BackendWeb.QuizView do
  use BackendWeb, :view
  alias BackendWeb.QuizView

  def render("index.json", %{quizzes: quizzes}) do
    %{data: render_many(quizzes, QuizView, "quiz.json")}
  end

  def render("show.json", %{quiz: quiz}) do
    %{data: render_one(quiz, QuizView, "quiz.json")}
  end

  def render("quiz.json", %{quiz: quiz}) do
    %{id: quiz.id}
  end
end
