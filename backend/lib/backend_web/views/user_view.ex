defmodule BackendWeb.UserView do
  use BackendWeb, :view
  alias BackendWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("index_by_course.json", %{users: users}) do
    %{data: render_many(users, UserView, "user_course.json")}
  end

  def render("index_by_section_grouped.json", %{users: users}) do
    %{data: render_many(users, UserView, "user_group.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      email: user.email,
      name: user.name
    }
  end

  def render("user_group.json", %{user: user}) do
    %{
      id: user.id,
      name: user.name,
      group_id: user.group_id,
      groupset_id: user.groupset_id
    }
  end

  def render("user_course.json", %{user: user}) do
    %{
      user_id: user.user_id,
      section_name: user.section_name,
      name: user.name,
      course_code: user.course_code,
      role_name: user.role_name
    }
  end
end
