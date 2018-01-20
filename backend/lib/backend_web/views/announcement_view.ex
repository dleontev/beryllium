defmodule BackendWeb.AnnouncementView do
  use BackendWeb, :view
  alias BackendWeb.AnnouncementView

  def render("index.json", %{announcements: announcements}) do
    %{data: render_many(announcements, AnnouncementView, "announcement.json")}
  end

  def render("show.json", %{announcement: announcement}) do
    %{data: render_one(announcement, AnnouncementView, "announcement.json")}
  end

  def render("show_all.json", %{announcements: announcements}) do
    %{data: render_many(announcements, AnnouncementView, "announcement_all.json")}
  end

  def render("announcement.json", %{announcement: announcement}) do
    %{id: announcement.id, title: announcement.title}
  end

  def render("announcement_all.json", %{announcement: announcement}) do
    %{id: announcement.id, title: announcement.title, content: announcement.content, inserted_at: announcement.inserted_at, 
    updated_at: announcement.updated_at, first_name: announcement.first_name, last_name: announcement.last_name}
  end
end