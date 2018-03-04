defmodule BackendWeb.QuizView do
  use BackendWeb, :view
  alias BackendWeb.QuizView

  def render("index.json", %{quizzes: quizzes}) do
    %{data: render_many(quizzes, QuizView, "quiz.json")}
  end

  def render("show.json", %{quiz: quiz}) do
    %{data: render_one(quiz, QuizView, "quiz.json")}
  end

  def render("show_by_assignment.json", %{quiz: quiz}) do
    IO.inspect(quiz)
    %{data: %{quiz: quiz.quiz, questions: render_many(quiz.questions, QuizView, "quiz_questions.json")}}  
  end

  def render("quiz.json", %{quiz: quiz}) do
    %{id: quiz.id}
  end

  def render("quiz_questions.json", %{quiz: quiz}) do
    %{
      question_id: quiz.question_id,
      question: quiz.question,
      a1: quiz.a1,
      a2: quiz.a2,
      a3: quiz.a3,
      a4: quiz.a4,
      a5: quiz.a5,
      correct_answer: quiz.correct_answer
    }
  end
end
