defmodule BackendWeb.UserView do
  use BackendWeb, :view
  alias BackendWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("validate.json", %{user: user}) do
    %{email: user.email, password: user.password}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id, email: user.email, first_name: user.first_name,
    middle_name: user.middle_name, last_name: user.last_name, password: user.password}
  end
end
