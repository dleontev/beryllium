defmodule BackendWeb.SessionsView do
  use BackendWeb, :view

  def render("show.json", %{user: user, jwt: jwt}) do
    %{
      data: render_one(user, BackendWeb.UserView, "user.json"),
      meta: %{token: jwt}
    }
  end
  
  def render("error.json", _) do
    %{error: "Invalid email or password"}
  end

  def render("forbidden.json", %{error: error}) do
    %{error: error}
  end

  def render("delete.json", _) do
    %{ok: true}
  end

  def user_data_json(user) do
    %{
      id: user.id,
      email: user.email
    }
  end

end
