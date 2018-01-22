defmodule BackendWeb.UserView do
  use BackendWeb, :view
  alias BackendWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("index_by_course.json", %{users: users}) do
    %{data: render_many(users, UserView, "user_course.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id, email: user.email, first_name: user.first_name,
    middle_name: user.middle_name, last_name: user.last_name}
  end

  def render("user_course.json", %{user: user}) do
    %{user_id: user.user_id, section_name: user.section_name, first_name: user.first_name, middle_name: user.middle_name, 
    last_name: user.last_name, course_code: user.course_code, role_name: user.role_name}   
  end
end
