defmodule BackendWeb.CourseView do
  use BackendWeb, :view
  alias BackendWeb.CourseView

  def render("index.json", %{courses: courses}) do
    %{data: render_many(courses, CourseView, "course.json")}
  end

  def render("show.json", %{course: course}) do
    %{data: render_one(course, CourseView, "course.json")}
  end

  def render("course.json", %{course: course}) do
    %{id: course.id, code: course.code, start_date: course.start_date, end_date: course.end_date}
  end
end
