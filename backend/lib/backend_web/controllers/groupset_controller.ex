defmodule BackendWeb.GroupsetController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Groupset

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _params) do
    groupsets = Auth.list_groupsets()
    render(conn, "index.json", groupsets: groupsets)
  end

  def create(conn, %{"groupset" => groupset_params}) do
    with {:ok, %Groupset{} = groupset} <- Auth.create_groupset(groupset_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", groupset_path(conn, :show, groupset))
      |> render("show.json", groupset: groupset)
    end
  end

  def show(conn, %{"id" => id}) do
    groupset = Auth.get_groupset!(id)
    render(conn, "show.json", groupset: groupset)
  end

  def show_by_section(conn, %{"section_id" => section_id}) do
    groupsets = Auth.get_groupsets_by_section_id(section_id)
    IO.inspect(groupsets)
    render(conn, "show_by_section.json", groupsets: groupsets)
  end

  def update(conn, %{"id" => id, "groupset" => groupset_params}) do
    groupset = Auth.get_groupset!(id)

    with {:ok, %Groupset{} = groupset} <- Auth.update_groupset(groupset, groupset_params) do
      render(conn, "show.json", groupset: groupset)
    end
  end

  def delete(conn, %{"id" => id}) do
    groupset = Auth.get_groupset!(id)

    with {:ok, %Groupset{}} <- Auth.delete_groupset(groupset) do
      send_resp(conn, :no_content, "")
    end
  end
end
