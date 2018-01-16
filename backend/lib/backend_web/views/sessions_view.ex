defmodule BackendWeb.SessionsView do
  use BackendWeb, :view

  def render("show.json", %{user: user, jwt: jwt}) do
    %{
      data: user_data_json(user),
      meta: meta_json(jwt)
    }
  end
  
  def user_data_json(user) do
    %{
      id: user.id,
      email: user.email
    }
  end

  def meta_json(jwt) do
    %{
      token: jwt
    }
  end

end
