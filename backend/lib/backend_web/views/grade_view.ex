defmodule BackendWeb.GradeView do
  use BackendWeb, :view
  alias BackendWeb.GradeView

  def render("index.json", %{grades: grades}) do
    %{data: render_many(grades, GradeView, "grade.json")}
  end

  def render("show.json", %{grade: grade}) do
    %{data: render_one(grade, GradeView, "grade.json")}
  end

  def render("grade.json", %{grade: grade}) do
    %{id: grade.id}
  end
end
