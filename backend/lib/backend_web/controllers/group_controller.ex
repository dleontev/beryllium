defmodule BackendWeb.GroupController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Group

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    groups = Auth.list_groups()
    render(conn, "index.json", groups: groups)
  end

  def create(conn, %{"group" => group_params}) do
    with {:ok, %Group{} = group} <- Auth.create_group(group_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", group_path(conn, :show, group))
      |> render("show.json", group: group)
    end
  end

  def show(conn, %{"id" => id}) do
    group = Auth.get_group!(id)
    render(conn, "show.json", group: group)
  end

  def show_all(conn, _params) do
    %{id: id} = Guardian.Plug.current_resource(conn)
    groups = Auth.list_groups(id)
    render(conn, "show_all.json", groups: groups)
  end

  def show_by_section(conn, %{"section_id" => section_id}) do
    groups = Auth.list_groups_by_section(section_id)
    render(conn, "show_by_section.json", groups: groups)
  end

  def update(conn, %{"id" => id, "group" => group_params}) do
    group = Auth.get_group!(id)

    with {:ok, %Group{} = group} <- Auth.update_group(group, group_params) do
      render(conn, "show.json", group: group)
    end
  end

  def delete(conn, %{"id" => id}) do
    group = Auth.get_group!(id)
    with {:ok, %Group{}} <- Auth.delete_group(group) do
      send_resp(conn, :no_content, "")
    end
  end
end
