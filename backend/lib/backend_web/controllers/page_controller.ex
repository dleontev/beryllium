defmodule BackendWeb.PageController do
  use BackendWeb, :controller
  import Ecto.Query

  def index(conn, _params) do
    pages = Backend.Repo.all(from u in Backend.User)
    render conn, "index.json", pages: pages
  end
end