defmodule BackendWeb.CourseView do
  use BackendWeb, :view
  alias BackendWeb.CourseView

  def render("index.json", %{courses: courses}) do
    %{data: render_many(courses, CourseView, "course.json")}
  end

  def render("show.json", %{course: course}) do
    %{data: render_one(course, CourseView, "course.json")}
  end

  def render("show_all.json", %{courses: courses}) do
    %{data: render_many(courses, CourseView, "course_all.json")}
  end

  def render("course.json", %{course: course}) do
<<<<<<< HEAD
    %{id: course.id, code: course.code, start_date: course.start_date, end_date: course.end_date}
=======
    %{id: course.id, name: course.name, code: course.code}
  end

  def render("course_all.json", %{course: course}) do
    %{id: course.id, course_code: course.course_code, course_name: course.course_name, 
    section_name: course.section_name, start_date: course.start_date, 
    end_date: course.end_date, visible: course.visible, role_name: course.role_name }
>>>>>>> adf92ec1877655751274bb92e05beea2e2c0fa7a
  end
end