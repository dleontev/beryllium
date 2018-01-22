defmodule BackendWeb.AnnouncementController do
  use BackendWeb, :controller

  alias Backend.Auth
  alias Backend.Auth.Announcement

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    announcements = Auth.list_announcements()
    render(conn, "index.json", announcements: announcements)
  end

  def create(conn, %{"announcement" => announcement_params}) do
    with {:ok, %announcement{} = announcement} <- Auth.create_announcement(announcement_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", announcement_path(conn, :show, announcement))
      |> render("show.json", announcement: announcement)
    end
  end

  def show(conn, %{"id" => id}) do
    announcement = Auth.get_announcement!(id)
    render(conn, "show.json", announcement: announcement)
  end

  def show_all(conn, %{"section_id" => section_id}) do
    announcements = Auth.list_announcements(section_id)
    render(conn, "show_all.json", announcements: announcements)
  end

  def update(conn, %{"id" => id, "announcement" => announcement_params}) do
    announcement = Auth.get_announcement!(id)

    with {:ok, %announcement{} = announcement} <- Auth.update_announcement(announcement, announcement_params) do
      render(conn, "show.json", announcement: announcement)
    end
  end

  def delete(conn, %{"id" => id}) do
    announcement = Auth.get_announcement!(id)
    
    with {:ok, %Announcement{}} <- Auth.delete_announcement(announcement) do
      send_resp(conn, :no_content, "")
    end
  end
end