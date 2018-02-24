defmodule BackendWeb.MembershipController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Membership

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    memberships = Auth.list_memberships()
    render(conn, "index.json", memberships: memberships)
  end

  def create(conn, %{"membership" => membership_params}) do
    with {:ok, %Membership{} = membership} <- Auth.create_membership(membership_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", membership_path(conn, :show, membership))
      |> render("show.json", membership: membership)
    end
  end

  def show(conn, %{"id" => id}) do
    membership = Auth.get_membership!(id)
    render(conn, "show.json", membership: membership)
  end

  def show_by_section(conn, %{"section_id" => section_id}) do
    memberships = Auth.get_memberships_by_section(section_id)
    IO.inspect(memberships)
    render(conn, "index_by_section.json", memberships: memberships)
  end

  def update(conn, %{"id" => id, "membership" => membership_params}) do
    membership = Auth.get_membership!(id)

    with {:ok, %Membership{} = membership} <- Auth.update_membership(membership, membership_params) do
      render(conn, "show.json", membership: membership)
    end
  end

  def delete(conn, %{"section_id" => section_id, "group_id" => group_id, "user_id" => user_id}) do
    membership = Auth.get_membership!(user_id, section_id, group_id)

    with {:ok, %Membership{}} <- Auth.delete_membership(membership) do
      send_resp(conn, :no_content, "")
    end
  end

  def delete(conn, %{"section_id" => section_id, "group_id" => group_id}) do
    %{id: user_id} = Guardian.Plug.current_resource(conn)

    membership = Auth.get_membership!(user_id, section_id, group_id)

    with {:ok, %Membership{}} <- Auth.delete_membership(membership) do
      send_resp(conn, :no_content, "")
    end
  end


end
