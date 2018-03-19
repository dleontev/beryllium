defmodule BackendWeb.PageController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Page

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _params) do
    pages = Auth.list_pages()
    render(conn, "index.json", pages: pages)
  end

  def create(conn, %{"page" => page_params}) do
    with {:ok, %Page{} = page} <- Auth.create_page(page_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", page_path(conn, :show, page))
      |> render("show.json", page: page)
    end
  end

  def show(conn, %{"id" => id}) do
    page = Auth.get_page!(id)
    render(conn, "show.json", page: page)
  end

  def show(conn, %{"section_id" => section_id}) do
    section = Auth.get_section!(section_id)

    page =
      if section.homepage_id do
        Auth.get_page!(section.homepage_id)
      else
        %{content: "", id: nil, title: nil}
      end

    render(conn, "show.json", page: page)
  end

  def update(conn, %{"id" => id, "page" => page_params}) do
    page = Auth.get_page!(id)

    with {:ok, %Page{} = page} <- Auth.update_page(page, page_params) do
      render(conn, "show.json", page: page)
    end
  end

  def delete(conn, %{"id" => id}) do
    page = Auth.get_page!(id)

    with {:ok, %Page{}} <- Auth.delete_page(page) do
      send_resp(conn, :no_content, "")
    end
  end
end
